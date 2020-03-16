import React, { useReducer, useEffect, useRef } from 'react';

// roadmap.sh "Pomodoro Timer"
// useReducer ici c'est parfait - plusieurs etats interconnectes
// TICK, START, PAUSE, RESET, SWITCH_MODE
const MODES = {
  work: { label: 'Work', duration: 25 * 60, color: '#e53935' },
  shortBreak: { label: 'Short Break', duration: 5 * 60, color: '#43a047' },
  longBreak: { label: 'Long Break', duration: 15 * 60, color: '#1e88e5' },
};

function pomodoroReducer(state, action) {
  switch (action.type) {
    case 'TICK':
      if (state.timeLeft <= 0) return state;
      return { ...state, timeLeft: state.timeLeft - 1 };
    case 'START':
      return { ...state, isRunning: true };
    case 'PAUSE':
      return { ...state, isRunning: false };
    case 'RESET':
      return {
        ...state,
        isRunning: false,
        timeLeft: MODES[state.mode].duration,
      };
    case 'SWITCH_MODE': {
      const newMode = action.mode;
      return {
        ...state,
        mode: newMode,
        isRunning: false,
        timeLeft: MODES[newMode].duration,
        sessions: newMode === 'work' ? state.sessions : state.sessions,
      };
    }
    case 'COMPLETE': {
      const newSessions = state.mode === 'work' ? state.sessions + 1 : state.sessions;
      // auto-switch: apres 4 sessions → long break, sinon short break
      const nextMode = state.mode === 'work'
        ? (newSessions % 4 === 0 ? 'longBreak' : 'shortBreak')
        : 'work';
      return {
        mode: nextMode,
        isRunning: false,
        timeLeft: MODES[nextMode].duration,
        sessions: newSessions,
      };
    }
    default:
      return state;
  }
}

const initialState = {
  mode: 'work',
  isRunning: false,
  timeLeft: MODES.work.duration,
  sessions: 0,
};

function Pomodoro() {
  const [state, dispatch] = useReducer(pomodoroReducer, initialState);
  const intervalRef = useRef(null);

  console.log('Pomodoro rendered, mode:', state.mode, 'running:', state.isRunning, 'left:', state.timeLeft);

  // gerer le tick avec useEffect + useRef pour eviter les memory leaks
  // j'ai appris ma lecon avec Timer.js !
  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [state.isRunning]);

  // detecter la fin du timer
  useEffect(() => {
    if (state.timeLeft === 0 && state.isRunning) {
      dispatch({ type: 'COMPLETE' });
    }
  }, [state.timeLeft, state.isRunning]);

  const minutes = Math.floor(state.timeLeft / 60);
  const seconds = state.timeLeft % 60;
  const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const modeColor = MODES[state.mode].color;
  const progress = 1 - state.timeLeft / MODES[state.mode].duration;

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px', textAlign: 'center' }}>
      <h3>Pomodoro Timer (roadmap.sh)</h3>
      <p style={{ fontSize: '12px', color: '#666' }}>
        useReducer pour gerer TICK + modes + sessions. Ca marche bien!
      </p>

      {/* mode selector */}
      <div style={{ marginBottom: '20px' }}>
        {Object.entries(MODES).map(([key, { label, color }]) => (
          <button
            key={key}
            onClick={() => dispatch({ type: 'SWITCH_MODE', mode: key })}
            style={{
              marginRight: '8px',
              padding: '6px 12px',
              cursor: 'pointer',
              backgroundColor: state.mode === key ? color : '#f5f5f5',
              color: state.mode === key ? 'white' : '#333',
              border: '1px solid ' + color,
              borderRadius: '4px',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* timer display */}
      <div style={{
        fontSize: '72px',
        fontWeight: 'bold',
        color: modeColor,
        fontFamily: 'monospace',
        marginBottom: '10px',
      }}>
        {timeString}
      </div>

      {/* progress bar */}
      <div style={{
        height: '6px',
        backgroundColor: '#eee',
        borderRadius: '3px',
        marginBottom: '20px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${progress * 100}%`,
          backgroundColor: modeColor,
          transition: 'width 1s linear',
        }} />
      </div>

      {/* controls */}
      <div style={{ marginBottom: '15px' }}>
        {!state.isRunning ? (
          <button
            onClick={() => dispatch({ type: 'START' })}
            style={{ padding: '10px 30px', cursor: 'pointer', backgroundColor: modeColor, color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', marginRight: '8px' }}
          >
            Start
          </button>
        ) : (
          <button
            onClick={() => dispatch({ type: 'PAUSE' })}
            style={{ padding: '10px 30px', cursor: 'pointer', backgroundColor: '#757575', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', marginRight: '8px' }}
          >
            Pause
          </button>
        )}
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#f5f5f5', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px' }}
        >
          Reset
        </button>
      </div>

      {/* sessions counter */}
      <p style={{ fontSize: '14px', color: '#666' }}>
        Sessions completed: <strong>{state.sessions}</strong>
        {state.sessions > 0 && state.sessions % 4 === 0 && (
          <span style={{ color: modeColor }}> — Time for a long break!</span>
        )}
      </p>

      {/* tomatoes */}
      <div>
        {Array.from({ length: Math.max(state.sessions, 1) }).map((_, i) => (
          <span key={i} style={{ fontSize: '20px', marginRight: '4px' }}>
            {i < state.sessions ? '🍅' : '⬜'}
          </span>
        ))}
      </div>

      <p style={{ fontSize: '11px', color: '#999', marginTop: '10px' }}>
        Mode: {MODES[state.mode].label}
      </p>
    </div>
  );
}

export default Pomodoro;
