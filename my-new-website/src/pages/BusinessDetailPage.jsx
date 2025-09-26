// src/pages/BusinessDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css'; 

const BusinessDetailPage = () => {
  // ⬅️ دریافت پارامتر businessId از آدرس URL
  const { businessId } = useParams(); 
  const [business, setBusiness] = useState(null);
  
  // 🚨 آدرس بک‌اند آنلاین شما (لطفاً با آدرس دقیق خود جایگزین کنید)
  const API_URL = 'https://my-app-backend-gamma.vercel.app'; 

  useEffect(() => {
    // ⬅️ در آینده، این تابع باید به endpoint /api/businesses/ID درخواست دهد.
    
    // شبیه‌سازی دریافت داده:
    const fetchBusinessDetail = async () => {
      // برای نمایش سریع، از داده‌های شبیه‌سازی‌شده استفاده می‌کنیم:
      const dummyData = {
          id: businessId,
          name: `کسب‌وکار شماره ${businessId}`,
          category: 'خدمات فنی و مهندسی',
          description: 'این توضیحات کامل و جامع کسب‌وکار است. اینجا تمام اطلاعات تماس، جزئیات خدمات، ساعات کاری و آدرس‌های شعبه‌های مختلف نمایش داده می‌شود. هدف این صفحه ارائه اطلاعات کامل به مشتریان است.',
          contact: '۰۹۱۲-۱۰۰-۰۰۰۰',
          address: 'تهران، خیابان ولیعصر، برج تجارت، طبقه ۱۲',
      };
      // تأخیر کوتاه برای شبیه‌سازی لودینگ شبکه
      setTimeout(() => {
          setBusiness(dummyData);
      }, 500);
    };

    fetchBusinessDetail();
    
  }, [businessId]); 


  if (!business) {
    return <h1 style={{textAlign: 'center', padding: '100px'}}>در حال بارگذاری جزئیات کسب‌وکار...</h1>;
  }
  
  return (
    <div className="page-content" style={{maxWidth: '900px', margin: '0 auto', padding: '50px 20px'}}>
      
      <Link to="/directory" style={{color: '#007bff', textDecoration: 'none'}}>&larr; بازگشت به دایرکتوری</Link>
      
      <h1 style={{marginTop: '15px'}}>{business.name}</h1>
      <p style={{fontSize: '1.2rem', color: '#007bff'}}>دسته‌بندی: {business.category}</p>
      <hr style={{marginBottom: '30px'}} />
      
      <p style={{lineHeight: '1.8rem'}}>{business.description}</p>
      
      <h2>اطلاعات تماس</h2>
      <p>تلفن: <strong>{business.contact}</strong></p>
      <p>آدرس: <strong>{business.address}</strong></p>
      
    </div>
  );
};

export default BusinessDetailPage;