import * as models from "../models/alvaroGarcia.js";
import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const getModel = () => {
    const m = models.default || models.alvaroGarcia || Object.values(models)[0];
    // SI EL MODELO TIENE INIT Y NO HA SIDO INICIALIZADO, LO ENCENDEMOS
    if (m && typeof m.init === 'function' && !m.psalms) {
        try {
            m.init(sequelize, DataTypes);
        } catch (e) {
            // Si ya estaba inicializado, Sequelize puede quejarse, lo ignoramos
        }
    }
    return m;
};

const m = getModel();

export const getAll = async () => await m.findAll();
export const getById = async (id) => await m.findByPk(id);
export const create = async (d) => {
    if (!d || Object.keys(d).length === 0) throw new Error("Body vacío");
    return await m.create(d);
};
export const update = async (id, d) => { 
    const i = await m.findByPk(id); 
    return i ? await i.update(d) : null; 
};
export const remove = async (id) => { 
    const i = await m.findByPk(id); 
    return i ? await i.destroy() : null; 
};