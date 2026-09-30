import type { ReactNode } from 'react';

import { addressLines, phoneHref, site } from '../config/site';
import Icon, { type IconName } from './Icon';
import Section from './Section';

function InfoCard({ icon, tile, title, children }: { icon: IconName; tile: string; title: string; children: ReactNode }) {
  return (
    <li className="reveal glow-card card-lift flex flex-col items-center p-6 text-center">
      <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl text-white ${tile}`}>
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-lg">{title}</h3>
      <div className="mt-2 text-[0.95rem] text-muted">{children}</div>
    </li>
  );
}

export default function Contact() {
  return (
    <Section
      id="contact"
      title="Get In Touch"
      emblem="cubes"
      intro="Tell me what you're building, when you need it and roughly what the budget is. A few lines is plenty."
    >
      <ul className="mt-14 grid gap-6 md:grid-cols-3">
        <InfoCard icon="mail" tile="bg-blue-deep" title="Email">
          <a className="link break-all text-text" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </InfoCard>
        <InfoCard icon="pin" tile="bg-pink-deep" title="Location">
          {site.address.city}, {site.address.region}, {site.address.country}
        </InfoCard>
        <InfoCard icon="clock" tile="bg-orange-deep" title="Response time">
          Within one business day, Philippine time ({site.timezone})
        </InfoCard>
      </ul>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* The part a verification reviewer reads. Plain and complete. */}
        <div className="reveal glow-card min-w-0 p-7 sm:p-9">
          <h3 className="flex items-center gap-3 text-xl">
            <Icon name="briefcase" className="h-6 w-6 text-cyan" />
            Business details
          </h3>
          <address className="mt-6 not-italic">
            <p className="text-2xl font-bold break-words">{site.name}</p>
            <p className="text-muted">{site.role}</p>
            <dl className="mt-6 space-y-4">
              <div>
                <dt className="text-sm font-semibold text-muted">Email</dt>
                <dd>
                  <a className="link break-all" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-muted">Phone</dt>
                <dd>
                  <a className="link break-words" href={`tel:${phoneHref}`}>
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-muted">Address</dt>
                <dd>
                  {addressLines[0]}
                  <br />
                  {addressLines[1]}
                </dd>
              </div>
            </dl>
          </address>
          <a className="btn btn-primary mt-8 w-full sm:w-auto" href={`mailto:${site.email}`}>
            <Icon name="mail" className="h-4 w-4" />
            Email me
          </a>
        </div>

        <div className="flex min-w-0 flex-col gap-6">
          <div className="reveal glow-card p-7">
            <h3 className="text-lg">Connect with me</h3>
            <ul className="mt-5 space-y-3">
              {[
                { label: 'GitHub', value: site.links.github.replace('https://', ''), href: site.links.github, icon: 'github' as const, tile: 'bg-violet-deep', ext: true },
                { label: 'Phone', value: site.phone, href: `tel:${phoneHref}`, icon: 'phone' as const, tile: 'bg-cyan-deep', ext: false },
              ].map((row) => (
                <li key={row.label}>
                  <a
                    href={row.href}
                    className="flex items-center gap-3 rounded-xl border border-line bg-bg/50 p-3 hover:border-violet"
                    {...(row.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white ${row.tile}`}>
                      <Icon name={row.icon} className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">{row.label}</span>
                      <span className="block truncate text-xs text-muted">{row.value}</span>
                    </span>
                    {row.ext ? <span className="sr-only"> (opens in a new tab)</span> : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal glow-card p-7">
            <h3 className="text-lg">Availability</h3>
            <p className="mt-3 text-[0.95rem] text-muted">Open to freelance projects and ongoing retainers.</p>
            <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-green">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-green shadow-[0_0_10px_#6ee7b7]" />
              Replies within one business day
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
