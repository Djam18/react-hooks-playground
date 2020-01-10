import React from 'react';
import './App.css';
import Counter from './01-useState/Counter';
import Toggle from './01-useState/Toggle';
import FormInput from './01-useState/FormInput';
import ColorPicker from './01-useState/ColorPicker';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>React Hooks Playground</h1>
      <p>Learning React Hooks — Notes from a Python/Django Dev</p>

      <h2>01 - useState</h2>
      <Counter />
      <Toggle />
      <FormInput />
      <ColorPicker />
    </div>
  );
}

export default App;
