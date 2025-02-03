import React, { useActionState, useOptimistic, useTransition } from 'react';

// React 19: useActionState — replaces useFormState from react-dom
// signature: const [state, dispatch, isPending] = useActionState(fn, initialState)

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

type TodoAction =
  | { type: 'add'; text: string }
  | { type: 'toggle'; id: number }
  | { type: 'delete'; id: number };

// Simulates a server action (async reducer)
async function todosReducer(
  prevTodos: Todo[],
  action: TodoAction
): Promise<Todo[]> {
  // Simulate server round-trip
  await new Promise(r => setTimeout(r, 600));

  switch (action.type) {
    case 'add':
      return [...prevTodos, { id: Date.now(), text: action.text, done: false }];
    case 'toggle':
      return prevTodos.map(t => t.id === action.id ? { ...t, done: !t.done } : t);
    case 'delete':
      return prevTodos.filter(t => t.id !== action.id);
    default:
      return prevTodos;
  }
}

const INITIAL_TODOS: Todo[] = [
  { id: 1, text: 'Learn React 19', done: true },
  { id: 2, text: 'Try useActionState', done: false },
];

export default function ActionStateDemo(): JSX.Element {
  const [todos, dispatch, isPending] = useActionState(todosReducer, INITIAL_TODOS);
  const [inputText, setInputText] = React.useState('');

  // useOptimistic for instant UI feedback while async action runs
  const [optimisticTodos, addOptimistic] = useOptimistic(
    todos,
    (state: Todo[], action: TodoAction) => {
      // Optimistic update applied immediately, before server responds
      if (action.type === 'add') {
        return [...state, { id: -1, text: action.text, done: false }];
      }
      if (action.type === 'toggle') {
        return state.map(t => t.id === action.id ? { ...t, done: !t.done } : t);
      }
      if (action.type === 'delete') {
        return state.filter(t => t.id !== action.id);
      }
      return state;
    }
  );

  function handleAdd() {
    if (!inputText.trim()) return;
    const action: TodoAction = { type: 'add', text: inputText.trim() };
    addOptimistic(action); // instant UI update
    dispatch(action);      // actual server action
    setInputText('');
  }

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
        React 19: useActionState + useOptimistic
      </h2>
      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>
        useActionState manages async reducer state. useOptimistic gives instant feedback.
        {isPending && <span style={{ color: '#f59e0b', marginLeft: 8 }}>Syncing...</span>}
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="New todo..."
          style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6 }}
        />
        <button
          onClick={handleAdd}
          disabled={isPending}
          style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}
        >
          Add
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {optimisticTodos.map(todo => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 12px',
              marginBottom: 6,
              background: todo.id === -1 ? '#fef9c3' : '#f9fafb', // optimistic = yellow
              borderRadius: 6,
              opacity: todo.id === -1 ? 0.7 : 1,
            }}
          >
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => dispatch({ type: 'toggle', id: todo.id })}
              disabled={isPending || todo.id === -1}
            />
            <span style={{ flex: 1, textDecoration: todo.done ? 'line-through' : 'none', color: todo.done ? '#9ca3af' : '#111827' }}>
              {todo.text}
              {todo.id === -1 && <em style={{ fontSize: 11, marginLeft: 6, color: '#d97706' }}>optimistic</em>}
            </span>
            <button
              onClick={() => dispatch({ type: 'delete', id: todo.id })}
              disabled={isPending || todo.id === -1}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: 16 }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
