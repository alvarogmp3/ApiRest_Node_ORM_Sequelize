// autocrud.js
import fs from "fs";
import path from "path";

const modelsPath = "./models";
const controllersPath = "./controllers";
const routesPath = "./routes";

fs.mkdirSync(controllersPath, { recursive: true });
fs.mkdirSync(routesPath, { recursive: true });

// Filtramos solo los modelos (sin incluir init-models.js)
const models = fs.readdirSync(modelsPath)
  .filter(f => f.endsWith(".js") && f !== "init-models.js");

for (const modelFile of models) {
  const modelName = path.basename(modelFile, ".js"); // ejemplo: productos
  const modelClass = modelName.charAt(0).toUpperCase() + modelName.slice(1); // Productos
  const singular = modelName.replace(/s$/, ""); // producto, cliente, pedido, etc.

  // ---------- CONTROLADOR ----------
  const controllerContent = `// controllers/${modelName}Controller.js
import { sequelize } from "../config/db.js";
import ${modelName} from "../models/${modelFile}";
import { DataTypes } from "sequelize";

// 🔧 Inicializamos el modelo con la conexión activa
const ${modelClass.slice(0, -1)} = ${modelName}.init(sequelize, DataTypes);

// CREATE
export const crear${modelClass.slice(0, -1)} = async (req, res) => {
  try {
    const nuevo = await ${modelClass.slice(0, -1)}.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear ${singular}", error });
  }
};

// READ (todos)
export const obtener${modelClass} = async (req, res) => {
  try {
    const lista = await ${modelClass.slice(0, -1)}.findAll();
    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener ${modelName}", error });
  }
};

// READ (uno)
export const obtener${modelClass.slice(0, -1)} = async (req, res) => {
  try {
    const item = await ${modelClass.slice(0, -1)}.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener ${singular}", error });
  }
};

// UPDATE
export const actualizar${modelClass.slice(0, -1)} = async (req, res) => {
  try {
    const item = await ${modelClass.slice(0, -1)}.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.update(req.body);
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar ${singular}", error });
  }
};

// DELETE
export const eliminar${modelClass.slice(0, -1)} = async (req, res) => {
  try {
    const item = await ${modelClass.slice(0, -1)}.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.destroy();
    res.json({ mensaje: "${modelClass.slice(0, -1)} eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar ${singular}", error });
  }
};
`;

  fs.writeFileSync(`${controllersPath}/${modelName}Controller.js`, controllerContent);

  // ---------- RUTA ----------
  const routeContent = `// routes/${modelName}Routes.js
import express from "express";
import {
  crear${modelClass.slice(0, -1)},
  obtener${modelClass},
  obtener${modelClass.slice(0, -1)},
  actualizar${modelClass.slice(0, -1)},
  eliminar${modelClass.slice(0, -1)}
} from "../controllers/${modelName}Controller.js";

const router = express.Router();

router.get("/", obtener${modelClass});
router.get("/:id", obtener${modelClass.slice(0, -1)});
router.post("/", crear${modelClass.slice(0, -1)});
router.put("/:id", actualizar${modelClass.slice(0, -1)});
router.delete("/:id", eliminar${modelClass.slice(0, -1)});

export default router;
`;

  fs.writeFileSync(`${routesPath}/${modelName}Routes.js`, routeContent);
  console.log(`✅ CRUD generado para: ${modelName}`);
}

console.log("🎉 Todos los controladores y rutas han sido generados correctamente.");
