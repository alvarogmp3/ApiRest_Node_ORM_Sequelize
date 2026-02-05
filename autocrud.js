import fs from "fs";
import path from "path";

const modelsPath = "./models";
const controllersBasePath = "./controllers/base"; // Requisito 2.3 y pág 12
const routesPath = "./routes";
const servicesPath = "./services"; // Requisito 2.4

// Crear carpetas según pág 12 del PDF
fs.mkdirSync(controllersBasePath, { recursive: true });
fs.mkdirSync(routesPath, { recursive: true });
fs.mkdirSync(servicesPath, { recursive: true });

const models = fs.readdirSync(modelsPath).filter(f => f.endsWith(".js") && f !== "init-models.js" && f !== "db.js");

for (const modelFile of models) {
    // CORRECCIÓN: Limpiar el nombre para evitar "productos.jsRoutes.js"
    const modelName = path.basename(modelFile, ".js").toLowerCase();
    const modelClass = modelName.charAt(0).toUpperCase() + modelName.slice(1);

    // 1. GENERAR SERVICIO (Capa de datos - Requisito 2.4)
    const serviceContent = `import ${modelClass} from "../models/${modelFile}";
export const getAll = async () => await ${modelClass}.findAll();
export const getById = async (id) => await ${modelClass}.findByPk(id);
export const create = async (data) => await ${modelClass}.create(data);
export const update = async (id, data) => {
    const item = await ${modelClass}.findByPk(id);
    return item ? await item.update(data) : null;
};
export const remove = async (id) => {
    const item = await ${modelClass}.findByPk(id);
    return item ? await item.destroy() : null;
};`;
    fs.writeFileSync(`${servicesPath}/${modelName}Service.js`, serviceContent);

    // 2. GENERAR CONTROLADOR BASE (Capa genérica - Pág 11 y 12)
    const controllerBaseContent = `import * as Service from "../../services/${modelName}Service.js";
export const listar = async (req, res) => res.json(await Service.getAll());
export const obtener = async (req, res) => res.json(await Service.getById(req.params.id));
export const crear = async (req, res) => res.status(201).json(await Service.create(req.body));
export const actualizar = async (req, res) => res.json(await Service.update(req.params.id, req.body));
export const eliminar = async (req, res) => res.json(await Service.remove(req.params.id));`;
    fs.writeFileSync(`${controllersBasePath}/${modelName}BaseController.js`, controllerBaseContent);

    // 3. GENERAR RUTA (Apunta al controlador que TÚ ya tienes - Pág 12)
    const routeContent = `import express from "express";
import * as Controller from "../controllers/${modelName}Controller.js";
const router = express.Router();
router.get("/", Controller.listar);
router.get("/:id", Controller.obtener);
router.post("/", Controller.crear);
router.put("/:id", Controller.actualizar);
router.delete("/:id", Controller.eliminar);
export default router;`;
    fs.writeFileSync(`${routesPath}/${modelName}Routes.js`, routeContent);

    console.log(`✔ Estructura generada para: ${modelName}`);
}