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
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
//import jwt from 'jsonwebtoken';
const secret = process.env.SECRET;
var authJwt;
(function (authJwt) {
    authJwt.verifyToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        // 1) Getting token and check of it's there
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        if (!token) {
            // return next(
            // new AppError('You are not logged in! Please log in to get access.', 401)
            // );
            res.status(401).json({ message: 'You are not logged in! Please log in to get access.' });
        }
        // 2) Verification token
        let user;
        // const decoded = await promisify(jwt.verify)(token, secret);
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                console.error(err);
            }
            else {
                console.log(decoded);
                user = decoded;
            }
        });
        // 3) Check if user still exists
        let currentUser = yield user_model_1.default.findByPk(user.id);
        if (!currentUser) {
            // return next(
            // new AppError(
            //     'The user belonging to this token does no longer exist.',
            //     401
            // )
            // );
            res.status(401).json({ message: 'The user belonging to this token does no longer exist.' });
        }
        // 4) Check if user changed password after the token was issued
        if (!(yield user_model_1.default.findByPk(currentUser.id))) {
            // return next(
            // new AppError('User recently changed password! Please log in again.', 401)
            // );
            res.status(401).json({ message: 'User recently changed password! Please log in again.' });
        }
        // GRANT ACCESS TO PROTECTED ROUTE
        req.user = currentUser;
        res.locals.user = currentUser;
        next();
    });
})(authJwt || (authJwt = {}));
exports.default = authJwt;
