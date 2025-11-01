// controllers/categoriasController.js
import { sequelize } from "../config/db.js";
import categorias from "../models/categorias.js";
import { DataTypes } from "sequelize";

// 🔧 Inicializamos el modelo con la conexión activa
const Categoria = categorias.init(sequelize, DataTypes);

// CREATE
export const crearCategoria = async (req, res) => {
  try {
    const nuevo = await Categoria.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear categoria", error });
  }
};

// READ (todos)
export const obtenerCategorias = async (req, res) => {
  try {
    const lista = await Categoria.findAll();
    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener categorias", error });
  }
};

// READ (uno)
export const obtenerCategoria = async (req, res) => {
  try {
    const item = await Categoria.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener categoria", error });
  }
};

// UPDATE
export const actualizarCategoria = async (req, res) => {
  try {
    const item = await Categoria.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.update(req.body);
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar categoria", error });
  }
};

// DELETE
export const eliminarCategoria = async (req, res) => {
  try {
    const item = await Categoria.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.destroy();
    res.json({ mensaje: "Categoria eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar categoria", error });
  }
};
