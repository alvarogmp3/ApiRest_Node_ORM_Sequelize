import { sequelize } from "./config/db.js";
import initModels from "./models/init-models.js";

const models = initModels(sequelize);
const { productos } = models;

console.log("🧠 Base de datos actual:", sequelize.config.database);

try {
  await sequelize.authenticate();
  console.log("✅ Conectado correctamente");

  const resultado = await productos.findAll();
  console.log(`📦 ${resultado.length} productos encontrados`);
  console.log(resultado.map(p => p.dataValues));
} catch (err) {
  console.error("❌ Error:", err);
} finally {
  await sequelize.close();
}
