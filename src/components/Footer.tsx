import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { addressOneLine, nav, phoneHref, services, site } from '../config/site';
import Icon, { type IconName } from './Icon';
import Logo from './Logo';

const socials: { label: string; href: string; icon: IconName; external?: boolean }[] = [
  { label: 'GitHub', href: site.links.github, icon: 'github', external: true },
  { label: 'Email', href: `mailto:${site.email}`, icon: 'mail' },
  { label: 'Phone', href: `tel:${phoneHref}`, icon: 'phone' },
];

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-base">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm text-muted">{children}</ul>
    </div>
  );
}

const bullet = <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />;

export default function Footer() {
  return (
    <footer className="mt-20">
      <div className="container-page grid gap-12 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr_1.3fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm text-muted">
            {site.role} building fast, reliable web applications, APIs and AI features. Clean code, clear communication.
          </p>
          <ul className="mt-6 flex gap-2" aria-label="Profiles and contact">
            {socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} className="icon-btn h-10 w-10" {...(social.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  <Icon name={social.icon} className="h-4 w-4" />
                  <span className="sr-only">
                    {social.label}
                    {social.external ? ' (opens in a new tab)' : ''}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <Column title="Quick Links">
          {nav.slice(1).map((item) => (
            <li key={item.id} className="flex gap-2">
              {bullet}
              <Link className="hover:text-text" to={{ pathname: '/', hash: `#${item.id}` }}>
                {item.label}
              </Link>
            </li>
          ))}
        </Column>

        <Column title="Services">
          {services.slice(0, 6).map((service) => (
            <li key={service.title} className="flex gap-2">
              {bullet}
              <Link className="hover:text-text" to={{ pathname: '/', hash: '#services' }}>
                {service.title}
              </Link>
            </li>
          ))}
        </Column>

        <Column title="Contact">
          <li className="flex gap-2">
            {bullet}
            {addressOneLine}
          </li>
          <li className="flex gap-2">
            {bullet}
            <a className="break-all hover:text-text" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </li>
          <li className="flex gap-2">
            {bullet}
            <a className="hover:text-text" href={`tel:${phoneHref}`}>
              {site.phone}
            </a>
          </li>
          <li>
            <a className="btn btn-dark mt-1 min-h-10 px-4 text-sm" href={`mailto:${site.email}`}>
              Get in Touch
              <Icon name="arrow" className="h-4 w-4" />
            </a>
          </li>
        </Column>
      </div>

      <div className="container-page">
        <div className="flex flex-col gap-3 border-t border-line py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-5">
            <Link className="hover:text-text" to="/legal">
              Legal notice
            </Link>
            <Link className="inline-flex items-center gap-1.5 hover:text-text" to={{ pathname: '/', hash: '#top' }}>
              Back to top
              <Icon name="arrowUp" className="h-4 w-4" />
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
