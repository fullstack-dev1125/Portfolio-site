import { useState } from 'react';

import { projects, site } from '../config/site';
import Icon from './Icon';
import Section from './Section';

const categories = Array.from(new Set(projects.map((project) => project.category)));
const filters = ['All', ...categories] as const;
type Filter = (typeof filters)[number];

const badge: Record<(typeof categories)[number], string> = {
  Shopify: 'bg-green-deep',
  WordPress: 'bg-blue-deep',
  'Data visualisation': 'bg-pink-deep',
  'Web apps': 'bg-violet-deep',
};

export default function Work() {
  const [filter, setFilter] = useState<Filter>('All');
  const shown = filter === 'All' ? projects : projects.filter((project) => project.category === filter);

  return (
    <Section id="work" title="My Projects" emblem="orbit" intro={`All ${projects.length} projects from my portfolio. The three stores are live, so go and poke at them.`}>
      <div className="reveal mt-12 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects">
        {filters.map((name) => {
          const count = name === 'All' ? projects.length : projects.filter((project) => project.category === name).length;
          const active = filter === name;
          return (
            <button
              key={name}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(name)}
              className={`btn min-h-10 px-4 text-sm ${active ? 'btn-primary' : 'btn-ghost'}`}
            >
              {name}
              <span className={`text-xs ${active ? 'text-white' : 'text-muted'}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? 'project' : 'projects'}
      </p>

      <ul className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((project) => (
          <li key={project.title} className="glow-card card-lift flex flex-col overflow-hidden">
            <div className="relative overflow-hidden">
              <img
                src={project.image.src}
                alt={project.image.alt}
                width={project.image.width}
                height={project.image.height}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover object-top"
              />
              <span className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold text-white ${badge[project.category]}`}>
                {project.category}
              </span>
            </div>
            <article className="flex flex-1 flex-col p-6">
              <h3 className="text-xl text-cyan">{project.title}</h3>
              <p className="mt-1 text-sm text-muted">{project.kind}</p>
              <p className="mt-4 flex-1 text-[0.95rem]">{project.body}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Stack used for ${project.title}`}>
                {project.stack.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
              {project.href ? (
                <a className="btn btn-primary mt-6 min-h-10 w-full text-sm" href={project.href} target="_blank" rel="noopener noreferrer">
                  <Icon name="external" className="h-4 w-4" />
                  Visit {project.href.replace(/^https?:\/\//, '')}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : null}
            </article>
          </li>
        ))}
      </ul>

      <p className="reveal mx-auto mt-12 max-w-xl text-center text-muted">
        Some of what I build sits behind logins or under NDA, so it isn't listed. Ask and I'll walk you through
        something similar.
      </p>
      <p className="reveal mt-6 text-center">
        <a className="btn btn-pink" href={site.links.github} target="_blank" rel="noopener noreferrer">
          <Icon name="github" className="h-4 w-4" />
          More on GitHub
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
    </Section>
  );
}
