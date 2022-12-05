import { useState } from 'react';

// Generic useLocalStorage<T> — TypeScript version
// Avant: setValue(value) pouvait recevoir n'importe quoi
// Maintenant: setValue est typé, le compiler catch les erreurs

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error('useLocalStorage read error:', error);
      return initialValue;
    }
  });

  const setValue: SetValue<T> = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('useLocalStorage write error:', error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;

// Usage:
// const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
// → setTheme('invalid') → TypeScript error ✓
