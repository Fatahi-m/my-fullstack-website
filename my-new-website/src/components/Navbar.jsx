// src/components/Navbar.jsx

import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { useTranslation } from 'react-i18next';
import './Navbar.css';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  
  // لیست زبان‌های پشتیبانی شده
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' },
    { code: 'ckb', label: 'کوردی سۆرانی' },
    { code: 'kmr', label: 'Kurdî Kurmancî' },
  ];

  // تابع برای تغییر زبان با کلیک بر روی دکمه
  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    // بستن منو در موبایل پس از تغییر زبان
    if (isMenuOpen) {
        setIsMenuOpen(false);
    }
  };

  const handleLogout = async () => { 
    const API_URL = 'https://my-app-backend-gamma.vercel.app'; 
    // منطق خروج (بدون نمایش خطای شبکه)
    try {
        await fetch(`${API_URL}/api/auth/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Logout network error:', error);
    }
    
    logout();
    navigate('/'); 
    alert('شما با موفقیت از سیستم خارج شدید.'); 
  };

  const displayUserName = user ? (user.username || user.email) : 'مهمان';

  return (
    <nav className="navbar">
      <div className="container">
        
        {/* ⬅️ 1. لوگو/عنوان سایت */}
        <Link to="/" className="logo"> 
          {t('nav_home')} 
        </Link>
        
        {/* ⬅️ 2. سوئیچ زبان (گروه اول در دسکتاپ) */}
        <div className="language-switcher"> 
          {languages.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => changeLanguage(code)}
              className={`lang-button ${i18n.language === code ? 'active' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>
        
        {/* ⬅️ 3. دکمه همبرگری (مخفی در دسکتاپ) */}
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>

        {/* ⬅️ 4. لینک‌های ناوبری اصلی (گروه دوم) */}
        <ul className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
          
          {/* ⬅️ در موبایل، دکمه‌های زبان را به داخل منوی همبرگری منتقل می‌کنیم */}
          <li className="language-switcher-mobile">
            {languages.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => changeLanguage(code)}
                  className={`lang-button ${i18n.language === code ? 'active' : ''}`}
                >
                  {label}
                </button>
            ))}
          </li>
          
          {/* لینک‌های ترجمه شده */}
          <li><Link to="/news">{t('nav_news')}</Link></li> 
          <li><Link to="/directory">{t('nav_directory')}</Link></li> 
          <li><Link to="/about">{t('nav_about')}</Link></li> 

          {/* ⬅️ احراز هویت */}
          {isLoggedIn ? (
            <>
              <li style={{fontWeight: 'bold', color: '#007bff'}}>
                {displayUserName} 
              </li>
              <li>
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