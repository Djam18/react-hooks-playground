import React, { useState } from 'react';

function ColorPicker() {
  const [r, setR] = useState(128);
  const [g, setG] = useState(128);
  const [b, setB] = useState(128);

  console.log('ColorPicker rendered', r, g, b);

  const color = `rgb(${r}, ${g}, ${b})`;

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Color Picker</h3>
      <div style={{ backgroundColor: color, width: '100px', height: '100px', marginBottom: '10px', border: '1px solid #999' }}></div>
      <div>
        <label>R: {r} </label>
        <input type="range" min="0" max="255" value={r} onChange={e => setR(Number(e.target.value))} />
      </div>
      <div>
        <label>G: {g} </label>
        <input type="range" min="0" max="255" value={g} onChange={e => setG(Number(e.target.value))} />
      </div>
      <div>
        <label>B: {b} </label>
        <input type="range" min="0" max="255" value={b} onChange={e => setB(Number(e.target.value))} />
      </div>
      <p style={{ fontSize: '12px', color: '#666' }}>Color: {color}</p>
    </div>
  );
}

export default ColorPicker;
