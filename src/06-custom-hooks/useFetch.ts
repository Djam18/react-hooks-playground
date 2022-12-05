import { useState, useEffect } from 'react';

// J'aurais du faire ca depuis le debut.
// Generics pour useFetch<T> — TypeScript force la rigueur
// maintenant le caller sait exactement ce qu'il reçoit

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(url: string): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<T>;
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        if (err.name === 'AbortError') return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;

// Usage:
// const { data, loading, error } = useFetch<User[]>('/api/users');
// → TypeScript knows data is User[] | null — no more any!
