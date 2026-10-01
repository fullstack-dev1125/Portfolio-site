import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { projects, site } from '../config/site';
import Icon from './Icon';
import Section, { SectionHeading } from './Section';

const shownTags = 3;

export default function Work() {
  const track = useRef<HTMLUListElement>(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);

  // Work out how many "pages" the track has and which one is in view.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      const total = Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth - 0.05));
      setPages(total);
      const max = el.scrollWidth - el.clientWidth;
      setPage(max <= 0 ? 0 : Math.round((el.scrollLeft / max) * (total - 1)));
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const scrollBy = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector('li');
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth;
    el.scrollBy({ left: direction * step * Math.max(1, Math.floor(el.clientWidth / step)), behavior: 'smooth' });
  };

  const goTo = (index: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: ((el.scrollWidth - el.clientWidth) * index) / Math.max(1, pages - 1), behavior: 'smooth' });
  };

  return (
    <Section id="work" className="overflow-hidden">
      <div aria-hidden="true" className="absolute top-10 left-1/2 -z-10 h-80 w-80 rounded-full bg-white/[0.03] blur-[90px]" />
      <div className="container-page flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          id="work"
          pill="My Works"
          title="Featured"
          accent="Projects"
          align="left"
          intro="Stores, data visualisation and web apps from my portfolio. The Shopify stores are live, so go and try them."
        />
        <div className="reveal flex gap-3">
          <button type="button" className="icon-btn" onClick={() => scrollBy(-1)} disabled={page === 0} aria-controls="work-track">
            <Icon name="chevronLeft" className="h-5 w-5" />
            <span className="sr-only">Previous projects</span>
          </button>
          <button type="button" className="icon-btn" onClick={() => scrollBy(1)} disabled={page >= pages - 1} aria-controls="work-track">
            <Icon name="chevronRight" className="h-5 w-5" />
            <span className="sr-only">More projects</span>
          </button>
        </div>
      </div>

      <ul
        id="work-track"
        ref={track}
        aria-label="Projects"
        className="no-scrollbar reveal mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pt-2 pb-4"
        style={{
          paddingInline: 'max(1rem, calc((100vw - 1180px) / 2 + 2rem))',
          scrollPaddingInline: 'max(1rem, calc((100vw - 1180px) / 2 + 2rem))',
        }}
      >
        {projects.map((project) => {
          const extra = project.stack.length - shownTags;
          return (
            <li key={project.title} className="w-[82vw] max-w-[20.5rem] shrink-0 snap-start">
              <article className="card lift flex h-full flex-col p-2.5">
                <div className="zoom relative overflow-hidden rounded-xl">
                  <img
                    src={project.image.src}
                    alt={project.image.alt}
                    width={project.image.width}
                    height={project.image.height}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/11] w-full object-cover object-top"
                  />
                  <span className="absolute top-3 right-3 rounded-full bg-white px-2.5 py-0.5 text-[0.7rem] font-semibold text-[#09090b]">{project.category}</span>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 pt-14">
                    <div>
                      <p className="text-[0.62rem] font-bold tracking-[0.2em] text-[#d4d4d8] uppercase">Featured work</p>
                      <h3 className="mt-1 text-lg">{project.title}</h3>
                    </div>
                    <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                      <Icon name="arrowUpRight" className="h-4 w-4" />
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-2.5 pt-4 pb-2">
                  <p className="line-clamp-3 flex-1 text-sm text-muted">{project.body}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`Stack used for ${project.title}`}>
                    {project.stack.slice(0, shownTags).map((item) => (
                      <li key={item} className="tag">
                        {item}
                      </li>
                    ))}
                    {extra > 0 ? (
                      <li className="tag bg-white/15 font-bold text-text" title={project.stack.slice(shownTags).join(', ')}>
                        +{extra}
                        <span className="sr-only"> more: {project.stack.slice(shownTags).join(', ')}</span>
                      </li>
                    ) : null}
                  </ul>
                  {project.href ? (
                    <a className="btn btn-light mt-5 w-full justify-between" href={project.href} target="_blank" rel="noopener noreferrer">
                      View Project<span className="sr-only">: {project.title} (opens in a new tab)</span>
                      <Icon name="arrowUpRight" className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link className="btn btn-dark mt-5 w-full justify-between" to={{ hash: '#contact' }}>
                      Ask for a Walkthrough<span className="sr-only">: {project.title}</span>
                      <Icon name="arrow" className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      <div className="container-page">
        {pages > 1 ? (
          <div className="mt-6 flex justify-center gap-1.5" aria-hidden="true">
            {Array.from({ length: pages }, (_, index) => (
              <button
                key={index}
                type="button"
                tabIndex={-1}
                onClick={() => goTo(index)}
                className={`h-2 rounded-full motion-safe:transition-all ${index === page ? 'w-6 bg-white' : 'w-2 bg-white/25'}`}
              />
            ))}
          </div>
        ) : null}

        <p className="reveal mt-10 text-center">
          <a className="btn btn-light" href={site.links.github} target="_blank" rel="noopener noreferrer">
            <Icon name="github" className="h-4 w-4" />
            More on GitHub
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </div>
    </Section>
  );
}
