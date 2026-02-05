import { DataTypes } from "sequelize";
import db from "../database/db.js";

const LogModel = db.define('logs', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    log: { 
        type: DataTypes.STRING 
    }
});

export default LogModel;