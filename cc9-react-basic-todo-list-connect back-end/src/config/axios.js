import axios from 'axios';
import { getToken, removeToken } from '../services/localStorage';
import { API_URL } from './env';

axios.defaults.baseURL = API_URL;

axios.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ` + getToken();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    if (err.response && err.response.status === 401) {
      removeToken();
      window.location.replace('/login');
      return;
    }
    return Promise.reject(err);
  }
);

export default axios;
