// src/pages/DirectoryPage.jsx

import React, { useState, useEffect } from 'react';
import BusinessCard from '../components/BusinessCard';
import '../components/DirectorySection.css';
import '../App.css'; 

const DirectoryPage = () => {
  const [businesses, setBusinesses] = useState([]); // لیست کامل دریافتی از API
  const [searchTerm, setSearchTerm] = useState(''); // وضعیت: متن جستجو
  const [filteredBusinesses, setFilteredBusinesses] = useState([]); // وضعیت: لیست فیلترشده
  
  // ⬅️ وضعیت جدید: لیست تمام دسته‌بندی‌های موجود
  const [categories, setCategories] = useState([]); 
  
  // ⬅️ وضعیت جدید: دسته‌بندی انتخاب شده توسط کاربر (پیش‌فرض: All)
  const [selectedCategory, setSelectedCategory] = useState('All'); 

  const API_URL = 'https://my-app-backend-gamma.vercel.app'; 

  // 1. دریافت داده‌ها از API و استخراج دسته‌بندی‌ها
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch(`${API_URL}/api/businesses`);
        const data = await response.json();
        
        setBusinesses(data);
        
        // ⬅️ استخراج دسته‌بندی‌های منحصر به فرد
        const allCategories = ['All', ...new Set(data.map(item => item.category))];
        setCategories(allCategories);
        
        setFilteredBusinesses(data); // لیست اولیه
      } catch (error) {
        console.error('Error fetching all businesses!', error);
      }
    };
    fetchBusinesses();
  }, []);

  // 2. اجرای منطق جستجو و فیلتر (اجرا در هر تغییر SearchTerm یا SelectedCategory)
  useEffect(() => {
    let finalFiltered = businesses.filter(business => {
      // فیلتر بر اساس متن جستجو
      const searchMatch = (
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      // ⬅️ فیلتر بر اساس دسته‌بندی انتخاب شده
      const categoryMatch = (
        selectedCategory === 'All' || business.category === selectedCategory
      );

      return searchMatch && categoryMatch;
    });
    
    setFilteredBusinesses(finalFiltered);
  }, [searchTerm, selectedCategory, businesses]); // ⬅️ این Effect به هر سه متغیر وابسته است


  // 3. تابع مدیریت تغییرات در نوار جستجو
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // ⬅️ تابع جدید برای مدیریت تغییرات منوی کشویی
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };


  return (
    <div className="page-content">
      <div className="container" style={{paddingTop: '2rem', paddingBottom: '4rem'}}>
        <h1>دایرکتوری کامل کسب‌وکارها</h1>
        <hr />
        
        {/* ⬅️ بخش کنترل‌ها: جستجو و فیلتر */}
        <div className="directory-controls"> 
          
          {/* نوار جستجو */}
          <input
            type="text"
            placeholder="جستجو بر اساس نام..."
            value={searchTerm}
            onChange={handleSearchChange}
          />

          {/* ⬅️ منوی کشویی فیلتر */}
          <select 
            value={selectedCategory} 
            onChange={handleCategoryChange}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'همه دسته‌بندی‌ها' : cat}
              </option>
            ))}
          </select>
        </div>
        
        {/* نمایش لیست فیلترشده */}
        <div className="business-grid">
          {filteredBusinesses.map(item => (
            <BusinessCard
              key={item.id}
              id={item.id} 
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