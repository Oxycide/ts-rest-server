import {Model, DataTypes } from "sequelize";
import db  from '../config/db';

const User = db.define('User', {
    name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
});



export default User;

