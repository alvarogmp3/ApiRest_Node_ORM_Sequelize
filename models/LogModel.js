import { DataTypes } from "sequelize";
import db from "../config/db.js";

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