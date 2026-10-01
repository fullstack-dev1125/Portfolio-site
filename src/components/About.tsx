import { Link } from 'react-router-dom';

import { profile, site, stats, strengths } from '../config/site';
import Icon from './Icon';
import Section from './Section';

function Portrait() {
  const { src, medium, alt, width, height } = site.photo;
  return (
    <div className="rounded-[1.75rem] border border-line-strong bg-card p-2.5 shadow-[0_30px_80px_-30px_rgb(124_58_237/0.6)]">
      <div className="overflow-hidden rounded-[1.3rem] bg-[radial-gradient(circle_at_50%_30%,#a855f7,#7c3aed_55%,#5b21b6)]">
        <img
          src={src}
          srcSet={`${medium} 520w, ${src} 1000w`}
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 320px, 70vw"
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="aspect-[4/5] w-full object-cover object-[50%_20%]"
        />
      </div>
    </div>
  );
}

export default function About() {
  return (
    <Section id="about">
      <div aria-hidden="true" className="absolute right-0 bottom-0 -z-10 h-96 w-96 rounded-full bg-violet-deep/10 blur-[120px]" />
      <div className="container-page grid items-start gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="reveal">
          <p className="pill">About Me</p>
          <h2 id="about-title" className="mt-4 text-4xl sm:text-5xl">
            Proudly Building Digital Products Since <span className="text-accent">{site.since}</span>
          </h2>

          <div className="relative mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-end lg:justify-start lg:pl-28">
            <div className="w-[70%] max-w-[20rem] sm:w-80 lg:w-[19rem]">
              <Portrait />
            </div>
            <ul className="grid w-full grid-cols-3 gap-2 rounded-2xl border border-line-strong bg-bg/85 p-2 backdrop-blur-md sm:absolute sm:bottom-6 sm:left-4 sm:block sm:w-auto sm:space-y-2 lg:left-0">
              {stats.map((stat) => (
                <li key={stat.label} className="rounded-xl bg-white/[0.04] px-4 py-3">
                  <span className="block text-2xl font-extrabold">{stat.value}</span>
                  <span className="block text-[0.65rem] font-semibold tracking-[0.14em] text-muted uppercase">{stat.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="reveal lg:pt-2">
          <div className="space-y-4 text-[1.05rem] text-muted">
            {profile.map((paragraph) => (
              <p key={paragraph.slice(0, 20)}>{paragraph}</p>
            ))}
          </div>

          <ul className="mt-9 grid gap-4 sm:grid-cols-2">
            {strengths.map((item) => (
              <li key={item.title} className="card lift relative overflow-hidden border-l-2 border-l-violet-mid p-5">
                <Icon name={item.icon} className="absolute top-4 right-4 h-8 w-8 text-white/15" />
                <p className="text-[0.68rem] font-bold tracking-[0.16em] text-muted uppercase">{item.eyebrow}</p>
                <h3 className="mt-1.5 text-lg">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to={{ hash: '#experience' }} className="btn btn-light">
              My Experience
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <Link to={{ hash: '#work' }} className="btn btn-dark">
              View Projects
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
