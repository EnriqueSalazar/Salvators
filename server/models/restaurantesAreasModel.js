/**
 * Created by enriq on 10/06/16.
 */
/**
 * Created by enriq on 10/06/16.
 */

const Sequelize = require('sequelize');

module.exports = function definerestaurantesclientesModel (sequelize) {
    return sequelize.define('restaurantes_clientes_table', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        cliente_id: {
            type: Sequelize.INTEGER
        },
        pedido_id: {
            type: Sequelize.INTEGER
        },
        producto_id: {
            type: Sequelize.INTEGER
        },
        usuario_id: {
            type: Sequelize.INTEGER
        },
        is_active: {
            type: Sequelize.BOOLEAN
        },
        restaurante: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true
    });
};
