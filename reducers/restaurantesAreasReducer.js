import {
  LOAD_restauranteS_clienteS_SUCCESS,
  CREATE_restauranteS_cliente_SUCCESS,
  UPDATE_restauranteS_cliente_SUCCESS,
  DESTROY_restauranteS_cliente_SUCCESS,
} from '../actions/restaurantesclienteActions';

export default function restaurantesclienteReducer(state = {
  restaurantesclientes: [],
  shouldUpdaterestaurantesclientes: false
}, action) {
  switch (action.type) {
    case CREATE_restauranteS_cliente_SUCCESS:
    case DESTROY_restauranteS_cliente_SUCCESS:
    case UPDATE_restauranteS_cliente_SUCCESS:
      return Object.assign({}, state,
        {shouldUpdaterestaurantesclientes: true});
    case LOAD_restauranteS_clienteS_SUCCESS:
      return Object.assign({}, state,
        {
          restaurantesclientes: action.restaurantesclientes,
          shouldUpdaterestaurantesclientes: false
        });
    default:
      return state;
  }
}

