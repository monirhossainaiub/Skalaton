"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../service/auth.service"));
const user_model_1 = __importDefault(require("../model/user.model"));
const sendEmail = require('../utils/email');
var AuthController;
(function (AuthController) {
    AuthController.login = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            let user = new user_model_1.default();
            user.username = request.body.username.toString();
            user.password = request.body.password.toString();
            // 1) Check if email and password exist
            if (!user.username || !user.password) {
                //return next(new AppError('Please provide email and password!', 400));
                response.status(401).json({ error: 'Please provide email and password!' });
            }
            // 2) Check if user exists && password is correct
            const userResponse = yield auth_service_1.default.getInstance().signInUser(user);
            // if (!userResponse || !(await Encrypt.comparePassword(user.password, userResponse.password))) {
            //     //return next(new AppError('Incorrect email or password', 401));
            //   }
            // 3) If everything ok, send token to client
            if (userResponse) {
                response.status(200).json(userResponse);
            }
            else {
                console.log('no user matched');
                response.status(401).json({ error: 'username or password incorrect.' });
            }
        }
        catch (error) {
            console.log(error);
            response.status(500).json(error);
        }
    });
    AuthController.logout = (request, response) => __awaiter(this, void 0, void 0, function* () {
        response.cookie('jwt', 'loggedout', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true
        });
        response.status(200).json({ status: 'success' });
    });
    AuthController.createUser = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            let user = {};
            user.firstname = request.body.firstname;
            user.lastname = request.body.lastname;
            user.username = request.body.username;
            user.password = request.body.password;
            let createdUser = yield auth_service_1.default.getInstance().createUser(user);
            if (AuthController.createUser !== null) {
                response.status(200).json({ data: createdUser });
            }
        }
        catch (error) {
            console.log("err", error);
        }
    });
    //password functionality
    AuthController.forgotPassword = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
        //1) Generate the random reset token
        const obj = yield auth_service_1.default.getInstance().forgotPassword(request.body.email);
        // 2) Send it to user's email
        const resetURL = `${request.protocol}://${request.get('host')}/api/users/resetPassword/${obj.resetToken}`;
        //3)  Send email to the user 
        const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
        try {
            yield sendEmail({
                email: obj.user.username,
                subject: 'Your password reset token (valid for 10 min)',
                message
            });
            response.status(200).json({
                status: 'success',
                message: 'Token sent to email!'
            });
        }
        catch (err) {
            //obj.user.passwordResetToken = undefined;
            //obj.user.passwordResetExpires = undefined;
            //update the user
            console.log(err);
        }
    });
    AuthController.resetPassword = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            let user = new user_model_1.default();
            //1) Get user based on the tocken
            //validateresetToken() util
            if (request.params.token) {
                user = yield auth_service_1.default.getInstance().getUserByToken(request.params.token);
            }
            else {
                response.status(401).json({ status: 'Unauthorized', message: 'token is empty' });
            }
            // 2) If token has not expired, and there is user, set the new password
            if (request.body.password === request.body.confirmPassword) {
                user.password = request.body.password;
                user.passwordResetToken = null;
                user.passwordResetExpires = null;
                user.passwordChangedAt = new Date();
                let result = yield auth_service_1.default.getInstance().updateUser(user);
                console.log('result', result);
            }
            else {
                response.status(400).json({ status: 'Bad Request', message: 'Password and confirmation password do not match' });
            }
            // 4) log the user in, send JWT
        }
        catch (error) {
            response.status(401).json({ status: 'fail', message: 'user is not exist. may token is invalid or expired' });
        }
        response.status(200).json({ status: 'success', message: 'login using new password' });
    });
    AuthController.updatePassword = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
        //let user: any; // user will be request.user
        let user = {};
        user.id = request.body.id;
        console.log('update password');
        try {
            const result = yield auth_service_1.default.getInstance().updatePassword(user, request.body.currentPassword, request.body.toChangePassword);
            if (result)
                response.status(200).json({ status: 'success', message: "your password has been updated." });
        }
        catch (error) {
            console.log(error);
            //log error
        }
    });
    AuthController.updateMe = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
        // 1) create error if user post password or confirmpassword 
        try {
            let user = {};
            user.id = request.body.id;
            user.firstname = request.body.firstname;
            user.lastname = request.body.lastname;
            const result = yield auth_service_1.default.getInstance().updateMe(user);
            console.log(result);
            if (result)
                response.status(200).json({ status: 'success', message: "your profile has been updated." });
        }
        catch (error) {
        }
    });
})(AuthController || (AuthController = {}));
exports.default = AuthController;
