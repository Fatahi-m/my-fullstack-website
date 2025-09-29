// src/components/Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import './Navbar.css';

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => { // ⬅️ تبدیل به async برای استفاده از fetch
    // 🚨 آدرس بک‌اند آنلاین شما
    const API_URL = 'https://my-app-backend-gamma.vercel.app'; 

    try {
        // 1. ارسال درخواست POST به بک‌اند برای پاکسازی سشن/توکن
        const response = await fetch(`${API_URL}/api/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // در اینجا می‌توان توکن کاربر را ارسال کرد
        });

        if (response.ok) {
            logout(); // 2. پاک کردن وضعیت محلی (Context)
            navigate('/'); // 3. هدایت کاربر
            alert('شما با موفقیت از سیستم خارج شدید.');
        } else {
            // حتی اگر بک‌اند پاسخ خطا بدهد، بهتر است کاربر را از سیستم خارج کنیم
            logout(); 
            navigate('/');
            alert('خطایی در ارتباط با سرور رخ داد، اما شما از سیستم خارج شدید.');
        }
    } catch (error) {
        // اگر خطای شبکه رخ داد، باز هم کاربر را خارج می‌کنیم
        logout();
        navigate('/');
        console.error('Logout network error:', error);
        alert('خطای شبکه رخ داد، اما شما از سیستم خارج شدید.');
    }
  };

  // ⬅️ نمایش نام کاربری (یا ایمیل اگر نام کاربری خالی بود)
  const displayUserName = user ? (user.username || user.email) : 'مهمان';

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo"> 
          وب‌سایت من
        </Link>
        <ul className="nav-links">
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