import React, { useState } from 'react';

// controlled input - en Django le form gere tout. Ici je dois tout faire a la main.
function FormInput() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  console.log('FormInput rendered');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted:', { name, email });
    setSubmitted(true);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Form Input (Controlled)</h3>
      {submitted ? (
        <div style={{ backgroundColor: '#e8f5e9', padding: '10px' }}>
          <p>Submitted! Name: {name}, Email: {email}</p>
          <button onClick={() => setSubmitted(false)}>Reset</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Name: </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ marginLeft: '5px', padding: '4px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Email: </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ marginLeft: '5px', padding: '4px' }}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default FormInput;
