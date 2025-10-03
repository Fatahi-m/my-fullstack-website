// src/pages/Home.jsx - FINAL FIX

import React from 'react';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';
import NewsSection from '../components/NewsSection';
import DirectorySection from '../components/DirectorySection';

const Home = () => {
  const { t } = useTranslation(); 
  return (
    <div className="container" style={{maxWidth: '1200px', margin: '0 auto', padding: '0 20px'}}> {/* ⬅️ ⬅️ اعمال نهایی کانتینر در Home */}
      <Hero 
          title={t('site_title')} 
          slogan={t('site_slogan')}
          buttonText={t('button_register')}
      />
      <NewsSection />
      <DirectorySection />
    </div>
  );
};

export default Home;