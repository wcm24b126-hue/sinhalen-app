import React, { createContext, useState, useContext, useEffect } from 'react';
import en from '../locales/en';
import si from '../locales/si';

const locales = { en, si };
const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('app_language') || 'si';
    });

    useEffect(() => {
        localStorage.setItem('app_language', language);
    }, [language]);

    const t = (key) => locales[language][key] || key;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat(language === 'si' ? 'si-LK' : 'en-LK', {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 2
        }).format(amount);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, formatCurrency }}>
            {children}
        </LanguageContext.Provider>
    );
};
