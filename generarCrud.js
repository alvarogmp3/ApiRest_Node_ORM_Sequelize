import fs from "fs";
import path from "path";

const controllersPath = "./controllers";
const routesPath = "./routes";
const initModelsPath = "./models/init-models.js";

fs.mkdirSync(controllersPath, { recursive: true });
fs.mkdirSync(routesPath, { recursive: true });

// Cabecera común que usarán todos los controladores
const commonHeader = `
import { sequelize } from "../config/db.js";
import initModels from "../models/init-models.js";

const models = initModels(sequelize);
`;

// Capitalizar primera letra
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

// 1️⃣ Comprobar que init-models.js existe
if (!fs.existsSync(initModelsPath)) {
  console.error("❌ No se encontró el archivo models/init-models.js");
  process.exit(1);
}

// 2️⃣ Leer contenido y extraer los nombres de modelos del return { ... }
const initModelsFile = fs.readFileSync(initModelsPath, "utf8");
const returnBlockMatch = initModelsFile.match(/return\s*{([^}]+)}/);
if (!returnBlockMatch) {
  console.error("❌ No se detectaron modelos en init-models.js (no se encontró el bloque return {...})");
  process.exit(1);
}

const modelNames = returnBlockMatch[1]
  .split(",")
  .map(m => m.trim().replace(/[\s\n\r]+/g, ""))
  .filter(Boolean);

if (modelNames.length === 0) {
  console.error("❌ No se detectaron modelos en init-models.js");
  process.exit(1);
}

console.log(`📦 Modelos detectados: ${modelNames.join(", ")}`);

// 3️⃣ Generar CRUD para cada modelo detectado
for (const modelName of modelNames) {
  const modelVar = modelName;
  const className = capitalize(modelName);

  // Controlador
  const controllerContent = `
${commonHeader}
const { ${modelVar} } = models;

export const getAll = async (req, res) => {
  try {
    const items = await ${modelVar}.findAll({ include: [{ all: true, nested: true }] });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener ${className}", error });
  }
};

export const getOne = async (req, res) => {
  try {
    const item = await ${modelVar}.findByPk(req.params.id, { include: [{ all: true, nested: true }] });
    item ? res.json(item) : res.status(404).json({ mensaje: "No encontrado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener ${className}", error });
  }
};

export const create = async (req, res) => {
  try {
    const nuevo = await ${modelVar}.create(req.body, { include: [{ all: true }] });
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear ${className}", error });
  }
};

export const update = async (req, res) => {
  try {
    const item = await ${modelVar}.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.update(req.body);
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar ${className}", error });
  }
};

export const remove = async (req, res) => {
  try {
    const item = await ${modelVar}.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.destroy();
    res.json({ mensaje: "${className} eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar ${className}", error });
  }
};
`;

  fs.writeFileSync(`${controllersPath}/${modelName}Controller.js`, controllerContent.trimStart());

  // Rutas
  const routesContent = `
import express from "express";
import { getAll, getOne, create, update, remove } from "../controllers/${modelName}Controller.js";
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
`;

  fs.writeFileSync(`${routesPath}/${modelName}Routes.js`, routesContent.trimStart());
  console.log(`✅ CRUD generado correctamente para: ${className}`);
}
