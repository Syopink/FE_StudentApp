import axios from 'axios';
import { BASE_URL } from '../shared/constants/app';

const Http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

Http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('Token in interceptor:', token); // Kiểm tra token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Authorization header set:', config.headers.Authorization); // Kiểm tra header
      console.log("config", config.headers.Authorization);
    } else {
      console.log('No token found in localStorage');
    }
    return config;
  },
  (error) => {
    console.error('Interceptor error:', error);
    return Promise.reject(error);
  }
);


Http.interceptors.response.use(
  (response) => {
    console.log("response.data", response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized request');
    }
    return Promise.reject(error);
  }
);

export default Http;