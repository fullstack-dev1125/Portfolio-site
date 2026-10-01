import { useRef, useState, type KeyboardEvent } from 'react';

import { jobs } from '../config/site';
import Icon from './Icon';
import Section, { SectionHeading } from './Section';

const years = `${jobs.at(-1)!.period.match(/\d{4}/)![0]} – ${jobs[0].period.match(/\d{4}(?!.*\d{4})/)![0]}`;

export default function Experience() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const job = jobs[selected];

  const select = (index: number, focus = false) => {
    const next = (index + jobs.length) % jobs.length;
    setSelected(next);
    if (focus) tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowDown: selected + 1, ArrowRight: selected + 1, ArrowUp: selected - 1, ArrowLeft: selected - 1, Home: 0, End: jobs.length - 1 };
    if (!(event.key in keys)) return;
    event.preventDefault();
    select(keys[event.key], true);
  };

  return (
    <Section id="experience">
      <div className="container-page">
        <SectionHeading
          id="experience"
          pill="Career"
          title="Where I've"
          accent="Worked"
          intro="From an internship in 2017 to leading backend, AI and frontend work on a supply chain platform. Pick a role to see what I did there."
        />

        <div className="reveal mt-14 grid gap-5 lg:grid-cols-[1.55fr_1fr]">
          {/* Selected role */}
          <article
            id="job-panel"
            role="tabpanel"
            aria-labelledby={`job-tab-${selected}`}
            className="card relative overflow-hidden p-6 shadow-[0_30px_80px_-40px_rgb(124_58_237/0.7)] sm:p-8"
          >
            <div aria-hidden="true" className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-violet-deep/20 blur-3xl" />
            <div key={selected} className="fade-in relative">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-deep text-lg font-extrabold text-white">
                    {job.company.charAt(0)}
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl">{job.role}</h3>
                    <p className="mt-1 text-sm text-muted">
                      {job.company}
                      {job.site ? <span className="text-dim"> · {job.site}</span> : null}
                    </p>
                  </div>
                </div>
                <span className="pill text-xs">
                  <Icon name="clock" className="h-3.5 w-3.5 text-violet" />
                  {job.period}
                </span>
              </div>

              <p className="mt-6 text-muted">{job.summary}</p>

              <div className="mt-6 space-y-5">
                {job.groups.map((group) => (
                  <div key={group.title}>
                    <h4 className="text-sm font-bold text-violet">{group.title}</h4>
                    <ul className="mt-2 space-y-2">
                      {group.points.map((point) => (
                        <li key={point} className="flex gap-3 text-[0.95rem] text-[#d4d4d8]">
                          <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-violet" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <ul className="mt-7 flex flex-wrap gap-2" aria-label="Main tools in this role">
                {job.stack.map((item) => (
                  <li key={item} className="tag">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* Queue of roles */}
          <div className="card flex flex-col overflow-hidden">
            <div className="flex items-start justify-between gap-3 border-b border-line p-5">
              <div>
                <p className="flex items-center gap-2 text-xs text-muted">
                  <Icon name="list" className="h-4 w-4" />
                  Career queue
                </p>
                <h3 className="mt-1.5 text-xl">Employment History.</h3>
                <p className="mt-1 text-xs text-muted">
                  {jobs.length} roles · {years}
                </p>
              </div>
              <div className="flex gap-2">
                <button type="button" className="icon-btn h-9 w-9" onClick={() => select(selected - 1)} disabled={selected === 0}>
                  <Icon name="chevronUp" className="h-4 w-4" />
                  <span className="sr-only">Previous role</span>
                </button>
                <button type="button" className="icon-btn h-9 w-9" onClick={() => select(selected + 1)} disabled={selected === jobs.length - 1}>
                  <Icon name="chevronDown" className="h-4 w-4" />
                  <span className="sr-only">Next role</span>
                </button>
              </div>
            </div>

            <div role="tablist" aria-label="Roles" aria-orientation="vertical" className="flex flex-col gap-2 p-3" onKeyDown={onKeyDown}>
              {jobs.map((item, index) => {
                const active = index === selected;
                return (
                  <button
                    key={item.company}
                    ref={(el) => {
                      tabs.current[index] = el;
                    }}
                    id={`job-tab-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-controls="job-panel"
                    tabIndex={active ? 0 : -1}
                    onClick={() => select(index)}
                    className={`flex items-start gap-3 rounded-xl border p-3 text-left motion-safe:transition-colors ${
                      active ? 'border-line-strong bg-white/[0.06]' : 'border-transparent hover:bg-white/[0.03]'
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                        active ? 'bg-violet-deep text-white' : 'bg-white/[0.06] text-muted'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold">{item.company}</span>
                        {index === 0 ? <span className="rounded-full bg-white px-2 py-px text-[0.65rem] font-bold text-[#09090b]">Latest</span> : null}
                      </span>
                      <span className="mt-0.5 block truncate text-sm text-muted">{item.short}</span>
                      <span className="mt-0.5 block text-xs text-dim">{item.period}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
