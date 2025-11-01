// routes/pedidosRoutes.js
import express from "express";
import {
  crearPedido,
  obtenerPedidos,
  obtenerPedido,
  actualizarPedido,
  eliminarPedido
} from "../controllers/pedidosController.js";

const router = express.Router();

router.get("/", obtenerPedidos);
router.get("/:id", obtenerPedido);
router.post("/", crearPedido);
router.put("/:id", actualizarPedido);
router.delete("/:id", eliminarPedido);

export default router;
