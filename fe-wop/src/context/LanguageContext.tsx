import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {translations} from "../translations/translations.ts";

type Language = 'en' | 'tr';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: keyof typeof translations['en']) => string; // Dil anahtarlarına göre çeviri döndüren fonksiyon
}

export const LanguageContext = createContext<LanguageContextType>({
    language: 'en',
    setLanguage: () => {},
    t: (key) => translations['en'][key], // Varsayılan olarak İngilizce çeviri döndüren bir fallback fonksiyonu
});

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(() => {
        return (localStorage.getItem('language') as Language) || 'en';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    // Dil anahtarlarına göre çeviriyi döndüren fonksiyon
    const t = (key: keyof typeof translations['en']) => {
        return translations[language][key];
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useTranslation must be used within a LanguageProvider');
    }
    return context;
};
