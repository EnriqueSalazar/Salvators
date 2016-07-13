import 'babel-polyfill';

//Devtools son utilidades para debugging,
// pero prefiero utilizar las extensiones de chrome
// estas de aqui insertan una utilidad web en la pagina
// pero no salen cuando hay un error grande
// las dejo aqui por si acaso

// import { createDevTools } from 'redux-devtools'
// import LogMonitor from 'redux-devtools-log-monitor'
// import DockMonitor from 'redux-devtools-dock-monitor'

import React from 'react';
import ReactDOM from 'react-dom';
import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose } from 'redux';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory } from 'react-router';
import {
  syncHistoryWithStore,
  routerReducer } from 'react-router-redux';
// import {persistStore, autoRehydrate} from 'redux-persist';

import
  ReduxToastr,
{reducer as toastrReducer} from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';

import './node_modules/bootstrap/dist/css/bootstrap.css';
import './node_modules/bootstrap/dist/css/bootstrap.css';
import './node_modules/react-redux-toastr/lib/css/react-redux-toastr.css';

import clientesReducer from './reducers/clientesReducer';
import productosReducer from './reducers/productosReducer';
import pedidosReducer from './reducers/pedidosReducer';
import usuariosReducer from './reducers/usuariosReducer';
import restaurantesclientesReducer from './reducers/restaurantesclientesReducer';
import clientes from './containers/clientes';
import App from './containers/App';
import Home from './containers/Home';
import Users from './containers/Users';

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
const reducer = combineReducers({
  clientesReducer,
  pedidosReducer,
  productosReducer,
  usuariosReducer,
  restaurantesclientesReducer,
  routing: routerReducer,
  toastr: toastrReducer,
  form: formReducer
});

// const DevTools = createDevTools(
//   <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
//     <LogMonitor theme="tomorrow" preserveScrollTop={false} />
//   </DockMonitor>
// )

const store = createStore(
  reducer,
  // undefined,
  // autoRehydrate(),
  compose(
    applyMiddleware(
      thunkMiddleware,
      createLogger()
    ),
    // DevTools.instrument(),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
// persistStore(store);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="/pedidossalvators/:type/:selectedclienteId/:selectedPedidoId/:selectedProductoId" component={clientes} />
          <Route path="/users" component={Users} />
        </Route>
      </Router>
      {/*<DevTools />*/}
      <ReduxToastr
        timeOut={8000}
        newestOnTop={true}
        position="top-right" />
    </div>
  </Provider>,
  document.getElementById('root')
);
