import { useState } from 'react';

// simple boolean toggle
// utile partout: modals, dropdowns, menus...
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(v => !v);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return [value, toggle, setTrue, setFalse];
}

export default useToggle;
