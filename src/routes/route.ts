
import { RoutesInput } from "../type/type";
import {Request, Response} from "express";
import authRouter from './auth.route';
import viewRouter from './view.route';
import testRouter from './test.route';

const BASE_URL = process.env.BASE_URL;

const routes = ({ app }: RoutesInput) => {

    // app.set('view engine', 'pug');
    // app.set('views', path.join(__dirname, 'views'));

    
    app.get('/set-cookie', (req:Request, res:Response) => {
        console.log('cookie is working')
        res.cookie('myCookie', 'Hello World!', { maxAge: 900000, httpOnly: true });
        res.send('Cookie has been set');
      });
      
    app.get("/", (requst: Request, response: Response) => {
        response.send("Hello typescript with node.js");
    });

    //all router will be registered here
    app.use('/user', viewRouter);
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