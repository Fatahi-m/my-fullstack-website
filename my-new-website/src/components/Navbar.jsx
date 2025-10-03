// src/components/Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ⬅️ وضعیت جدید برای باز/بسته کردن منو
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => { 
    const API_URL = 'https://my-app-backend-gamma.vercel.app'; 

    try {
        // 1. ارسال درخواست POST به بک‌اند (برای پاکسازی توکن/سشن)
        await fetch(`${API_URL}/api/auth/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
        
        // 2. صرف نظر از پاسخ بک‌اند، خروج را در فرانت‌اند انجام می‌دهیم
    } catch (error) {
        // خطای شبکه را در کنسول ثبت می‌کنیم اما به کاربر نمایش نمی‌دهیم
        console.error('Logout network error:', error);
    }
    
    // 3. خروج از Context و هدایت کاربر (مهمترین گام‌ها)
    logout();
    navigate('/'); 
    alert('شما با موفقیت از سیستم خارج شدید.'); // ⬅️ فقط یک پیام موفقیت نمایش داده می‌شود
  };

  // ⬅️ نمایش نام کاربری (یا ایمیل اگر نام کاربری خالی بود)
  const displayUserName = user ? (user.username || user.email) : 'مهمان';

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo"> 
          وب‌سایت من
        </Link>
        <ul className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
          <li><Link to="/news">اخبار و رویدادها</Link></li>
          <li><Link to="/directory">دایرکتوری</Link></li>
          <li><Link to="/about">درباره ما</Link></li>

          {/* ⬅️ نمایش مشروط بر اساس وضعیت ورود */}
          {isLoggedIn ? (
            <>
              {/* ⬅️ نمایش مستقیم نام کاربری/ایمیل */}
              <li style={{fontWeight: 'bold', color: '#007bff'}}>
                {displayUserName} 
              </li>
              <li>
                {/* ⬅️ دکمه خروج جداگانه */}
                <button onClick={handleLogout} className="cta-button" 
                        style={{padding: '5px 10px', fontSize: '0.9rem', backgroundColor: '#c0392b', color: 'white'}}>
                  خروج
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">ورود</Link></li>
              <li><Link to="/signup">ثبت نام</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;