# 🧩 API REST con Node.js, Sequelize y MySQL

Este proyecto se utiliza como base educativa para aprender el desarrollo de **APIs RESTful** con **Node.js**, el **ORM Sequelize**, y **MySQL** como sistema de base de datos.  
Además, se estudian los **patrones de diseño** que permiten generar código de forma automática (autocrud) y mantener una estructura limpia basada en el modelo **MVC**.

---

## 🧱 Tecnologías utilizadas

- **Node.js** → Entorno de ejecución para JavaScript en el servidor.  
- **Express.js** → Framework para gestionar rutas y middleware HTTP.  
- **Sequelize ORM** → Mapeador objeto-relacional que simplifica la conexión entre objetos JavaScript y tablas SQL.  
- **MySQL** → Sistema de gestión de base de datos relacional.  

---

## ⚙️ Instalación del entorno

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/usuario/api-rest-sequelize.git
   cd api-rest-sequelize
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar la base de datos en el archivo `/config/db.js`:
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

El servidor se ejecutará en:
```
http://localhost:3000
```

---

## 🧩 Estructura del proyecto

```
📦 ApiRest_Node_ORM_Sequelize
 ├── config/
 │   └── db.js                # Conexión a MySQL
 ├── models/                  # Modelos ORM Sequelize (una clase por tabla)
 ├── controllers/
 │   ├── base/                # Controladores base (generados automáticamente)
 │   └── personalizados/      # Controladores extendidos o personalizados
 ├── routes/                  # Rutas Express (endpoints REST)
 ├── autocrud.js              # Generador automático de controladores y rutas
 ├── server.js                # Servidor principal Express
 └── package.json
```

---

## 🧠 Conceptos clave de clase

### 🔹 Node.js + Express
- Creación de servidores HTTP.
- Configuración de rutas REST (`GET`, `POST`, `PUT`, `DELETE`).
- Uso de middlewares (`express.json()`, autenticación, etc.).

### 🔹 Sequelize ORM
- **Modelos** → Representan tablas de la base de datos.  
- **Relaciones** → Definen vínculos entre tablas (1:N, N:N).  
- **Métodos** → `findAll()`, `create()`, `update()`, `destroy()`...  
- **Sincronización** → `sequelize.sync({ alter: true })` mantiene las tablas actualizadas.  

### 🔹 Autocrud
- Generador de código que crea automáticamente los controladores y rutas de cada entidad.  
- Evita escribir manualmente operaciones CRUD repetitivas.  
- Cada vez que se ejecuta (`node autocrud.js`), actualiza los controladores base según los modelos actuales.

### 🎓 Tarea del taller no realizada en este GIT

Modificar un controlador, por ejemplo producto.
Añadir una nueva tabla al sistema y aplicar la nueva generación y autocrud--> Esto generará un problema de arquitectura ya que borrará los cambios realizados en el punto anterior.
Aplicar el cambio de estructura con la extensión de los nuevos controladores, psra evitar perder cambios en las generaciones automáticas
Analizar como afecta el autocrad a las rutas y analizar si debemos cambiar algo.


---

## 🧠 Patrón de diseño aplicado

Este proyecto implementa **una combinación de patrones de diseño clásicos**:

### 🧩 1. MVC — *Model View Controller*
Organiza el código en tres capas principales:

| Capa | Descripción |
|------|--------------|
| **Modelos** | Representan las tablas y su lógica (Sequelize). |
| **Controladores** | Contienen la lógica de negocio (CRUD). |
| **Rutas** | Exponen los endpoints HTTP al cliente. |

Esto permite mantener una arquitectura escalable y separada por responsabilidades.

---

### 🧩 2. Template Method Pattern (*Método Plantilla*)

Este patrón define un **flujo general** en una clase base y permite que las subclases redefinan pasos concretos.  
En este proyecto, los **controladores base** generados automáticamente actúan como “plantillas”.  
Los **controladores extendidos** pueden sobreescribir métodos o agregar lógica sin romper la estructura.

**Ejemplo:**
```js
// Base (autogenerado)
export const obtenerProductos = async (req, res) => {
  const items = await Producto.findAll();
  res.json(items);
};

// Personalizado
import * as Base from "./base/productosBaseController.js";
export const obtenerProductos = async (req, res) => {
  console.log("Filtro adicional de productos activos");
  await Base.obtenerProductos(req, res);
};
```

---

### 🧩 3. Base-Class Extension / Herencia de controladores

Para evitar perder personalizaciones al regenerar el autocrud,  
usamos un sistema de **herencia** y **delegación de comportamiento**:

📂 Estructura recomendada:
```
controllers/
 ├── base/
 │   ├── productosBaseController.js
 │   ├── clientesBaseController.js
 │   └── ...
 ├── productosController.js   # Extiende el base
 ├── clientesController.js
```

📘 Ejemplo extendido:
```js
import * as Base from "./base/productosBaseController.js";

export const obtenerProductos = async (req, res) => {
  console.log("🧠 Lógica personalizada");
  await Base.obtenerProductos(req, res);
};

export const crearProducto = Base.crearProducto;
export const eliminarProducto = Base.eliminarProducto;
```

Esto permite regenerar los archivos base sin perder tus cambios personalizados.

---

### 🧩 4. Scaffolding Pattern (Patrón de generación automática)

El **autocrud.js** actúa como un generador de scaffolding:  
analiza los modelos y crea automáticamente las rutas y controladores base para cada entidad.  
De este modo, puedes añadir nuevas tablas al sistema sin escribir manualmente código repetitivo.

**Flujo de trabajo:**
1. Crear nueva tabla en MySQL.  
2. Regenerar modelo con `sequelize-auto`.  
3. Ejecutar `node autocrud.js`.  
4. Las rutas y controladores base se crean automáticamente.  
5. Si es necesario, extiende o personaliza los controladores.

---

## 🧩 Ejemplo de prueba con Postman

### 1️⃣ Crear una categoría
**POST** `/api/categorias`
```json
{
  "nombre": "Periféricos",
  "descripcion": "Accesorios para ordenadores"
}
```

### 2️⃣ Crear un producto
**POST** `/api/productos`
```json
{
  "nombre": "Teclado mecánico",
  "precio": 59.99,
  "stock": 20,
  "categoria_id": 1
}
```

### 3️⃣ Consultar todos los productos
**GET** `/api/productos`

### 4️⃣ Actualizar un producto
**PUT** `/api/productos/1`
```json
{
  "nombre": "Teclado RGB mecánico",
  "precio": 69.99,
  "stock": 15
}
```

### 5️⃣ Eliminar un producto
**DELETE** `/api/productos/1`

---

## 🎓 Objetivo educativo

Con este proyecto los alumnos aprenderán a:
- Comprender el patrón **MVC** en entornos backend.  
- Usar un **ORM** para abstraer la base de datos.  
- Automatizar la generación de código con **autocrud**.  
- Aplicar patrones de diseño profesionales (**Template Method**, **Base-Class Extension**, **Scaffolding**).  
- Ampliar y mantener proyectos escalables con Sequelize.

---

## 🎓 Tarea del taller no realizada en este GIT

Aplicar el cambio de estructura con la extensión de los nuevos controladores
Analizar como afecta el autocrad a las rutas y analizar si debemos cambiar algo.

---

✍️ **Autor:**  
Carlos Basulto Pardo — Profesor de Desarrollo de Aplicaciones Multiplataforma y Web  
📍 EUSA Sevilla
