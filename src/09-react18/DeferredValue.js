import { useState, useDeferredValue, memo } from 'react';

// useDeferredValue est comme useTransition mais pour les valeurs (pas les callbacks)
// Utile quand on ne contrôle pas le code qui déclenche l'update (ex: une librairie tierce)

const HeavyList = memo(function HeavyList({ text }) {
  // Simule un rendu lent
  const items = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    value: `Item ${i}: ${text}`,
  }));

  return (
    <ul style={{ maxHeight: 200, overflow: 'auto', margin: 0, padding: '0 0 0 20px', fontSize: 12 }}>
      {items.map(item => (
        <li key={item.id}>{item.value}</li>
      ))}
    </ul>
  );
});

export default function DeferredValueDemo() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);

  // Si deferredText est différent de text → un re-render est en attente
  const isStale = deferredText !== text;

  return (
    <div style={{ padding: 20 }}>
      <h2>useDeferredValue Demo</h2>
      <p style={{ color: '#666' }}>
        useDeferredValue "stale" la valeur pour garder l'UI responsive.<br />
        L'input se met à jour immédiatement, la liste est différée.
      </p>

      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type something..."
        style={{ padding: '8px 12px', fontSize: 16, width: '100%', boxSizing: 'border-box' }}
      />

      <p style={{ color: '#9ca3af', fontSize: 12 }}>
        Current: "{text}" | Deferred: "{deferredText}" | Stale: {isStale ? 'yes' : 'no'}
      </p>

      <div style={{ opacity: isStale ? 0.5 : 1, transition: 'opacity 0.2s' }}>
        <HeavyList text={deferredText} />
      </div>
    </div>
  );
}

// Différence useTransition vs useDeferredValue:
// - useTransition: on contrôle le setState qu'on veut différer
// - useDeferredValue: on reçoit une valeur de l'extérieur et on la stale
// -> useTransition si tu contrôles le code, useDeferredValue sinon
