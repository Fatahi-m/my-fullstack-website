// src/components/Hero.jsx

import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <h1>دایرکتوری و اخبار جامع کسب‌وکارهای ایرانی</h1>
        <p>
          ما بزرگترین دایرکتوری کسب‌وکارها و منبع اخبار معتبر هستیم.
          کسب‌وکار خود را پیدا یا ثبت کنید و از آخرین رویدادها باخبر شوید.
        </p>
        <button className="cta-button">کسب‌وکار خود را ثبت کنید</button>
      </div>
    </section>
  );
};

export default Hero;