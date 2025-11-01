import * as Producto from "../models/producto.js";

export const getAll = async (req, res) => {
  try {
    
    const items = await Producto.findAll?.({ include: [{ all: true, nested: true }] }) || [];
    console.log(items);
    res.json(items);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener Producto", error });
  }
};

export const getOne = async (req, res) => {
  try {
    const item = await Producto.findByPk?.(req.params.id, { include: [{ all: true, nested: true }] });
    item ? res.json(item) : res.status(404).json({ mensaje: "No encontrado" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener Producto", error });
  }
};

export const create = async (req, res) => {
  try {
    const nuevo = await Producto.create?.(req.body, { include: [{ all: true }] });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear Producto", error });
  }
};

export const update = async (req, res) => {
  try {
    const item = await Producto.findByPk?.(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.update(req.body);
    res.json(item);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar Producto", error });
  }
};

export const remove = async (req, res) => {
  try {
    const item = await Producto.findByPk?.(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.destroy();
    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar Producto", error });
  }
};
