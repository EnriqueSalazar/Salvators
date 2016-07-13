
import {
  LOAD_PRODUCTOS_SUCCESS,
  LOAD_ONE_cliente_PRODUCTOS_SUCCESS,
  CREATE_PRODUCTO_SUCCESS,
  UPDATE_PRODUCTO_SUCCESS,
  DESTROY_PRODUCTO_SUCCESS,
  STOP_ADD_PRODUCTO_SUCCESS,
  START_ADD_PRODUCTO_SUCCESS,
  START_MODAL_PRODUCTO_SUCCESS,
  STOP_MODAL_PRODUCTO_SUCCESS
} from '../actions/productoActions';

export default function productoReducer(state = {
  productos: [],
  isAddingProducto: false,
  shouldUpdateProductos: false,
  productoModalId: 0
}, action) {
  switch (action.type) {
    case CREATE_PRODUCTO_SUCCESS:
    case DESTROY_PRODUCTO_SUCCESS:
    case UPDATE_PRODUCTO_SUCCESS:
      return Object.assign({}, state,
        {shouldUpdateProductos: true});
    case LOAD_ONE_cliente_PRODUCTOS_SUCCESS:
    case LOAD_PRODUCTOS_SUCCESS:
      return Object.assign({}, state,
        {productos: action.productos,
          shouldUpdateProductos: false});
    case START_ADD_PRODUCTO_SUCCESS:
      return Object.assign({}, state,
        {isAddingProducto: true});
    case STOP_ADD_PRODUCTO_SUCCESS:
      return Object.assign({}, state,
        {isAddingProducto: false});
    case START_MODAL_PRODUCTO_SUCCESS:
      return Object.assign({}, state,
        {productoModalId: action.productoModalId});
    case STOP_MODAL_PRODUCTO_SUCCESS:
      return Object.assign({}, state,
        {productoModalId: 0});
    default:
      return state;
  }
}

