import React, { useState } from 'react';

function Toggle() {
  const [show, setShow] = useState(false);

  console.log('Toggle rendered, show:', show);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Toggle</h3>
      <button onClick={() => setShow(!show)}>
        {show ? 'Hide' : 'Show'} content
      </button>
      {/* CSS inline... je sais pas trop comment faire avec des classes */}
      <div style={{ display: show ? 'block' : 'none', marginTop: '10px', backgroundColor: '#e0e0e0', padding: '10px' }}>
        <p>Hidden content revealed!</p>
      </div>
    </div>
  );
}

export default Toggle;
