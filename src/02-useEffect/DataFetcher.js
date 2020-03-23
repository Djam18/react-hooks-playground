import React, { useState, useEffect } from 'react';

// FIX: AbortController to cancel the fetch if component unmounts
// read the React docs... it's like signal in Django DRF
function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log('DataFetcher rendered');

  useEffect(() => {
    const controller = new AbortController();

    fetch('https://jsonplaceholder.typicode.com/posts', { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        console.log('data fetched:', data.length, 'items');
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted');
          return;
        }
        console.error('fetch error:', err);
        setLoading(false);
      });

    return () => controller.abort(); // cleanup: cancel the fetch on unmount
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Data Fetcher (fixed)</h3>
      <p>Fetched {data.length} posts</p>
      <ul style={{ maxHeight: '200px', overflow: 'auto' }}>
        {data.slice(0, 5).map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default DataFetcher;
