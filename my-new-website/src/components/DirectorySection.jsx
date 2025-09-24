// src/components/DirectorySection.jsx

import React, { useState, useEffect } from 'react';
import BusinessCard from './BusinessCard';
import './DirectorySection.css';

const DirectorySection = () => {
  const [businesses, setBusinesses] = useState([]); // وضعیت (state) برای نگهداری داده‌های کسب‌وکار

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        // ارسال درخواست به آدرس API بک‌اند
        const response = await fetch('http://127.0.0.1:5000/api/businesses');
        const data = await response.json();
        setBusinesses(data); // ذخیره داده‌های دریافتی در وضعیت
      } catch (error) {
        console.error('There was an error fetching the businesses!', error);
      }
    };

    fetchBusinesses();
  }, []); // این تابع فقط یک بار اجرا می‌شود

  return (
    <section className="directory-section">
      <div className="container">
        <h2>دایرکتوری کسب‌وکارهای برتر</h2>
        <div className="business-grid">
          {businesses.map(item => (
            <BusinessCard
              key={item.id}
              name={item.name}
              category={item.category}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DirectorySection;