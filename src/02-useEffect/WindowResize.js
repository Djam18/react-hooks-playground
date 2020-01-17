import React, { useState, useEffect } from 'react';

function WindowResize() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  console.log('WindowResize rendered');

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      console.log('window resized:', window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // cleanup: removeEventListener sinon on accumule des listeners!
    return () => window.removeEventListener('resize', handleResize);
  }, []); // [] = setup once

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Window Resize</h3>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
      <p style={{ fontSize: '12px', color: '#666' }}>Resize the window to see updates</p>
    </div>
  );
}

export default WindowResize;
