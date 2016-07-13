import axios from 'axios';
import API_URL from '../config';

class restaurantesclienteApi {
  static getAllrestaurantesclientes() {
    return axios.post(API_URL + '/restaurantesclientes/findall/', {});
  }

  static createrestaurantescliente(payload) {
    return axios.post(API_URL + '/restaurantesclientes/create/', payload);
  }

  static   updaterestaurantescliente(payload) {
    return axios.post(API_URL + '/restaurantesclientes/update/', payload);
  }

  static destroyrestaurantescliente(id) {
    return axios.post(API_URL + '/restaurantesclientes/destroy/', {id});
  }
}
export default restaurantesclienteApi;
