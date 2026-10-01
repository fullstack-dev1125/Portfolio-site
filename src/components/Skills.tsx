import { useRef, useState, type KeyboardEvent } from 'react';

import { skillTabs } from '../config/site';
import Icon from './Icon';
import Section, { SectionHeading } from './Section';

export default function Skills() {
  const [tab, setTab] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent) => {
    const moves: Record<string, number> = { ArrowRight: tab + 1, ArrowLeft: tab - 1, Home: 0, End: skillTabs.length - 1 };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const next = (moves[event.key] + skillTabs.length) % skillTabs.length;
    setTab(next);
    buttons.current[next]?.focus();
  };

  return (
    <Section id="skills">
      <div className="container-page">
        <SectionHeading id="skills" pill="Skills & Tools" title="My Tech" accent="Stack" intro="The languages, frameworks and platforms I use day to day, grouped the way they show up in a project." />

        <div className="reveal mt-10 flex justify-center">
          <div role="tablist" aria-label="Skill areas" onKeyDown={onKeyDown} className="no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full border border-line bg-card p-1">
            {skillTabs.map((item, index) => {
              const active = index === tab;
              return (
                <button
                  key={item.label}
                  ref={(el) => {
                    buttons.current[index] = el;
                  }}
                  id={`skills-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="skills-panel"
                  tabIndex={active ? 0 : -1}
                  onClick={() => setTab(index)}
                  className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap motion-safe:transition-colors sm:px-5 ${
                    active ? 'bg-white text-[#09090b] shadow' : 'text-muted hover:text-text'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div id="skills-panel" role="tabpanel" aria-labelledby={`skills-tab-${tab}`} className="reveal mx-auto mt-10 max-w-5xl">
          <ul key={tab} className="fade-in grid items-start gap-5 md:grid-cols-3">
            {skillTabs[tab].groups.map((group, index) => {
              const featured = index === 1;
              return (
                <li
                  key={group.title}
                  className={`card p-6 sm:p-7 ${featured ? 'border-white/25 bg-[linear-gradient(180deg,#232129,#141317)] shadow-[0_30px_70px_-35px_rgb(255_255_255/0.25)] md:-mt-3' : ''}`}
                >
                  <h3 className="text-xl">{group.title}</h3>
                  <p className="mt-2 text-sm text-muted">
                    <span className="text-3xl font-extrabold text-text">{group.items.length}</span> core skills
                  </p>
                  <ul className="mt-6 space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-[#d4d4d8]">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-violet" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
