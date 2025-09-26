// src/pages/DirectoryPage.jsx

import React, { useState, useEffect } from 'react';
import BusinessCard from '../components/BusinessCard';
import '../components/DirectorySection.css';
import '../App.css'; 

const DirectoryPage = () => {
  const [businesses, setBusinesses] = useState([]); // لیست کامل دریافتی از API
  const [searchTerm, setSearchTerm] = useState(''); // وضعیت جدید: متن جستجو
  const [filteredBusinesses, setFilteredBusinesses] = useState([]); // وضعیت جدید: لیست فیلترشده
  
  const API_URL = 'https://my-app-backend-gamma.vercel.app'; 

  // 1. دریافت داده‌ها از API
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch(`${API_URL}/api/businesses`);
        const data = await response.json();
        setBusinesses(data);
        setFilteredBusinesses(data);
      } catch (error) {
        console.error('Error fetching all businesses!', error);
      }
    };
    fetchBusinesses();
  }, []);

  // 2. اجرای منطق جستجو و فیلتر
  useEffect(() => {
    const filterBusinesses = businesses.filter(business => {
      // جستجو بر اساس نام یا دسته‌بندی
      return (
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredBusinesses(filterBusinesses);
  }, [searchTerm, businesses]);


  // 3. تابع مدیریت تغییرات در نوار جستجو
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  return (
    <div className="page-content">
      <div className="container" style={{paddingTop: '2rem', paddingBottom: '4rem'}}>
        <h1>دایرکتوری کامل کسب‌وکارها</h1>
        <hr />
        
        {/* ⬅️ نوار جستجو با کلاس CSS برای استایل‌دهی بهتر */}
        <div className="directory-search-container">
          <input
            type="text"
            placeholder="جستجو بر اساس نام یا دسته‌بندی..."
            value={searchTerm}
            onChange={handleSearchChange}
            // ⬅️ استایل‌های اینلاین حذف شدند
          />
        </div>
        
        {/* نمایش لیست فیلترشده */}
        <div className="business-grid">
          {filteredBusinesses.map(item => (
            <BusinessCard
              key={item.id}
              name={item.name}
              category={item.category}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
        
        {filteredBusinesses.length === 0 && (
          <p style={{textAlign: 'center', fontSize: '1.2rem', marginTop: '50px'}}>کسب‌وکاری با این مشخصات پیدا نشد.</p>
        )}
        
        {/* دکمه برای قابلیت‌های آینده */}
        {businesses.length > 0 && (
            <div style={{textAlign: 'center', marginTop: '30px'}}>
                <button className="cta-button">مشاهده بیشتر</button>
            </div>
        )}
      </div>
    </div>
  );
};

export default DirectoryPage;