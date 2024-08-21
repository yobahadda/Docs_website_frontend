import React, { createContext, useState, useContext } from 'react';
import { loginUser, getCurrentUser } from './api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    setToken(data.access_token);
    localStorage.setItem('token', data.access_token);
    const currentUser = await getCurrentUser(data.access_token);
    setUser(currentUser);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
