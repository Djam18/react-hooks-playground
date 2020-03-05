import React, { useReducer } from 'react';
import questions from './data';
import Question from './Question';
import QuizTimer from './Timer';
import Results from './Results';

// useReducer brille ici: NEXT_QUESTION, ANSWER, FINISH
// { currentQuestion, answers, score, status }
function quizReducer(state, action) {
  switch (action.type) {
    case 'ANSWER': {
      const newAnswers = [...state.answers, action.answerIndex];
      const isLast = state.currentQuestion >= questions.length - 1;
      return {
        ...state,
        answers: newAnswers,
        status: isLast ? 'finished' : 'answered',
      };
    }
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        status: 'active',
      };
    case 'TIMEOUT': {
      const newAnswers = [...state.answers, undefined]; // undefined = no answer
      const isLast = state.currentQuestion >= questions.length - 1;
      return {
        ...state,
        answers: newAnswers,
        status: isLast ? 'finished' : 'answered',
      };
    }
    case 'RESTART':
      return initialState;
    default:
      return state;
  }
}

const initialState = {
  currentQuestion: 0,
  answers: [],
  status: 'active', // active | answered | finished
};

function Quiz() {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  console.log('Quiz rendered, state:', state.status, 'q:', state.currentQuestion);

  if (state.status === 'finished') {
    return (
      <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
        <h3>Quiz App (roadmap.sh)</h3>
        <Results answers={state.answers} onRestart={() => dispatch({ type: 'RESTART' })} />
      </div>
    );
  }

  const question = questions[state.currentQuestion];

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Quiz App - Python Knowledge (roadmap.sh)</h3>
      <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
        Question {state.currentQuestion + 1}/{questions.length}
      </p>

      <QuizTimer
        key={state.currentQuestion} // force remount on new question
        duration={15}
        onExpire={() => dispatch({ type: 'TIMEOUT' })}
      />

      <Question
        question={question}
        onAnswer={(i) => dispatch({ type: 'ANSWER', answerIndex: i })}
        answered={state.answers[state.currentQuestion]}
      />

      {state.status === 'answered' && (
        <button
          onClick={() => dispatch({ type: 'NEXT_QUESTION' })}
          style={{ marginTop: '15px', padding: '8px 16px', cursor: 'pointer' }}
        >
          Next Question
        </button>
      )}
    </div>
  );
}

export default Quiz;
