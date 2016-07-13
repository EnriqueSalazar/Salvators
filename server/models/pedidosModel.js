/**
 * Created by enriq on 10/06/16.
 */
/**
 * Created by enriq on 10/06/16.
 */

const Sequelize = require('sequelize');

module.exports = function definePedidoModel (sequelize) {
    return sequelize.define('pedidos_table', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        nombre_pedido: {
            type: Sequelize.STRING
        },
        avance_pedido: {
            type: Sequelize.INTEGER
        },
        done_pedido: {
            type: Sequelize.DATE
        },
        deadline_pedido: {
            type: Sequelize.DATE
        },
        id_responsable_pedido: {
            type: Sequelize.INTEGER
        },
        cliente_id: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true
    });
};
