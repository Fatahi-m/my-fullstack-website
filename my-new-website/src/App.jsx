// src/App.jsx

import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NewsSection from './components/NewsSection';
import DirectorySection from './components/DirectorySection'; // کامپوننت DirectorySection را وارد می‌کنیم
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      
      <main>
        <Hero />
        <NewsSection />
        <DirectorySection /> {/* کامپوننت DirectorySection را اضافه می‌کنیم */}
      </main>

      <Footer />
    </div>
  );
}

export default App;