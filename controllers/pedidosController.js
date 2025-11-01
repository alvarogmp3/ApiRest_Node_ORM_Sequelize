import { sequelize } from "../config/db.js";
import initModels from "../models/init-models.js";

const models = initModels(sequelize);

const { pedidos } = models;

export const getAll = async (req, res) => {
  try {
    const items = await pedidos.findAll({ include: [{ all: true, nested: true }] });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener Pedidos", error });
  }
};

export const getOne = async (req, res) => {
  try {
    const item = await pedidos.findByPk(req.params.id, { include: [{ all: true, nested: true }] });
    item ? res.json(item) : res.status(404).json({ mensaje: "No encontrado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener Pedidos", error });
  }
};

export const create = async (req, res) => {
  try {
    const nuevo = await pedidos.create(req.body, { include: [{ all: true }] });
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear Pedidos", error });
  }
};

export const update = async (req, res) => {
  try {
    const item = await pedidos.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.update(req.body);
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar Pedidos", error });
  }
};

export const remove = async (req, res) => {
  try {
    const item = await pedidos.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.destroy();
    res.json({ mensaje: "Pedidos eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar Pedidos", error });
  }
};
