// src/context/AuthContext.jsx

import React, { createContext, useState, useContext } from 'react';

// ⬅️ ایجاد Context
const AuthContext = createContext();

// ⬅️ کامپوننت Provider که وضعیت را در اختیار برنامه قرار می‌دهد
export const AuthProvider = ({ children }) => {
  // وضعیت اصلی: isLoggedIn وضعیت ورود و user جزئیات کاربر را نگه می‌دارد
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); 

  // توابع برای تغییر وضعیت ورود
  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ⬅️ قلاب (Hook) سفارشی برای استفاده آسان از Context
export const useAuth = () => {
  return useContext(AuthContext);
};