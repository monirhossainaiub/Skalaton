import { RoutesInput } from "../type/type";
import {Request, Response} from "express";
import authRouter from './auth.route';
import testRouter from './test.route';
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const BASE_URL = process.env.BASE_URL;

const routes = ({ app }: RoutesInput) => {
    const corsOptions = {
        origin: "http://localhost:4200",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
    };
    
    app.use(cors(corsOptions));

    const optionsJson ={
        limit: '100mb'
    };

    const optionsUrlencoded ={
        limit: '100mb',
        extends: true
    };

    app.use(express.json(optionsJson));
    app.use(express.urlencoded(optionsUrlencoded));
    app.use(cookieParser());

    app.get("/", (requst: Request, response: Response) => {
        response.send("Hello typescript with node.js");
    });

    //all router will be registered here
    app.use(BASE_URL + '/users', authRouter);
    app.use(BASE_URL + '/tests', testRouter);

    
    //get invalid request 
    app.get("*", function(req, res, next){
        //let msg = `page not found \n${req.ip} tried to reach ${req.originalUrl}`;
        let meg = `Page not found. Tried to reach ${req.originalUrl}`;
        //throw new CustomHandler(400,msg);
    });

    // app.use(globalExceptionHandlerMiddleware);

}

export default routes;