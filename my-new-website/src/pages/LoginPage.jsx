// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 🚨 آدرس بک‌اند آنلاین شما (لطفاً مطمئن شوید که صحیح باشد)
    const API_URL = 'https://my-app-backend-gamma.vercel.app'; 

    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), 
        });

        const data = await response.json(); 

        if (response.status === 200) {
            alert('ورود موفقیت آمیز!');
            
            // ⬅️ به‌روزرسانی نهایی: ذخیره username دریافتی از API
            login({ 
                userId: data.user_id, 
                email: formData.email,
                username: data.username // ⬅️ ⬅️ ⬅️ ذخیره نام کاربری برای نمایش در Navbar
            }); 
            
            navigate('/'); 
            
        } else {
            alert(`خطا در ورود: ${data.message || 'اعتبار سنجی ناموفق'}`);
        }
    } catch (error) {
        console.error('Network or server error:', error);
        alert('خطا در ارتباط با سرور.');
    }
  };

  return (
    // ⬅️ استایل اینلاین برای مرکز قرار دادن و پس زمینه
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px 20px', minHeight: '80vh', backgroundColor: '#f4f7f6'}}>
      
      {/* ⬅️ استایل اینلاین برای جعبه فرم */}
      <form onSubmit={handleSubmit} 
            style={{background: '#fff', padding: '35px 40px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'right'}}>
        
        <h2 style={{textAlign: 'center', marginBottom: '25px', fontSize: '1.8rem', color: '#2c3e50'}}>ورود به حساب کاربری</h2>

        <label htmlFor="email" style={{display: 'block', marginBottom: '8px', marginTop: '15px', fontWeight: '600', color: '#34985e'}}>ایمیل:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
               style={{width: '100%', padding: '12px 15px', marginBottom: '15px', border: '1px solid #dfe6e9', borderRadius: '6px', boxSizing: 'border-box', fontSize: '1rem', direction: 'ltr', textAlign: 'left'}}/>

        <label htmlFor="password" style={{display: 'block', marginBottom: '8px', marginTop: '15px', fontWeight: '600', color: '#34985e'}}>رمز عبور:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required
               style={{width: '100%', padding: '12px 15px', marginBottom: '15px', border: '1px solid #dfe6e9', borderRadius: '6px', boxSizing: 'border-box', fontSize: '1rem', direction: 'ltr', textAlign: 'left'}}/>

        <button type="submit" 
                style={{width: '100%', backgroundColor: '#3498db', color: 'white', padding: '12px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1.1rem', marginTop: '20px', transition: 'background-color 0.3s ease'}}>ورود</button>

        <p style={{textAlign: 'center', marginTop: '20px', fontSize: '0.95rem', color: '#2c3e50'}}>
          حساب کاربری ندارید؟ <Link to="/signup" style={{color: '#3498db', textDecoration: 'none'}}>ثبت نام کنید</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;