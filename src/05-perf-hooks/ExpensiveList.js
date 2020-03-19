import React, { useState, useMemo } from 'react';

// useMemo pour filtrer une liste de 10000 items
// fix: j'avais useMemo sur total et title - c'etait inutile
// useMemo est utile SEULEMENT quand le calcul est vraiment couteux
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

  // useMemo JUSTIFIE: filtrer 10000 items a chaque render = couteux
  const filteredItems = useMemo(() => {
    console.log('filtering items...');
    return ALL_ITEMS.filter(item => {
      const matchesFilter = item.name.toLowerCase().includes(filter.toLowerCase());
      const matchesCategory = category === 'all' || item.category === category;
      return matchesFilter && matchesCategory;
    });
  }, [filter, category]);

  // fix: ces deux useMemo etaient inutiles - calculs triviaux
  const total = filteredItems.reduce((sum, item) => sum + item.value, 0);
  const title = `Showing ${filteredItems.length} of ${ALL_ITEMS.length} items`;

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
