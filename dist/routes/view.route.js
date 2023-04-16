"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controller/auth.controller"));
const router = express_1.default.Router();
const BASE_URL = process.env.BASE_URL;
router.get('/login', auth_controller_1.default.getLoginForm);
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
exports.default = router;
