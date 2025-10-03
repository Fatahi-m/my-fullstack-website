// src/pages/Home.jsx - نهایی کردن چیدمان برای دسکتاپ

import React from 'react';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';
import NewsSection from '../components/NewsSection';
import DirectorySection from '../components/DirectorySection';

const Home = () => {
  const { t } = useTranslation(); 
  return (
    <div className="container"> {/* ⬅️ ⬅️ ⬅️ این div برای اعمال max-width ضروری است */}
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