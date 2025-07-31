import axios from 'axios';
import { isTokenExpired } from '../utils/checkTokenValidity';

const API = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor for every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    if (isTokenExpired(token)) {
      localStorage.clear();
      window.location.href = '/login';
      throw new Error('Token expired');
    }
    config.headers.Authorization = `Bearer ${token}`;
    
    // For demo tokens, include user info in headers
    if (token && token.startsWith('demo-token-')) {
      const email = localStorage.getItem('email');
      const role = localStorage.getItem('role');
      if (email) config.headers['x-user-email'] = email;
      if (role) config.headers['x-user-role'] = role;
    }
  }
  return config;
});

export default API; 