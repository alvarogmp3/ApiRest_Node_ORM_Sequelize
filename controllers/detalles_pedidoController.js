// controllers/detalles_pedidoController.js
import { sequelize } from "../config/db.js";
import detalles_pedido from "../models/detalles_pedido.js";
import { DataTypes } from "sequelize";

// 🔧 Inicializamos el modelo con la conexión activa
const Detalles_pedid = detalles_pedido.init(sequelize, DataTypes);

// CREATE
export const crearDetalles_pedid = async (req, res) => {
  try {
    const nuevo = await Detalles_pedid.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear detalles_pedido", error });
  }
};

// READ (todos)
export const obtenerDetalles_pedido = async (req, res) => {
  try {
    const lista = await Detalles_pedid.findAll();
    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener detalles_pedido", error });
  }
};

// READ (uno)
export const obtenerDetalles_pedid = async (req, res) => {
  try {
    const item = await Detalles_pedid.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener detalles_pedido", error });
  }
};

// UPDATE
export const actualizarDetalles_pedid = async (req, res) => {
  try {
    const item = await Detalles_pedid.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.update(req.body);
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar detalles_pedido", error });
  }
};

// DELETE
export const eliminarDetalles_pedid = async (req, res) => {
  try {
    const item = await Detalles_pedid.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.destroy();
    res.json({ mensaje: "Detalles_pedid eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar detalles_pedido", error });
  }
};
