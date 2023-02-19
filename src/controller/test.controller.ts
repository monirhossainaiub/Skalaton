import { Request, Response, NextFunction } from "express";
import TestService from '../service/test.service';
import Test, { ITest } from '../model/test.model';

namespace TestController{

    export const createTest = async(request: Request, response: Response, next: NextFunction) =>{
        try {
            // let test: any = {};
            // test.name = request.body.name;
            const testdb = await TestService.getInstance().createTest(request.body);
            if(testdb){
                response.status(201).json(testdb);
            }
       } catch (error) {
        console.log(error);
        response.status(500).json(error);
       }
    }

    export const getTests = async(request:Request, response:Response, next: NextFunction) => {
       try {
        const tests = await TestService.getInstance().getTests();
       if(tests){
        response.status(200).json(tests);
       }
       } catch (error) {
        response.status(500).json(error);
       }
    };

    export const getTest = async(request:Request, response:Response, next: NextFunction) => {
        try {
         const test = await TestService.getInstance().getTest(parseInt(request.params.id));
        if(test){
         response.status(200).json(test);
        }
        } catch (error) {
         response.status(500).json(error);
        }
     };

     export const updateTest = async(request:Request, response:Response, next: NextFunction) => {
        try {
         const test = await TestService.getInstance().updateTest(request.body);
        if(test){
         response.status(200).json(test);
        }
        } catch (error) {
         response.status(500).json(error);
        }
     };

     export const deleteTest = async(request:Request, response:Response, next: NextFunction) => {
        try {
         const test = await TestService.getInstance().deleteTest(request.body);
        if(test){
         response.status(200).json(test);
        }
        } catch (error) {
         response.status(500).json(error);
        }
     };
}

export default TestController;