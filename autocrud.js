import fs from "fs";
import path from "path";

const config = {
    models: "./models",
    controllers: "./controllers",
    base: "./controllers/base",
    routes: "./routes",
    services: "./services"
};

// Crear carpetas
Object.values(config).forEach(dir => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); });

const files = fs.readdirSync(config.models).filter(f => f.endsWith(".js") && !["db.js", "init-models.js"].includes(f));

files.forEach(file => {
    const name = path.basename(file, ".js"); // Mantiene el nombre exacto del archivo

    // 1. Service
    fs.writeFileSync(`${config.services}/${name}Service.js`, 
        `import m from "../models/${file}";
export const getAll = async () => await m.findAll();
export const getById = async (id) => await m.findByPk(id);
export const create = async (d) => await m.create(d);
export const update = async (id, d) => { const i = await m.findByPk(id); return i ? await i.update(d) : null; };
export const remove = async (id) => { const i = await m.findByPk(id); return i ? await i.destroy() : null; };`);

    // 2. Base Controller
    fs.writeFileSync(`${config.base}/${name}BaseController.js`, 
        `import * as s from "../../services/${name}Service.js";
export const listar = async (req, res) => { try { res.json(await s.getAll()); } catch (e) { res.status(500).json({error: e.message}); } };
export const obtener = async (req, res) => { try { res.json(await s.getById(req.params.id)); } catch (e) { res.status(500).json({error: e.message}); } };
export const crear = async (req, res) => { try { res.status(201).json(await s.create(req.body)); } catch (e) { res.status(500).json({error: e.message}); } };
export const actualizar = async (req, res) => { try { res.json(await s.update(req.params.id, req.body)); } catch (e) { res.status(500).json({error: e.message}); } };
export const eliminar = async (req, res) => { try { res.json(await s.remove(req.params.id)); } catch (e) { res.status(500).json({error: e.message}); } };`);

    // 3. Final Controller (Sobrescribe para asegurar consistencia)
    fs.writeFileSync(`${config.controllers}/${name}Controller.js`, 
        `import * as Base from "./base/${name}BaseController.js";
export const listar = Base.listar;
export const obtener = Base.obtener;
export const crear = Base.crear;
export const actualizar = Base.actualizar;
export const eliminar = Base.eliminar;`);

    // 4. Routes
    fs.writeFileSync(`${config.routes}/${name}Routes.js`, 
        `import express from "express";
import * as c from "../controllers/${name}Controller.js";
const r = express.Router();
r.get("/", c.listar); r.get("/:id", c.obtener); r.post("/", c.crear); r.put("/:id", c.actualizar); r.delete("/:id", c.eliminar);
export default r;`);

    console.log(`✔ Estructura completa para: ${name}`);
});