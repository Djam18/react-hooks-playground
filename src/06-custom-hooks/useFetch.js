import { useState, useEffect } from 'react';

// MOMENT EUREKA:
// "Custom hooks are like Python decorators!
// I can COMPOSE logic! This is powerful!"
// useFetch utilise useState + useEffect + useCallback
// PROBLEM: doesn't handle cache or dedup - every call makes a new fetch
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        if (err.name === 'AbortError') return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
