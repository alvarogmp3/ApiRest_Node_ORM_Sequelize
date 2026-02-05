import express from "express";
import * as Controller from "../controllers/categoriasController.js";
const router = express.Router();
router.get("/", Controller.listar);
router.get("/:id", Controller.obtener);
router.post("/", Controller.crear);
router.put("/:id", Controller.actualizar);
router.delete("/:id", Controller.eliminar);
export default router;