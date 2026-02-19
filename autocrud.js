import fs from "fs";
import path from "path";

const config = {
    models: "./models",
    controllers: "./controllers",
    base: "./controllers/base",
    routes: "./routes",
    services: "./services"
};

// Crear carpetas si no existen
Object.values(config).forEach(dir => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); });

const files = fs.readdirSync(config.models).filter(f => f.endsWith(".js") && !["db.js", "init-models.js"].includes(f));

files.forEach(file => {
    const name = path.basename(file, ".js");

    // 1. Service (Versión con Auto-Init)
fs.writeFileSync(`${config.services}/${name}Service.js`, 
    `import * as models from "../models/${file}";
import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const getModel = () => {
    const m = models.default || models.${name} || Object.values(models)[0];
    // SI EL MODELO TIENE INIT Y NO HA SIDO INICIALIZADO, LO ENCENDEMOS
    if (m && typeof m.init === 'function' && !m.psalms) {
        try {
            m.init(sequelize, DataTypes);
        } catch (e) {
            // Si ya estaba inicializado, Sequelize puede quejarse, lo ignoramos
        }
    }
    return m;
};

const m = getModel();

export const getAll = async () => await m.findAll();
export const getById = async (id) => await m.findByPk(id);
export const create = async (d) => {
    if (!d || Object.keys(d).length === 0) throw new Error("Body vacío");
    return await m.create(d);
};
export const update = async (id, d) => { 
    const i = await m.findByPk(id); 
    return i ? await i.update(d) : null; 
};
export const remove = async (id) => { 
    const i = await m.findByPk(id); 
    return i ? await i.destroy() : null; 
};`);

    // 2. Base Controller (Con try/catch mejorado y validación de req.body)
    fs.writeFileSync(`${config.base}/${name}BaseController.js`, 
        `import * as s from "../../services/${name}Service.js";
export const listar = async (req, res) => { try { res.json(await s.getAll()); } catch (e) { res.status(500).json({error: e.message}); } };
export const obtener = async (req, res) => { try { const r = await s.getById(req.params.id); r ? res.json(r) : res.status(404).json({error: "No encontrado"}); } catch (e) { res.status(500).json({error: e.message}); } };
export const crear = async (req, res) => { 
    try { 
        if (!req.body || Object.keys(req.body).length === 0) return res.status(400).json({error: "Cuerpo vacío o método incorrecto"});
        res.status(201).json(await s.create(req.body)); 
    } catch (e) { res.status(500).json({error: e.message}); } 
};
export const actualizar = async (req, res) => { try { const r = await s.update(req.params.id, req.body); r ? res.json(r) : res.status(404).json({error: "No encontrado"}); } catch (e) { res.status(500).json({error: e.message}); } };
export const eliminar = async (req, res) => { try { const r = await s.remove(req.params.id); r ? res.json({success: true}) : res.status(404).json({error: "No encontrado"}); } catch (e) { res.status(500).json({error: e.message}); } };`);

    // 3. Final Controller (Mantiene consistencia)
    fs.writeFileSync(`${config.controllers}/${name}Controller.js`, 
        `import * as Base from "./base/${name}BaseController.js";
export const listar = Base.listar;
export const obtener = Base.obtener;
export const crear = Base.crear;
export const actualizar = Base.actualizar;
export const eliminar = Base.eliminar;`);

    // 4. Routes (Configuración estándar REST)
    fs.writeFileSync(`${config.routes}/${name}Routes.js`, 
        `import express from "express";
import * as c from "../controllers/${name}Controller.js";
const r = express.Router();
r.get("/", c.listar); 
r.get("/:id", c.obtener); 
r.post("/", c.crear); 
r.put("/:id", c.actualizar); 
r.delete("/:id", c.eliminar);
export default r;`);

    console.log(`✔ Estructura reforzada para: ${name}`);
});