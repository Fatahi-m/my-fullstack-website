// src/pages/NewsDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css'; 

const NewsDetailPage = () => {
  // ⬅️ دریافت پارامتر newsId از آدرس URL
  const { newsId } = useParams(); 
  const [newsItem, setNewsItem] = useState(null);
  
  // 🚨 آدرس بک‌اند آنلاین شما (لطفاً با آدرس دقیق خود جایگزین کنید)
  const API_URL = 'https://my-app-backend-gamma.vercel.app'; 

  useEffect(() => {
    // ⬅️ در آینده، این تابع باید به endpoint /api/news/ID درخواست دهد.
    
    // شبیه‌سازی دریافت داده:
    const fetchNewsDetail = async () => {
      // برای نمایش سریع، از داده‌های شبیه‌سازی‌شده استفاده می‌کنیم:
      const dummyData = {
          id: newsId,
          title: `عنوان کامل خبر شماره ${newsId}`,
          date: '۱۴۰۳/۰۶/۰۵',
          content: 'این متن کامل و مشروح خبر است. هدف از این صفحه، نمایش تمامی جزئیات و اطلاعاتی است که در صفحه اصلی به صورت خلاصه نمایش داده می‌شد. این قسمت از متن برای پر کردن فضا استفاده شده است تا ظاهر صفحه کامل به نظر برسد.',
          source: 'خبرگزاری داخلی',
      };
      // تأخیر کوتاه برای شبیه‌سازی لودینگ شبکه
      setTimeout(() => {
          setNewsItem(dummyData);
      }, 500);
    };

    fetchNewsDetail();
    
  }, [newsId]); // هر زمان که newsId در آدرس تغییر کند، دوباره اجرا می‌شود


  if (!newsItem) {
    return <h1 style={{textAlign: 'center', padding: '100px'}}>در حال بارگذاری جزئیات خبر...</h1>;
  }
  
  return (
    <div className="page-content" style={{maxWidth: '900px', margin: '0 auto', padding: '50px 20px'}}>
      
      <Link to="/news" style={{color: '#007bff', textDecoration: 'none'}}>&larr; بازگشت به صفحه اخبار</Link>
      
      <h1 style={{marginTop: '15px'}}>{newsItem.title}</h1>
      <p style={{fontSize: '0.9rem', color: '#666'}}>تاریخ انتشار: {newsItem.date} | منبع: {newsItem.source}</p>
      <hr style={{marginBottom: '30px'}} />
      
      <p style={{lineHeight: '2rem', fontSize: '1.1rem'}}>{newsItem.content}</p>
      
    </div>
  );
};

export default NewsDetailPage;