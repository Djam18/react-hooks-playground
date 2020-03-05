import React from 'react';
import questions from './data';

function Results({ answers, onRestart }) {
  const correct = answers.filter((a, i) => a === questions[i].correct).length;

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Quiz Complete!</h3>
      <p style={{ fontSize: '48px', margin: '20px 0' }}>
        {correct}/{questions.length}
      </p>
      <p style={{ color: correct >= 7 ? 'green' : correct >= 5 ? 'orange' : 'red' }}>
        {correct >= 7 ? 'Excellent! You know Python well.' : correct >= 5 ? 'Good! Keep practicing.' : 'Keep learning Python!'}
      </p>

      <div style={{ textAlign: 'left', marginTop: '20px' }}>
        <h4>Review:</h4>
        {questions.map((q, i) => (
          <div key={q.id} style={{
            padding: '8px',
            marginBottom: '8px',
            backgroundColor: answers[i] === q.correct ? '#e8f5e9' : '#ffebee',
            borderRadius: '4px',
            fontSize: '13px'
          }}>
            <strong>{q.question}</strong>
            <br />
            <span style={{ color: '#666' }}>
              Your answer: {answers[i] !== undefined ? q.options[answers[i]] : 'Time out'}{' '}
              {answers[i] === q.correct ? '✓' : '✗'}
            </span>
            {answers[i] !== q.correct && (
              <span style={{ color: 'green' }}> | Correct: {q.options[q.correct]}</span>
            )}
          </div>
        ))}
      </div>

      <button onClick={onRestart} style={{ marginTop: '15px', padding: '10px 20px', cursor: 'pointer' }}>
        Try Again
      </button>
    </div>
  );
}

export default Results;
