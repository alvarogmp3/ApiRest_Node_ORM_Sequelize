export const getAll = async (req, res) => {
  try {
    const { productos } = req.app.locals.models;
    const items = await productos.findAll({ include: [{ all: true, nested: true }] });
    console.log("🔍 Productos encontrados:", items.length);
    res.json(items);
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    res.status(500).json({ mensaje: "Error al obtener productos", error });
  }
};

export const getOne = async (req, res) => {
  try {
    const { productos } = req.app.locals.models;
    const item = await productos.findByPk(req.params.id, { include: [{ all: true, nested: true }] });
    item ? res.json(item) : res.status(404).json({ mensaje: "No encontrado" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener producto", error });
  }
};

export const create = async (req, res) => {
  try {
    const { productos } = req.app.locals.models;
    const nuevo = await productos.create(req.body, { include: [{ all: true }] });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear producto", error });
  }
};

export const update = async (req, res) => {
  try {
    const { productos } = req.app.locals.models;
    const item = await productos.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.update(req.body);
    res.json(item);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar producto", error });
  }
};

export const remove = async (req, res) => {
  try {
    const { productos } = req.app.locals.models;
    const item = await productos.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.destroy();
    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar producto", error });
  }
};
