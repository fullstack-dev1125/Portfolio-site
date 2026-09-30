/**
 * Single source of truth for every personal and business detail on this site.
 *
 * Nothing in src/components or src/pages hardcodes a name, email, phone number,
 * address or link. This file also feeds index.html at build time (see
 * identity-html.ts), so the JSON-LD, meta tags and <noscript> block always
 * match what the React app shows.
 *
 * Anything still reading [[FILL: ...]] needs a real value before launch.
 * `npm run fills` lists every one that's left.
 */

export const site = {
  /**
   * Public URL of this website, no trailing slash. Used for the JSON-LD `url`
   * and the Open Graph tags (og:url and og:image are only emitted once this is
   * a real https:// address).
   */
  url: '[[FILL: live site URL after deploying, e.g. https://kimsoriano.vercel.app]]',

  /** Legal name. Used for verification, the imprint and schema.org Person. */
  name: 'Kim Russel Antonio Soriano',
  /** Shorter form for the header and casual copy. */
  shortName: 'Kim Soriano',
  firstName: 'Kim',

  /** Trading name, used for schema.org ProfessionalService and the imprint. */
  businessName: 'Kim Soriano Software Development',
  role: 'Freelance full-stack developer',
  yearsExperience: 8,

  description:
    'Kim Russel Antonio Soriano is a freelance full-stack developer in Angeles City, Philippines, building web applications, Shopify stores, Laravel apps and API integrations for clients worldwide.',

  email: 'sorianokimrussel02@gmail.com',

  /**
   * Phone in international format with spaces, e.g. '+63 912 345 6789'.
   * The tel: link and JSON-LD telephone are derived from it automatically.
   */
  phone: '+63 935 910 4715',

  address: {
    street: 'R288 Talang St., Barangay Pandan',
    city: 'Angeles City',
    region: 'Pampanga',
    country: 'Philippines',
    countryCode: 'PH',
    /** Optional. Leave empty to omit it from the JSON-LD. */
    postalCode: '',
  },

  timezone: 'UTC+8',

  photo: {
    /** Square head-and-shoulders portrait, 1200 x 1200. */
    src: '/portrait.webp',
    /** Same crop at 600 x 600, for 1x and 2x screens. */
    medium: '/portrait-600.webp',
    /** Tighter face crop for the round hero avatar, 480 x 480. */
    avatar: '/portrait-avatar.webp',
    /** JPEG copy for Open Graph and JSON-LD, where WebP isn't always supported. */
    jpg: '/portrait.jpg',
    alt: 'Portrait of Kim Russel Antonio Soriano in a white shirt',
    width: 1200,
    height: 1200,
  },

  links: {
    github: 'https://github.com/fullstack-dev1125',
  },
} as const;

/** True while a value still reads [[FILL: ...]]. */
export const isPlaceholder = (value: string) => value.startsWith('[[FILL');

/**
 * E.164 form of the phone number for tel: links and schema.org telephone. Left
 * as the placeholder text until a real number is set, so it can't pass as one.
 */
export const phoneHref = isPlaceholder(site.phone) ? site.phone : site.phone.replace(/[^\d+]/g, '');

/** Street on one line, then city, region and country on the next. */
export const addressLines = [
  site.address.street,
  `${site.address.city}, ${site.address.region}, ${site.address.country}`,
] as const;

export const addressOneLine = addressLines.join(', ');

