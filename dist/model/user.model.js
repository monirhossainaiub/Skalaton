"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_manager_1 = __importDefault(require("../manager/db.manager"));
const User = db_manager_1.default.define('user', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: false,
            len: {
                args: [1, 15],
                msg: 'Please provide field within 1 to 15 characters.'
            }
        }
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: false,
            len: {
                args: [1, 15],
                msg: 'Please provide field within 1 to 15 characters.'
            }
        }
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: false,
            len: {
                args: [1, 25],
                msg: 'Please provide field within 1 to 25 characters.'
            }
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    passwordChangedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    passwordResetToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    passwordResetExpires: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    }
});
exports.default = User;
