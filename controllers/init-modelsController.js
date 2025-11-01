
import { Init-models } from "../models/init-models.js";

export const getAll = async (req, res) => {
  const items = await Init-models.findAll();
  res.json(items);
};

export const getOne = async (req, res) => {
  const item = await Init-models.findByPk(req.params.id);
  item ? res.json(item) : res.status(404).json({ mensaje: "No encontrado" });
};

export const create = async (req, res) => {
  const nuevo = await Init-models.create(req.body);
  res.status(201).json(nuevo);
};

export const update = async (req, res) => {
  const item = await Init-models.findByPk(req.params.id);
  if (!item) return res.status(404).json({ mensaje: "No encontrado" });
  await item.update(req.body);
  res.json(item);
};

export const remove = async (req, res) => {
  const item = await Init-models.findByPk(req.params.id);
  if (!item) return res.status(404).json({ mensaje: "No encontrado" });
  await item.destroy();
  res.json({ mensaje: "Init-models eliminado correctamente" });
};
