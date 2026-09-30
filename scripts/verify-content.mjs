/**
 * Checks dist/index.html, the file a verification reviewer or crawler gets
 * before any JavaScript runs.
 *
 *   npm run build && npm run verify
 *
 * Fails if the name, email, phone, address, JSON-LD or <noscript> block is
 * missing. Placeholders ([[FILL: ...]]) are reported as warnings; pass --strict
 * to make them fail too, which is what you want right before going live.
 */
import { readFileSync } from 'node:fs';

const strict = process.argv.includes('--strict');
const html = readFileSync('dist/index.html', 'utf8');
const failures = [];
const check = (ok, message) => ok || failures.push(message);

const ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
check(ldMatch, 'no JSON-LD block');
const graph = ldMatch ? JSON.parse(ldMatch[1])['@graph'] : [];
const person = graph.find((node) => node['@type'] === 'Person');
const business = graph.find((node) => node['@type'] === 'ProfessionalService');
check(person, 'no Person in JSON-LD');
check(business, 'no ProfessionalService in JSON-LD');

for (const [label, node] of [['Person', person], ['ProfessionalService', business]]) {
  if (!node) continue;
  for (const key of ['name', 'email', 'telephone', 'url']) check(node[key], `${label} has no ${key}`);
  for (const key of ['streetAddress', 'addressLocality', 'addressRegion', 'addressCountry']) {
    check(node.address?.[key], `${label} address has no ${key}`);
  }
}

const noscript = html.match(/<noscript>([\s\S]*?)<\/noscript>/)?.[1] ?? '';
check(noscript, 'no <noscript> block');
if (person) {
  const a = person.address;
  const expected = [person.name, person.email, a.streetAddress, a.addressLocality, a.addressRegion];
  for (const value of expected) check(noscript.includes(value), `<noscript> is missing "${value}"`);
  check(noscript.includes(person.telephone) || noscript.includes('Phone:'), '<noscript> is missing the phone');
}

check(/<title>[^<]+<\/title>/.test(html), 'no <title>');
check(/<meta name="description" content="[^"]+"/.test(html), 'no meta description');
check(html.includes('property="og:title"'), 'no og:title');

const fills = [...new Set(html.match(/\[\[FILL:[^\]]*\]\]/g) ?? [])];

if (person) {
  console.log('Identity in the static HTML:');
  console.log(`  name     ${person.name}`);
  console.log(`  email    ${person.email}`);
  console.log(`  phone    ${person.telephone}`);
  console.log(`  address  ${Object.values(person.address).slice(1).join(', ')}`);
  console.log(`  url      ${person.url}`);
}

if (fills.length) {
  console.log(`\n${strict ? 'Error' : 'Warning'}: ${fills.length} placeholder(s) still in dist/index.html:`);
  for (const fill of fills) console.log(`  ${fill}`);
  console.log('Run `npm run fills` to find every placeholder in the source.');
  if (strict) failures.push('placeholders remain');
}

if (failures.length) {
  console.error(`\nFailed:\n  ${failures.join('\n  ')}`);
  process.exit(1);
}
console.log('\nOK: JSON-LD, meta tags and <noscript> contact details are all present.');
