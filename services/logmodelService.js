import Logmodel from "../models/LogModel.js";
export const getAll = async () => await Logmodel.findAll();
export const getById = async (id) => await Logmodel.findByPk(id);
export const create = async (data) => await Logmodel.create(data);
export const update = async (id, data) => {
    const item = await Logmodel.findByPk(id);
    return item ? await item.update(data) : null;
};
export const remove = async (id) => {
    const item = await Logmodel.findByPk(id);
    return item ? await item.destroy() : null;
};