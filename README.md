# Kim Russel Antonio Soriano, freelance full-stack developer

The website for my freelance development business. It's a single page with
About, What I Do, Skills, Projects, Experience and Get In Touch sections, plus a
`/legal` imprint page.

Built with Vite, React, TypeScript, Tailwind CSS 4 and react-router-dom. It
has no backend, no database and no forms. `npm run build` produces a static
`dist/` folder that Vercel deploys with no configuration.

## Running it locally

You need Node 20 or newer.

```bash
npm install
npm run dev          # http://localhost:5173
```

Other commands:

| Command                     | What it does                                                         |
| --------------------------- | -------------------------------------------------------------------- |
| `npm run build`             | Type-checks, then builds to `dist/`                                   |
| `npm run preview`           | Serves the built `dist/` at http://localhost:4173                     |
| `npm run typecheck`         | TypeScript only                                                      |
| `npm run verify`            | Checks `dist/index.html` for the identity details (run after a build) |
| `npm run verify -- --strict` | Same, but also fails while any `[[FILL: ...]]` is left              |
| `npm run fills`             | Lists every `[[FILL: ...]]` placeholder still in the project          |

## Before you go live

1. Fill in every placeholder. `npm run fills` lists them all. Most of them are
   in `src/config/site.ts`.
2. The portrait is already in place (see "Portrait" below).
3. Run `npm run build && npm run verify -- --strict`. It should print `OK`.

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. On https://vercel.com click **Add New**, then **Project**, then import the
   repository.
3. Vercel detects Vite by itself. The build command (`npm run build`) and the
   output directory (`dist`) are already correct, and there are no environment
   variables to set. Click **Deploy**.
4. Copy the live URL, for example `https://your-project.vercel.app`, into `url`
   in `src/config/site.ts`, then commit and push. Vercel redeploys on every push.
   Once `url` is set, the build also emits `og:url`, `og:image` and absolute
   JSON-LD ids.
5. Optional: add a custom domain under **Settings**, then **Domains**, and update
   `url` again.

`vercel.json` rewrites every path to `index.html`, so a direct visit to `/legal`
loads the app instead of returning a 404. Real files such as `/icon.svg` are
still served as they are.

## Where each piece of personal information lives

Everything comes from **`src/config/site.ts`**. No component hardcodes a name,
email, phone number, address or link.

| Detail                           | Key in `site.ts`                  | Where it appears                                                  |
| -------------------------------- | --------------------------------- | ----------------------------------------------------------------- |
| Legal name                       | `site.name`                       | Hero heading, Contact panel, footer, `/legal`, JSON-LD, `<noscript>`, `<title>` |
| Short name                       | `site.shortName`                  | Header logo                                                       |
| Trading name                     | `site.businessName`               | `/legal`, ProfessionalService JSON-LD                              |
| Email                            | `site.email`                      | Hero, Contact, footer, `/legal`, JSON-LD, `<noscript>`              |
| Phone                            | `site.phone`                      | Same places as the email. The `tel:` link is derived from it       |
| Address                          | `site.address`                    | Contact, `/legal`, JSON-LD (as PostalAddress fields), `<noscript>`. The city and country also appear in the hero, About and footer |
| Photo                            | `site.photo`                      | Round avatar in the hero, framed portrait in About, and `og:image` / JSON-LD `image` once `url` is set |
| GitHub                           | `site.links`                      | Hero, Contact, JSON-LD `sameAs`                                    |
| Site URL                         | `site.url`                        | JSON-LD `url`, Open Graph                                          |
| Services, skills, projects, facts, background, how I work | `services`, `skills`, `techCloud`, `projects`, `facts`, `background`, `howIWork` | Their sections |

### How the details reach the static HTML

This is a client-rendered app, so a reviewer or an automated fetch may only
ever see `index.html`. **`identity-html.ts`** is a small Vite plugin that reads
`site.ts` at build time and writes into `index.html`:

- `<title>`, meta description, author and Open Graph tags, at `<!-- identity:head -->`
- JSON-LD with a `Person` and a `ProfessionalService`, each with name, email,
  telephone, url and a structured `PostalAddress`, also at `<!-- identity:head -->`
