import React, { useState, useEffect } from 'react';

// FIX: ajoute le cleanup! les side effects c'est comme les context managers Python
// with open('file') as f: -> le cleanup se fait automatiquement
// useEffect(() => { ... return cleanup; }) -> pareil!
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  console.log('Timer rendered, seconds:', seconds);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => clearInterval(interval); // CLEANUP! sans ca le timer continue apres unmount
  }, [running]);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Timer (fixed)</h3>
      <p style={{ fontSize: '24px' }}>{seconds}s</p>
      <button onClick={() => setRunning(!running)} style={{ marginRight: '5px' }}>
        {running ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => { setRunning(false); setSeconds(0); }}>Reset</button>
    </div>
  );
}

export default Timer;
