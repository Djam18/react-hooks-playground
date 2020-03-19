import React, { useState, useCallback } from 'react';

// React.memo avec useCallback
// fix: retire le useMemo inutile sur doubleParent
// regle apprise: useMemo pour calculs couteux, pas pour `x * 2`

const Child = React.memo(function Child({ count, onIncrement }) {
  console.log('Child rendered, count:', count);
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
  }, []);

  // fix: parentCount * 2 est trivial, pas besoin de useMemo
  const doubleParent = parentCount * 2;

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Memo Demo (React.memo + useCallback)</h3>
      <p>Parent count: {parentCount} (double: {doubleParent})</p>
      <button onClick={() => setParentCount(c => c + 1)} style={{ marginBottom: '10px' }}>
        Increment Parent
      </button>
      <p style={{ fontSize: '12px', color: '#666' }}>
        Watch the console: Child does NOT re-render when Parent increments.
        useCallback keeps the function reference stable.
      </p>
      <Child count={childCount} onIncrement={handleChildIncrement} />
    </div>
  );
}

export default MemoDemo;
