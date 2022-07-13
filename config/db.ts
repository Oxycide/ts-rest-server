import {DataTypes, Sequelize} from "sequelize";

const db = new Sequelize('test', 'root','root', {
        dialect: 'sqlite',
        storage: '../db.sqlite',
        logging: false,
    }
);



export default db;


