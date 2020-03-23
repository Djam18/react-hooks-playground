import { useEffect } from 'react';

// useRef + useEffect + document.addEventListener
// useful for dropdowns, modals
// clean cleanup with removeEventListener
function useClickOutside(ref, callback) {
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        console.log('click outside detected');
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, callback]); // callback devrait etre stable (useCallback chez l'appelant)
}

export default useClickOutside;
