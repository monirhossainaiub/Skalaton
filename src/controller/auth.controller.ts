import { Request, Response, NextFunction } from "express";
import { IUser } from '../model/user.model';
import AuthService from '../service/auth.service';
import User from '../model/user.model';
const sendEmail = require('../utils/email');
import { Encrypt } from "../encrypt";


namespace AuthController{

  const createSendToken = (user: any, statusCode: number, req: Request, res: Response) => {
    const expiresIn = parseInt(process.env.JWT_COOKIE_EXPIRES_IN || "0", 10) * 24 * 60 * 60 * 1000;
  
    res.cookie('jwt', user.dataValues.token, {
      expires: new Date(
        Date.now() +  expiresIn
      ),
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'http'
    });
    
    // Remove password from output
    // user.password = undefined;
    console.log(res)
    res.status(statusCode).json({
      status: 'success',
      token: user.token,
      data: {
        user
      }
    });
  };
  
    export const Home = async(req: Request, res: Response, next: NextFunction) => {
      console.log('Home controller')
      try {
        res.status(200).render('base', {
          title: 'It is working ki moja ki moja'
        })
      } catch (error) {
        console.log(error)
      }
      //res.status(200).json({message:"Home controller"})
    }
    
    export const getLoginForm = async(req: Request, res: Response, next: NextFunction) => {
      try {
        res.status(200).render('login', {
          title: 'Log into your account'
        });
      } catch (error) {
        console.log(error)
      }
    }

    export const login = async(request: Request, response: Response, next: NextFunction) =>{
        try {
        let user: IUser = new User()
        user.username = request.body.username.toString();
        user.password = request.body.password.toString();
         // 1) Check if email and password empty
        if (!user.username || !user.password) {
            //return next(new AppError('Please provide email and password!', 400));
            response.status(401).json({error: 'Please provide email and password!'});
         }

        // 2) Check if user exists && password is correct
        const userResponse: IUser = await AuthService.getInstance().signInUser(user);
        
        // 3) If everything ok, send token to client
        if(userResponse) {
            //response.status(200).json(userResponse);
            createSendToken(userResponse, 200, request, response);
        }else{
            console.log('no user matched')
            response.status(401).json({error: 'username or password incorrect.'});
        }
       } catch (error) {
        console.log(error);
        response.status(500).json(error);
       }
    }

    export const logout = async(request:Request, response:Response) => {
        response.cookie('jwt', 'loggedout', {
          expires: new Date(Date.now() + 10 * 1000),
          httpOnly: true
        });
        response.status(200).json({ status: 'success' });
    };

    export const createUser = async(request: Request, response: Response, next: NextFunction) => {
        try {
            let user: any = {};
            user.firstname = request.body.firstname;
            user.lastname = request.body.lastname;
            user.username = request.body.username;
            user.password = request.body.password;
            let createdUser: IUser = await AuthService.getInstance().createUser(user);
            if(createUser !== null)
            {
                response.status(200).json({data: createdUser});
            }
        } catch (error:any) {
            console.log("err", error);
            response.status(401).json({message: error.message})
        }
    }

    //password functionality
    export const forgotPassword = async(request: Request, response: Response, next: NextFunction) => {
        //1) Generate the random reset token
        const obj: any = await AuthService.getInstance().forgotPassword(request.body.email);

        // 2) Send it to user's email
        const resetURL = `${request.protocol}://${request.get(
            'host'
          )}/api/users/resetPassword/${obj.resetToken}`;

          //3)  Send email to the user 

          const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

          try {
            await sendEmail({
              email: obj.user.username,
              subject: 'Your password reset token (valid for 10 min)',
              message
            });
        
            response.status(200).json({
              status: 'success',
              message: 'Token sent to email!'
            });
          } catch (err) {
            //obj.user.passwordResetToken = undefined;
            //obj.user.passwordResetExpires = undefined;
            //update the user
        
            console.log(err)
          }
    }

    export const resetPassword = async(request: Request, response: Response, next: NextFunction) => {
       try {
        let user: IUser = new User();
            //1) Get user based on the tocken
            //validateresetToken() util
            if(request.params.token){
              user = await AuthService.getInstance().getUserByToken(request.params.token);
            }
            else{
              response.status(401).json({status:'Unauthorized', message: 'token is empty'})
            }

            // 2) If token has not expired, and there is user, set the new password
            if(request.body.password === request.body.confirmPassword){
                user.password = request.body.password;
                user.passwordResetToken = null;
                user.passwordResetExpires = null;
                user.passwordChangedAt = new Date();
                let result = await AuthService.getInstance().updateUser(user);
                console.log('result', result)
            }
            else
            {
              response.status(400).json({status: 'Bad Request', message: 'Password and confirmation password do not match'})
            }
            
            // 4) log the user in, send JWT
            
       } catch (error) {
        response.status(401).json({status: 'fail', message: 'user is not exist. may token is invalid or expired'})
       }
        
       response.status(200).json({status: 'success', message: 'login using new password'});
    }

    export const updatePassword = async(request: Request, response: Response, next: NextFunction) =>{
      //let user: any; // user will be request.user
      let user: any ={};
      user.id = request.body.id;
      console.log('update password')
      try {
        const result = await AuthService.getInstance().updatePassword(user, request.body.currentPassword, request.body.toChangePassword);
        if(result) response.status(200).json({status:'success', message: "your password has been updated."})
      } catch (error) {
        console.log(error);
        //log error
      }
    }

    export const updateMe = async(request: Request, response: Response, next: NextFunction) =>{
        // 1) create error if user post password or confirmpassword 
      
        try {
          let user: any = {};
          user.id = request.body.id;
          user.firstname = request.body.firstname;
          user.lastname = request.body.lastname;
          const result = await AuthService.getInstance().updateMe(user);
          console.log(result)
          if(result) response.status(200).json({status:'success', message: "your profile has been updated."});
          
        } catch (error) {
          
        }
    }
}

export default AuthController;