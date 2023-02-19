"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_manager_1 = __importDefault(require("../manager/db.manager"));
const Test = db_manager_1.default.define('test', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: false,
            len: {
                args: [1, 20],
                msg: 'Please provide field within 1 to 15 characters.'
            }
        }
    }
});
exports.default = Test;
