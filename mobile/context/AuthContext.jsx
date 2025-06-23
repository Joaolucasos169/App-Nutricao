// context/AuthContext.jsx (Frontend)
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authService from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const storedUser = await AsyncStorage.getItem('@Auth:user');
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  };

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    await AsyncStorage.setItem('@Auth:token', data.token);
    await AsyncStorage.setItem('@Auth:user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    await login(userData.email, userData.password); // Login após registro
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@Auth:token');
    await AsyncStorage.removeItem('@Auth:user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};