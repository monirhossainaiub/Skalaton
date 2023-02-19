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
const test_repository_1 = __importDefault(require("../repository/test.repository"));
class TestService {
    constructor() {
        this.testRepository = test_repository_1.default.getInstance();
    }
    static getInstance() {
        if (!this.testService) {
            this.testService = new TestService();
        }
        return this.testService;
    }
    getTest(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield this.testRepository.getTest(id);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getTests() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tests = yield this.testRepository.getTests();
                return tests;
            }
            catch (error) {
                throw error;
            }
        });
    }
    createTest(test) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.testRepository.createTest(test);
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateTest(test) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const testdb = yield this.testRepository.updateTest(test);
                return testdb;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteTest(test) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const testdb = yield this.testRepository.deleteTest(test);
                return testdb;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = TestService;
