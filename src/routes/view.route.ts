import express from "express";
import AuthController from "../controller/auth.controller";
import authJwt from "../middleware/authJwt";
const router = express.Router();
const BASE_URL = process.env.BASE_URL;

router.get('/login', AuthController.getLoginForm);
// router.get('/logout', AuthController.logout);


// router.use(viewsController.alerts);

// router.get('/', authController.isLoggedIn, viewsController.getOverview);

// router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
// router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
// router.get('/me', authController.protect, viewsController.getAccount);

// router.get('/my-tours', authController.protect, viewsController.getMyTours);

// router.post(
//   '/submit-user-data',
//   authController.protect,
//   viewsController.updateUserData
// );

export default router;
