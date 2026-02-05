import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { sequelize } from './config/db.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routesPath = './routes';
if (fs.existsSync(routesPath)) {
    const routeFiles = fs.readdirSync(routesPath);
    for (const file of routeFiles) {
        if (file.endsWith('Routes.js')) {
            const routeModule = await import(`./routes/${file}`);
            const endpoint = `/${file.replace('Routes.js', '')}`;
            app.use(endpoint, routeModule.default);
            console.log(`🚀 Ruta activa: ${endpoint}`);
        }
    }
}

const PORT = 3000;
app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log(`\n✅ Servidor en http://localhost:${PORT}`);
    } catch (error) {
        console.error('❌ Error de conexión:', error.message);
    }
});