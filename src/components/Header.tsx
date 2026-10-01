import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { nav } from '../config/site';
import { useActiveSection } from '../hooks/useActiveSection';
import Icon from './Icon';
import Logo from './Logo';

const ids = nav.map((item) => item.id);

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const active = useActiveSection(ids, location.pathname === '/');

  useEffect(() => setOpen(false), [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b motion-safe:transition-colors ${
        scrolled || open ? 'border-line bg-bg/80 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <Link to="/" aria-label="Kim Soriano, home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const current = active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    to={{ pathname: '/', hash: `#${item.id}` }}
                    aria-current={current ? 'location' : undefined}
                    className={`relative block px-3 py-6 text-sm font-medium ${current ? 'text-text' : 'text-muted hover:text-text'}`}
                  >
                    {item.label}
                    {current ? <span aria-hidden="true" className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-text" /> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link to={{ pathname: '/', hash: '#contact' }} className="btn btn-light hidden min-h-10 px-5 sm:inline-flex">
            <Icon name="briefcase" className="h-4 w-4" />
            Hire Me
          </Link>
          <button
            type="button"
            className="icon-btn lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      <nav id="mobile-nav" aria-label="Main" hidden={!open} className="border-t border-line lg:hidden">
        <ul className="container-page flex flex-col py-3">
          {nav.map((item) => (
            <li key={item.id}>
              <Link
                to={{ pathname: '/', hash: `#${item.id}` }}
                aria-current={active === item.id ? 'location' : undefined}
                className={`block rounded-lg px-3 py-2.5 font-medium ${active === item.id ? 'bg-white/5 text-text' : 'text-muted'}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="mt-2 sm:hidden">
            <Link to={{ pathname: '/', hash: '#contact' }} className="btn btn-light w-full">
              Hire Me
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
