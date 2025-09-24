// src/components/NewsCard.jsx

import React from 'react';
import './NewsCard.css';

const NewsCard = ({ title, description, imageUrl }) => {
  return (
    <div className="news-card">
      <img src={imageUrl} alt={title} className="news-image" />
      <div className="news-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <a href="#" className="read-more">مطالعه بیشتر</a>
      </div>
    </div>
  );
};

export default NewsCard;