// src/App.jsx

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// ⬅️ وارد کردن کامپوننت‌های نهایی صفحات از پوشه 'pages'
import Home from './pages/Home';
import NewsPage from './pages/NewsPage'; 
import DirectoryPage from './pages/DirectoryPage'; 
import NewsDetailPage from './pages/NewsDetailPage'; 
import BusinessDetailPage from './pages/BusinessDetailPage'; // ⬅️ کامپوننت نهایی جزئیات کسب‌وکار وارد شد

// ⬅️ تعریف کامپوننت‌های ساده (موقت)
const AboutPage = () => <h1>صفحه درباره ما</h1>; 


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <main>
          <Routes>
            {/* مسیر صفحه اصلی */}
            <Route path="/" element={<Home />} />
            
            {/* مسیر صفحه اخبار */}
            <Route path="/news" element={<NewsPage />} /> 
            
            {/* مسیر صفحه دایرکتوری */}
            <Route path="/directory" element={<DirectoryPage />} /> 
            
            {/* مسیر پویا برای جزئیات خبر */}
            <Route path="/news/:newsId" element={<NewsDetailPage />} /> 

            {/* مسیر پویا برای جزئیات کسب‌وکار */}
            <Route path="/business/:businessId" element={<BusinessDetailPage />} /> 

            {/* مسیر درباره ما (موقت) */}
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