import Clientes from "../models/clientes.js";
export const getAll = async () => await Clientes.findAll();
export const getById = async (id) => await Clientes.findByPk(id);
export const create = async (data) => await Clientes.create(data);
export const update = async (id, data) => {
    const item = await Clientes.findByPk(id);
    return item ? await item.update(data) : null;
};
export const remove = async (id) => {
    const item = await Clientes.findByPk(id);
    return item ? await item.destroy() : null;
};