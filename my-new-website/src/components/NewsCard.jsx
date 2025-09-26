// src/components/NewsCard.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // ⬅️ Link را وارد می‌کنیم
import './NewsCard.css';

// ⬅️ id را به عنوان prop دریافت می‌کنیم
const NewsCard = ({ title, description, imageUrl, id }) => { 
  return (
    <div className="news-card">
      <img src={imageUrl} alt={title} className="news-image" />
      <div className="news-content">
        <h3>{title}</h3>
        <p>{description}</p>
        {/* ⬅️ ساخت لینک پویا به مسیر /news/:id */}
        <Link to={`/news/${id}`} className="read-more">مطالعه بیشتر</Link> 
      </div>
    </div>
  );
};

export default NewsCard;