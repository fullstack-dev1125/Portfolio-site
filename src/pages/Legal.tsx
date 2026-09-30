import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { addressLines, phoneHref, site } from '../config/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-line py-4 last:border-b-0 sm:grid-cols-[12rem_1fr] sm:gap-6">
      <dt className="font-bold">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export default function Legal() {
  useDocumentTitle(`Legal notice | ${site.name}`);

  return (
    <div className="container-page max-w-3xl py-16 md:py-24">
      <p className="eyebrow mb-3">// imprint</p>
      <h1 className="text-4xl sm:text-5xl">Legal notice</h1>
      <p className="mt-5 text-muted">The formal bit. Who runs this site and how to reach them.</p>

      <section aria-labelledby="operator" className="mt-12">
        <h2 id="operator" className="text-2xl">
          Operator
        </h2>
        <dl className="mt-5 border border-line bg-panel px-6 py-2 sm:px-8">
          <Row label="Legal name">{site.name}</Row>
          <Row label="Trading as">{site.businessName}</Row>
          <Row label="Business address">
            <address className="not-italic">
              {addressLines[0]}
              <br />
              {addressLines[1]}
            </address>
          </Row>
          <Row label="Email">
            <a className="link break-all" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </Row>
          <Row label="Phone">
            <a className="link" href={`tel:${phoneHref}`}>
              {site.phone}
            </a>
          </Row>
        </dl>
      </section>

      <section aria-labelledby="status" className="mt-12 space-y-4">
        <h2 id="status" className="text-2xl">
          Business status
        </h2>
        <p>
          I operate as an independent contractor based in the {site.address.country}. The services described on this
          site are provided by me, {site.name}, personally.
        </p>
      </section>

      <section aria-labelledby="privacy" className="mt-12 space-y-4">
        <h2 id="privacy" className="text-2xl">
          Privacy
        </h2>
        <p>
          This site sets no cookies, runs no analytics and has no forms. The typeface is loaded from Google Fonts, so
          your browser makes a request to Google's servers when the page loads. If you email me, I use your message only
          to reply to you.
        </p>
      </section>

      <p className="mt-14">
        <Link to="/" className="link font-semibold">
          Back to the home page
        </Link>
      </p>
    </div>
  );
}
