// src/components/BusinessCard.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // ⬅️ Link را وارد می‌کنیم
import './BusinessCard.css';

// ⬅️ businessId را به عنوان prop دریافت می‌کنیم
const BusinessCard = ({ name, category, imageUrl, id }) => { 
  return (
    <div className="business-card">
      <img src={imageUrl} alt={name} className="business-image" />
      <div className="business-content">
        <h3>{name}</h3>
        <p className="business-category">{category}</p>
        {/* ⬅️ استفاده از Link برای ساخت آدرس پویا */}
        <Link to={`/business/${id}`} className="view-details">مشاهده جزئیات</Link> 
      </div>
    </div>
  );
};

export default BusinessCard;