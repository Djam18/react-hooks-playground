import React, { createContext, useContext, useState } from 'react';

const LocaleContext = createContext(null);

const translations = {
  en: { hello: 'Hello', goodbye: 'Goodbye', welcome: 'Welcome' },
  fr: { hello: 'Bonjour', goodbye: 'Au revoir', welcome: 'Bienvenue' },
  es: { hello: 'Hola', goodbye: 'Adios', welcome: 'Bienvenido' },
};

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState('en');

  const t = (key) => translations[locale][key] || key;

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

export default LocaleContext;
