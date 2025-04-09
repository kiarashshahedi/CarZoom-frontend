import axios from 'axios';

const API_BASE_URLS = {
  auth: 'http://localhost:8000/api/users',
  products: 'http://localhost:8001/api',
  orders: 'http://localhost:8002/api',
};

export const authApi = axios.create({ baseURL: API_BASE_URLS.auth });
export const productApi = axios.create({ baseURL: API_BASE_URLS.products });
export const orderApi = axios.create({ baseURL: API_BASE_URLS.orders });

export const setAuthToken = (token: string | null) => {
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};
  authApi.defaults.headers.common = authHeader;
  productApi.defaults.headers.common = authHeader;
  orderApi.defaults.headers.common = authHeader;
};