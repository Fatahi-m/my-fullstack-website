// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext'; // ⬅️ وارد کردن AuthProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* ⬅️ تمام App را در AuthProvider قرار می‌دهیم */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
);