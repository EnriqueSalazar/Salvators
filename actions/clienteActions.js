import {toastr} from 'react-redux-toastr';
import clienteApi from '../api/clienteApi';

export const LOAD_clienteS_SUCCESS = 'LOAD_clienteS_SUCCESS';
export const CREATE_cliente_SUCCESS = 'CREATE_cliente_SUCCESS';
export const UPDATE_cliente_SUCCESS = 'UPDATE_cliente_SUCCESS';
export const DESTROY_cliente_SUCCESS = 'DESTROY_cliente_SUCCESS';
export const STOP_ADD_cliente_SUCCESS = 'STOP_ADD_cliente_SUCCESS';
export const START_ADD_cliente_SUCCESS = 'START_ADD_cliente_SUCCESS';
export const STOP_MODAL_cliente_SUCCESS = 'STOP_MODAL_cliente_SUCCESS';
export const START_MODAL_cliente_SUCCESS = 'START_MODAL_cliente_SUCCESS';
export const UPDATE_cliente_RENDER_OPTIONS_SUCCESS = 'UPDATE_cliente_RENDER_OPTIONS_SUCCESS';

export function loadclientesSuccess(clientes) {
  return {type: LOAD_clienteS_SUCCESS, clientes};
}
export function updateRenderOptionsSuccess(renderOptions) {
  return {type: UPDATE_cliente_RENDER_OPTIONS_SUCCESS, renderOptions};
}
export function updateclientesSuccess() {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_cliente_SUCCESS};
}
export function createclientesSuccess() {
  toastr.success('Creación exitosa.');
  return {type: CREATE_cliente_SUCCESS};
}
export function destroyclientesSuccess() {
  toastr.success('Eliminación exitosa.');
  return {type: DESTROY_cliente_SUCCESS};
}

export function stopAddingclienteSuccess() {
  return {type: STOP_ADD_cliente_SUCCESS};
}
export function startAddingclienteSuccess() {
  return {type: START_ADD_cliente_SUCCESS};
}
export function stopModalclienteSuccess() {
  return {type: STOP_MODAL_cliente_SUCCESS};
}
export function startModalclienteSuccess(clienteModalId) {
  return {type: START_MODAL_cliente_SUCCESS, clienteModalId};
}

export function loadclientes() {
  return dispatch => {
    return clienteApi.getAllclientes().then(clientes => {
      dispatch(loadclientesSuccess(clientes.data.result));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updatecliente(cliente) {
  return dispatch => {
    return clienteApi.updatecliente(cliente).then(() => {
      dispatch(updateclientesSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}
export function createcliente(cliente) {
  return dispatch => {
    return clienteApi.createcliente(cliente).then(() => {
      dispatch(createclientesSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroycliente(cliente) {
  return dispatch => {
    return clienteApi.destroycliente(cliente.id).then(() => {
      dispatch(destroyclientesSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function startAddingcliente() {
  return dispatch => {
    return dispatch(startAddingclienteSuccess());
  };
}

export function stopAddingcliente() {
  return dispatch => {
    return dispatch(stopAddingclienteSuccess());
  };
}

export function updateRenderOptions(renderOptions) {
  return dispatch => {
    return dispatch(updateRenderOptionsSuccess(renderOptions));
  };
}

export function startModalcliente(clienteModalId) {
  return dispatch => {
    return dispatch(startModalclienteSuccess(clienteModalId));
  };
}

export function stopModalcliente() {
  return dispatch => {
    return dispatch(stopModalclienteSuccess());
  };
}
