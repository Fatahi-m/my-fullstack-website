import React from 'react';
import { Link } from 'react-router-dom'; 
import './NewsCard.css';

const NewsCard = ({ title, description, imageUrl, id }) => { 
  return (
    <div className="news-card">
      <img src={imageUrl} alt={title} className="news-image" />
      <div className="news-content">
        <h3>{title}</h3>
        <p>{description}</p>
        {/* ⬅️ استفاده صحیح از id برای ساخت لینک پویا */}
        <Link to={`/news/${id}`} className="read-more">مطالعه بیشتر</Link> 
      </div>
    </div>
  );
};

export default NewsCard;