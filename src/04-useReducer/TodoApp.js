import React, { useReducer, useState } from 'react';

// useReducer shines here. It's like a Django ViewSet!
// action.type = like URL patterns
// ADD_TODO = POST /todos
// DELETE_TODO = DELETE /todos/:id
// TOGGLE_TODO = PATCH /todos/:id
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.text, done: false }];
    case 'TOGGLE_TODO':
      return state.map(t => t.id === action.id ? { ...t, done: !t.done } : t);
    case 'DELETE_TODO':
      return state.filter(t => t.id !== action.id);
    default:
      return state;
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [text, setText] = useState('');

  console.log('TodoApp rendered, todos:', todos.length);

  const handleAdd = () => {
    if (!text.trim()) return;
    dispatch({ type: 'ADD_TODO', text });
    setText('');
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Todo App (useReducer)</h3>
      <div style={{ marginBottom: '10px' }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleAdd()}
          placeholder="Add a todo..."
          style={{ padding: '4px', marginRight: '5px' }}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      {todos.length === 0 ? (
        <p style={{ color: '#999' }}>No todos yet</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map(todo => (
            <li key={todo.id} style={{ marginBottom: '5px' }}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id })}
              />
              <span style={{
                marginLeft: '8px',
                textDecoration: todo.done ? 'line-through' : 'none',
                color: todo.done ? '#999' : '#333'
              }}>
                {todo.text}
              </span>
              <button
                onClick={() => dispatch({ type: 'DELETE_TODO', id: todo.id })}
                style={{ marginLeft: '10px', fontSize: '11px', color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <p style={{ fontSize: '12px', color: '#999' }}>
        {todos.filter(t => t.done).length}/{todos.length} done
      </p>
    </div>
  );
}

export default TodoApp;
