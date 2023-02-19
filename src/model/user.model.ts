import { DataTypes } from "sequelize";
import sequelize from "../manager/db.manager";
export interface IUser{
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    mail: string;
    token: string;
    passwordChangedAt?: Date | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | null;
}

const User = sequelize.define('user', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate:{
            notEmpty: false,
            len:{
                args:[1,15],
                msg: 'Please provide field within 1 to 15 characters.'
            }
        }
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate:{
            notEmpty: false,
            len:{
                args:[1,15],
                msg: 'Please provide field within 1 to 15 characters.'
            }
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: false,
            len:{
                args:[1,25],
                msg: 'Please provide field within 1 to 25 characters.'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passwordChangedAt:{
        type: DataTypes.DATE,
        allowNull: true,
    },
    passwordResetToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    passwordResetExpires: { 
        type: DataTypes.DATE,
        allowNull: true,
    }
});

export default User;