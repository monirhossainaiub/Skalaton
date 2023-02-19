"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = __importDefault(require("./auth.route"));
const test_route_1 = __importDefault(require("./test.route"));
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const BASE_URL = process.env.BASE_URL;
const routes = ({ app }) => {
    const corsOptions = {
        origin: "http://localhost:4200",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
    };
    app.use(cors(corsOptions));
    const optionsJson = {
        limit: '100mb'
    };
    const optionsUrlencoded = {
        limit: '100mb',
        extends: true
    };
    app.use(express.json(optionsJson));
    app.use(express.urlencoded(optionsUrlencoded));
    app.use(cookieParser());
    app.get("/", (requst, response) => {
        response.send("Hello typescript with node.js");
    });
    //all router will be registered here
    app.use(BASE_URL + '/users', auth_route_1.default);
    app.use(BASE_URL + '/tests', test_route_1.default);
    //get invalid request 
    app.get("*", function (req, res, next) {
        //let msg = `page not found \n${req.ip} tried to reach ${req.originalUrl}`;
        let meg = `Page not found. Tried to reach ${req.originalUrl}`;
        //throw new CustomHandler(400,msg);
    });
    // app.use(globalExceptionHandlerMiddleware);
};
exports.default = routes;
