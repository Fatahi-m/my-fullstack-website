// src/components/NewsSection.jsx

import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import './NewsSection.css';

const NewsSection = () => {
  const [news, setNews] = useState([]);

  // آدرس بک‌اند آنلاین Vercel شما (لطفا با آدرس دقیق خود جایگزین کنید)
  const API_URL = 'https://my-app-backend-gamma.vercel.app'; 

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${API_URL}/api/news`);
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('There was an error fetching the news!', error);
      }
    };

    fetchNews();
  }, []); 

  return (
    <section className="news-section">
      <div className="container">
        <h2>آخرین اخبار و رویدادها</h2>
        <div className="news-grid">
          {news.map(item => (
            <NewsCard
              key={item.id}
              id={item.id}  // ارسال ID برای مسیریابی پویا
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