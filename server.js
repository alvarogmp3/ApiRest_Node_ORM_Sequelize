import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { sequelize } from './config/db.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Procesa JSON
app.use(express.urlencoded({ extended: true }));

// server.js - Bloque de carga de rutas mejorado
const routesPath = './routes';
if (fs.existsSync(routesPath)) {
    const routeFiles = fs.readdirSync(routesPath);
    for (const file of routeFiles) {
        if (file.endsWith('Routes.js')) {
            // Importamos el módulo
            const routeModule = await import(`./routes/${file}`);
            // El endpoint será el nombre del archivo sin 'Routes.js'
            const endpoint = `/${file.replace('Routes.js', '').toLowerCase()}`;
            
            // IMPORTANTE: Usamos .default porque exportamos con 'export default r'
            app.use(endpoint, routeModule.default);
            console.log(`🚀 Ruta activa: ${endpoint}`);
        }
    }
}

// MANEJADOR DE ERRORES GLOBAL (Evita el "SyntaxError" feo en consola)
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: "JSON mal formado. Revisa las comas y comillas en Thunder Client." });
    }
    console.error(err.stack);
    res.status(500).json({ error: "Error interno del servidor" });
});

const PORT = 3000;
app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log(`\n✅ Servidor en http://localhost:${PORT}`);
    } catch (error) {
        console.error('❌ Error de conexión:', error.message);
    }
});