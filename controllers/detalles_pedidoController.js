import { sequelize } from "../config/db.js";
import initModels from "../models/init-models.js";

const models = initModels(sequelize);

const { detalles_pedido } = models;

export const getAll = async (req, res) => {
  try {
    const items = await detalles_pedido.findAll({ include: [{ all: true, nested: true }] });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener Detalles_pedido", error });
  }
};

export const getOne = async (req, res) => {
  try {
    const item = await detalles_pedido.findByPk(req.params.id, { include: [{ all: true, nested: true }] });
    item ? res.json(item) : res.status(404).json({ mensaje: "No encontrado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener Detalles_pedido", error });
  }
};

export const create = async (req, res) => {
  try {
    const nuevo = await detalles_pedido.create(req.body, { include: [{ all: true }] });
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear Detalles_pedido", error });
  }
};

export const update = async (req, res) => {
  try {
    const item = await detalles_pedido.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.update(req.body);
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar Detalles_pedido", error });
  }
};

export const remove = async (req, res) => {
  try {
    const item = await detalles_pedido.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.destroy();
    res.json({ mensaje: "Detalles_pedido eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar Detalles_pedido", error });
  }
};
