import React, { useState, useMemo } from 'react';

// useMemo pour filtrer une liste de 10000 items
// PROBLEME: j'utilise useMemo meme pour des calculs simples... je sais pas encore
// que la plupart des memoizations sont inutiles
const generateItems = () => Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  name: `Item ${i}`,
  category: ['A', 'B', 'C'][i % 3],
  value: Math.floor(Math.random() * 1000),
}));

const ALL_ITEMS = generateItems();

function ExpensiveList() {
  const [filter, setFilter] = useState('');
  const [category, setCategory] = useState('all');

  console.log('ExpensiveList rendered');

  // useMemo pour eviter de re-filtrer 10000 items a chaque render
  const filteredItems = useMemo(() => {
    console.log('filtering items...'); // pour voir quand ca recalcule
    return ALL_ITEMS.filter(item => {
      const matchesFilter = item.name.toLowerCase().includes(filter.toLowerCase());
      const matchesCategory = category === 'all' || item.category === category;
      return matchesFilter && matchesCategory;
    });
  }, [filter, category]);

  // useMemo pour la somme aussi - probablement inutile pour un simple reduce
  const total = useMemo(() => {
    return filteredItems.reduce((sum, item) => sum + item.value, 0);
  }, [filteredItems]);

  // useMemo pour le titre - c'est CLAIREMENT inutile mais je le fais quand meme
  const title = useMemo(() => {
    return `Showing ${filteredItems.length} of ${ALL_ITEMS.length} items`;
  }, [filteredItems.length]);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Expensive List (useMemo)</h3>
      <div style={{ marginBottom: '10px' }}>
        <input
          placeholder="Filter..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{ marginRight: '10px', padding: '4px' }}
        />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="all">All</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div>
      <p style={{ fontSize: '12px', color: '#666' }}>{title} | Total: {total}</p>
      <ul style={{ maxHeight: '150px', overflow: 'auto', fontSize: '12px' }}>
        {filteredItems.slice(0, 20).map(item => (
          <li key={item.id}>{item.name} ({item.category}) = {item.value}</li>
        ))}
        {filteredItems.length > 20 && <li style={{ color: '#999' }}>...and {filteredItems.length - 20} more</li>}
      </ul>
    </div>
  );
}

export default ExpensiveList;
