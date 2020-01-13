import React, { useState, useEffect } from 'react';

// V1: BUGGE! Race condition + pas d'AbortController
// j'ai passe 2h a debugger pourquoi ca faisait des infinite loops
function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log('DataFetcher rendered');

  useEffect(() => {
    // TODO: pourquoi [] ici? si je mets rien ca boucle a l'infini
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => {
        console.log('data fetched:', data.length, 'items');
        setData(data);
        setLoading(false);
      });
    // pas de cleanup - je sais pas encore que c'est necessaire
  }, []); // [] = run only once, like componentDidMount

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Data Fetcher</h3>
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
