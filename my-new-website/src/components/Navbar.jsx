// src/components/Navbar.jsx

import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <a href="/" className="logo">
          وب‌سایت من
        </a>
        <ul className="nav-links">
          <li><a href="#news">اخبار</a></li>
          <li><a href="#directory">دایرکتوری</a></li>
          <li><a href="#about">درباره ما</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;