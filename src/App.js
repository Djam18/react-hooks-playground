import React from 'react';
import './App.css';
import Counter from './01-useState/Counter';
import Toggle from './01-useState/Toggle';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>React Hooks Playground</h1>
      <p>Learning React Hooks — Notes from a Python/Django Dev</p>

      <h2>01 - useState</h2>
      <Counter />
      <Toggle />
    </div>
  );
}

export default App;
