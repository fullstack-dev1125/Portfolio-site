import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to the section in the URL hash (so /#contact works from /legal and
 * on a direct visit), or to the top on a plain route change. Focus moves to the
 * target so keyboard and screen reader users land where they asked to go.
 */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return;
    target.scrollIntoView();
    target.focus({ preventScroll: true });
  }, [pathname, hash, key]);

  return null;
}
