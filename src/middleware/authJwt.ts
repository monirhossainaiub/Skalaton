import User from '../model/user.model';
import { NextFunction } from 'express';
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
//import jwt from 'jsonwebtoken';
const secret = process.env.SECRET;
namespace authJwt{
    export const verifyToken = async(req: any, res: any, next: NextFunction) => {
        // 1) Getting token and check of it's there
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }

        if (!token) {
            // return next(
            // new AppError('You are not logged in! Please log in to get access.', 401)
            // );
            res.status(401).json({message: 'You are not logged in! Please log in to get access.'});
        }

        // 2) Verification token
        let user: any;
        // const decoded = await promisify(jwt.verify)(token, secret);
        jwt.verify(token, secret, (err:any, decoded:any) => {
            if (err) {
              console.error(err);
            } else {
              console.log(decoded);
              user = decoded;
            }
        });
        // 3) Check if user still exists
        let currentUser:any = await User.findByPk(user.id);
        if (!currentUser) {
            // return next(
            // new AppError(
            //     'The user belonging to this token does no longer exist.',
            //     401
            // )
            // );
            res.status(401).json({message: 'The user belonging to this token does no longer exist.'})
        }

        // 4) Check if user changed password after the token was issued
        if (!(await User.findByPk(currentUser.id))) {
            // return next(
            // new AppError('User recently changed password! Please log in again.', 401)
            // );
            res.status(401).json({message: 'User recently changed password! Please log in again.'})
        }

        // GRANT ACCESS TO PROTECTED ROUTE
        req.user = currentUser;
        res.locals.user = currentUser;
        next();
    }
    
}

export default authJwt;