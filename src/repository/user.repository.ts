import User, {IUser} from "../model/user.model";
const crypto = require('crypto');
import { Encrypt } from '../encrypt';
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

class UserRepository{
    private static userRepository: UserRepository;
    connString: string = "";

    private constructor(){}

    public static getInstance(){
        if(!this.userRepository){
            this.userRepository = new UserRepository();
        }
        return this.userRepository;
    }

    public async getUsers(): Promise<IUser[]>{
        let users: IUser[] = [];
        try {
            users = await User.findAll();
        } catch (error) {
            console.log(error);
            throw new Error("error");
        }
        return users;
    }

    public async getUser(user: IUser): Promise<IUser | any>{
        try {
            const username = user.username.toLowerCase();
            const password = user.password;
            let machedUser = await User.findOne({where: {username: username}});
            console.log('macheduser: ', machedUser);
            if(machedUser){
                let isMached = await Encrypt.comparePassword(password, machedUser.password);
                if(isMached){
                    delete machedUser.dataValues.password;
                    machedUser.dataValues.token = this.getToken(machedUser);
                    return machedUser;
                }
            }
           
            return null;
            //throw new Error('Incorrect Username or Password');
            // return User.findOne({
            //     where: {
            //         [Op.or]: [{username: username}]
            //     }
            // }).then((userdb: any) =>{
            //     if(!userdb) return null;
            //     return Encrypt.comparePassword(password, userdb.password).then((isMatch)=>{
            //         if(isMatch){
            //             delete userdb.dataValues.password;
            //             userdb.dataValues.token = this.getToken(userdb);
            //         }
            //         return userdb;
            //     },
            //     (error) =>{
            //         throw error;
            //     });
            // })
        } catch (error) {
            throw error;
        }
    }

    private getToken(user: IUser){
        return jwt.sign({id:user.id, username: user.username}, process.env.SECRET, {
            expiresIn: 86400 // 24 hours
        });
    }

    public async verifyToken(token: string){
        try {
            const decoded = jwt.verify(token, process.env.SECRET) as any;
            return decoded;
        } catch (error) {
            throw error;            
        }
    }
    
    public async createUser(user: IUser): Promise<IUser>{
        try {
            //check user existing 
            let userdb = await User.findOne({where: {username: user.username}});
            if(userdb) throw new Error( "User already exist.");
            user.password = await Encrypt.cryptPassword(user.password);
            let result = await User.create(user);
            delete result.dataValues.password;
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    private async createPasswordResetToken(user: IUser) {
        const resetToken = crypto.randomBytes(32).toString('hex');
      
        let passwordResetToken = crypto
          .createHash('sha256')
          .update(resetToken)
          .digest('hex');
        
        //console.log({ resetToken }, passwordResetToken);
        // update passwordResetExpires and passwordResetToken in user table 
        let passwordResetExpires = Date.now() + 10 * 60 * 1000;
        await User.update({ passwordResetToken: passwordResetToken, passwordResetExpires: passwordResetExpires}, {
            where: {
                id: user.id
            }
          });

        return resetToken;
    };

    private async getUserByEmail(email: string) : Promise<IUser>{
        let user: IUser = new User();
        try {
            user = await User.findOne({where: {username: email}});
        } catch (error) {
            console.log(error);
            throw new Error("error");
        }
        return user;
    }

    public async forgotPassword (email: string) : Promise<any>{
        // 1) Get user based on posted email
        const user:any = await this.getUserByEmail(email);
        if(!user){
            throw new Error('There is no user with the email.');
        }

        //2) Generate the random reset token
        const resetToken = await this.createPasswordResetToken(user);
        return {resetToken, user: user.dataValues} ;
    }


    public async getUserByToken(token: string): Promise<IUser> {
        let user: IUser = new User();

        const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

        try {
            user = await User.findOne({
                where:  {
                    [Op.and]:[
                  {passwordResetToken: hashedToken},
                  {passwordResetExpires: { [Op.gt]: new Date() }},
                ]},
              });
        } catch (error) {
            console.log(error);
            console.log(error)
            throw error;
        }

        // 2) If token has not expired, and there is user, set the new password
        if (!user) {
            //return next(new AppError('Token is invalid or has expired', 400));
            console.log('user not exits')
            throw new Error('user not exists. Token is invalid or has expired')
            
        }

        return user;
    }

    public async updateUser(user: IUser): Promise<IUser>{
        let userdb
        try {
            userdb = await User.update({
                firstname: user.firstname, 
                lastname: user.lastname,
                password: user.password = await Encrypt.cryptPassword(user.password),
                token: user.token,
                passwordChangedAt: user.passwordChangedAt,
                passwordResetToken: user.passwordResetToken,
                passwordResetExpires: user.passwordResetExpires
            },{ 
                where: {
                id: user.id
            }
        });
    
        } catch (error) {
            console.log(error)
            throw error;
        }
        return userdb;
    }

    public async updatePassword(user: any, currentPassword: string, toChangePassword: string): Promise<boolean>{
        const password = currentPassword;
        let isUpdated: boolean = false;
        let userdb:any = new User();
        try {
            let encriptedPasswordToChange = await Encrypt.cryptPassword(toChangePassword);
            userdb = await User.findByPk(user.id); 
            let isMatch = await Encrypt.comparePassword(currentPassword, userdb.password);
            if(isMatch){
                await User.update({password: encriptedPasswordToChange}, {where: {id: user.id}});
                isUpdated = true;
            }
        } catch (error) {
            throw error;
        }
        return isUpdated;
    }

    public async updateMe(user: any): Promise<any>{
        try {
            let updateUser = await User.update({firstname: user.firstname, lastname: user.lastname}, {where: {id: user.id}});
            return updateUser;
        } catch (error) {
            throw error;
        }
    }
}

export default UserRepository;