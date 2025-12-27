import axios, { type AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:4000';
const TOKEN_KEY = 'devpulse_token';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

function addAuthTokenToRequest(config: InternalAxiosRequestConfig) {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

function handleRequestError(error: AxiosError) {
  return Promise.reject(error);
}

function handleSuccessResponse(response: AxiosResponse) {
  return response;
}

function handleResponseError(error: AxiosError) {
  if (error.response?.status === 401) {
    localStorage.removeItem(TOKEN_KEY);
    window.dispatchEvent(new CustomEvent('unauthorized'));
  }
  return Promise.reject(error);
}

axiosInstance.interceptors.request.use(addAuthTokenToRequest,handleRequestError);

axiosInstance.interceptors.response.use(handleSuccessResponse,handleResponseError);

export default axiosInstance;