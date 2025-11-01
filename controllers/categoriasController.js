import { sequelize } from "../config/db.js";
import initModels from "../models/init-models.js";

const models = initModels(sequelize);

const { categorias } = models;

export const getAll = async (req, res) => {
  try {
    const items = await categorias.findAll({ include: [{ all: true, nested: true }] });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener Categorias", error });
  }
};

export const getOne = async (req, res) => {
  try {
    const item = await categorias.findByPk(req.params.id, { include: [{ all: true, nested: true }] });
    item ? res.json(item) : res.status(404).json({ mensaje: "No encontrado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener Categorias", error });
  }
};

export const create = async (req, res) => {
  try {
    const nuevo = await categorias.create(req.body, { include: [{ all: true }] });
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear Categorias", error });
  }
};

export const update = async (req, res) => {
  try {
    const item = await categorias.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.update(req.body);
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar Categorias", error });
  }
};

export const remove = async (req, res) => {
  try {
    const item = await categorias.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.destroy();
    res.json({ mensaje: "Categorias eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar Categorias", error });
  }
};