- a `<noscript>` block with name, email, phone and full address as plain text,
  at `<!-- identity:noscript -->`

Edit `site.ts`, not `index.html`. `npm run verify` confirms the built file has
all of it.

## Project layout

```
index.html               shell, with markers the identity plugin fills in
identity-html.ts         writes the meta tags, JSON-LD and <noscript> from site.ts
vite.config.ts
vercel.json              SPA rewrite so /legal works on a direct visit
public/
  icon.svg, robots.txt
  work/*.webp            screenshots of the three live client sites
  (your portrait)        e.g. portrait.jpg
scripts/
  verify-content.mjs     checks dist/index.html after a build
src/
  config/site.ts         every personal and business detail, plus skills,
                         facts, projects, background and "How I work"
  index.css              palette tokens, starfield, glow cards, buttons, motion
  App.tsx                routes, header, footer, skip link
  pages/                 Home, Legal, NotFound
  components/            Header, Hero, About, Services, Skills, Work,
                         Experience, Contact, Footer, Section, Emblem
                         (glowing section illustrations), Portrait, Icon
  hooks/                 useReveal (scroll fade-in), useActiveSection
                         (nav highlight), useDocumentTitle
```

## Portrait

The source is a 1254 × 1254 head-and-shoulders photo on a white background.
It was resized and cropped with ImageMagick. Nothing else was changed.

| File                          | Size        | Used for                                     |
| ----------------------------- | ----------- | -------------------------------------------- |
| `public/portrait.webp`        | 1200 × 1200 | About frame on high-density screens          |
| `public/portrait-600.webp`    | 600 × 600   | About frame on 1× and 2× screens             |
| `public/portrait-avatar.webp` | 480 × 480   | Round hero avatar (tighter face crop)        |
| `public/portrait.jpg`         | 1200 × 1200 | Open Graph `og:image` and JSON-LD `image`    |

To swap the photo, replace these four files and keep the names, or update
`photo` in `src/config/site.ts`.

## Design notes

- **Look.** Dark neon: a static CSS starfield, gradient section titles (pink,
  violet, cyan), glowing cards, a pill navigation that highlights the section
  you're in, and a small glowing illustration under each main title. The
  site is dark only.
- **Palette.** The tokens are CSS custom properties on `:root` in
  `src/index.css`. The light neon colours (`--pink`, `--violet`, `--cyan`,
  `--blue`, `--green`, `--orange`) are used for text and icons. The `-deep`
  versions are used as button and icon-tile fills, with white on top.
- **Contrast.** Every text and background pair passes WCAG AA:

  | Pair                                                    | Ratio            |
  | ------------------------------------------------------- | ---------------- |
  | Body text `#EEF0FF` on the background and cards         | 15.1 to 17.7     |
  | Muted text `#ABAACD` on the background and cards        | 7.6 to 8.9       |
  | Neon text (pink, violet, blue) on cards                 | 6.5 to 7.9       |
  | Neon text (cyan, green, orange) on cards                | 10.2 to 13.8     |
  | White on button and tile fills (violet, blue, pink, cyan, green, orange deep) | 5.2 to 7.1 |

- **Motion.** Everything is 300 ms or less, and all of it sits inside
  `@media (prefers-reduced-motion: no-preference)`. The illustrations are
  static.
- **Projects.** All 14 projects from the original portfolio at
  kimrussel.vercel.app, with their original titles, tags and screenshots. The
  screenshots were converted to 800 × 500 WebP in `public/work/`. Each
  description only restates that project's tags. Add a sentence about the
  problem you solved whenever you like, in `projects` in `site.ts`.
- **Fonts.** Poppins loads from Google Fonts without blocking the first paint.

## Measured

Lighthouse 12, run against the production build served with gzip (as Vercel
does), scored 100 for performance, accessibility, best practices and SEO on
both `/` and `/legal`. There were no console errors or warnings, no horizontal
scroll at 375 px, and exactly one `h1` per page.
