/**
 * Single source of truth for every personal and business detail on this site.
 *
 * Nothing in src/components or src/pages hardcodes a name, email, phone number,
 * address or link. This file also feeds index.html at build time (see
 * identity-html.ts), so the JSON-LD, meta tags and <noscript> block always
 * match what the React app shows.
 *
 * The career content (profile, roles, skills, achievements) follows the CV,
 * Kim-full-stack2.pdf.
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
  role: 'Senior Full-Stack Engineer',
  yearsExperience: 8,
  /** Year shown in the About heading: graduation and first full-time role (Kyrrex, Oct 2018). */
  since: 2018,

  description:
    'Kim Russel Antonio Soriano is a senior full-stack engineer in Angeles City, Philippines, with 8 years of experience building production web applications, APIs, microservices and LLM features across fintech, telecom, e-commerce and AI platforms.',

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
    /** Head-and-shoulders portrait cut out of its white background, 1000 x 1000, transparent WebP. */
    src: '/portrait-cut.webp',
    /** Same cutout at 520 x 520. */
    medium: '/portrait-cut-520.webp',
    /** Original photo on white, 1200 x 1200, for Open Graph and JSON-LD. */
    jpg: '/portrait.jpg',
    alt: 'Portrait of Kim Russel Antonio Soriano in a white shirt',
    width: 1000,
    height: 1000,
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
  { label: 'About Me', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Services', id: 'services' },
  { label: 'Portfolio', id: 'work' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
] as const;

/** Words on the two crossing ribbons under the hero. */
export const ribbons = {
  light: ['Full-Stack', 'Scalable', 'Reliable', 'Performant'],
  accent: ['APIs', 'Microservices', 'AI & LLM', 'Cloud'],
};

/** Profile paragraphs, from the CV. */
export const profile = [
  "I'm Kim Russel Antonio Soriano, a senior full-stack engineer with 8 years of experience designing and shipping production web applications across fintech, telecom, e-commerce and AI-powered platforms.",
  'I work end to end: React, Next.js, Vue and Angular on the frontend, Node.js, Python, PHP and .NET on the backend, with PostgreSQL, Redis and containerized deployments underneath. I have shipped production LLM features with LangChain and Pinecone, and I care about frontend performance, technical SEO and accessibility.',
];

/** The stat card beside the portrait. Plain facts from the CV. */
export const stats = [
  { value: '8+', label: 'Years of experience' },
  { value: '5', label: 'Companies & teams' },
  { value: '2020', label: 'Mentoring since' },
];

/** The four cards under the About text. */
export const strengths: { eyebrow: string; title: string; body: string; icon: IconKey }[] = [
  { eyebrow: 'Backend', title: 'APIs & Microservices', body: 'REST and GraphQL APIs, and monoliths split into services that deploy on their own.', icon: 'server' },
  { eyebrow: 'Frontend', title: 'Fast Interfaces', body: 'Lazy-loaded, well-rendered dashboards with attention to Core Web Vitals.', icon: 'bolt' },
  { eyebrow: 'AI', title: 'LLM Features', body: 'Semantic search and retrieval pipelines with LangChain and Pinecone.', icon: 'sparkle' },
  { eyebrow: 'Quality', title: 'Tested & Accessible', body: 'Unit, integration and end-to-end tests, plus WCAG-minded markup.', icon: 'shield' },
];

/** Icon names shared by config entries. Must match keys in components/Icon.tsx. */
export type IconKey =
  | 'server'
  | 'bolt'
  | 'sparkle'
  | 'shield'
  | 'window'
  | 'layers'
  | 'plug'
  | 'database'
  | 'cloud'
  | 'search'
  | 'cart'
  | 'chart'
  | 'card'
  | 'check'
  | 'mobile'
  | 'flask'
  | 'compass'
  | 'pen'
  | 'code'
  | 'rocket';

export type Job = {
  role: string;
  company: string;
  site?: string;
  period: string;
  /** Short label for the queue list. */
  short: string;
  summary: string;
  stack: string[];
  groups: { title: string; points: string[] }[];
};

/** Employment and internship, newest first, as written in the CV. */
export const jobs: Job[] = [
  {
    role: 'Senior Full Stack Engineer',
    company: 'Kingsramsum',
    site: 'kingsramsum.com',
    period: 'Aug 2024 – May 2026',
    short: 'Supply chain platform, microservices and AI search',
    summary:
      'Supply chain platform handling high-volume supplier and blockchain data. Worked across backend architecture, API design, data processing, frontend performance and AI integration.',
    stack: ['Python', 'FastAPI', 'LangChain', 'Pinecone', 'React', 'React Native'],
    groups: [
      {
        title: 'Backend & Microservices',
        points: [
          'Decomposed a complex monolith into Python microservices, separating supplier ingestion, normalization, forecasting and dashboard services for maintainability and scalability.',
          'Designed and implemented APIs with FastAPI, applying versioning and validation so services could be deployed independently and safely.',
        ],
      },
      {
        title: 'AI & LLM Integration',
        points: [
          'Built a Python semantic search backend using LangChain and Pinecone to store document embeddings, delivering context-aware answers across hundreds of internal documents.',
          'Tuned the retrieval pipeline to balance cost, speed and accuracy, and monitored token usage through a React dashboard.',
        ],
      },
      {
        title: 'Frontend & Mobile',
        points: [
          'Rebuilt the core React enterprise dashboard with optimized rendering and lazy-loaded components, improving initial load performance for supply chain managers.',
          'Built cross-platform mobile applications using React Native, covering responsive UI flows, state management and offline features.',
        ],
      },
    ],
  },
  {
    role: 'Full Stack Engineer',
    company: 'KM3 Solutions LLC',
    site: 'km3solutions.com',
    period: 'Feb 2023 – Jul 2024',
    short: 'E-commerce and analytics, Angular and Node.js',
    summary:
      'Two-sided e-commerce and analytics platform serving global clients, spanning catalog and ordering systems, data pipelines and developer tooling.',
    stack: ['Angular', 'Node.js', 'PostgreSQL', 'REST APIs'],
    groups: [
      {
        title: 'Full-Stack Development',
        points: [
          'Developed full-stack catalog browsing, filtering and ordering systems using Angular and Node.js across web and mobile.',
          'Implemented atomic transactional flows across checkout, inventory and order management systems, keeping stock and orders consistent under load.',
        ],
      },
      {
        title: 'Database & Performance',
        points: ['Optimized PostgreSQL queries and caching strategies, reducing catalog search response times during high-traffic periods.'],
      },
      {
        title: 'Backend & Data Processing',
        points: [
          'Built backend services and RESTful APIs in Node.js for high-volume analytics pipelines, covering scalable data ingestion, aggregation and real-time reporting for global clients.',
        ],
      },
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'Comcast',
    period: 'Mar 2020 – Jan 2023',
    short: 'Telecom operations and reporting platforms',
    summary:
      'Internal operations and reporting platforms for a telecom provider, centred on moving legacy systems onto modern web infrastructure.',
    stack: ['PHP', 'MySQL', 'Vue.js', 'Docker', 'Kubernetes', 'AWS', 'GCP'],
    groups: [
      {
        title: 'Backend & Data',
        points: [
          'Helped migrate legacy mainframe systems to MySQL and PHP platforms for near real-time reporting.',
          'Built API endpoints, data pipelines and SQL reporting workflows for subscriber and operational data.',
        ],
      },
      {
        title: 'Frontend',
        points: [
          'Built responsive Vue.js dashboards and internal tools, improving accessibility and cross-browser support, with SEO compliance and fast load times.',
        ],
      },
      {
        title: 'Cloud & Infrastructure',
        points: [
          'Containerized microservices with Docker and Kubernetes, and managed deployments on AWS and GCP.',
          'Wrote unit, integration and end-to-end tests with Jest, PHPUnit and Cypress to maintain reliability and prevent regressions.',
        ],
      },
    ],
  },
  {
    role: 'Full-Stack Developer',
    company: 'Kyrrex',
    site: 'kyrrex.com',
    period: 'Oct 2018 – Feb 2020',
    short: 'Payments, blockchain, trading and CRM',
    summary:
      'E-commerce, payment, blockchain, trading and CRM solutions using Django, Python, Node.js, Ethereum, Tron and crypto APIs.',
    stack: ['Django', 'Python', 'Node.js', 'Stripe', 'Ethereum', 'Tron'],
    groups: [
      {
        title: 'Full-Stack Development',
        points: [
          'Built the MVP with Django, then developed new features and maintained the complete application for over a year.',
          'Integrated Stripe for payment processing and customized vtiger CRM.',
        ],
      },
      {
        title: 'Blockchain & Trading',
        points: [
          'Developed blockchain solutions including smart contracts on Ethereum and Tron, peer-to-peer Bitcoin payments, and cryptographic security using CryptoJS.',
          'Built backend panels, integrated crypto payment APIs, and developed trading platforms (MetaTrader 4 & 5, IQ Option, Expert Option) and CRMs using Node.js, Express and Meteor.',
        ],
      },
      {
        title: 'Business & Partnerships',
        points: ['Worked as a partner in the business, sourcing new vendors and customers, onboarding them and providing ongoing support.'],
      },
    ],
  },
  {
    role: 'Full-Stack Developer Intern',
    company: 'Vanguard Web Solutions',
    period: 'Oct 2017 – Sep 2018',
    short: 'Internship: React, Node.js and payments',
    summary: 'Internship covering frontend, backend, payments and cloud services.',
    stack: ['React', 'Node.js', 'PayPal', 'Stripe', 'GCP'],
    groups: [
      {
        title: 'Full Stack Development',
        points: [
          'Built responsive interfaces and single-page components in React.',
          'Developed backend services and REST APIs in Node.js for data processing.',
          'Customized vtiger CRM and optimized its workflow.',
          'Integrated payment gateways (PayPal, Stripe, Apple Pay, Google Pay) and managed GCP-based cloud services.',
          'Looked after systems across macOS, Windows and Ubuntu, keeping operations secure and scalable.',
        ],
      },
    ],
  },
];

/** "How I work" steps. */
export const process: { title: string; tag: string; body: string; points: string[]; outcome: string; icon: IconKey }[] = [
  {
    title: 'Discovery',
    tag: 'Requirements',
    body: 'We pin down the problem, the users and the constraints, and agree the scope in writing before any code is written.',
    points: ['Goals and success criteria', 'Existing systems and data', 'Timeline and milestones'],
    outcome: 'A written scope we both sign off',
    icon: 'compass',
  },
  {
    title: 'Architecture',
    tag: 'System Design',
    body: 'I design the data model, the API contracts and how the services fit together, so the build has a clear shape.',
    points: ['Schema and migrations plan', 'REST or GraphQL contracts', 'Monolith or services, and why'],
    outcome: 'An architecture you can review',
    icon: 'layers',
  },
  {
    title: 'Interface',
    tag: 'UI Direction',
    body: 'Responsive, accessible screens that match your brand, built as reusable components rather than one-off pages.',
    points: ['Component structure', 'Responsive layouts', 'WCAG-minded markup'],
    outcome: 'Screens you can click through',
    icon: 'pen',
  },
  {
    title: 'Development',
    tag: 'Clean Code Build',
    body: 'Frontend, backend and integrations built in small releases you can try as they land, with code review on every change.',
    points: ['Frontend development', 'Backend and API build', 'Payments and third-party integrations'],
    outcome: 'A working build, release by release',
    icon: 'code',
  },
  {
    title: 'Testing',
    tag: 'Quality Assurance',
    body: 'Unit, integration and end-to-end tests around the parts that matter, plus performance checks before launch.',
    points: ['Jest, PHPUnit, Cypress', 'Load and query performance', 'Cross-browser checks'],
    outcome: 'Confidence the release holds up',
    icon: 'flask',
  },
  {
    title: 'Launch & Support',
    tag: 'Deploy',
    body: 'Containerized deploys with CI/CD, monitoring in place, and a clean handover the next developer can follow.',
    points: ['Docker and CI/CD pipeline', 'AWS, GCP or Azure', 'Docs and handover notes'],
    outcome: 'A live product, documented',
    icon: 'rocket',
  },
];

export type Service = {
  /** Full name, used in the JSON-LD offer catalog. */
  title: string;
  body: string;
  icon: IconKey;
  /** Icon tile colour. */
  tone: Tone;
};

/** Accent colour families for icon tiles. */
export type Tone = 'violet' | 'teal' | 'blue' | 'rose' | 'amber' | 'green';

export const services: Service[] = [
  { title: 'Full-Stack Web Apps', body: 'Production web applications in React, Next.js, Vue or Angular with a Node.js, Python, PHP or .NET backend.', icon: 'window', tone: 'violet' },
  { title: 'API Design', body: 'Versioned, validated REST and GraphQL APIs that services and clients can rely on.', icon: 'plug', tone: 'teal' },
  { title: 'Microservices', body: 'Breaking monoliths into independently deployable services, with event-driven patterns where they fit.', icon: 'layers', tone: 'blue' },
  { title: 'AI & LLM Integration', body: 'Semantic search, retrieval pipelines and prompt design with LangChain and Pinecone, with token usage tracked.', icon: 'sparkle', tone: 'rose' },
  { title: 'Data Pipelines & Reporting', body: 'High-volume ingestion, aggregation and real-time reporting for operational and analytics data.', icon: 'chart', tone: 'amber' },
  { title: 'Database Engineering', body: 'PostgreSQL, MySQL, MongoDB and Redis: schema design, query optimization, caching and migrations.', icon: 'database', tone: 'green' },
  { title: 'Frontend Performance', body: 'Faster first loads through lazy loading, better rendering and Core Web Vitals work.', icon: 'bolt', tone: 'violet' },
  { title: 'Technical SEO & Accessibility', body: 'Crawlable, structured markup and WCAG-minded interfaces that work for every visitor.', icon: 'search', tone: 'teal' },
  { title: 'E-commerce Systems', body: 'Catalog, checkout, inventory and order flows that stay consistent under load.', icon: 'cart', tone: 'blue' },
  { title: 'Payments & Integrations', body: 'Stripe, PayPal, Apple Pay, Google Pay, Klaviyo, Algolia, OAuth, webhooks and ERP sync.', icon: 'card', tone: 'rose' },
  { title: 'Cloud & DevOps', body: 'Docker, Kubernetes and CI/CD on AWS, GCP and Azure, from first deploy to steady operation.', icon: 'cloud', tone: 'amber' },
  { title: 'Mobile Apps', body: 'Cross-platform React Native apps with responsive flows, state management and offline support.', icon: 'mobile', tone: 'green' },
];

export type Project = {
  title: string;
  category: 'Shopify' | 'WordPress' | 'Data visualisation' | 'Web apps';
  body: string;
  stack: string[];
  href?: string;
  /** Screenshot in public/work/. Lazy-loaded. */
  image: { src: string; alt: string; width: number; height: number };
};

/**
 * Projects from my original portfolio (kimrussel.vercel.app), with their
 * original titles, tags and screenshots. Descriptions only restate those tags.
 */
export const projects: Project[] = [
  {
    title: 'Not Too Sweet',
    category: 'Shopify',
    body: 'Shopify store for a low-sugar botanical drinks brand: theme templates, web design and API integrations.',
    stack: ['Shopify', 'Shopify templates', 'Web design', 'API integration'],
    href: 'https://nottoosweetlife.com',
    image: { src: '/work/not-too-sweet.webp', alt: 'Home page of the Not Too Sweet store, showing a bottle of lavender and honey lemonade', width: 800, height: 500 },
  },
  {
    title: 'Trade Map',
    category: 'Data visualisation',
    body: 'An interactive trade map in React, with Deck.gl and Mapbox for the map layers and D3.js for the charts.',
    stack: ['React', 'Deck.gl', 'Mapbox', 'D3.js'],
    image: { src: '/work/trade-map.webp', alt: 'Dark world map with trade routes drawn as arcs and a timeline chart below', width: 800, height: 500 },
  },
  {
    title: 'Mowellens',
    category: 'Shopify',
    body: 'Shopify development for a wellness and skincare brand: theme customisation, product and collection templates, and API integrations.',
    stack: ['Shopify', 'Shopify templates', 'Web design', 'API integration'],
    href: 'https://mowellens.com',
    image: { src: '/work/mowellens.webp', alt: 'Mowellens store home page with amber bottles of body oil', width: 800, height: 500 },
  },
  {
    title: 'Route Tool',
    category: 'Data visualisation',
    body: 'A route exploration tool in React on a Mapbox map, with Deck.gl layers and D3.js visualisations.',
    stack: ['React', 'Deck.gl', 'Mapbox', 'D3.js'],
    image: { src: '/work/route-tool.webp', alt: 'Map of Africa and Asia with a highlighted route between two airports', width: 800, height: 500 },
  },
  {
    title: 'Black Halo',
    category: 'Shopify',
    body: 'Storefront work on a Shopify fashion store: theme sections and templates, web design and API integrations.',
    stack: ['Shopify', 'Shopify templates', 'Web design', 'API integration'],
    href: 'https://blackhalo.com',
    image: { src: '/work/blackhalo.webp', alt: 'Black Halo shop page listing dresses and jumpsuits', width: 800, height: 500 },
  },
  {
    title: 'Country Profile',
    category: 'Data visualisation',
    body: 'Country-by-country data profiles in React, with charts built in amCharts and D3.js.',
    stack: ['React', 'amCharts', 'D3.js'],
    image: { src: '/work/country-profile.webp', alt: 'Globe with African countries shaded by value and a tooltip on one country', width: 800, height: 500 },
  },
  {
    title: 'Routes Dashboard',
    category: 'Data visualisation',
    body: 'A routes data dashboard in Vue.js, with charts in D3.js and amCharts and the data prepared in R.',
    stack: ['Vue.js', 'D3.js', 'amCharts', 'R'],
    image: { src: '/work/routes-dashboard.webp', alt: 'Routes dashboard page with a globe plotting incidents around the world', width: 800, height: 500 },
  },
  {
    title: 'Next.js Platform Site',
    category: 'Web apps',
    body: 'A website built in Next.js and React, with the interface in Material UI.',
    stack: ['Next.js', 'React', 'Material UI'],
    image: { src: '/work/nextjs-site.webp', alt: 'Dark landing page for an augmented reality platform built in Next.js', width: 800, height: 500 },
  },
  {
    title: 'Laravel + Vue.js Shop',
    category: 'Web apps',
    body: 'An online shop with a Laravel backend and a Vue.js front end.',
    stack: ['Laravel', 'Vue.js', 'Bootstrap'],
    image: { src: '/work/laravel-vue-shop.webp', alt: 'Online shop home page with a large product promotion banner', width: 800, height: 500 },
  },
  {
    title: 'Laravel + Angular Shop',
    category: 'Web apps',
    body: 'An online shop with a Laravel backend and an Angular front end.',
    stack: ['Laravel', 'Angular', 'Bootstrap'],
    image: { src: '/work/laravel-angular-shop.webp', alt: 'Online restaurant supply shop home page with a promotional banner', width: 800, height: 500 },
  },
  {
    title: 'Docubee',
    category: 'WordPress',
    body: 'A Figma design built out in WordPress with Elementor, HTML and CSS.',
    stack: ['Elementor', 'Figma to WordPress', 'HTML', 'CSS'],
    image: { src: '/work/docubee.webp', alt: 'Docubee home page promoting contract automation software', width: 800, height: 500 },
  },
  {
    title: 'Doctor Nyla',
    category: 'WordPress',
    body: 'A WordPress site for a medical aesthetics clinic, with custom content fields in ACF and a Bootstrap front end.',
    stack: ['WordPress', 'ACF', 'Bootstrap'],
    image: { src: '/work/doctornyla.webp', alt: 'Doctor Nyla medispa home page with a treatment photo', width: 800, height: 500 },
  },
  {
    title: 'Skincare Clinic',
    category: 'WordPress',
    body: 'A WordPress site for a skincare clinic, with custom content fields in ACF and a Bootstrap front end.',
    stack: ['WordPress', 'ACF', 'Bootstrap'],
    image: { src: '/work/skincare.webp', alt: 'Skincare page of a clinic website with product photography', width: 800, height: 500 },
  },
  {
    title: 'Agency Website',
    category: 'WordPress',
    body: 'A WordPress site with custom content fields in ACF and a Bootstrap front end.',
    stack: ['WordPress', 'ACF', 'Bootstrap'],
    image: { src: '/work/wordpress-site.webp', alt: 'Home page of a communications agency website built in WordPress', width: 800, height: 500 },
  },
];

/** Skill groups from the CV, arranged into three tabs of three cards. */
export const skillTabs: { label: string; groups: { title: string; items: string[] }[] }[] = [
  {
    label: 'Engineering',
    groups: [
      { title: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'PHP', 'C#', 'SQL'] },
      { title: 'Frontend', items: ['React & Next.js', 'Vue.js', 'Angular', 'SCSS & Tailwind CSS', 'Accessibility (WCAG)', 'Technical SEO & Core Web Vitals'] },
      { title: 'Backend', items: ['Node.js & NestJS', 'ASP.NET Core & Entity Framework', 'Django & FastAPI', 'Laravel & Symfony', 'RESTful APIs', 'GraphQL'] },
    ],
  },
  {
    label: 'Data & AI',
    groups: [
      { title: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Schema design', 'Query optimization & migrations'] },
      { title: 'AI & LLM Integration', items: ['LangChain', 'Pinecone', 'Semantic search', 'Retrieval pipelines', 'Prompt design', 'Token usage monitoring'] },
      { title: 'Integrations', items: ['Stripe, PayPal, Apple Pay, Google Pay', 'Klaviyo & Algolia', 'Webhooks & OAuth', 'ERP sync', 'CSV and SQL data migration'] },
    ],
  },
  {
    label: 'Delivery',
    groups: [
      { title: 'Cloud & DevOps', items: ['AWS (EC2, S3, RDS, CloudFront, Lambda)', 'GCP & Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Git & GitHub'] },
      { title: 'Testing & QA', items: ['Jest', 'PHPUnit', 'Cypress', 'Unit & integration testing', 'End-to-end testing', 'Performance optimization'] },
      { title: 'Architecture & Methods', items: ['Monolithic & microservices', 'Event-driven architecture', 'Domain-driven design', 'Agile / Scrum', 'Code review'] },
    ],
  },
];

/** Education and achievements, from the CV. */
export const highlights: { label: string; title: string; meta: string; body: string; icon: IconKey }[] = [
  {
    label: 'Education',
    title: 'BS Computer Science',
    meta: 'University of the Philippines in the Visayas · Aug 2014 – Jun 2018',
    body: 'Bachelor of Science in Computer Science, Pampanga, Philippines.',
    icon: 'compass',
  },
  {
    label: 'Achievement',
    title: 'Community Web Applications',
    meta: 'Local government offices',
    body: 'Built and deployed web applications for local government offices to streamline public services for residents.',
    icon: 'window',
  },
  {
    label: 'Achievement',
    title: 'Developer Mentoring',
    meta: 'Since 2020',
    body: 'Free training for students in programming and freelancing, helping them build technical skills and become independent professionals.',
    icon: 'sparkle',
  },
];
