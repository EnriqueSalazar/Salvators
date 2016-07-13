import axios from 'axios';
import API_URL from '../config';

class PedidoApi {
  static getAllPedidos() {
    return axios.post(API_URL + '/pedidos/findall', {});
  }

  static getOneclientePedidos(id) {
    return axios.post(API_URL + '/pedidos/findall', {id});
  }

  static createPedido(payload) {
    return axios.post(API_URL + '/pedidos/create', payload);
  }

  static   updatePedido(payload) {
    return axios.post(API_URL + '/pedidos/update/', payload);
  }

  static destroyPedido(id) {
    return axios.post(API_URL + '/pedidos/destroy/', {id});
  }
}
export default PedidoApi;
