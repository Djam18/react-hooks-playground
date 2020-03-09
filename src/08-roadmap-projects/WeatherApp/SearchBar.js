import React, { useState } from 'react';
import useDebounce from '../../06-custom-hooks/useDebounce';

// utilise mon propre useDebounce custom hook!
function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');
  const debounced = useDebounce(value, 500);

  // useEffect pour lancer la recherche quand debounced change
  React.useEffect(() => {
    if (debounced.trim()) {
      console.log('searching for:', debounced);
      onSearch(debounced);
    }
  }, [debounced]); // eslint-disable-line react-hooks/exhaustive-deps
  // onSearch devrait etre dans les deps mais ca cause une infinite loop
  // je comprends pas encore pourquoi... useCallback chez l'appelant?

  return (
    <div style={{ marginBottom: '15px' }}>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Enter city name..."
        style={{ padding: '8px', width: '250px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
      />
      <span style={{ fontSize: '12px', color: '#999' }}>Search auto-triggers after 500ms</span>
    </div>
  );
}

export default SearchBar;
