import React, { useReducer } from 'react';

// PROBLEM: the reducer is 100 lines long (too big)
// no validation either... I'll add it later
const STEPS = ['personal', 'address', 'payment', 'review'];

function formReducer(state, action) {
  switch (action.type) {
    case 'NEXT_STEP':
      return { ...state, step: Math.min(state.step + 1, STEPS.length - 1) };
    case 'PREV_STEP':
      return { ...state, step: Math.max(state.step - 1, 0) };
    case 'UPDATE_FIELD':
      return { ...state, data: { ...state.data, [action.field]: action.value } };
    case 'SUBMIT':
      return { ...state, submitted: true };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const initialState = {
  step: 0,
  submitted: false,
  data: {
    firstName: '', lastName: '', email: '',
    street: '', city: '', country: '',
    cardNumber: '', expiry: '', cvv: '',
  }
};

function Field({ label, field, value, onChange, type = 'text' }) {
  return (
    <div style={{ marginBottom: '8px' }}>
      <label style={{ display: 'block', fontSize: '12px', color: '#666' }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(field, e.target.value)}
        style={{ padding: '4px', width: '200px' }}
      />
    </div>
  );
}

function FormWizard() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  console.log('FormWizard rendered, step:', state.step);

  const updateField = (field, value) => dispatch({ type: 'UPDATE_FIELD', field, value });

  if (state.submitted) {
    return (
      <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
        <h3>Form Wizard</h3>
        <div style={{ backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '4px' }}>
          <p>Submitted! Thanks {state.data.firstName}.</p>
          <button onClick={() => dispatch({ type: 'RESET' })}>Start Over</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Form Wizard (useReducer)</h3>

      <div style={{ marginBottom: '15px' }}>
        {STEPS.map((s, i) => (
          <span key={s} style={{
            marginRight: '10px',
            padding: '4px 8px',
            backgroundColor: i === state.step ? '#333' : '#ddd',
            color: i === state.step ? '#fff' : '#333',
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            {i + 1}. {s}
          </span>
        ))}
      </div>

      {state.step === 0 && (
        <div>
          <h4>Personal Info</h4>
          <Field label="First Name" field="firstName" value={state.data.firstName} onChange={updateField} />
          <Field label="Last Name" field="lastName" value={state.data.lastName} onChange={updateField} />
          <Field label="Email" field="email" value={state.data.email} onChange={updateField} type="email" />
        </div>
      )}

      {state.step === 1 && (
        <div>
          <h4>Address</h4>
          <Field label="Street" field="street" value={state.data.street} onChange={updateField} />
          <Field label="City" field="city" value={state.data.city} onChange={updateField} />
          <Field label="Country" field="country" value={state.data.country} onChange={updateField} />
        </div>
      )}

      {state.step === 2 && (
        <div>
          <h4>Payment</h4>
          <Field label="Card Number" field="cardNumber" value={state.data.cardNumber} onChange={updateField} />
          <Field label="Expiry" field="expiry" value={state.data.expiry} onChange={updateField} placeholder="MM/YY" />
          <Field label="CVV" field="cvv" value={state.data.cvv} onChange={updateField} />
        </div>
      )}

      {state.step === 3 && (
        <div>
          <h4>Review</h4>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', fontSize: '12px' }}>
            {JSON.stringify(state.data, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ marginTop: '15px' }}>
        {state.step > 0 && (
          <button onClick={() => dispatch({ type: 'PREV_STEP' })} style={{ marginRight: '10px' }}>
            Back
          </button>
        )}
        {state.step < STEPS.length - 1 ? (
          <button onClick={() => dispatch({ type: 'NEXT_STEP' })}>Next</button>
        ) : (
          <button onClick={() => dispatch({ type: 'SUBMIT' })} style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '8px 16px', cursor: 'pointer' }}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default FormWizard;
