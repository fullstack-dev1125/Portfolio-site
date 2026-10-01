import { useEffect, useState } from 'react';

const query = '(prefers-reduced-motion: reduce)';

/** True when the visitor asked for less motion. Follows changes live. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setReduced(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
