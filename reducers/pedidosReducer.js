
import {
  LOAD_PEDIDOS_SUCCESS,
  LOAD_ONE_cliente_PEDIDOS_SUCCESS,
  CREATE_PEDIDO_SUCCESS,
  UPDATE_PEDIDO_SUCCESS,
  DESTROY_PEDIDO_SUCCESS,
  STOP_ADD_PEDIDO_SUCCESS,
  START_ADD_PEDIDO_SUCCESS,
  START_MODAL_PEDIDO_SUCCESS,
  STOP_MODAL_PEDIDO_SUCCESS
} from '../actions/pedidoActions';

export default function pedidoReducer(state = {
  pedidos: [],
  isAddingPedido: false,
  shouldUpdatePedidos: false,
  pedidoModalId: 0
}, action) {
  switch (action.type) {
    case CREATE_PEDIDO_SUCCESS:
    case DESTROY_PEDIDO_SUCCESS:
    case UPDATE_PEDIDO_SUCCESS:
      return Object.assign({}, state,
        {shouldUpdatePedidos: true});
    case LOAD_ONE_cliente_PEDIDOS_SUCCESS:
    case LOAD_PEDIDOS_SUCCESS:
      return Object.assign({}, state,
        {pedidos: action.pedidos,
          shouldUpdatePedidos: false});
    case START_ADD_PEDIDO_SUCCESS:
      return Object.assign({}, state,
        {isAddingPedido: true});
    case STOP_ADD_PEDIDO_SUCCESS:
      return Object.assign({}, state,
        {isAddingPedido: false});
    case START_MODAL_PEDIDO_SUCCESS:
      return Object.assign({}, state,
        {pedidoModalId: action.pedidoModalId});
    case STOP_MODAL_PEDIDO_SUCCESS:
      return Object.assign({}, state,
        {pedidoModalId: 0});
    default:
      return state;
  }
}

