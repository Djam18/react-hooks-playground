import { useState, useEffect } from 'react';

// Generic useDebounce<T> — le type est inféré automatiquement
// useDebounce('hello', 300) → returns string
// useDebounce(42, 300) → returns number
// useDebounce({ q: 'search' }, 300) → returns { q: string }

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
