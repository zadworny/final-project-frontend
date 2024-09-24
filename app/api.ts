// api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://your-api-base-url', // Replace with your API base URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;