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
const user_repository_1 = __importDefault(require("../repository/user.repository"));
class AuthService {
    constructor() {
        this.userRepository = user_repository_1.default.getInstance();
    }
    static getInstance() {
        if (!this.authService) {
            this.authService = new AuthService();
        }
        return this.authService;
    }
    signInUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield this.userRepository.getUser(user);
                console.log('service user', result);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.createUser(user);
            }
            catch (error) {
                throw error;
            }
        });
    }
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield this.userRepository.forgotPassword(email);
                console.log(result);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getUserByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.getUserByToken(token);
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.updateUser(user);
            }
            catch (error) {
                throw error;
            }
        });
    }
    updatePassword(user, currentPassword, toChangePassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.updatePassword(user, currentPassword, toChangePassword);
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateMe(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.updateMe(user);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = AuthService;
