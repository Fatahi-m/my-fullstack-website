// src/components/BusinessCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './BusinessCard.css';

const BusinessCard = ({ name, category, imageUrl, id }) => { 
  return (
    <div className="business-card">
      <img src={imageUrl} alt={name} className="business-image" />
      <div className="business-content">
        <h3>{name}</h3>
        <p className="business-category">{category}</p>
        {/* ⬅️ استفاده صحیح از id برای ساخت لینک پویا */}
        <Link to={`/business/${id}`} className="view-details">مشاهده جزئیات</Link> 
      </div>
    </div>
  );
};

export default BusinessCard;