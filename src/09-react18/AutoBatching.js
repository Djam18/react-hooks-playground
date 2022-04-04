import { useState, flushSync } from 'react';

// React 18 : Auto Batching
// Avant React 18 : seuls les event handlers React étaient batch-és
// Après React 18 : TOUT est batch-é (setTimeout, Promises, native events...)

let renderCount = 0;

function Counter() {
  renderCount++;
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  // React 18 : ces 2 setState seront batch-és en UN seul re-render
  function handleClickBatched() {
    setCount(c => c + 1);
    setFlag(f => !f);
    // → UN seul re-render (même depuis un setTimeout ou une Promise !)
  }

  // flushSync : force un re-render immédiat (opt-out du batching)
  function handleClickFlushSync() {
    flushSync(() => {
      setCount(c => c + 1);
      // → re-render immédiat ici
    });
    flushSync(() => {
      setFlag(f => !f);
      // → deuxième re-render immédiat
    });
    // Total: 2 re-renders (avant le comportement React 17 par défaut)
  }

  // Avant React 18 : dans un setTimeout, pas de batching
  function handleClickTimeout() {
    setTimeout(() => {
      setCount(c => c + 1); // React 17: re-render
      setFlag(f => !f);     // React 17: re-render → 2 re-renders !
      // React 18: batch-é → 1 re-render
    }, 0);
  }

  // Avant React 18 : dans une Promise, pas de batching
  async function handleClickAsync() {
    await Promise.resolve();
    setCount(c => c + 1); // React 17: re-render
    setFlag(f => !f);     // React 17: re-render → 2 re-renders !
    // React 18: batch-é → 1 re-render
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Auto Batching Demo (React 18)</h2>
      <p>Render count: <strong>{renderCount}</strong></p>
      <p>Count: {count} | Flag: {String(flag)}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 300 }}>
        <button onClick={handleClickBatched} style={btnStyle('#3b82f6')}>
          Batched (1 re-render)
        </button>
        <button onClick={handleClickFlushSync} style={btnStyle('#ef4444')}>
          flushSync (2 re-renders)
        </button>
        <button onClick={handleClickTimeout} style={btnStyle('#10b981')}>
          setTimeout (1 re-render in React 18!)
        </button>
        <button onClick={handleClickAsync} style={btnStyle('#f59e0b')}>
          async/await (1 re-render in React 18!)
        </button>
      </div>

      <div style={{ marginTop: 16, padding: 12, background: '#f9fafb', borderRadius: 8, fontSize: 13 }}>
        <strong>React 17:</strong> setTimeout et Promises ne sont pas batch-és → 2 re-renders<br />
        <strong>React 18:</strong> Tout est batch-é → 1 re-render partout<br />
        <strong>flushSync:</strong> opt-out du batching quand tu as vraiment besoin d'un re-render immédiat
      </div>
    </div>
  );
}

function btnStyle(bg) {
  return {
    padding: '8px 16px',
    background: bg,
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    textAlign: 'left',
  };
}

export default Counter;
