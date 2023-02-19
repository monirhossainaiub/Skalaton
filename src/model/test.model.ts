import { DataTypes } from "sequelize";
import sequelize from "../manager/db.manager";
export interface ITest{
    id: number;
    name: string;
}

const Test = sequelize.define('test', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate:{
            notEmpty: false,
            len:{
                args:[1,20],
                msg: 'Please provide field within 1 to 15 characters.'
            }
        }
    }
});

export default Test;