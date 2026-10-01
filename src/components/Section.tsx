import type { ReactNode } from 'react';

type HeadingProps = {
  id: string;
  pill: string;
  /** Title text before the accented part. */
  title: string;
  /** Accented (violet gradient) last part of the title. */
  accent?: string;
  intro?: ReactNode;
  align?: 'center' | 'left';
};

/** Pill label, two-tone title and intro, as used at the top of every section. */
export function SectionHeading({ id, pill, title, accent, intro, align = 'center' }: HeadingProps) {
  const centered = align === 'center';
  return (
    <div className={`reveal ${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}`}>
      <p className="pill">{pill}</p>
      <h2 id={`${id}-title`} className="mt-4 text-4xl sm:text-5xl">
        {title}
        {accent ? (
          <>
            {' '}
            <span className="text-accent">{accent}</span>
          </>
        ) : null}
      </h2>
      {intro ? <p className="mt-4 text-[1.05rem] text-muted">{intro}</p> : null}
    </div>
  );
}

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export default function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} tabIndex={-1} className={`relative py-20 outline-none md:py-28 ${className}`}>
      {children}
    </section>
  );
}
