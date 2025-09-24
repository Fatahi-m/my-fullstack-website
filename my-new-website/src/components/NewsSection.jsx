// src/components/NewsSection.jsx

import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import './NewsSection.css';

const NewsSection = () => {
  // استفاده از useState برای نگهداری داده‌های اخبار
  const [news, setNews] = useState([]);

  // استفاده از useEffect برای دریافت داده‌ها از API هنگام بارگذاری کامپوننت
  useEffect(() => {
    // تابع برای ارسال درخواست به بک‌اند
    const fetchNews = async () => {
      try {
        // ارسال درخواست به آدرس API بک‌اند Flask
        const response = await fetch('http://127.0.0.1:5000/api/news');
        const data = await response.json();
        // ذخیره داده‌های دریافتی در وضعیت (state)
        setNews(data);
      } catch (error) {
        // مدیریت خطا در صورت عدم موفقیت درخواست
        console.error('There was an error fetching the news!', error);
      }
    };

    fetchNews();
  }, []); // آرایه خالی به React می‌گوید که این تابع فقط یک بار اجرا شود

  return (
    <section className="news-section">
      <div className="container">
        <h2>آخرین اخبار و رویدادها</h2>
        <div className="news-grid">
          {/* نمایش کارت‌های خبری با استفاده از داده‌های دریافتی */}
          {news.map(item => (
            <NewsCard
              key={item.id}
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;