export const nav = [
  { label: 'Home', id: 'top' },
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Skills', id: 'skills' },
  { label: 'Work', id: 'work' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
] as const;

export type Service = {
  /** Full name, used in the JSON-LD offer catalog. */
  title: string;
  /** Two-line card heading. The first word gets the underline. */
  heading: [string, string];
  tagline: string;
  body: string;
  icon: 'window' | 'bag' | 'layers' | 'plug';
  /** Icon tile colour. */
  color: Tone;
};

/** Neon colour families used for icon tiles and card glows. */
export type Tone = 'blue' | 'violet' | 'pink' | 'orange' | 'cyan' | 'green';

export const services: Service[] = [
  {
    title: 'Full-stack web application development',
    heading: ['Full-stack', 'Web Apps'],
    tagline: 'React, Next.js, Vue, Node',
    body: "Dashboards, customer portals, booking systems and internal tools, built end to end: interface, backend, database and deploy. I ship in small releases you can click through as they land.",
    icon: 'window',
    color: 'blue',
  },
  {
    title: 'Shopify development and conversion rate optimisation',
    heading: ['Shopify', 'Development & CRO'],
    tagline: 'Themes, Liquid, Shopify Plus',
    body: "Custom themes, sections, templates and store migrations. I also clean up the path from product page to checkout, always on a duplicate theme so your live shop isn't touched until you approve it.",
    icon: 'bag',
    color: 'violet',
  },
  {
    title: 'Laravel and PHP application development',
    heading: ['Laravel', '& PHP Apps'],
    tagline: 'New builds and existing codebases',
    body: "New Laravel applications, and steady work on existing PHP codebases that need someone to look after them. I add tests around what's there before changing it, so a fix in one place doesn't break another.",
    icon: 'layers',
    color: 'orange',
  },
  {
    title: 'API development and third-party integrations',
    heading: ['APIs', '& Integrations'],
    tagline: 'REST, GraphQL, webhooks',
    body: "APIs designed with you before any code gets written, then delivered tested and documented. I also connect the tools you already pay for, like payment providers, CRMs and shipping services.",
    icon: 'plug',
    color: 'pink',
  },
];

export type Project = {
  title: string;
  /** Used for the Work filter. */
  category: 'Shopify' | 'WordPress' | 'Data visualisation' | 'Web apps';
  kind: string;
  body: string;
  stack: string[];
  href?: string;
  /** Screenshot in public/work/. Lazy-loaded. */
  image: { src: string; alt: string; width: number; height: number };
};

/**
 * Every project from my original portfolio (kimrussel.vercel.app), with its
 * original title, tags and screenshot. Descriptions only restate those tags.
 */
export const projects: Project[] = [
  {
    title: 'Not Too Sweet',
    category: 'Shopify',
    kind: 'Shopify store, botanical drinks',
    body: 'Shopify store for a low-sugar botanical drinks brand: theme templates, web design and API integrations.',
    stack: ['Shopify', 'Shopify templates', 'Web design', 'API integration'],
    href: 'https://nottoosweetlife.com',
    image: { src: '/work/not-too-sweet.webp', alt: 'Home page of the Not Too Sweet store, showing a bottle of lavender and honey lemonade', width: 800, height: 500 },
  },
  {
    title: 'Mowellens store',
    category: 'Shopify',
    kind: 'Shopify store, wellness and skincare',
    body: 'Shopify development for a wellness and skincare brand: theme customisation, product and collection templates, and API integrations.',
    stack: ['Shopify', 'Shopify templates', 'Web design', 'API integration'],
    href: 'https://mowellens.com',
    image: { src: '/work/mowellens.webp', alt: 'Mowellens store home page with amber bottles of body oil', width: 800, height: 500 },
  },
  {
    title: 'Blackhalo store',
    category: 'Shopify',
    kind: 'Shopify store, fashion',
    body: 'Storefront work on a Shopify fashion store: theme sections and templates, web design and API integrations.',
    stack: ['Shopify', 'Shopify templates', 'Web design', 'API integration'],
    href: 'https://blackhalo.com',
    image: { src: '/work/blackhalo.webp', alt: 'Black Halo shop page listing dresses and jumpsuits', width: 800, height: 500 },
  },
  {
    title: 'Docubee website',
    category: 'WordPress',
    kind: 'WordPress site',
    body: 'A Figma design built out in WordPress with Elementor, HTML and CSS.',
    stack: ['Elementor', 'Figma to WordPress', 'HTML', 'CSS'],
    image: { src: '/work/docubee.webp', alt: 'Docubee home page promoting contract automation software', width: 800, height: 500 },
  },
  {
    title: 'WordPress website',
    category: 'WordPress',
    kind: 'WordPress site',
    body: 'A WordPress site with custom content fields in ACF and a Bootstrap front end.',
    stack: ['WordPress', 'ACF', 'Bootstrap'],
    image: { src: '/work/wordpress-site.webp', alt: 'Home page of a communications agency website built in WordPress', width: 800, height: 500 },
  },
  {
    title: 'Trade Map',
    category: 'Data visualisation',
    kind: 'Interactive map',
    body: 'An interactive trade map in React, with Deck.gl and Mapbox for the map layers and D3.js for the charts.',
    stack: ['React', 'Deck.gl', 'Mapbox', 'D3.js'],
    image: { src: '/work/trade-map.webp', alt: 'Dark world map with trade routes drawn as arcs and a timeline chart below', width: 800, height: 500 },
  },
  {
    title: 'Route Tool',
    category: 'Data visualisation',
    kind: 'Interactive map',
    body: 'A route exploration tool in React on a Mapbox map, with Deck.gl layers and D3.js visualisations.',
    stack: ['React', 'Deck.gl', 'Mapbox', 'D3.js'],
    image: { src: '/work/route-tool.webp', alt: 'Map of Africa and Asia with a highlighted route between two airports', width: 800, height: 500 },
  },
  {
    title: 'Country Profile',
    category: 'Data visualisation',
    kind: 'Data dashboard',
    body: 'Country-by-country data profiles in React, with charts built in amCharts and D3.js.',
    stack: ['React', 'amCharts', 'D3.js'],
    image: { src: '/work/country-profile.webp', alt: 'Globe with African countries shaded by value and a tooltip on one country', width: 800, height: 500 },
  },
  {
    title: 'Routes Dashboard',
    category: 'Data visualisation',
    kind: 'Data dashboard',
    body: 'A routes data dashboard in Vue.js, with charts in D3.js and amCharts and the data prepared in R.',
    stack: ['Vue.js', 'D3.js', 'amCharts', 'R'],
    image: { src: '/work/routes-dashboard.webp', alt: 'Routes dashboard page with a globe plotting incidents around the world', width: 800, height: 500 },
  },
  {
    title: 'Doctornyla website',
    category: 'WordPress',
    kind: 'WordPress site',
    body: 'A WordPress site for a medical aesthetics clinic, with custom content fields in ACF and a Bootstrap front end.',
    stack: ['WordPress', 'ACF', 'Bootstrap'],
    image: { src: '/work/doctornyla.webp', alt: 'Doctor Nyla medispa home page with a treatment photo', width: 800, height: 500 },
  },
  {
    title: 'Next.js website',
    category: 'Web apps',
    kind: 'Web application',
    body: 'A website built in Next.js and React, with the interface in Material UI.',
    stack: ['Next.js', 'React', 'Material UI'],
    image: { src: '/work/nextjs-site.webp', alt: 'Dark landing page for an augmented reality platform built in Next.js', width: 800, height: 500 },
  },
  {
    title: 'Skincare website',
    category: 'WordPress',
    kind: 'WordPress site',
    body: 'A WordPress site for a skincare clinic, with custom content fields in ACF and a Bootstrap front end.',
    stack: ['WordPress', 'ACF', 'Bootstrap'],
    image: { src: '/work/skincare.webp', alt: 'Skincare page of a clinic website with product photography', width: 800, height: 500 },
  },
  {
    title: 'Shopping website using Laravel and Vue.js',
    category: 'Web apps',
    kind: 'E-commerce web app',
    body: 'An online shop with a Laravel backend and a Vue.js front end.',
    stack: ['Laravel', 'Vue.js', 'Bootstrap'],
    image: { src: '/work/laravel-vue-shop.webp', alt: 'Online shop home page with a large product promotion banner', width: 800, height: 500 },
  },
  {
    title: 'Shopping website using Laravel and Angular',
    category: 'Web apps',
    kind: 'E-commerce web app',
    body: 'An online shop with a Laravel backend and an Angular front end.',
    stack: ['Laravel', 'Angular', 'Bootstrap'],
    image: { src: '/work/laravel-angular-shop.webp', alt: 'Online restaurant supply shop home page with a promotional banner', width: 800, height: 500 },
  },
];

export const about = {
  industries: ['fintech', 'telecom', 'e-commerce', 'blockchain', 'AI platforms'],
  mentoringSince: 2020,
};

/** The purple timeline bars in About. Only facts, no invented roles. */
export const background = [
  {
    title: 'Freelance full-stack developer',
    period: '8 years',
    body: "Web apps, Shopify stores, Laravel apps and APIs across fintech, telecom, e-commerce, blockchain and AI platforms. Sometimes as the only developer, sometimes as one of many.",
  },
  {
    title: 'Mentoring developers',
    period: '2020 to present',
    body: 'Reviewing code, pairing on problems, and helping developers grow into more senior roles.',
  },
  {
    title: 'BS Computer Science, UP Diliman Extension Program in Pampanga',
    period: '2013 to 2017',
    body: 'Where the habit started.',
  },
];

/** Tech from my own profile, grouped for the Skills cards. */
export const skills: { title: string; color: Tone; items: string[] }[] = [
  { title: 'Frontend', color: 'blue', items: ['React', 'Next.js', 'Vue', 'Angular', 'TypeScript', 'Tailwind CSS'] },
  { title: 'Backend', color: 'green', items: ['Node.js', 'Laravel', 'PHP', 'Python', 'Golang', '.NET'] },
  { title: 'Commerce & Cloud', color: 'orange', items: ['Shopify Plus', 'Liquid', 'AWS', 'GCP', 'Docker', 'Kubernetes'] },
];

/** Floating chips in the "Tech universe" strip. */
export const techCloud = ['REST', 'GraphQL', 'D3.js', 'Deck.gl', 'Mapbox', 'amCharts', 'Material UI', 'Bootstrap', 'WordPress', 'Elementor', 'ACF', 'R', 'CI/CD', 'Terraform'];

/** Stat cards. Every one of these is a plain fact, not a metric. */
export const facts: { value: string; label: string; color: Tone }[] = [
  { value: '8 yrs', label: 'Building for the web', color: 'blue' },
  { value: 'BS CS', label: 'UP Diliman Extension, Pampanga, 2017', color: 'violet' },
  { value: '2020', label: 'Mentoring developers since', color: 'pink' },
  { value: '1 day', label: 'Reply time, business days', color: 'orange' },
];

/** "How I work" cards. */
export const howIWork: { title: string; body: string; color: Tone }[] = [
  { title: 'Scope in writing', body: "We agree what's being built and by when before any code gets written.", color: 'blue' },
  { title: 'Small releases', body: 'You get something you can click through early, then every few days after that.', color: 'pink' },
  { title: 'Early warnings', body: "If something looks off, you hear it from me that day, not at the deadline.", color: 'green' },
  { title: 'A clean handover', body: 'The code, the deploy setup and notes the next developer can actually follow.', color: 'orange' },
];
