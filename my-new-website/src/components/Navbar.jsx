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
  
  // ⬅️ لیست زبان‌های پشتیبانی شده
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' },
    { code: 'ckb', label: 'کوردی سۆرانی' },
    { code: 'kmr', label: 'Kurdî Kurmancî' },
  ];

  // ⬅️ تابع برای تغییر زبان با کلیک بر روی دکمه
  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    // در حالت موبایل، پس از انتخاب زبان، منو بسته شود
    if (isMenuOpen) {
        setIsMenuOpen(false);
    }
  };

  const handleLogout = async () => { 
    // ... (منطق خروج بدون نمایش خطای شبکه)
    logout();
    navigate('/'); 
    alert('شما با موفقیت از سیستم خارج شدید.'); 
  };

  const displayUserName = user ? (user.username || user.email) : 'مهمان';

  return (
    <nav className="navbar">
      <div className="container">
        {/* ⬅️ لوگو/عنوان سایت (نیاز به nav_home در translation.json دارد) */}
        <Link to="/" className="logo"> 
          {t('nav_home')} 
        </Link>
        
        {/* ⬅️ ⬅️ سوئیچ زبان (گروه اول) */}
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
        
        {/* ⬅️ دکمه همبرگری (فقط در موبایل نمایش داده می‌شود) */}
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>

        {/* ⬅️ لینک‌های اصلی ناوبری و احراز هویت (گروه دوم) */}
        <ul className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
          
          <li><Link to="/news">{t('nav_news')}</Link></li> 
          <li><Link to="/directory">{t('nav_directory')}</Link></li> 
          <li><Link to="/about">{t('nav_about')}</Link></li> 

          {/* ⬅️ احراز هویت */}
          {isLoggedIn ? (
            // ... (منطق خروج) ...
            <li className="auth-item">
              <button onClick={handleLogout} className="cta-button" style={{/* ... */}}>خروج</button>
            </li>
          ) : (
            <>
              <li classNameauth-item><Link to="/login">ورود</Link></li>
              <li className="auth-item"><Link to="/signup">ثبت نام</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;