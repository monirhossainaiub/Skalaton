"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = __importDefault(require("./auth.route"));
const view_route_1 = __importDefault(require("./view.route"));
const test_route_1 = __importDefault(require("./test.route"));
const BASE_URL = process.env.BASE_URL;
const routes = ({ app }) => {
    // app.set('view engine', 'pug');
    // app.set('views', path.join(__dirname, 'views'));
    app.get('/set-cookie', (req, res) => {
        console.log('cookie is working');
        res.cookie('myCookie', 'Hello World!', { maxAge: 900000, httpOnly: true });
        res.send('Cookie has been set');
    });
    app.get("/", (requst, response) => {
        response.send("Hello typescript with node.js");
    });
    //all router will be registered here
    app.use('/user', view_route_1.default);
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
