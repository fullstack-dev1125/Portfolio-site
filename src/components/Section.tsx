import type { ReactNode } from 'react';

import Emblem from './Emblem';

type SectionProps = {
  id: string;
  title: string;
  intro?: ReactNode;
  emblem?: 'wave' | 'orbit' | 'spiral' | 'cubes';
  /** Smaller title for sub-sections like "What I do". */
  small?: boolean;
  children: ReactNode;
};

export default function Section({ id, title, intro, emblem, small = false, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} tabIndex={-1} className={`overflow-x-clip outline-none ${small ? 'py-14 md:py-16' : 'py-20 md:py-28'}`}>
      <div className="container-page">
        <div className="reveal mx-auto max-w-2xl text-center">
          <h2 id={`${id}-title`} className={small ? 'text-2xl text-cyan sm:text-3xl' : 'text-neon pb-1 text-4xl sm:text-6xl'}>
            {title}
          </h2>
          {!small ? <div aria-hidden="true" className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-pink via-violet to-cyan" /> : null}
          {emblem ? <Emblem variant={emblem} /> : null}
          {intro ? <p className="mt-8 text-muted">{intro}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
