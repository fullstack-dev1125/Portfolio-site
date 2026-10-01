/**
 * Writes the identity details from src/config/site.ts into index.html at build
 * time (and in dev), so they exist as static HTML before React mounts:
 *
 *   <!-- identity:head -->      title, meta description, Open Graph, JSON-LD
 *   <!-- identity:noscript -->  name, email, phone and address as plain text
 *
 * A verification reviewer or crawler that never runs JavaScript still sees all
 * of it. Edit site.ts, not index.html.
 */
import type { Plugin } from 'vite';

import { addressLines, isPlaceholder, phoneHref, services, site } from './src/config/site.ts';

const esc = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const hasRealUrl = !isPlaceholder(site.url);
// Absolute @ids once the URL is known, fragment ids until then.
const base = hasRealUrl ? site.url : '';
const photoUrl = hasRealUrl ? `${site.url}${site.photo.jpg}` : undefined;

const title = `${site.name} | Senior full-stack engineer, Angeles City`;

function jsonLd() {
  const address = {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.countryCode,
    ...(site.address.postalCode ? { postalCode: site.address.postalCode } : {}),
  };

  const person = {
    '@type': 'Person',
    '@id': `${base}/#person`,
    name: site.name,
    jobTitle: site.role,
    email: site.email,
    telephone: phoneHref,
    address,
    url: site.url,
    ...(photoUrl ? { image: photoUrl } : {}),
    sameAs: [site.links.github],
  };

  const business = {
    '@type': 'ProfessionalService',
    '@id': `${base}/#business`,
    name: site.businessName,
    description: site.description,
    email: site.email,
    telephone: phoneHref,
    address,
    url: site.url,
    ...(photoUrl ? { image: photoUrl } : {}),
    areaServed: 'Worldwide',
    founder: { '@id': `${base}/#person` },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.title, provider: { '@id': `${base}/#person` } },
      })),
    },
  };

  // Escape "<" so no value can close the script tag early.
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': [person, business] }).replace(
    /</g,
    '\\u003c',
  );
  return `<script type="application/ld+json">${json}</script>`;
}

function head() {
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(site.description)}" />`,
    `<meta name="author" content="${esc(site.name)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(site.description)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    // No canonical tag: this one index.html serves every route, so it would be wrong on /legal.
    ...(hasRealUrl ? [`<meta property="og:url" content="${esc(site.url)}/" />`] : []),
    ...(photoUrl
      ? [
          `<meta property="og:image" content="${esc(photoUrl)}" />`,
          `<meta property="og:image:alt" content="${esc(site.photo.alt)}" />`,
        ]
      : []),
    `<meta name="twitter:card" content="summary" />`,
    jsonLd(),
  ];
  return tags.join('\n    ');
}

function noscript() {
  return `<noscript>
      <div style="max-width:40rem;margin:2rem auto;padding:0 1rem;font-family:system-ui,sans-serif;line-height:1.6;color:#f4f4f5;background:#09090b">
        <h1>${esc(site.name)}</h1>
        <p>${esc(site.role)}. I design and ship production web applications, APIs, microservices and AI features.</p>
        <p>
          Email: <a href="mailto:${esc(site.email)}">${esc(site.email)}</a><br />
          Phone: <a href="tel:${esc(phoneHref)}">${esc(site.phone)}</a><br />
          Address: ${addressLines.map(esc).join(', ')}
        </p>
        <p>This site works best with JavaScript turned on, but everything above is all you need to reach me.</p>
      </div>
    </noscript>`;
}

export function identityHtml(): Plugin {
  return {
    name: 'identity-html',
    transformIndexHtml(html) {
      return html.replace('<!-- identity:head -->', head()).replace('<!-- identity:noscript -->', noscript());
    },
  };
}
