"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_service_1 = __importDefault(require("../service/test.service"));
var TestController;
(function (TestController) {
    TestController.createTest = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            // let test: any = {};
            // test.name = request.body.name;
            const testdb = yield test_service_1.default.getInstance().createTest(request.body);
            if (testdb) {
                response.status(201).json(testdb);
            }
        }
        catch (error) {
            console.log(error);
            response.status(500).json(error);
        }
    });
    TestController.getTests = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const tests = yield test_service_1.default.getInstance().getTests();
            if (tests) {
                response.status(200).json(tests);
            }
        }
        catch (error) {
            response.status(500).json(error);
        }
    });
    TestController.getTest = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const test = yield test_service_1.default.getInstance().getTest(parseInt(request.params.id));
            if (test) {
                response.status(200).json(test);
            }
        }
        catch (error) {
            response.status(500).json(error);
        }
    });
    TestController.updateTest = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const test = yield test_service_1.default.getInstance().updateTest(request.body);
            if (test) {
                response.status(200).json(test);
            }
        }
        catch (error) {
            response.status(500).json(error);
        }
    });
    TestController.deleteTest = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const test = yield test_service_1.default.getInstance().deleteTest(request.body);
            if (test) {
                response.status(200).json(test);
            }
        }
        catch (error) {
            response.status(500).json(error);
        }
    });
})(TestController || (TestController = {}));
exports.default = TestController;
