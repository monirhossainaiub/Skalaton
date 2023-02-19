"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const test_controller_1 = __importDefault(require("../controller/test.controller"));
const authJwt_1 = __importDefault(require("../middleware/authJwt"));
const router = express_1.default.Router();
//testRouter.post(BASE_URL + '/tests/create', TestController.createTest); 
router
    .route('/')
    .get(authJwt_1.default.verifyToken, test_controller_1.default.getTests)
    .post(authJwt_1.default.verifyToken, test_controller_1.default.createTest);
router
    .route('/:id')
    .get(authJwt_1.default.verifyToken, test_controller_1.default.getTest)
    .patch(authJwt_1.default.verifyToken, test_controller_1.default.updateTest)
    .delete(authJwt_1.default.verifyToken, test_controller_1.default.deleteTest);
exports.default = router;
