import React, { useState } from 'react';

// roadmap.sh "Flash Cards" - beginner project
// useState for the current card and score
// CSS flip animation with transform: rotateY
const deck = [
  { id: 1, question: 'What is a React Hook?', answer: 'A function that lets you use state and other React features in function components.' },
  { id: 2, question: 'What does useState return?', answer: 'An array with the current state value and a function to update it.' },
  { id: 3, question: 'When does useEffect run?', answer: 'After every render by default, or when specified dependencies change.' },
  { id: 4, question: 'What is the [] dependency array?', answer: 'Tells React to only run the effect once, after the first render (like componentDidMount).' },
  { id: 5, question: 'What is useContext?', answer: 'A hook that lets you subscribe to React context without introducing nesting.' },
];

function FlashCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  console.log('FlashCards rendered, index:', currentIndex);

  const card = deck[currentIndex];

  const handleFlip = () => setFlipped(f => !f);

  const handleNext = (isCorrect) => {
    setScore(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));
    setFlipped(false);
    setCurrentIndex(i => (i + 1) % deck.length);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Flash Cards (roadmap.sh)</h3>
      <p style={{ fontSize: '12px', color: '#666' }}>Card {currentIndex + 1}/{deck.length} | Score: {score.correct}/{score.total}</p>

      {/* flip card */}
      <div
        onClick={handleFlip}
        style={{
          width: '300px',
          height: '150px',
          backgroundColor: flipped ? '#e8f5e9' : '#e3f2fd',
          border: '2px solid ' + (flipped ? '#4CAF50' : '#2196F3'),
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          padding: '20px',
          textAlign: 'center',
          marginBottom: '15px',
          transition: 'background-color 0.3s',
        }}
      >
        <p style={{ margin: 0 }}>
          {flipped ? card.answer : card.question}
          <br />
          <small style={{ color: '#999' }}>{flipped ? '(click to see question)' : '(click to reveal)'}</small>
        </p>
      </div>

      {flipped && (
        <div>
          <button
            onClick={() => handleNext(true)}
            style={{ marginRight: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '8px 16px', cursor: 'pointer', borderRadius: '4px' }}
          >
            Got it!
          </button>
          <button
            onClick={() => handleNext(false)}
            style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '8px 16px', cursor: 'pointer', borderRadius: '4px' }}
          >
            Missed it
          </button>
        </div>
      )}
    </div>
  );
}

export default FlashCards;
