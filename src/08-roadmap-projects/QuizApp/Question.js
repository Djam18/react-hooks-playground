import React from 'react';

function Question({ question, onAnswer, answered }) {
  console.log('Question rendered:', question.id);

  return (
    <div>
      <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>{question.question}</p>
      <div>
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => !answered && onAnswer(i)}
            disabled={answered !== null && answered !== undefined}
            style={{
              display: 'block',
              width: '100%',
              padding: '10px',
              marginBottom: '8px',
              textAlign: 'left',
              cursor: answered !== null ? 'default' : 'pointer',
              backgroundColor: answered !== null && answered !== undefined
                ? (i === question.correct ? '#e8f5e9' : i === answered ? '#ffebee' : '#f5f5f5')
                : '#f5f5f5',
              border: '1px solid ' + (answered !== null && answered !== undefined
                ? (i === question.correct ? '#4CAF50' : i === answered ? '#f44336' : '#ddd')
                : '#ddd'),
              borderRadius: '4px',
            }}
          >
            {String.fromCharCode(65 + i)}. {option}
            {answered !== null && answered !== undefined && i === question.correct && ' ✓'}
            {answered !== null && answered !== undefined && i === answered && i !== question.correct && ' ✗'}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
