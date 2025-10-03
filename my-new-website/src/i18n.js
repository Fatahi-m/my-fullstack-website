// src/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// ⬅️ فایل‌های ترجمه (Translation Files)
import en from './locales/en/translation.json';
import de from './locales/de/translation.json';
import kmr from './locales/kmr/translation.json'; // کردی کورمانجی
import ckb from './locales/ckb/translation.json'; // کردی سورانی

const resources = {
  en: { translation: en },
  de: { translation: de },
  kmr: { translation: kmr }, 
  ckb: { translation: ckb }, 
};

i18n
  .use(LanguageDetector) // ⬅️ تشخیص زبان مرورگر کاربر
  .use(initReactI18next) // ⬅️ اتصال به React
  .init({
    resources,
    fallbackLng: 'en', // ⬅️ زبان پیش‌فرض در صورت نبود ترجمه
    debug: true,
    interpolation: {
      escapeValue: false, // React از قبل از XSS محافظت می‌کند
    },
  
   // ⬅️ این تابع، جهت (RTL/LTR) را بر اساس زبان تنظیم می‌کند
   detection: {
    order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
  },
  
  // ⬅️ تنظیم زبان‌های RTL
  detection: {
    order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
  },
  
  react: {
    // ⬅️ افزودن attribute 'dir' به html
    bindI18n: 'languageChanged',
    bindStore: false,
    useSuspense: true,
    
    // تابع کمکی برای تعیین جهت متن
    // 'ckb' و 'kmr' به عنوان RTL (راست‌چین) در نظر گرفته می‌شوند
    // 'de' و 'en' به عنوان LTR (چپ‌چین) در نظر گرفته می‌شوند
    setI18n: (i18n, instance) => {
      const rtlLangs = ['ckb', 'kmr']; // کدهای زبان کردی سورانی و کورمانجی
      const direction = rtlLangs.includes(instance.language) ? 'rtl' : 'ltr';
      document.documentElement.setAttribute('dir', direction);
    }
  }
});


export default i18n;