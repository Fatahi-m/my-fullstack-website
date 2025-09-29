// src/App.jsx

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// ⬅️ وارد کردن کامپوننت‌های نهایی صفحات از پوشه 'pages' (فقط یک بار!)
import Home from './pages/Home';
import NewsPage from './pages/NewsPage'; 
import DirectoryPage from './pages/DirectoryPage'; 
import NewsDetailPage from './pages/NewsDetailPage'; 
import BusinessDetailPage from './pages/BusinessDetailPage';
import LoginPage from './pages/LoginPage'; // ⬅️ کامپوننت نهایی ورود
import SignUpPage from './pages/SignUpPage'; // ⬅️ کامپوننت نهایی ثبت نام
import AboutPage from './pages/AboutPage';



function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <main>
          <Routes>
            {/* مسیرهای اصلی */}
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<NewsPage />} /> 
            <Route path="/directory" element={<DirectoryPage />} /> 
            
            {/* مسیرهای پویا (جزئیات) */}
            <Route path="/news/:newsId" element={<NewsDetailPage />} /> 
            <Route path="/business/:businessId" element={<BusinessDetailPage />} /> 

            {/* ⬅️ مسیرهای جدید احراز هویت */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} /> 

            {/* مسیرهای ساده */}
            <Route path="/about" element={<AboutPage />} />
            
            {/* مسیر خطای 404 */}
            <Route path="*" element={<h1>404: صفحه پیدا نشد!</h1>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;