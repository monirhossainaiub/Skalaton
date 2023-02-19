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
const user_model_1 = __importDefault(require("../model/user.model"));
const crypto = require('crypto');
const encrypt_1 = require("../encrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
class UserRepository {
    constructor() {
        this.connString = "";
    }
    static getInstance() {
        if (!this.userRepository) {
            this.userRepository = new UserRepository();
        }
        return this.userRepository;
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            let users = [];
            try {
                users = yield user_model_1.default.findAll();
            }
            catch (error) {
                console.log(error);
                throw new Error("error");
            }
            return users;
        });
    }
    getUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const username = user.username.toLowerCase();
                const password = user.password;
                return user_model_1.default.findOne({
                    where: {
                        [Op.or]: [{ username: username }]
                    }
                }).then((userdb) => {
                    if (!userdb)
                        return null;
                    return encrypt_1.Encrypt.comparePassword(password, userdb.password).then((isMatch) => {
                        if (isMatch) {
                            delete userdb.dataValues.password;
                            userdb.dataValues.token = this.getToken(userdb);
                        }
                        return userdb;
                    }, (error) => {
                        throw error;
                    });
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    getToken(user) {
        return jwt.sign({ id: user.id, username: user.username }, process.env.SECRET, {
            expiresIn: 86400 // 24 hours
        });
    }
    verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jwt.verify(token, process.env.SECRET);
                return decoded;
            }
            catch (error) {
                throw error;
            }
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                user.password = yield encrypt_1.Encrypt.cryptPassword(user.password);
                let result = yield user_model_1.default.create(user);
                delete result.dataValues.password;
                return result;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    createPasswordResetToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const resetToken = crypto.randomBytes(32).toString('hex');
            let passwordResetToken = crypto
                .createHash('sha256')
                .update(resetToken)
                .digest('hex');
            //console.log({ resetToken }, passwordResetToken);
            // update passwordResetExpires and passwordResetToken in user table 
            let passwordResetExpires = Date.now() + 10 * 60 * 1000;
            yield user_model_1.default.update({ passwordResetToken: passwordResetToken, passwordResetExpires: passwordResetExpires }, {
                where: {
                    id: user.id
                }
            });
            return resetToken;
        });
    }
    ;
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = new user_model_1.default();
            try {
                user = yield user_model_1.default.findOne({ where: { username: email } });
            }
            catch (error) {
                console.log(error);
                throw new Error("error");
            }
            return user;
        });
    }
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1) Get user based on posted email
            const user = yield this.getUserByEmail(email);
            if (!user) {
                throw new Error('There is no user with the email.');
            }
            //2) Generate the random reset token
            const resetToken = yield this.createPasswordResetToken(user);
            return { resetToken, user: user.dataValues };
        });
    }
    getUserByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = new user_model_1.default();
            const hashedToken = crypto
                .createHash('sha256')
                .update(token)
                .digest('hex');
            try {
                user = yield user_model_1.default.findOne({
                    where: {
                        [Op.and]: [
                            { passwordResetToken: hashedToken },
                            { passwordResetExpires: { [Op.gt]: new Date() } },
                        ]
                    },
                });
            }
            catch (error) {
                console.log(error);
                console.log(error);
                throw error;
            }
            // 2) If token has not expired, and there is user, set the new password
            if (!user) {
                //return next(new AppError('Token is invalid or has expired', 400));
                console.log('user not exits');
                throw new Error('user not exists. Token is invalid or has expired');
            }
            return user;
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let userdb;
            try {
                userdb = yield user_model_1.default.update({
                    firstname: user.firstname,
                    lastname: user.lastname,
                    password: user.password = yield encrypt_1.Encrypt.cryptPassword(user.password),
                    token: user.token,
                    passwordChangedAt: user.passwordChangedAt,
                    passwordResetToken: user.passwordResetToken,
                    passwordResetExpires: user.passwordResetExpires
                }, {
                    where: {
                        id: user.id
                    }
                });
            }
            catch (error) {
                console.log(error);
                throw error;
            }
            return userdb;
        });
    }
    updatePassword(user, currentPassword, toChangePassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = currentPassword;
            let isUpdated = false;
            let userdb = new user_model_1.default();
            try {
                let encriptedPasswordToChange = yield encrypt_1.Encrypt.cryptPassword(toChangePassword);
                userdb = yield user_model_1.default.findByPk(user.id);
                let isMatch = yield encrypt_1.Encrypt.comparePassword(currentPassword, userdb.password);
                if (isMatch) {
                    yield user_model_1.default.update({ password: encriptedPasswordToChange }, { where: { id: user.id } });
                    isUpdated = true;
                }
            }
            catch (error) {
                throw error;
            }
            return isUpdated;
        });
    }
    updateMe(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let updateUser = yield user_model_1.default.update({ firstname: user.firstname, lastname: user.lastname }, { where: { id: user.id } });
                return updateUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = UserRepository;
