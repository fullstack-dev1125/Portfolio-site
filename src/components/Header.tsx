import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { nav, site } from '../config/site';
import { useActiveSection } from '../hooks/useActiveSection';
import Icon from './Icon';

const ids = nav.map((item) => item.id);

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const active = useActiveSection(ids, location.pathname === '/');

  useEffect(() => setOpen(false), [location]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const links = nav.map((item) => {
    const current = active === item.id;
    return (
      <li key={item.id}>
        <Link
          to={{ pathname: '/', hash: `#${item.id}` }}
          aria-current={current ? 'location' : undefined}
          className={`block rounded-full px-3.5 py-1.5 text-sm font-medium ${
            current ? 'bg-gradient-to-r from-violet-deep to-blue-deep text-white' : 'text-text hover:text-cyan'
          }`}
        >
          {item.label}
        </Link>
      </li>
    );
  });

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-bg/75 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-pink-deep via-violet-deep to-blue-deep text-sm font-extrabold text-white">
            KS
          </span>
          <span className="text-neon-cool text-sm font-extrabold tracking-wide uppercase sm:text-base">{site.shortName}</span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-panel/70 p-1">{links}</ul>
        </nav>

        <button
          type="button"
          className="btn -mr-2 px-3 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? 'close' : 'menu'} className="h-6 w-6" />
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>

      <nav id="mobile-nav" aria-label="Main" hidden={!open} className="border-t border-line lg:hidden">
        <ul className="container-page flex flex-col gap-1 py-3">{links}</ul>
      </nav>
    </header>
  );
}
