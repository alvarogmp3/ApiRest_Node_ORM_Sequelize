import { sequelize } from "../config/db.js";
import initModels from "../models/init-models.js";

const models = initModels(sequelize);

const { clientes } = models;

export const getAll = async (req, res) => {
  try {
    const items = await clientes.findAll({ include: [{ all: true, nested: true }] });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener Clientes", error });
  }
};

export const getOne = async (req, res) => {
  try {
    const item = await clientes.findByPk(req.params.id, { include: [{ all: true, nested: true }] });
    item ? res.json(item) : res.status(404).json({ mensaje: "No encontrado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener Clientes", error });
  }
};

export const create = async (req, res) => {
  try {
    const nuevo = await clientes.create(req.body, { include: [{ all: true }] });
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear Clientes", error });
  }
};

export const update = async (req, res) => {
  try {
    const item = await clientes.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.update(req.body);
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar Clientes", error });
  }
};

export const remove = async (req, res) => {
  try {
    const item = await clientes.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.destroy();
    res.json({ mensaje: "Clientes eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar Clientes", error });
  }
};
