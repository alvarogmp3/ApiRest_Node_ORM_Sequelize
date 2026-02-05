import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

class productos extends Model {}

productos.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2)
  },
  stock: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize, // Esto es OBLIGATORIO
  modelName: 'productos',
  tableName: 'productos', // Asegúrate que se llame así en tu MySQL
  timestamps: false
});

export default productos;