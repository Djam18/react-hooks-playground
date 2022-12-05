import { useState, useTransition, ReactNode } from 'react';

// TypeScript version — Transitions.js migrated to .tsx
// useTransition returns [boolean, TransitionStartFunction]
// TypeScript makes it explicit what goes into startTransition

interface SearchResult {
  id: number;
  title: string;
}

interface SlowSearchResultsProps {
  query: string;
}

function SlowSearchResults({ query }: SlowSearchResultsProps): JSX.Element {
  if (query) {
    const start = Date.now();
    while (Date.now() - start < 100) {}
  }

  const results: SearchResult[] = Array.from({ length: 500 }, (_, i) => ({
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

export default function TransitionsDemo(): JSX.Element {
  const [query, setQuery] = useState<string>('');
  const [deferredQuery, setDeferredQuery] = useState<string>('');
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setQuery(value);
    startTransition(() => {
      setDeferredQuery(value);
    });
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>useTransition Demo (TypeScript)</h2>
      <input
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        style={{ padding: '8px 12px', fontSize: 16, width: '100%', boxSizing: 'border-box' }}
      />
      {isPending && <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>Updating...</p>}
      <SlowSearchResults query={deferredQuery} />
    </div>
  );
}
