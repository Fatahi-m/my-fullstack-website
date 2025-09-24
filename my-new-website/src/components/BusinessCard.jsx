// src/components/BusinessCard.jsx

import React from 'react';
import './BusinessCard.css';

const BusinessCard = ({ name, category, imageUrl }) => {
  return (
    <div className="business-card">
      <img src={imageUrl} alt={name} className="business-image" />
      <div className="business-content">
        <h3>{name}</h3>
        <p className="business-category">{category}</p>
        <a href="#" className="view-details">مشاهده جزئیات</a>
      </div>
    </div>
  );
};

export default BusinessCard;