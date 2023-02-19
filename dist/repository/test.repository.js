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
const test_model_1 = __importDefault(require("../model/test.model"));
const Sequelize = require("sequelize");
class TestRepository {
    constructor() {
        this.connString = "";
    }
    static getInstance() {
        if (!this.testRepository) {
            this.testRepository = new TestRepository();
        }
        return this.testRepository;
    }
    getTests() {
        return __awaiter(this, void 0, void 0, function* () {
            let tests = [];
            try {
                tests = yield test_model_1.default.findAll();
            }
            catch (error) {
                console.log(error);
                throw new Error("error");
            }
            return tests;
        });
    }
    getTest(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let testdb = yield test_model_1.default.findByPk(id);
                return testdb;
            }
            catch (error) {
                throw error;
            }
        });
    }
    createTest(test) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(test);
                let testdb = yield test_model_1.default.create(test);
                return testdb;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateTest(test) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                let testdb = yield test_model_1.default.findByPk(test.id);
                if (testdb) {
                    result = yield test_model_1.default.update({ name: test.name }, { where: { id: test.id } });
                }
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteTest(test) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                let testdb = yield test_model_1.default.findByPk(test.id);
                if (testdb) {
                    result = yield test_model_1.default.destroy({ where: { id: test.id } });
                }
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = TestRepository;
