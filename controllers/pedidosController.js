// controllers/pedidosController.js
import { sequelize } from "../config/db.js";
import pedidos from "../models/pedidos.js";
import { DataTypes } from "sequelize";

// 🔧 Inicializamos el modelo con la conexión activa
const Pedido = pedidos.init(sequelize, DataTypes);

// CREATE
export const crearPedido = async (req, res) => {
  try {
    const nuevo = await Pedido.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear pedido", error });
  }
};

// READ (todos)
export const obtenerPedidos = async (req, res) => {
  try {
    const lista = await Pedido.findAll();
    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener pedidos", error });
  }
};

// READ (uno)
export const obtenerPedido = async (req, res) => {
  try {
    const item = await Pedido.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener pedido", error });
  }
};

// UPDATE
export const actualizarPedido = async (req, res) => {
  try {
    const item = await Pedido.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.update(req.body);
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar pedido", error });
  }
};

// DELETE
export const eliminarPedido = async (req, res) => {
  try {
    const item = await Pedido.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.destroy();
    res.json({ mensaje: "Pedido eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar pedido", error });
  }
};
