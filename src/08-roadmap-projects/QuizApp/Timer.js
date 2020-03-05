import React, { useState, useEffect } from 'react';

function QuizTimer({ duration, onExpire }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration); // reset when duration changes (new question)
  }, [duration]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearTimeout(timer); // cleanup
  }, [timeLeft, onExpire]);

  const pct = (timeLeft / duration) * 100;

  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ height: '4px', backgroundColor: '#ddd', borderRadius: '2px' }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          backgroundColor: pct > 50 ? '#4CAF50' : pct > 20 ? '#FF9800' : '#f44336',
          transition: 'width 1s linear, background-color 0.3s',
          borderRadius: '2px'
        }} />
      </div>
      <p style={{ fontSize: '12px', color: timeLeft <= 5 ? 'red' : '#666' }}>{timeLeft}s remaining</p>
    </div>
  );
}

export default QuizTimer;
