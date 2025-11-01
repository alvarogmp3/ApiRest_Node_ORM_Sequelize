// routes/detalles_pedidoRoutes.js
import express from "express";
import {
  crearDetalles_pedid,
  obtenerDetalles_pedido,
  obtenerDetalles_pedid,
  actualizarDetalles_pedid,
  eliminarDetalles_pedid
} from "../controllers/detalles_pedidoController.js";

const router = express.Router();

router.get("/", obtenerDetalles_pedido);
router.get("/:id", obtenerDetalles_pedid);
router.post("/", crearDetalles_pedid);
router.put("/:id", actualizarDetalles_pedid);
router.delete("/:id", eliminarDetalles_pedid);

export default router;
