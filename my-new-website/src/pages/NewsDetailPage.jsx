// src/pages/NewsDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css'; 

const NewsDetailPage = () => {
  const { newsId } = useParams(); 
  const [newsItem, setNewsItem] = useState(null);
  
  // ⬅️ آدرس بک‌اند آنلاین خود را اینجا وارد کنید
  const API_URL = 'https://my-app-backend-gamma.vercel.app'; 

  useEffect(() => {
    const fetchNewsDetail = async () => {
      // ⬅️ بررسی حیاتی: اگر newsId تعریف نشده باشد، درخواست ارسال نمی‌شود
      if (!newsId) {
        console.error("Error: newsId is undefined. Cannot fetch data.");
        return; // خروج از تابع
      }

      try {
        const finalUrl = `${API_URL}/api/news/${newsId}`;
        console.log("Fetching News Detail from URL:", finalUrl); // ⬅️ مجدداً برای اطمینان از URL
        
        const response = await fetch(finalUrl); 
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setNewsItem(data);
      } catch (error) {
        console.error('Error fetching news detail:', error);
      }
    };
    fetchNewsDetail();
  }, [newsId]);


  if (!newsItem) {
    // ⬅️ تغییر برای نمایش خطا در صورت عدم وجود newsId
    if (!newsId) {
      return <h1 style={{textAlign: 'center', padding: '100px', color: 'red'}}>خطا: شناسه خبر پیدا نشد!</h1>;
    }
    return <h1 style={{textAlign: 'center', padding: '100px'}}>در حال بارگذاری جزئیات خبر...</h1>;
  }
  
  // ... بقیه کد
  return (
    <div className="page-content" style={{maxWidth: '900px', margin: '0 auto', padding: '50px 20px'}}>
      
      <Link to="/news" style={{color: '#007bff', textDecoration: 'none'}}>&larr; بازگشت به صفحه اخبار</Link>
      
      <h1 style={{marginTop: '15px'}}>{newsItem.title}</h1>
      <hr style={{marginBottom: '30px'}} />
      
      <p style={{lineHeight: '2rem', fontSize: '1.1rem'}}>{newsItem.content}</p>
      
    </div>
  );
};

export default NewsDetailPage;