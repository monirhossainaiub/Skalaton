import express from "express";
import AuthController from "../controller/auth.controller";
import authJwt from "../middleware/authJwt";
const router = express.Router();
const BASE_URL = process.env.BASE_URL;

router.post('/signup', AuthController.createUser);
router.post('/login', AuthController.login);

router.post('/forgotPassword', AuthController.forgotPassword);
router.patch('/resetPassword/:token', AuthController.resetPassword);
router.patch('/updatePassword', authJwt.verifyToken, AuthController.updatePassword);
router.patch('/updateMe', authJwt.verifyToken, AuthController.updateMe);

 
router.get('/logout', AuthController.logout);

export default router;
