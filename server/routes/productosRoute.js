/**
 * Created by enriq on 10/06/16.
 */
const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router();

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.post('/clientes/findall', jsonParser, (req, res) => {
  models.clientes.hasMany(models.pedidos, {foreignKey: 'cliente_id'});
  models.pedidos.belongsTo(models.clientes, {foreignKey: 'cliente_id'});

  models.pedidos.hasMany(models.productosclientes, {foreignKey: 'pedido_id'});
  models.productosclientes.belongsTo(models.pedidos, {foreignKey: 'pedido_id'});

  models.productosclientes.findAll({
    include: [{
      model: models.pedidos,
      attributes: ['id', 'nombre_pedido'],
      include: [{
        model: models.clientes,
        attributes: ['id', 'nombre_cliente', 'type'],
      }]
    }]
  }).then((result) => {
    res.send({
      result
    });
  }, (rejectedPromiseError) => {
    res.send(rejectedPromiseError);
    console.error('error message', rejectedPromiseError.message); // eslint-disable-line
  });
});

router.post('/cliente/findall', jsonParser, (req, res) => {
  const id = req.body.id;

  models.clientes.hasMany(models.pedidos, {foreignKey: 'cliente_id'});
  models.pedidos.belongsTo(models.clientes, {foreignKey: 'cliente_id'});

  models.pedidos.hasMany(models.productosclientes, {foreignKey: 'pedido_id'});
  models.productosclientes.belongsTo(models.pedidos, {foreignKey: 'pedido_id'});

  models.productosclientes.findAll({
    include: [{
      model: models.pedidos,
      attributes: ['id', 'nombre_pedido'],
      required: true,
      include: [{
        model: models.clientes,
        attributes: ['id', 'nombre_cliente', 'type'],
        where: {id}
      }]
    }]
  }).then((result) => {
    res.send({
      result
    });
  }, (rejectedPromiseError) => {
    res.send(rejectedPromiseError);
    console.error('error message', rejectedPromiseError.message); // eslint-disable-line
  });
});

router.post('/pedido/findall', jsonParser, (req, res) => {
  const payload = req.body;

  models.clientes.hasMany(models.pedidos, {foreignKey: 'cliente_id'});
  models.pedidos.belongsTo(models.clientes, {foreignKey: 'cliente_id'});

  models.pedidos.hasMany(models.productosclientes, {foreignKey: 'pedido_id'});
  models.productosclientes.belongsTo(models.pedidos, {foreignKey: 'pedido_id'});

  models.productosclientes.findAll({
    include: [{
      model: models.pedidos,
      attributes: ['id', 'nombre_pedido'],
      where: payload,
      include: [{
        model: models.clientes,
        attributes: ['id', 'nombre_cliente'],
        required: true
      }]
    }]
  }).then((result) => {
    res.send({
      result
    });
  }, (rejectedPromiseError) => {
    res.send(rejectedPromiseError);
    console.error('error message', rejectedPromiseError.message); // eslint-disable-line
  });
});

router.post('/findone', jsonParser, (req, res) => {
  const payload = req.body;
  models.productosclientes.findOne({
    where: payload
  }).then((result) => {
    res.send({
      result
    });
  }, (rejectedPromiseError) => {
    res.send(rejectedPromiseError);
    console.error('error message', rejectedPromiseError.message); // eslint-disable-line
  });
});

router.post('/cliente/create', jsonParser, (req, res) => {
  const payload = req.body;
  models.productosclientes.create(
    payload
  ).then((result) => {
    res.send({
      result: result.id
    });
  }, (rejectedPromiseError) => {
    res.send(rejectedPromiseError);
    console.error('error message', rejectedPromiseError.message); // eslint-disable-line
  });
});

router.post('/cliente/update', jsonParser, (req, res) => {
  const id = req.body.id;
  const payload = req.body;
  models.productosclientes.update(payload, {
    where: {
      id
    }
  }).then((result) => {
    res.send({
      result: result[0]
    });
  }, (rejectedPromiseError) => {
    res.send(rejectedPromiseError);
    console.error('error message', rejectedPromiseError.message); // eslint-disable-line
  });
});

router.post('/cliente/destroy', jsonParser, (req, res) => {
  const payload = req.body;
  models.productosclientes.destroy({
    where: payload
  }).then((result) => {
    res.send({
      result
    });
  }, (rejectedPromiseError) => {
    res.send(rejectedPromiseError);
    console.error('error message', rejectedPromiseError.message); // eslint-disable-line
  });
});

module.exports = router;

