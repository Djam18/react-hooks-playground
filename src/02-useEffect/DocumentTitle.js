import React, { useState, useEffect } from 'react';

function DocumentTitle() {
  const [count, setCount] = useState(0);

  console.log('DocumentTitle rendered');

  useEffect(() => {
    // update the page title
    document.title = `Count: ${count} - React Hooks Playground`;

    // cleanup: restore original title
    return () => {
      document.title = 'React Hooks Playground';
    };
  }, [count]); // re-run when count changes

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Document Title</h3>
      <p>Count: {count} (check the browser tab title!)</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}

export default DocumentTitle;
