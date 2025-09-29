// src/pages/AboutPage.jsx

import React from 'react';
import '../App.css'; 

const AboutPage = () => {
  return (
    <div className="container" style={{padding: '50px 0', textAlign: 'right', minHeight: '60vh'}}>
      <h1 style={{fontSize: '2.5rem', marginBottom: '25px', color: '#2c3e50'}}>
        درباره ما و اهداف ما
      </h1>
      <hr style={{marginBottom: '30px', borderColor: '#ddd'}} />

      <h2 style={{color: '#3498db', fontSize: '1.5rem', marginTop: '30px'}}>
        هدف ما
      </h2>
      <p style={{lineHeight: '1.8rem', fontSize: '1.1rem'}}>
        هدف اصلی ما در این پلتفرم، ایجاد یک مرجع جامع و قابل اعتماد برای تمامی کسب‌وکارهای ایرانی است. ما معتقدیم که با ارائه اطلاعات دقیق و به‌روز، می‌توانیم ارتباطات تجاری را تسهیل کرده و رشد اقتصادی را حمایت کنیم.
      </p>

      <h2 style={{color: '#3498db', fontSize: '1.5rem', marginTop: '30px'}}>
        تیم ما
      </h2>
      <p style={{lineHeight: '1.8rem', fontSize: '1.1rem'}}>
        ما تیمی متشکل از توسعه‌دهندگان وب (مانند شما!)، کارشناسان داده و متخصصان بازاریابی هستیم که متعهد به ارائه بهترین تجربه کاربری در این دایرکتوری هستیم. پروژه‌هایی مانند این، در قلب توسعه‌دهندگان جوان و خلاق قرار دارند.
      </p>
      
      {/* ⬅️ یک دکمه ساده برای نمایش توانایی افزودن اکشن */}
      <div style={{marginTop: '40px'}}>
        <button className="cta-button" style={{backgroundColor: '#1abc9c'}}>
          تماس با ما
        </button>
      </div>

    </div>
  );
};

export default AboutPage;