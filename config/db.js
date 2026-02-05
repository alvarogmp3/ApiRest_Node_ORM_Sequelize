import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("almacen", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  define: {
    timestamps: false
  }
});