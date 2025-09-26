// src/pages/NewsPage.jsx

import React, { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';
import '../components/NewsSection.css'; // ⬅️ از استایل‌های قبلی استفاده می‌کنیم
import '../App.css'; // ⬅️ برای استایل‌دهی کل صفحه

const NewsPage = () => {
  const [news, setNews] = useState([]);
  
  // ⬅️ آدرس بک‌اند آنلاین خود را اینجا وارد کنید
  const API_URL = 'https://my-app-backend-gamma.vercel.app'; 

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // دریافت داده از API
        const response = await fetch(`${API_URL}/api/news`);
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching all news!', error);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="page-content"> {/* کلاس عمومی برای محتوای صفحه */}
      <div className="container" style={{paddingTop: '2rem', paddingBottom: '4rem'}}>
        <h1>همه اخبار و رویدادها</h1>
        <hr />
        
        {/* نمایش لیست کامل اخبار در یک گرید */}
        <div className="news-grid">
          {news.map(item => (
            <NewsCard
              key={item.id}
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
        
        {/* اگر خبرهای بیشتری وجود داشته باشند، دکمه‌ای برای نمایش همه */}
        {news.length > 0 && (
            <div style={{textAlign: 'center', marginTop: '30px'}}>
                <button className="cta-button">نمایش بیشتر</button>
            </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;