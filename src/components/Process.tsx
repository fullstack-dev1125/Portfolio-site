import { useEffect, useState } from 'react';

import { process } from '../config/site';
import { useReducedMotion } from '../hooks/useReducedMotion';
import CodeWindow from './CodeWindow';
import Icon from './Icon';
import Section, { SectionHeading } from './Section';

const pad = (n: number) => String(n).padStart(2, '0');

export default function Process() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  // Auto-advance until the visitor picks a step themselves.
  const [auto, setAuto] = useState(true);
  const [hovering, setHovering] = useState(false);
  const current = process[step];
  const next = process[(step + 1) % process.length];

  useEffect(() => {
    if (reduced || !auto || hovering) return;
    const timer = window.setTimeout(() => setStep((value) => (value + 1) % process.length), 5000);
    return () => window.clearTimeout(timer);
  }, [reduced, auto, hovering, step]);

  const pick = (index: number) => {
    setAuto(false);
    setStep(index);
  };

  return (
    <Section id="process">
      <div className="container-page" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
        <SectionHeading
          id="process"
          pill="Process"
          title="How I"
          accent="Work"
          intro="A clear workflow that keeps every project scoped, structured, tested and ready for launch."
        />

        {/* Stepper */}
        <ol className="reveal relative mx-auto mt-12 flex max-w-2xl items-center justify-between" aria-label="Steps">
          <span aria-hidden="true" className="absolute inset-x-5 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/[0.06]" />
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-5 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-violet-deep to-violet-mid motion-safe:transition-[width] motion-safe:duration-500"
            style={{ width: `calc((100% - 2.5rem) * ${step / (process.length - 1)})` }}
          />
          {process.map((item, index) => {
            const done = index <= step;
            const active = index === step;
            return (
              <li key={item.title} className="relative">
                <button
                  type="button"
                  onClick={() => pick(index)}
                  aria-current={active ? 'step' : undefined}
                  className={`flex items-center justify-center rounded-full text-sm font-bold motion-safe:transition-all ${
                    active
                      ? 'h-12 w-12 bg-violet-mid text-white shadow-[0_0_0_6px_rgb(168_85_247/0.18),0_0_30px_rgb(168_85_247/0.6)] sm:h-14 sm:w-14'
                      : done
                        ? 'h-10 w-10 bg-violet-deep text-white sm:h-12 sm:w-12'
                        : 'h-10 w-10 border border-line-strong bg-bg text-muted hover:text-text sm:h-12 sm:w-12'
                  }`}
                >
                  {pad(index + 1)}
                  <span className="sr-only">: {item.title}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="reveal mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-[1fr_1.3fr]">
          {/* Step details */}
          <article key={step} className="card fade-in flex flex-col p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-mid/30 bg-violet-deep/20 font-bold text-violet">{pad(step + 1)}</span>
              <div>
                <p className="text-xs font-semibold text-violet">{current.tag}</p>
                <h3 className="mt-0.5 text-2xl">{current.title}</h3>
              </div>
            </div>
            <p className="mt-5 text-muted">{current.body}</p>
            <ul className="mt-6 space-y-3 border-t border-line pt-6">
              {current.points.map((point) => (
                <li key={point} className="flex items-center gap-3 text-sm text-[#d4d4d8]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-deep/25 text-violet">
                    <Icon name="chevronRight" className="h-3.5 w-3.5" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-7">
              <div className="rounded-xl border border-violet-mid/25 bg-violet-deep/10 px-4 py-3">
                <p className="text-[0.65rem] font-bold tracking-[0.2em] text-muted uppercase">Outcome</p>
                <p className="mt-1 font-semibold">{current.outcome}</p>
              </div>
            </div>
          </article>

          {/* Visual: a sample of the code behind this step */}
          <div className="relative flex min-h-80 flex-col overflow-hidden rounded-2xl border border-line-strong bg-[linear-gradient(160deg,#1f1633,#120e1c_45%,#0c0b10)] p-5 sm:p-7">
            <div aria-hidden="true" className="absolute -top-20 -right-10 h-72 w-72 rounded-full bg-violet-deep/30 blur-3xl" />
            <Icon name={current.icon} className="absolute -right-6 -bottom-6 h-40 w-40 text-violet/10" />

            <div className="relative flex items-center justify-between gap-3">
              <span className="rounded-full border border-violet-mid/40 bg-violet-deep/25 px-3 py-1 text-xs font-medium text-violet">{current.tag}</span>
              <span className="text-xs text-muted">Sample code</span>
            </div>

            <div key={step} className="fade-in relative mt-5 flex flex-1 flex-col">
              <CodeWindow sample={current.code} />

              <div className="mt-auto flex items-end gap-4 pt-6">
                <p aria-hidden="true" className="text-5xl leading-none font-extrabold text-white/25 sm:text-6xl">
                  {pad(step + 1)}
                </p>
                <div>
                  <p className="text-2xl font-bold sm:text-3xl">{current.title}</p>
                  <p className="mt-1 text-sm text-muted">
                    Next: <span className="text-text">{next.title}</span>, {next.tag.toLowerCase()}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
