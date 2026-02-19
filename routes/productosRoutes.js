import express from "express";
import * as c from "../controllers/productosController.js";
const r = express.Router();
r.get("/", c.listar); 
r.get("/:id", c.obtener); 
r.post("/", c.crear); 
r.put("/:id", c.actualizar); 
r.delete("/:id", c.eliminar);
export default r;