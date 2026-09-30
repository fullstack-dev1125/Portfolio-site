import { Link } from 'react-router-dom';

import { phoneHref, site } from '../config/site';
import Icon, { type IconName } from './Icon';
import Portrait from './Portrait';

const socials: { label: string; href: string; icon: IconName; tile: string; external?: boolean }[] = [
  { label: 'GitHub', href: site.links.github, icon: 'github', tile: 'bg-violet-deep', external: true },
  { label: 'Email', href: `mailto:${site.email}`, icon: 'mail', tile: 'bg-pink-deep' },
  { label: 'Phone', href: `tel:${phoneHref}`, icon: 'phone', tile: 'bg-cyan-deep' },
];

export default function Hero() {
  const [first, second, ...rest] = site.name.split(' ');

  return (
    <section id="top" aria-labelledby="hero-title" tabIndex={-1} className="relative isolate overflow-hidden outline-none">
      <div aria-hidden="true" className="absolute top-10 left-1/2 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-violet-deep/25 blur-3xl" />
      <div className="container-page flex flex-col items-center py-16 text-center sm:py-24">
        <Portrait variant="avatar" />

        <h1 id="hero-title" className="mt-8">
          <span className="block text-xl font-semibold text-text sm:text-2xl">Hello, I'm</span>
          <span className="text-neon mt-2 block pb-2 text-[2.5rem] font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl">
            {first} {second}
            <br />
            {rest.join(' ')}
          </span>
        </h1>

        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-panel/80 px-4 py-1.5 text-sm font-medium">
          <Icon name="code" className="h-4 w-4 text-cyan" />
          {site.role}
        </p>

        <p className="mt-6 max-w-xl text-muted">
          I build <span className="font-semibold text-pink">web apps</span>,{' '}
          <span className="font-semibold text-violet">Shopify stores</span> and the{' '}
          <span className="font-semibold text-cyan">APIs</span> between them, for founders and small teams. You deal with
          me directly, and I do the work myself.
        </p>

        <ul className="mt-7 flex flex-col items-center gap-2.5 text-[0.95rem] sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-7">
          <li className="flex items-center gap-2">
            <Icon name="mail" className="h-4 w-4 shrink-0 text-pink" />
            <a className="link break-all" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <Icon name="phone" className="h-4 w-4 shrink-0 text-cyan" />
            <a className="link" href={`tel:${phoneHref}`}>
              {site.phone}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <Icon name="pin" className="h-4 w-4 shrink-0 text-violet" />
            <span>
              {site.address.city}, {site.address.country}
            </span>
          </li>
        </ul>

        <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link to={{ hash: '#work' }} className="btn btn-primary">
            View my work
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
          <Link to={{ hash: '#contact' }} className="btn btn-ghost">
            Get in touch
          </Link>
        </div>

        <ul className="mt-9 flex gap-3" aria-label="Profiles and contact">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                className={`flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-lg motion-safe:transition-transform motion-safe:hover:-translate-y-0.5 ${social.tile}`}
                {...(social.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <Icon name={social.icon} className="h-5 w-5" />
                <span className="sr-only">
                  {social.label}
                  {social.external ? ' (opens in a new tab)' : ''}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
