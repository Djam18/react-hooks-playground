import { useState } from 'react';

// useState + localStorage sync
// feels like a Python decorator!
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('useLocalStorage read error:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
      console.log('localStorage set:', key, '=', value);
    } catch (error) {
      console.error('useLocalStorage write error:', error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
