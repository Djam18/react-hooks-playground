import React, { useFormStatus, useActionState } from 'react';

// React 19: useFormStatus
// Must be used in a CHILD of a <form> element
// Returns { pending, data, method, action }

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        padding: '8px 20px',
        background: pending ? '#9ca3af' : '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: 6,
        cursor: pending ? 'not-allowed' : 'pointer',
        transition: 'background 0.2s',
      }}
    >
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

// Simulates a server action
async function submitContact(
  prevState: { message: string; error: string } | null,
  formData: FormData
): Promise<{ message: string; error: string }> {
  await new Promise(r => setTimeout(r, 1500)); // simulate network

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  if (!name || !email) {
    return { message: '', error: 'Name and email are required' };
  }

  return { message: `Thanks ${name}! We'll reach you at ${email}.`, error: '' };
}

export default function FormStatusDemo(): JSX.Element {
  // useActionState: manages form state + async action
  // signature: useActionState(action, initialState, permalink?)
  const [state, formAction] = useActionState(submitContact, null);

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
        React 19: useFormStatus
      </h2>
      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>
        useFormStatus reads the status of the parent form.
        SubmitButton is a child component — no prop drilling needed.
      </p>

      {/* React 19: form action can be an async function directly */}
      <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 320 }}>
        <input
          name="name"
          placeholder="Your name"
          style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6 }}
        />
        <input
          name="email"
          type="email"
          placeholder="Your email"
          style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6 }}
        />
        {/* SubmitButton reads form state via useFormStatus — no props needed */}
        <SubmitButton />
      </form>

      {state?.error && (
        <p style={{ marginTop: 12, color: '#ef4444', fontSize: 14 }}>{state.error}</p>
      )}
      {state?.message && (
        <p style={{ marginTop: 12, color: '#10b981', fontSize: 14 }}>{state.message}</p>
      )}

      <div style={{ marginTop: 16, padding: 12, background: '#f8fafc', borderRadius: 8, fontSize: 12, color: '#6b7280' }}>
        <strong>Key insight:</strong> SubmitButton doesn't need a pending prop.
        It uses useFormStatus() to read the parent form state directly.
        This eliminates prop drilling for form state management.
      </div>
    </div>
  );
}
