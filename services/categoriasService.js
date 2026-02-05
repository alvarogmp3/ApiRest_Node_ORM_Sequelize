import Categorias from "../models/categorias.js";
export const getAll = async () => await Categorias.findAll();
export const getById = async (id) => await Categorias.findByPk(id);
export const create = async (data) => await Categorias.create(data);
export const update = async (id, data) => {
    const item = await Categorias.findByPk(id);
    return item ? await item.update(data) : null;
};
export const remove = async (id) => {
    const item = await Categorias.findByPk(id);
    return item ? await item.destroy() : null;
};