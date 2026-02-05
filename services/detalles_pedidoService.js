import m from "../models/detalles_pedido.js";
export const getAll = async () => await m.findAll();
export const getById = async (id) => await m.findByPk(id);
export const create = async (d) => await m.create(d);
export const update = async (id, d) => { const i = await m.findByPk(id); return i ? await i.update(d) : null; };
export const remove = async (id) => { const i = await m.findByPk(id); return i ? await i.destroy() : null; };