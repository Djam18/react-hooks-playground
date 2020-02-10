import { useState, useEffect } from 'react';

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);

    mq.addListener(handler); // deprecated in newer browsers but works in 2020
    return () => mq.removeListener(handler);
  }, [query]);

  return matches;
}

export default useMediaQuery;
