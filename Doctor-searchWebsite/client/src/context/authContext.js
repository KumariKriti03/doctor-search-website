import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'universal-cookie';

const AuthContext = createContext();

const cookies = new Cookies();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = cookies.get('token');
    setLoggedIn(!!token);
  }, []);


  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
