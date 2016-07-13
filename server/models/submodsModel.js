const Sequelize = require('sequelize');

module.exports = function defineclientesModel(sequelize) {
  return sequelize.define('clientes_table', {
    nombre_cliente: {
      type: Sequelize.STRING
    },
    descripcion_cliente: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.INTEGER
    },
    deadline_proyecto: {
      type: Sequelize.DATE
    }
  }, {
    freezeTableName: true
  });
};
