import React, { Suspense, use } from 'react';

// React 19: use() hook can unwrap Promises AND Context
// Unlike useContext, use() can be called conditionally

// --- use() with Promises ---

interface User {
  id: number;
  name: string;
  email: string;
}

function fetchUser(id: number): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User ${id}`, email: `user${id}@example.com` });
    }, 1000);
  });
}

// Component that uses a Promise directly - React 19 suspends automatically
function UserCard({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise); // Suspends until resolved
  return (
    <div style={{ padding: 12, background: '#f0fdf4', borderRadius: 8, marginBottom: 8 }}>
      <strong>{user.name}</strong>
      <p style={{ margin: 0, color: '#6b7280', fontSize: 13 }}>{user.email}</p>
    </div>
  );
}

// --- use() with Context (conditional use!) ---

const ThemeContext = React.createContext<'light' | 'dark'>('light');

function ThemedBox({ showTheme }: { showTheme: boolean }) {
  // use() can be called inside conditions - useContext cannot!
  if (showTheme) {
    const theme = use(ThemeContext);
    return (
      <div style={{
        padding: 12,
        background: theme === 'dark' ? '#1f2937' : '#f9fafb',
        color: theme === 'dark' ? 'white' : '#111827',
        borderRadius: 8,
        marginBottom: 8,
      }}>
        Theme: <strong>{theme}</strong> (via use() — called conditionally!)
      </div>
    );
  }
  return <div style={{ color: '#9ca3af' }}>Theme hidden</div>;
}

export default function UseHookDemo(): JSX.Element {
  const [userId, setUserId] = React.useState(1);
  const [showTheme, setShowTheme] = React.useState(true);

  // Create promise outside render (stable reference needed)
  const [userPromise] = React.useState(() => fetchUser(userId));

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
        React 19: use() Hook
      </h2>
      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>
        use() unwraps Promises (with Suspense) and Context (conditionally).
        Unlike other hooks, use() can be called inside conditions and loops.
      </p>

      <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>use() with Promise</h3>
      <Suspense fallback={<div style={{ color: '#3b82f6' }}>Loading user...</div>}>
        <UserCard userPromise={userPromise} />
      </Suspense>

      <h3 style={{ fontSize: 15, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>
        use() with Context (conditional)
      </h3>
      <ThemeContext.Provider value="dark">
        <ThemedBox showTheme={showTheme} />
      </ThemeContext.Provider>

      <button
        onClick={() => setShowTheme(v => !v)}
        style={{ marginTop: 8, padding: '6px 12px', background: '#6366f1', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}
      >
        Toggle theme display
      </button>
    </div>
  );
}
