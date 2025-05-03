import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const token = localStorage.getItem('token');
    let user = null;

    if (token) {
      try {
        user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
          // If user data is missing but token exists, clear token
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Invalid user data in localStorage');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }

    return {
      token: user ? token : null,
      user: user || null,
    };
  });

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:3001/login', credentials);
      const { token, user } = response.data;
      
      if (!token || !user) {
        throw new Error('Invalid response from server');
      }

      // Store both token and complete user object
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setAuthState({ token, user });
      return response;
    } catch (error) {
      console.error('Login error:', error);
      // Clear any partial data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
