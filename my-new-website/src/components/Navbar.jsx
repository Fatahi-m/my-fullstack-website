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
  
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' },
    { code: 'ckb', label: 'کوردی سۆرانی' },
    { code: 'kmr', label: 'Kurdî Kurmancî' },
  ];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    if (isMenuOpen) {
        setIsMenuOpen(false);
    }
  };

  const handleLogout = async () => { 
    // ... (منطق خروج) ...
    logout();
    navigate('/'); 
    alert('شما با موفقیت از سیستم خارج شدید.'); 
  };

  const displayUserName = user ? (user.username || user.email) : 'مهمان';

  return (
    <nav className="navbar">
      <div className="container">
        
        <Link to="/" className="logo"> 
          {t('nav_home')} 
        </Link>
        
        {/* ⬅️ دکمه همبرگری */}
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>

        {/* ⬅️ ⬅️ ⬅️ گروه اصلی لینک‌ها و زبان‌ها */}
        <div className={`nav-links-wrapper ${isMenuOpen ? 'mobile-open' : ''}`}> 
            
            {/* 1. سوئیچ زبان (حالا این فقط یک div است) */}
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

            {/* 2. لینک‌های ناوبری اصلی */}
            <ul className="nav-links">
              
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
                    <button onClick={handleLogout} className="cta-button" style={{padding: '5px 10px', fontSize: '0.9rem', backgroundColor: '#c0392b', color: 'white'}}>
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
      </div>
    </nav>
  );
};

export default Navbar;