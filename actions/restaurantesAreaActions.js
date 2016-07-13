import {toastr} from 'react-redux-toastr';
import restaurantesclienteApi from '../api/restaurantesclienteApi';

export const LOAD_restauranteS_clienteS_SUCCESS = 'LOAD_restauranteS_clienteS_SUCCESS';
export const CREATE_restauranteS_cliente_SUCCESS = 'CREATE_restauranteS_cliente_SUCCESS';
export const UPDATE_restauranteS_cliente_SUCCESS = 'UPDATE_restauranteS_cliente_SUCCESS';
export const DESTROY_restauranteS_cliente_SUCCESS = 'DESTROY_restauranteS_cliente_SUCCESS';

export function loadrestaurantesclientesSuccess(restaurantesclientes) {
  return {type: LOAD_restauranteS_clienteS_SUCCESS, restaurantesclientes};
}
export function updaterestaurantesclientesSuccess() {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_restauranteS_cliente_SUCCESS};
}
export function createrestaurantesclientesSuccess() {
  toastr.success('Creación exitosa.');
  return {type: CREATE_restauranteS_cliente_SUCCESS};
}
export function destroyrestaurantesclientesSuccess() {
  toastr.success('Eliminación exitosa.');
  return {type: DESTROY_restauranteS_cliente_SUCCESS};
}


export function loadrestaurantesclientes() {
  return dispatch => {
    return restaurantesclienteApi.getAllrestaurantesclientes().then(restaurantesclientes => {
      dispatch(loadrestaurantesclientesSuccess(restaurantesclientes.data.result));
    }).catch(error => {
      throw(error);
    });
  };
}

export function updaterestaurantescliente(restaurantescliente) {
  return dispatch => {
    return restaurantesclienteApi.updaterestaurantescliente(restaurantescliente).then(() => {
      dispatch(updaterestaurantesclientesSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}
export function createrestaurantescliente(restaurantescliente) {
  return dispatch => {
    return restaurantesclienteApi.createrestaurantescliente(restaurantescliente).then(() => {
      dispatch(createrestaurantesclientesSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyrestaurantescliente(restaurantescliente) {
  return dispatch => {
    return restaurantesclienteApi.destroyrestaurantescliente(restaurantescliente.id).then(() => {
      dispatch(destroyrestaurantesclientesSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}


