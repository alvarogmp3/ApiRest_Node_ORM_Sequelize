// controllers/clientesController.js
import { sequelize } from "../config/db.js";
import clientes from "../models/clientes.js";
import { DataTypes } from "sequelize";

// 🔧 Inicializamos el modelo con la conexión activa
const Cliente = clientes.init(sequelize, DataTypes);

// CREATE
export const crearCliente = async (req, res) => {
  try {
    const nuevo = await Cliente.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear cliente", error });
  }
};

// READ (todos)
export const obtenerClientes = async (req, res) => {
  try {
    const lista = await Cliente.findAll();
    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener clientes", error });
  }
};

// READ (uno)
export const obtenerCliente = async (req, res) => {
  try {
    const item = await Cliente.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener cliente", error });
  }
};

// UPDATE
export const actualizarCliente = async (req, res) => {
  try {
    const item = await Cliente.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.update(req.body);
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar cliente", error });
  }
};

// DELETE
export const eliminarCliente = async (req, res) => {
  try {
    const item = await Cliente.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.destroy();
    res.json({ mensaje: "Cliente eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar cliente", error });
  }
};
