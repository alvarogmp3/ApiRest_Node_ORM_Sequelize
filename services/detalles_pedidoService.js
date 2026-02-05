import Detalles_pedido from "../models/detalles_pedido.js";
export const getAll = async () => await Detalles_pedido.findAll();
export const getById = async (id) => await Detalles_pedido.findByPk(id);
export const create = async (data) => await Detalles_pedido.create(data);
export const update = async (id, data) => {
    const item = await Detalles_pedido.findByPk(id);
    return item ? await item.update(data) : null;
};
export const remove = async (id) => {
    const item = await Detalles_pedido.findByPk(id);
    return item ? await item.destroy() : null;
};