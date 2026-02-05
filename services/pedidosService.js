import Pedidos from "../models/pedidos.js";
export const getAll = async () => await Pedidos.findAll();
export const getById = async (id) => await Pedidos.findByPk(id);
export const create = async (data) => await Pedidos.create(data);
export const update = async (id, data) => {
    const item = await Pedidos.findByPk(id);
    return item ? await item.update(data) : null;
};
export const remove = async (id) => {
    const item = await Pedidos.findByPk(id);
    return item ? await item.destroy() : null;
};