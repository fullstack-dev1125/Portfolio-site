import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { site } from '../config/site';
import { useReducedMotion } from '../hooks/useReducedMotion';
import Icon from './Icon';

const roles = ['Full-Stack Engineer', 'API & Microservices Engineer', 'AI & LLM Integrator', 'Frontend Performance Engineer'];

/** Types and deletes each role in turn. Shows the first role, still, under reduced motion. */
function useTypedRoles() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(roles[0].length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const word = roles[index];
    let delay = deleting ? 35 : 70;
    if (!deleting && length === word.length) delay = 1800;
    if (deleting && length === 0) delay = 300;

    const timer = window.setTimeout(() => {
      if (!deleting && length === word.length) setDeleting(true);
      else if (deleting && length === 0) {
        setDeleting(false);
        setIndex((value) => (value + 1) % roles.length);
      } else setLength((value) => value + (deleting ? -1 : 1));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [reduced, index, length, deleting]);

  return reduced ? roles[0] : roles[index].slice(0, length);
}

export default function Hero() {
  const typed = useTypedRoles();
  const [first, ...rest] = site.shortName.split(' ');

  return (
    <section id="top" aria-labelledby="hero-title" tabIndex={-1} className="stars relative isolate -mt-[4.5rem] overflow-hidden pt-[4.5rem] outline-none">
      <div aria-hidden="true" className="absolute top-24 left-1/2 -z-10 h-[26rem] w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-violet-deep/20 blur-[120px]" />
      <div className="container-page flex flex-col items-center pt-20 pb-24 text-center sm:pt-28 sm:pb-32">
        <p className="pill font-medium">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
          Open for new projects
        </p>

        <h1 id="hero-title" className="mt-7 text-5xl font-extrabold sm:text-6xl lg:text-7xl">
          Meet {first} <span className="text-accent">{rest.join(' ')}</span>
        </h1>

        <p className="mt-5 text-lg text-muted sm:text-xl">
          <span className="sr-only">{site.role}</span>
          <span aria-hidden="true">
            A Senior <span className="font-semibold text-text">{typed}</span>
            <span className="caret ml-0.5 inline-block h-[1.1em] w-0.5 translate-y-[0.2em] bg-text" />
          </span>
        </p>

        <p className="mt-5 max-w-xl text-muted">
          {site.yearsExperience} years designing and shipping production web applications, APIs and AI features for fintech,
          telecom, e-commerce and AI-powered platforms. Based in {site.address.city}, {site.address.country}.
        </p>

        <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Link to={{ hash: '#work' }} className="btn btn-light">
            View Projects
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
          <Link to={{ hash: '#about' }} className="btn btn-dark">
            My Story
            <Icon name="user" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
