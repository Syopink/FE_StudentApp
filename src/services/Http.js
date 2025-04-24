import axios from 'axios';
import { BASE_URL } from '../shared/constants/app';
import { refreshToken as REFRESH_TOKEN_URL } from './Api';

const Http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleRefreshToken = async () => {
  const refresh_token = localStorage.getItem('refreshToken');
  if (!refresh_token) throw new Error('No refresh token found');

  try {
    const response = await axios.post(REFRESH_TOKEN_URL, { refreshToken: refresh_token });
    const { accessToken, refreshToken } = response.data;
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return accessToken;
  } catch (error) {
    console.error('Refresh token failed:', error);
    throw error;
  }
};

Http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

Http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await handleRefreshToken();
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return Http(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default Http;
