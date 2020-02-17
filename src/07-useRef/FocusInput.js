import React, { useRef } from 'react';

function FocusInput() {
  const inputRef = useRef(null);

  console.log('FocusInput rendered');

  const handleFocus = () => {
    inputRef.current.focus();
    console.log('focused:', inputRef.current.value);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Focus Input (useRef)</h3>
      <input ref={inputRef} placeholder="Click button to focus me" style={{ padding: '4px', marginRight: '10px' }} />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}

export default FocusInput;
