// routes/categoriasRoutes.js
import express from "express";
import {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  eliminarCategoria
} from "../controllers/categoriasController.js";

const router = express.Router();

router.get("/", obtenerCategorias);
router.get("/:id", obtenerCategoria);
router.post("/", crearCategoria);
router.put("/:id", actualizarCategoria);
router.delete("/:id", eliminarCategoria);

export default router;
