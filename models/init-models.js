import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _categorias from  "./categorias.js";
import _clientes from  "./clientes.js";
import _detalles_pedido from  "./detalles_pedido.js";
import _pedidos from  "./pedidos.js";
import _productos from  "./productos.js";

export default function initModels(sequelize) {
  const categorias = _categorias.init(sequelize, DataTypes);
  const clientes = _clientes.init(sequelize, DataTypes);
  const detalles_pedido = _detalles_pedido.init(sequelize, DataTypes);
  const pedidos = _pedidos.init(sequelize, DataTypes);
  const productos = _productos.init(sequelize, DataTypes);

  pedidos.belongsTo(clientes, { as: "cliente", foreignKey: "cliente_id"});
  clientes.hasMany(pedidos, { as: "pedidos", foreignKey: "cliente_id"});
  detalles_pedido.belongsTo(pedidos, { as: "pedido", foreignKey: "pedido_id"});
  pedidos.hasMany(detalles_pedido, { as: "detalles_pedidos", foreignKey: "pedido_id"});
  detalles_pedido.belongsTo(productos, { as: "producto", foreignKey: "producto_id"});
  productos.hasMany(detalles_pedido, { as: "detalles_pedidos", foreignKey: "producto_id"});

  return {
    categorias,
    clientes,
    detalles_pedido,
    pedidos,
    productos,
  };
}
