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

router.post('/findall', jsonParser, (req, res) => {
  models.pedidos.findAll({
    include: [{
      model: models.clientes,
      attributes: ['id', 'nombre_cliente', 'type']
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

  models.pedidos.findAll({
    include: [{
      model: models.clientes,
      attributes: ['id', 'nombre_cliente', 'type'],
      where: {id}
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
  models.pedidos.findOne({
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

router.post('/create', jsonParser, (req, res) => {
  const payload = req.body;
  models.pedidos.create(
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

router.post('/update', jsonParser, (req, res) => {
  const id = req.body.id;
  const payload = req.body;
  models.pedidos.update(payload, {
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

router.post('/destroy', jsonParser, (req, res) => {
  const payload = req.body;
  models.pedidos.destroy({
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
