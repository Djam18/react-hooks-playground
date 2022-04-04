import { useState, useTransition, Suspense } from 'react';

// React 18 c'est le plus gros upgrade depuis les Hooks
// useTransition permet de marquer des updates comme "non urgentes"
// -> l'UI reste responsive pendant les updates lentes

// Simule une liste de résultats de recherche lente
function SlowSearchResults({ query }) {
  // Simule un composant qui prend du temps à rendre
  if (query) {
    // Simule un délai de rendu (ne pas faire ça en prod !)
    const start = Date.now();
    while (Date.now() - start < 100) {}
  }

  const results = Array.from({ length: 500 }, (_, i) => ({
    id: i,
    title: `Result ${i + 1} for "${query}"`,
  })).filter(r => r.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <ul style={{ maxHeight: 300, overflow: 'auto', margin: 0, padding: '0 0 0 20px' }}>
      {results.map(r => (
        <li key={r.id}>{r.title}</li>
      ))}
    </ul>
  );
}

export default function TransitionsDemo() {
  const [query, setQuery] = useState('');
  const [deferredQuery, setDeferredQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value); // mise à jour urgente — input reste fluide

    startTransition(() => {
      setDeferredQuery(value); // mise à jour non-urgente — peut être interrompue
    });
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>useTransition Demo</h2>
      <p style={{ color: '#666' }}>
        Sans useTransition, chaque frappe déclenche le rendu lent.<br />
        Avec useTransition, l'input reste fluide et le rendu lent est différé.
      </p>

      <input
        value={query}
        onChange={handleChange}
        placeholder="Search (try typing fast)..."
        style={{ padding: '8px 12px', fontSize: 16, width: '100%', boxSizing: 'border-box' }}
      />

      {isPending && (
        <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>Updating results...</p>
      )}

      <SlowSearchResults query={deferredQuery} />
    </div>
  );
}

// Exemple avec navigation lente
export function NavigationWithTransition() {
  const [page, setPage] = useState('home');
  const [isPending, startTransition] = useTransition();

  const pages = {
    home: <div><h3>Home Page</h3><p>Welcome home!</p></div>,
    about: <div><h3>About Page</h3><p>About us...</p></div>,
    contact: <div><h3>Contact Page</h3><p>Contact us...</p></div>,
  };

  function navigate(newPage) {
    startTransition(() => {
      setPage(newPage);
    });
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Navigation with useTransition</h2>
      <nav style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {Object.keys(pages).map(p => (
          <button
            key={p}
            onClick={() => navigate(p)}
            style={{
              padding: '8px 16px',
              background: page === p ? '#3b82f6' : '#e5e7eb',
              color: page === p ? 'white' : 'black',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              opacity: isPending ? 0.7 : 1,
            }}
          >
            {p}
          </button>
        ))}
      </nav>
      {isPending ? <p>Loading...</p> : pages[page]}
    </div>
  );
}
