import Productos from "../models/productos.js";
export const getAll = async () => await Productos.findAll();
export const getById = async (id) => await Productos.findByPk(id);
export const create = async (data) => await Productos.create(data);
export const update = async (id, data) => {
    const item = await Productos.findByPk(id);
    return item ? await item.update(data) : null;
};
export const remove = async (id) => {
    const item = await Productos.findByPk(id);
    return item ? await item.destroy() : null;
};