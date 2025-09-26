// src/pages/Home.jsx

import React from 'react';
import Hero from '../components/Hero';
import NewsSection from '../components/NewsSection';
import DirectorySection from '../components/DirectorySection';

const Home = () => {
  return (
    <>
      <Hero />
      <NewsSection />
      <DirectorySection />
    </>
  );
};

export default Home;