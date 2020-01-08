import React, { useState } from 'react';

// son premier composant React
// c'est comme une variable Python mais reactive
function Counter() {
  const [count, setCount] = useState(0);

  console.log('Counter rendered, count:', count);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Counter</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)} style={{ marginRight: '5px' }}>+1</button>
      <button onClick={() => setCount(count - 1)} style={{ marginRight: '5px' }}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default Counter;
