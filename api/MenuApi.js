import axios from 'axios';
import API_URL from '../config';

class clienteApi {
  static getAllclientes() {
    return axios.post(API_URL + '/clientes/findall', {});
  }

  static updatecliente(cliente) {
    return axios.post(API_URL + '/clientes/update', cliente);
  }

  static createcliente(cliente) {
    return axios.post(API_URL + '/clientes/create', cliente);
  }

  static destroycliente(id) {
    return axios.post(API_URL + '/clientes/destroy', {id});
  }
}

export default clienteApi;
