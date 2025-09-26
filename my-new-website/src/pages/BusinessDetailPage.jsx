// src/pages/BusinessDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css'; 

const BusinessDetailPage = () => {
  const { businessId } = useParams(); 
  const [business, setBusiness] = useState(null);
  
  // ⬅️ آدرس بک‌اند آنلاین خود را اینجا وارد کنید
  const API_URL = 'https://my-app-backend-gamma.vercel.app'; 

  useEffect(() => {
    const fetchBusinessDetail = async () => {
      try {
        const response = await fetch(`${API_URL}/api/businesses/${businessId}`); // ⬅️ درخواست به API جدید
        if (!response.ok) {
          throw new Error('Business not found!');
        }
        const data = await response.json();
        setBusiness(data);
      } catch (error) {
        console.error('Error fetching business detail:', error);
      }
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