import {toastr} from 'react-redux-toastr';
import PedidoApi from '../api/PedidoApi';

export const LOAD_PEDIDOS_SUCCESS = 'LOAD_PEDIDOS_SUCCESS';
export const LOAD_ONE_cliente_PEDIDOS_SUCCESS = 'LOAD_ONE_cliente_PEDIDOS_SUCCESS';
export const CREATE_PEDIDO_SUCCESS = 'CREATE_PEDIDO_SUCCESS';
export const UPDATE_PEDIDO_SUCCESS = 'UPDATE_PEDIDO_SUCCESS';
export const DESTROY_PEDIDO_SUCCESS = 'DESTROY_PEDIDO_SUCCESS';
export const STOP_ADD_PEDIDO_SUCCESS = 'STOP_ADD_PEDIDO_SUCCESS';
export const START_ADD_PEDIDO_SUCCESS = 'START_ADD_PEDIDO_SUCCESS';
export const STOP_MODAL_PEDIDO_SUCCESS = 'STOP_MODAL_PEDIDO_SUCCESS';
export const START_MODAL_PEDIDO_SUCCESS = 'START_MODAL_PEDIDO_SUCCESS';

export function loadPedidosSuccess(pedidos) {
  return {type: LOAD_PEDIDOS_SUCCESS, pedidos};
}
export function loadOneclientePedidosSuccess(pedidos) {
  return {type: LOAD_ONE_cliente_PEDIDOS_SUCCESS, pedidos};
}
export function updatePedidosSuccess() {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_PEDIDO_SUCCESS};
}
export function createPedidosSuccess() {
  toastr.success('Creación exitosa.');
  return {type: CREATE_PEDIDO_SUCCESS};
}
export function destroyPedidosSuccess() {
  toastr.success('Eliminación exitosa.');
  return {type: DESTROY_PEDIDO_SUCCESS};
}

export function stopAddingPedidoSuccess() {
  return {type: STOP_ADD_PEDIDO_SUCCESS};
}
export function startAddingPedidoSuccess() {
  return {type: START_ADD_PEDIDO_SUCCESS};
}
export function stopModalPedidoSuccess() {
  return {type: STOP_MODAL_PEDIDO_SUCCESS};
}
export function startModalPedidoSuccess(pedidoModalId) {
  return {type: START_MODAL_PEDIDO_SUCCESS, pedidoModalId};
}

export function loadPedidos() {
  return dispatch => {
    return PedidoApi.getAllPedidos().then(pedidos => {
      dispatch(loadPedidosSuccess(pedidos.data.result));
    }).catch(error => {
      throw(error);
    });
  };
}
export function loadOneclientePedidos(cliente_id) {
  return dispatch => {
    return PedidoApi.getOneclientePedidos(cliente_id).then(pedidos => {
      dispatch(loadOneclientePedidosSuccess(pedidos.data.result));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updatePedido(pedido) {
  return dispatch => {
    return PedidoApi.updatePedido(pedido).then(() => {
      dispatch(updatePedidosSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}
export function createPedido(pedido) {
  return dispatch => {
    return PedidoApi.createPedido(pedido).then(() => {
      dispatch(createPedidosSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyPedido(pedido) {
  return dispatch => {
    return PedidoApi.destroyPedido(pedido.id).then(() => {
      dispatch(destroyPedidosSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function startAddingPedido() {
  return dispatch => {
    return dispatch(startAddingPedidoSuccess());
  };
}

export function stopAddingPedido() {
  return dispatch => {
    return dispatch(stopAddingPedidoSuccess());
  };
}

export function startModalPedido(pedidoModalId) {
  return dispatch => {
    return dispatch(startModalPedidoSuccess(pedidoModalId));
  };
}

export function stopModalPedido() {
  return dispatch => {
    return dispatch(stopModalPedidoSuccess());
  };
}
