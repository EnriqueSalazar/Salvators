const Sequelize = require('sequelize');
const DB = require('../config/db.json');

const sequelize = new Sequelize(
  DB.database,
  DB.username,
  DB.password,
  DB.host);

const db = {};

db.clientes = sequelize.import('./clientesModel.js');
db.pedidos = sequelize.import('./pedidosModel.js');
db.productosclientes = sequelize.import('./productosclientesModel.js');
db.usuarios = sequelize.import('./usuariosModel.js');
db.restaurantesclientes = sequelize.import('./restaurantesclientesModel.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
