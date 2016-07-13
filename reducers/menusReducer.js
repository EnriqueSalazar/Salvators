
import {
  LOAD_clienteS_SUCCESS,
  CREATE_cliente_SUCCESS,
  UPDATE_cliente_SUCCESS,
  DESTROY_cliente_SUCCESS,
  STOP_ADD_cliente_SUCCESS,
  START_ADD_cliente_SUCCESS,
  START_MODAL_cliente_SUCCESS,
  STOP_MODAL_cliente_SUCCESS,
  UPDATE_cliente_RENDER_OPTIONS_SUCCESS
} from '../actions/clienteActions';

export default function clienteReducer(state = {
  clientes: [],
  isAddingcliente: false,
  shouldUpdateclientes: false,
  renderOptions: {},
  clienteModalId: 0
}, action) {
  switch (action.type) {
    case UPDATE_cliente_RENDER_OPTIONS_SUCCESS:
      return  Object.assign({}, state,
      {renderOptions: action.renderOptions});
    case CREATE_cliente_SUCCESS:
    case DESTROY_cliente_SUCCESS:
    case UPDATE_cliente_SUCCESS:
      return Object.assign({}, state,
        {shouldUpdateclientes: true});
    case LOAD_clienteS_SUCCESS:
      return Object.assign({}, state,
        {clientes: action.clientes,
          shouldUpdateclientes: false});
    case START_ADD_cliente_SUCCESS:
      return Object.assign({}, state,
        {isAddingcliente: true});
    case STOP_ADD_cliente_SUCCESS:
      return Object.assign({}, state,
        {isAddingcliente: false});
    case START_MODAL_cliente_SUCCESS:
      return Object.assign({}, state,
        {clienteModalId: action.clienteModalId});
    case STOP_MODAL_cliente_SUCCESS:
      return Object.assign({}, state,
        {clienteModalId: 0});
    default:
      return state;
  }
}

