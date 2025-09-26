// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // ⬅️ Link را وارد می‌کنیم
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo"> 
          وب‌سایت من
        </Link>
        <ul className="nav-links">
          <li><Link to="/news">اخبار و رویدادها</Link></li>
          <li><Link to="/directory">دایرکتوری</Link></li> {/* ⬅️ این لینک را بعداً می‌سازیم */}
          <li><Link to="/about">درباره ما</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;