import React, { useState, useEffect, useRef } from 'react';

// useRef pour tracker la valeur precedente
// ref ne cause pas de re-render quand on la modifie - c'est la difference avec state
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value; // s'execute APRES le render
  });

  return ref.current; // retourne la valeur AVANT le render courant
}

function PreviousValue() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  console.log('PreviousValue rendered, count:', count, 'prev:', prevCount);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Previous Value (useRef)</h3>
      <p>Current: {count}</p>
      <p>Previous: {prevCount !== undefined ? prevCount : 'none'}</p>
      <button onClick={() => setCount(c => c + 1)} style={{ marginRight: '5px' }}>+1</button>
      <button onClick={() => setCount(c => c - 1)}>-1</button>
    </div>
  );
}

export default PreviousValue;
