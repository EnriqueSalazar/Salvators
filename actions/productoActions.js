import {toastr} from 'react-redux-toastr';
import ProductoApi from '../api/ProductoApi';

export const LOAD_PRODUCTOS_SUCCESS = 'LOAD_PRODUCTOS_SUCCESS';
export const LOAD_ONE_cliente_PRODUCTOS_SUCCESS = 'LOAD_ONE_cliente_PRODUCTOS_SUCCESS';
export const CREATE_PRODUCTO_SUCCESS = 'CREATE_PRODUCTO_SUCCESS';
export const UPDATE_PRODUCTO_SUCCESS = 'UPDATE_PRODUCTO_SUCCESS';
export const DESTROY_PRODUCTO_SUCCESS = 'DESTROY_PRODUCTO_SUCCESS';
export const STOP_ADD_PRODUCTO_SUCCESS = 'STOP_ADD_PRODUCTO_SUCCESS';
export const START_ADD_PRODUCTO_SUCCESS = 'START_ADD_PRODUCTO_SUCCESS';
export const STOP_MODAL_PRODUCTO_SUCCESS = 'STOP_MODAL_PRODUCTO_SUCCESS';
export const START_MODAL_PRODUCTO_SUCCESS = 'START_MODAL_PRODUCTO_SUCCESS';

export function loadProductosSuccess(productos) {
  return {type: LOAD_PRODUCTOS_SUCCESS, productos};
}
export function loadOneclienteProductosSuccess(productos) {
  return {type: LOAD_ONE_cliente_PRODUCTOS_SUCCESS, productos};
}
export function updateProductosSuccess() {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_PRODUCTO_SUCCESS};
}
export function createProductosSuccess() {
  toastr.success('Creación exitosa.');
  return {type: CREATE_PRODUCTO_SUCCESS};
}
export function destroyProductosSuccess() {
  toastr.success('Eliminación exitosa.');
  return {type: DESTROY_PRODUCTO_SUCCESS};
}
export function stopAddingProductoSuccess() {
  return {type: STOP_ADD_PRODUCTO_SUCCESS};
}
export function startAddingProductoSuccess() {
  return {type: START_ADD_PRODUCTO_SUCCESS};
}
export function stopModalProductoSuccess() {
  return {type: STOP_MODAL_PRODUCTO_SUCCESS};
}
export function startModalProductoSuccess(productoModalId) {
  return {type: START_MODAL_PRODUCTO_SUCCESS, productoModalId};
}

export function loadProductos() {
  return dispatch => {
    return ProductoApi.getAllProductos().then(productos => {
      dispatch(loadProductosSuccess(productos.data.result));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadOneclienteProductos(cliente_id) {
  return dispatch => {
    return ProductoApi.findOneclienteProductos(cliente_id).then(productos => {
      dispatch(loadOneclienteProductosSuccess(productos.data.result));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updateProducto(producto) {
  return dispatch => {
    return ProductoApi.updateProducto(producto).then(() => {
      dispatch(updateProductosSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}
export function createProducto(producto) {
  return dispatch => {
    return ProductoApi.createProducto(producto).then(() => {
      dispatch(createProductosSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyProducto(producto) {
  return dispatch => {
    return ProductoApi.destroyProducto(producto.id).then(() => {
      dispatch(destroyProductosSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function startAddingProducto() {
  return dispatch => {
    return dispatch(startAddingProductoSuccess());
  };
}

export function stopAddingProducto() {
  return dispatch => {
    return dispatch(stopAddingProductoSuccess());
  };
}

export function startModalProducto(productoModalId) {
  return dispatch => {
    return dispatch(startModalProductoSuccess(productoModalId));
  };
}

export function stopModalProducto() {
  return dispatch => {
    return dispatch(stopModalProductoSuccess());
  };
}
