// src/components/DirectorySection.jsx

import React, { useState, useEffect } from 'react';
import BusinessCard from './BusinessCard';
import './DirectorySection.css';

const DirectorySection = () => {
  const [businesses, setBusinesses] = useState([]); // وضعیت (state) برای نگهداری داده‌های کسب‌وکار

  // ⬅️ اینجا آدرس بک‌اند آنلاین Vercel شما تعریف می‌شود.
  // لطفاً این آدرس را با آدرس دامنه اصلی Vercel خود جایگزین کنید!
  const API_URL = 'https://my-app-backend-gamma.vercel.app'; 

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        // ارسال درخواست به آدرس API بک‌اند آنلاین
        const response = await fetch(`${API_URL}/api/businesses`);
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