import React, { useState, useMemo, useCallback } from 'react';

// React.memo avec useCallback
// je commence a comprendre mais j'abuse encore

const Child = React.memo(function Child({ count, onIncrement }) {
  console.log('Child rendered, count:', count); // pour compter les re-renders
  return (
    <div style={{ padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
      <p>Child count: {count}</p>
      <button onClick={onIncrement}>Increment Child</button>
    </div>
  );
});

function MemoDemo() {
  const [parentCount, setParentCount] = useState(0);
  const [childCount, setChildCount] = useState(0);

  console.log('MemoDemo rendered');

  // useCallback = Child ne re-render pas quand parentCount change
  const handleChildIncrement = useCallback(() => {
    setChildCount(c => c + 1);
  }, []); // stable ref

  // useMemo inutile ici - parentCount * 2 est trivial
  // mais je le fais quand meme parce que j'ai pas encore compris
  const doubleParent = useMemo(() => {
    console.log('computing doubleParent...');
    return parentCount * 2;
  }, [parentCount]);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Memo Demo (React.memo + useCallback)</h3>
      <p>Parent count: {parentCount} (double: {doubleParent})</p>
      <button onClick={() => setParentCount(c => c + 1)} style={{ marginBottom: '10px' }}>
        Increment Parent
      </button>
      <p style={{ fontSize: '12px', color: '#666' }}>
        Watch the console: Child does NOT re-render when Parent increments.
        That's the point of React.memo + useCallback.
      </p>
      <Child count={childCount} onIncrement={handleChildIncrement} />
    </div>
  );
}

export default MemoDemo;
