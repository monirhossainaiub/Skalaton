import express, {Application, Router} from "express";
import "dotenv/config";
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
import Routers from "./routes/route";
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

import sequelize from './manager/db.manager';

const app: Application = express();

app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, 'views'));
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
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
app.use(express.json({ limit: '10kb' })); 

// Data sanitization against XSS // like html tag and javascript <><>
app.use(xss());
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
// Prevent parameter pollution 
app.use(hpp())
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
    "localhost",
    (): void => {
        //console.log(process.env.PORT)
        console.log(`Server running here http://${process.env.HOST}:${process.env.PORT}`);
    }
);

Routers({ app }); 

// sequelize.sync().then( () => {});
//sequelize.sync({force:true});
sequelize.sync();


//docker run --name postgres_app -e POSTGRES_PASSWORD=docker -e POSTGRES_USER=root -e POSTGRES_DB=app_db -p 5432:5432 -d postgres
