import React, { useState, useRef } from 'react';

// setInterval with useRef
// without ref: every render creates a new reference to the interval
// the ref persists between renders without triggering re-render
function StopwatchRef() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  console.log('StopwatchRef rendered');

  const start = () => {
    if (running) return;
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setTime(t => t + 10); // +10ms chaque 10ms
    }, 10);
  };

  const pause = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    pause();
    setTime(0);
  };

  const formatTime = (ms) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const msDisplay = ms % 1000;
    return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}.${String(Math.floor(msDisplay / 10)).padStart(2, '0')}`;
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Stopwatch (useRef)</h3>
      <p style={{ fontSize: '32px', fontFamily: 'monospace' }}>{formatTime(time)}</p>
      <button onClick={start} disabled={running} style={{ marginRight: '5px' }}>Start</button>
      <button onClick={pause} disabled={!running} style={{ marginRight: '5px' }}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default StopwatchRef;
