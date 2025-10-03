// src/pages/Home.jsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';
import NewsSection from '../components/NewsSection';
import DirectorySection from '../components/DirectorySection';

const Home = () => {
 const { t } = useTranslation(); 
  return (
    <>
      <Hero 
          title={t('site_title')} 
          slogan={t('site_slogan')}
          buttonText={t('button_register')}
      />
      <NewsSection />
      <DirectorySection />
    </>
  );
};

export default Home;