// services/api.js (Frontend)
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://10.0.30.106:3000/api', // Altere para seu IP
});

// Interceptor para adicionar token
api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('@Auth:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;