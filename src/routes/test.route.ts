import express from "express";
import TestController from "../controller/test.controller";
import authJwt from '../middleware/authJwt';
const router = express.Router();


//testRouter.post(BASE_URL + '/tests/create', TestController.createTest); 

router
.route('/')
.get(authJwt.verifyToken, TestController.getTests)
.post(authJwt.verifyToken, TestController.createTest)

router
  .route('/:id')
  .get(authJwt.verifyToken, TestController.getTest)
  .patch(authJwt.verifyToken, TestController.updateTest)
  .delete(authJwt.verifyToken, TestController.deleteTest);

export default router;
