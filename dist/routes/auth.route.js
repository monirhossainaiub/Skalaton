"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controller/auth.controller"));
const authJwt_1 = __importDefault(require("../middleware/authJwt"));
const router = express_1.default.Router();
const BASE_URL = process.env.BASE_URL;
router.post('/signup', auth_controller_1.default.createUser);
router.post('/login', auth_controller_1.default.login);
router.post('/forgotPassword', auth_controller_1.default.forgotPassword);
router.patch('/resetPassword/:token', auth_controller_1.default.resetPassword);
router.patch('/updatePassword', authJwt_1.default.verifyToken, auth_controller_1.default.updatePassword);
router.patch('/updateMe', authJwt_1.default.verifyToken, auth_controller_1.default.updateMe);
router.get('/logout', auth_controller_1.default.logout);
exports.default = router;
