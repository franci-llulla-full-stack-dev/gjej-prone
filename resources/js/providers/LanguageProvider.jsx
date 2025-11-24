import React, { createContext, useState, useContext } from 'react';
import en from '../../lang/en/en.jsx';
import sq from '../../lang/sq/sq.jsx';

const translations = { en, sq };

const LanguageContext = createContext();

export const LanguageProvider = ({ children, defaultLocale = 'sq' }) => {
    const [locale, setLocale] = useState(defaultLocale);

    const t = (key) => {
        return translations[locale][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
