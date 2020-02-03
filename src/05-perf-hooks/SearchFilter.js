import React, { useState, useCallback, useMemo } from 'react';

// useCallback pour stabiliser les refs dans les child props
// je comprends pas encore exactement pourquoi... mais ca "marche"

const ResultItem = React.memo(function ResultItem({ item, onSelect }) {
  console.log('ResultItem rendered:', item.name); // pour voir les re-renders
  return (
    <li
      onClick={() => onSelect(item)}
      style={{ padding: '4px', cursor: 'pointer', borderBottom: '1px solid #eee' }}
    >
      {item.name} - {item.score}pts
    </li>
  );
});

const items = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  name: `Player ${i + 1}`,
  score: Math.floor(Math.random() * 1000),
}));

function SearchFilter() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  console.log('SearchFilter rendered');

  // useCallback pour que ResultItem.memo marche correctement
  // sans ca, onSelect est une nouvelle fonction a chaque render -> re-render inutile
  const handleSelect = useCallback((item) => {
    console.log('selected:', item.name);
    setSelected(item);
  }, []); // [] = la fonction ne change jamais

  // useMemo pour le filtrage - ok c'est utile ici
  const filtered = useMemo(() => {
    return items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Search Filter (useCallback + React.memo)</h3>
      <input
        placeholder="Search players..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ padding: '4px', marginBottom: '10px', width: '200px' }}
      />
      {selected && <p style={{ color: 'green' }}>Selected: {selected.name} ({selected.score}pts)</p>}
      <ul style={{ maxHeight: '150px', overflow: 'auto', listStyle: 'none', padding: 0 }}>
        {filtered.slice(0, 20).map(item => (
          <ResultItem key={item.id} item={item} onSelect={handleSelect} />
        ))}
      </ul>
      <p style={{ fontSize: '12px', color: '#666' }}>{filtered.length} results</p>
    </div>
  );
}

export default SearchFilter;
