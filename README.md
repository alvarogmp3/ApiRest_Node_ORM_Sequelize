# 🧩 API REST con Node.js, Sequelize y MySQL

Este proyecto se utiliza en clase como ejemplo práctico para aprender el desarrollo de **APIs RESTful** utilizando **Node.js**, el **ORM Sequelize** y una base de datos **MySQL**.

El objetivo principal es comprender cómo se estructuran las capas de un proyecto backend moderno, cómo se conectan los modelos con la base de datos mediante un ORM y cómo se implementan las operaciones CRUD (Crear, Leer, Actualizar y Borrar) en diferentes entidades relacionadas.

---

## 🧱 Tecnologías utilizadas

- **Node.js** → Entorno de ejecución para JavaScript en el servidor.  
- **Express.js** → Framework minimalista para crear servidores HTTP y definir rutas.  
- **Sequelize ORM** → Mapeo objeto-relacional para conectar Node.js con MySQL de forma sencilla.  
- **MySQL** → Sistema de gestión de bases de datos relacional.  

---

## ⚙️ Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/usuario/api-rest-sequelize.git
   cd api-rest-sequelize
   ```

2. Instalar las dependencias:
   ```bash
   npm install
   ```

3. Configurar la conexión a la base de datos en:
   ```
   /config/db.js
   ```
   Ejemplo:
   ```js
   import { Sequelize } from "sequelize";

   export const sequelize = new Sequelize("api_rest_db", "root", "", {
     host: "localhost",
     dialect: "mysql",
     logging: false
   });
   ```

4. Ejecutar el servidor:
   ```bash
   npm run dev
   ```

---

## 🧩 Estructura del proyecto

```
📦 ApiRest_Node_ORM_Sequelize
 ├── config/
 │   └── db.js                # Conexión a MySQL
 ├── models/                  # Modelos ORM Sequelize (una clase por tabla)
 ├── controllers/             # Controladores CRUD (lógica de negocio)
 ├── routes/                  # Rutas Express (endpoints REST)
 ├── server.js                # Servidor principal
 ├── autocrud.js              # Generador automático de controladores y rutas
 ├── package.json
 └── README.md
```

---

## 🧠 Conceptos que veremos en clase

### 🔹 Node.js y Express
- Creación de un servidor básico con Express.
- Configuración de rutas y middlewares.
- Manejo de peticiones HTTP (GET, POST, PUT, DELETE).

### 🔹 ORM Sequelize
- Conexión entre modelos y tablas de MySQL.
- Creación de entidades (`sequelize-auto`).
- Relaciones entre tablas (1:N, N:N, FK).
- Sincronización automática de tablas (`sequelize.sync()`).
- Uso de métodos ORM (`findAll`, `create`, `update`, `destroy`).

### 🔹 MySQL
- Creación de base de datos y tablas.
- Relaciones mediante claves foráneas.
- Consulta y manipulación de datos desde la API.

---

## 🧪 Ejecución y pruebas

El servidor se ejecuta por defecto en:

```
http://localhost:3000
```

Rutas disponibles (ejemplos):

| Entidad | Método | Endpoint |
|----------|---------|-----------|
| Productos | GET | `/api/productos` |
| Categorías | GET | `/api/categorias` |
| Clientes | GET | `/api/clientes` |
| Pedidos | GET | `/api/pedidos` |
| Detalles Pedido | GET | `/api/detalles_pedido` |

Puedes probar la API con **Postman** o **Thunder Client** (extensión de VS Code).

---

## 🎯 Objetivo educativo

Este proyecto servirá como base para que el alumnado:
- Comprenda la estructura MVC en un entorno Node.js.
- Practique la comunicación entre una API y una base de datos relacional.
- Experimente con la automatización de código (autocrud).
- Aprenda a trabajar con ORM para abstraer las consultas SQL.

---

✍️ **Autor:**  
Carlos Basulto Pardo — Profesor de Desarrollo de Aplicaciones Multiplataforma y Web  
📍 EUSA Sevilla
