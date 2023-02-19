"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const route_1 = __importDefault(require("./routes/route"));
const db_manager_1 = __importDefault(require("./manager/db.manager"));
const app = (0, express_1.default)();
// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());
// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);
// Body parser, reading data from body into req.body
app.use(express_1.default.json({ limit: '10kb' }));
// Data sanitization against XSS // like html tag and javascript <><>
app.use(xss());
// Prevent parameter pollution 
app.use(hpp());
// app.use(
//     hpp({
//       whitelist: [
//         'duration',
//         'ratingsQuantity',
//         'ratingsAverage',
//         'maxGroupSize',
//         'difficulty',
//         'price'
//       ]
//     })
//   );
const expressServer = app.listen(
// process.env.PORT,
8080, 
//process.env.HOST,
"localhost", () => {
    //console.log(process.env.PORT)
    console.log(`Server running here http://${process.env.HOST}:${process.env.PORT}`);
});
(0, route_1.default)({ app });
// sequelize.sync().then( () => {});
//sequelize.sync({force:true});
db_manager_1.default.sync();
//docker run --name postgres_app -e POSTGRES_PASSWORD=docker -e POSTGRES_USER=root -e POSTGRES_DB=app_db -p 5432:5432 -d postgres
