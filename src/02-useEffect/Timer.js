import React, { useState, useEffect } from 'react';

// PROBLEME: j'ai oublie le cleanup → le timer continue apres unmount!
// ca fait des "can't perform a React state update on an unmounted component"
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  console.log('Timer rendered, seconds:', seconds);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // MANQUE: return () => clearInterval(interval);
    // je le saurai dans le prochain commit...
  }, [running]);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Timer</h3>
      <p style={{ fontSize: '24px' }}>{seconds}s</p>
      <button onClick={() => setRunning(!running)} style={{ marginRight: '5px' }}>
        {running ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => { setRunning(false); setSeconds(0); }}>Reset</button>
    </div>
  );
}

export default Timer;
