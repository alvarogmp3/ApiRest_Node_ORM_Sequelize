import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

class log extends Model {}
log.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    log: { type: DataTypes.STRING, allowNull: false }
}, { 
    sequelize, 
    tableName: 'logs', 
    timestamps: false,
    modelName: 'log'
});

export default log;