const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');

const clientes = require('./server/routes/clientesRoute');
const pedidos = require('./server/routes/pedidosRoute');
const productos = require('./server/routes/productosRoute');
const usuarios = require('./server/routes/usuariosRoute');
const restaurantesclientesRoute = require('./server/routes/restaurantesclientesRoute');
const pedidosRoute = require('./server/routes/pedidosRoute');

const app = new (require('express'))();
const port = 3000;

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

app.use('/clientes', clientes);
app.use('/pedidos', pedidos);
app.use('/productos', productos);
app.use('/usuarios', usuarios);
app.use('/restaurantesclientes', restaurantesclientesRoute);
app.use('/pedidos', pedidosRoute);

app.get("/*", function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, function(error) {
  if (error) {
    console.error(error); // eslint-disable-line
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);// eslint-disable-line
  }
});
