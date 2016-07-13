/**
 * Created by enriq on 10/06/16.
 */
const Sequelize = require('sequelize');

module.exports = function defineProductosclientesModel (sequelize) {
  return sequelize.define('productos_clientes_table', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    nombre_producto: {
      type: Sequelize.STRING
    },
    pedido_id: {
      type: Sequelize.INTEGER
    },
    deadline_producto: {
      type: Sequelize.DATE
    },
    done_producto: {
      type: Sequelize.DATE
    },
    id_responsable_producto: {
      type: Sequelize.INTEGER
    },
    estado_producto: {
      type: Sequelize.BOOLEAN
    }
  }, {
    freezeTableName: true
  });
};
