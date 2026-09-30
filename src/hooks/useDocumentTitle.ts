import { useEffect } from 'react';

/** Sets the tab title for a route and puts the original back when it unmounts. */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
