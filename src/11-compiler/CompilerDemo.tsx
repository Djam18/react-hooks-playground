import React, { useState } from 'react';

// React Compiler (experimental) — React 19 + Vite + babel-plugin-react-compiler
//
// The React Compiler automatically memoizes components and hooks.
// No more manual useMemo / useCallback — the compiler handles it.
//
// Before React Compiler:
//   const sortedItems = useMemo(() => items.sort(...), [items]);
//   const handleClick = useCallback(() => ..., [deps]);
//
// With React Compiler:
//   const sortedItems = items.sort(...); // compiler auto-memoizes
//   function handleClick() { ... }       // compiler auto-memoizes
//
// The compiler adds memo semantics at compile time, not runtime.
// Result: smaller bundle, no dependency array bugs, automatic optimization.

// This component would have needed useMemo + useCallback without the compiler
interface Item {
  id: number;
  name: string;
  score: number;
  category: 'A' | 'B' | 'C';
}

const MOCK_ITEMS: Item[] = [
  { id: 1, name: 'Alpha', score: 85, category: 'A' },
  { id: 2, name: 'Beta', score: 72, category: 'B' },
  { id: 3, name: 'Gamma', score: 91, category: 'A' },
  { id: 4, name: 'Delta', score: 64, category: 'C' },
  { id: 5, name: 'Epsilon', score: 88, category: 'B' },
  { id: 6, name: 'Zeta', score: 77, category: 'A' },
];

// With React Compiler: no useMemo needed — compiler auto-memoizes pure derivations
function ItemList({ items, filter }: { items: Item[]; filter: string }) {
  // Compiler auto-memoizes this — no useMemo(() => ..., [items, filter]) needed
  const filteredItems = filter
    ? items.filter(i => i.category === filter)
    : items;

  const sortedItems = [...filteredItems].sort((a, b) => b.score - a.score);

  return (
    <div>
      {sortedItems.map(item => (
        <div
          key={item.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px 12px',
            marginBottom: 4,
            background: '#f9fafb',
            borderRadius: 6,
            borderLeft: `3px solid ${item.category === 'A' ? '#10b981' : item.category === 'B' ? '#3b82f6' : '#f59e0b'}`,
          }}
        >
          <span style={{ fontWeight: 600 }}>{item.name}</span>
          <span style={{ color: '#6b7280', fontSize: 13 }}>
            Category {item.category} — Score: <strong>{item.score}</strong>
          </span>
        </div>
      ))}
    </div>
  );
}

// With React Compiler: no useCallback needed for event handlers
function FilterButtons({
  active,
  onChange,
}: {
  active: string;
  onChange: (filter: string) => void;
}) {
  // Compiler auto-memoizes these handlers — no useCallback needed
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      {(['', 'A', 'B', 'C'] as const).map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          style={{
            padding: '6px 14px',
            background: active === cat ? '#3b82f6' : '#f3f4f6',
            color: active === cat ? 'white' : '#374151',
            border: 'none',
            borderRadius: 20,
            cursor: 'pointer',
            fontWeight: active === cat ? 600 : 400,
            fontSize: 13,
          }}
        >
          {cat === '' ? 'All' : `Category ${cat}`}
        </button>
      ))}
    </div>
  );
}

export default function CompilerDemo(): JSX.Element {
  const [filter, setFilter] = useState('');
  const [renderCount, setRenderCount] = useState(0);
  const [unrelatedState, setUnrelatedState] = useState(0);

  // React Compiler prevents ItemList from re-rendering when unrelatedState changes
  // Without the compiler, we'd need React.memo() + useCallback to achieve this

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
        React Compiler (experimental)
      </h2>
      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 4 }}>
        The React Compiler auto-memoizes components and hooks at compile time.
        No more <code>useMemo</code>, <code>useCallback</code>, or <code>React.memo</code> needed.
      </p>

      <div style={{ background: '#fef3c7', padding: 10, borderRadius: 8, marginBottom: 16, fontSize: 12 }}>
        <strong>Experimental:</strong> Requires <code>babel-plugin-react-compiler</code> in Vite config.
        Currently opt-in per component via <code>'use memo'</code> directive or global in babel config.
        Ships stable with React 19.x releases.
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 13, color: '#6b7280' }}>
          Unrelated state: <strong>{unrelatedState}</strong>
          {' '}(ItemList should NOT re-render when this changes — compiler handles it)
        </span>
        <button
          onClick={() => setUnrelatedState(v => v + 1)}
          style={{ padding: '5px 10px', background: '#e5e7eb', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}
        >
          Increment unrelated
        </button>
      </div>

      <FilterButtons active={filter} onChange={setFilter} />

      <ItemList items={MOCK_ITEMS} filter={filter} />

      <div style={{ marginTop: 16, padding: 12, background: '#f0fdf4', borderRadius: 8, fontSize: 12, color: '#374151' }}>
        <strong>What the compiler does automatically:</strong>
        <ul style={{ margin: '6px 0 0', paddingLeft: 16 }}>
          <li>Memoizes <code>filteredItems</code> and <code>sortedItems</code> — equivalent to useMemo</li>
          <li>Memoizes <code>onChange</code> handlers — equivalent to useCallback</li>
          <li>Wraps <code>ItemList</code> in memo — equivalent to React.memo</li>
          <li>Tracks fine-grained dependencies automatically — no stale closure bugs</li>
        </ul>
      </div>
    </div>
  );
}
