import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configure sua URL base (use seu IP local ou URL de produção)
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // URL de produção
  timeout: 10000,
});

// Interceptor para adicionar o token automaticamente
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@ForNutri:token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default api;