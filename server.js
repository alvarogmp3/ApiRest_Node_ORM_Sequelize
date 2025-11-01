import express from "express";
import { sequelize } from "./config/db.js";
import initModels from "./models/init-models.js";
import fs from "fs";

const app = express();
app.use(express.json());

// Inicializamos los modelos una sola vez
const models = initModels(sequelize);
app.locals.models = models;

// Probar conexión
try {
  await sequelize.authenticate();
  console.log("✅ Conectado a la base de datos:", sequelize.config.database);
} catch (error) {
  console.error("❌ Error al conectar a la base de datos:", error);
}

// Cargar rutas automáticamente
const routeFiles = fs.readdirSync("./routes").filter(f => f.endsWith("Routes.js"));
for (const file of routeFiles) {
  const route = (await import(`./routes/${file}`)).default;
  const basePath = `/api/${file.replace("Routes.js", "")}`;
  app.use(basePath, route);
  console.log(`📡 Ruta cargada: ${basePath}`);
}

app.listen(3000, () => console.log("🚀 Servidor ejecutándose en http://localhost:3000"));
