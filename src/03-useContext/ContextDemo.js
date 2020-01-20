import React from 'react';
import { useTheme } from './ThemeContext';
import { useAuth } from './AuthContext';
import { useLocale } from './LocaleContext';

function ContextDemo() {
  const { theme, toggleTheme } = useTheme();
  const { user, login, logout } = useAuth();
  const { locale, setLocale, t } = useLocale();

  console.log('ContextDemo rendered', { theme, user, locale });

  const bgColor = theme === 'dark' ? '#333' : '#fff';
  const textColor = theme === 'dark' ? '#fff' : '#333';

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px', backgroundColor: bgColor, color: textColor }}>
      <h3>Context Demo (3 contexts stacked)</h3>

      <div style={{ marginBottom: '10px' }}>
        <strong>Theme:</strong> {theme}
        <button onClick={toggleTheme} style={{ marginLeft: '10px' }}>Toggle Theme</button>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <strong>Auth:</strong> {user ? `${user.name} (${user.role})` : 'Not logged in'}
        {user ? (
          <button onClick={logout} style={{ marginLeft: '10px' }}>Logout</button>
        ) : (
          <button onClick={() => login('abdel')} style={{ marginLeft: '10px' }}>Login as abdel</button>
        )}
      </div>

      <div style={{ marginBottom: '10px' }}>
        <strong>Locale:</strong> {locale}
        <select value={locale} onChange={e => setLocale(e.target.value)} style={{ marginLeft: '10px' }}>
          <option value="en">EN</option>
          <option value="fr">FR</option>
          <option value="es">ES</option>
        </select>
      </div>

      <div style={{ marginTop: '10px', padding: '10px', backgroundColor: theme === 'dark' ? '#555' : '#f5f5f5' }}>
        <p>{t('hello')} {user ? user.name : 'World'}!</p>
        <p>{t('welcome')}</p>
      </div>
    </div>
  );
}

export default ContextDemo;
