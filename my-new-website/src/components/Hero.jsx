// src/components/Hero.jsx

import React from 'react';
import './Hero.css';

// ⬅️ دریافت متون ترجمه شده به عنوان props
const Hero = ({ title, slogan, buttonText }) => { 
  return (
    <section className="hero">
      <div className="container">
        <h1>{title}</h1> {/* ⬅️ استفاده از عنوان ترجمه شده */}
        <p>
          {slogan} {/* ⬅️ استفاده از شعار ترجمه شده */}
        </p>
        <button className="cta-button">{buttonText}</button> {/* ⬅️ استفاده از متن دکمه ترجمه شده */}
      </div>
    </section>
  );
};

export default Hero;