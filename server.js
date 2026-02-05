// server.js
import express from "express";
import { sequelize } from "./config/db.js";

// 📦 Importar las rutas generadas por el AutoCRUD
// Nota: Estas rutas apuntan a tus controladores en /controllers/
import productosRoutes from "./routes/productosRoutes.js";
import categoriasRoutes from "./routes/categoriasRoutes.js";
import clientesRoutes from "./routes/clientesRoutes.js";
import pedidosRoutes from "./routes/pedidosRoutes.js";
import detalles_pedidoRoutes from "./routes/detalles_pedidoRoutes.js";
import logRoutes from "./routes/logRoutes.js"; // ✅ Ruta de la tabla obligatoria 'logs'

const app = express();
app.use(express.json());

// 🔌 Verificar conexión y sincronizar la base de datos
// Sequelize creará las tablas si no existen según tus modelos
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión establecida con la base de datos:", sequelize.config.database);
    
    // 'alter: true' ajusta las tablas existentes sin borrar los datos
    await sequelize.sync({ alter: true });
    console.log("✅ Tablas sincronizadas correctamente.");
  } catch (error) {
    console.error("❌ Error al sincronizar las tablas:", error);
  }
})();

// 🚀 Definición de Endpoints (Rutas principales)
app.use("/productos", productosRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/clientes", clientesRoutes);
app.use("/pedidos", pedidosRoutes);
app.use("/detalles_pedido", detalles_pedidoRoutes);
app.use("/logs", logRoutes); // ✅ Endpoint para la gestión de logs

// 🌍 Arrancar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});