import axios from 'axios';
import API_URL from '../config';

class ProductoApi {
  static getAllProductos() {
    return axios.post(API_URL + '/productos/clientes/findall', {});
  }

  static findOneProducto(id) {
    return axios.post(API_URL + '/productos/findone', {id});
  }

  static findOneclienteProductos(id) {
    return axios.post(API_URL + '/productos/cliente/findall', {id});
  }

  static createProducto(payload) {
    return axios.post(API_URL + '/productos/cliente/create', payload);
  }

  static   updateProducto(payload) {
    return axios.post(API_URL + '/productos/cliente/update/', payload);
  }

  static destroyProducto(id) {
    return axios.post(API_URL + '/productos/cliente/destroy/', {id});
  }
}
export default ProductoApi;
