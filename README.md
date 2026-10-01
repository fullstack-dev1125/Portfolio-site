# Kim Russel Antonio Soriano, senior full-stack engineer

My portfolio and business site. It's a single page with Hero, About, Experience,
How I Work, Services, Projects, Skills, Education & Achievements and Contact
sections, plus a `/legal` imprint page. The career content follows my CV
(`Kim-full-stack2.pdf`).

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
| Photo                            | `site.photo`                      | Portrait in About, and `og:image` / JSON-LD `image` once `url` is set |
| GitHub                           | `site.links`                      | Hero, Contact, JSON-LD `sameAs`                                    |
| Site URL                         | `site.url`                        | JSON-LD `url`, Open Graph                                          |
| Profile, stats, roles, process, services, projects, skills, education | `profile`, `stats`, `strengths`, `jobs`, `process`, `services`, `projects`, `skillTabs`, `highlights` | Their sections |

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
  portrait-cut*.webp     portrait with the background removed (About)
  portrait.jpg           original portrait, for Open Graph and JSON-LD
  work/*.webp            project screenshots
scripts/
  verify-content.mjs     checks dist/index.html after a build
src/
  config/site.ts         every personal and business detail, plus all section content
  index.css              colour tokens, cards, buttons, ribbons, motion
  App.tsx                routes, header, footer, skip link
  pages/                 Home, Legal, NotFound
  components/            Header, Logo, Hero, Ribbons, About, Experience, Process,
                         Services, CtaBanner, Work, Skills, Highlights, Contact,
                         Footer, Section (heading), Icon
  hooks/                 useReveal (scroll fade-in), useActiveSection
                         (nav highlight), useReducedMotion, useDocumentTitle
```

## Portrait

The source is `111.png`, a 1254 × 1254 head-and-shoulders photo on a white
background. For the About section the white background was removed with
ImageMagick (flood fill from the top corners, edge softened), so the photo sits
on a violet panel. The face and shirt were not altered.

| File                          | Size        | Used for                                  |
| ----------------------------- | ----------- | ----------------------------------------- |
| `public/portrait-cut.webp`    | 1000 × 1000 | About portrait, transparent background    |
| `public/portrait-cut-520.webp`| 520 × 520   | Same, for smaller screens                 |
| `public/portrait.jpg`         | 1200 × 1200 | Open Graph `og:image` and JSON-LD `image` |

## Design notes

- **Look.** Near-black background with a single violet accent, modelled on a
  dark agency-style portfolio: pill labels over two-tone section titles,
  white pill primary buttons, a typing role line in the hero, two crossing
  scrolling word ribbons, a stepper for "How I Work", a staggered services
  grid, a project carousel, tabbed skill cards and a call to action over a
  tilted wall of project screenshots. The site is dark only.
- **Palette.** Tokens are CSS custom properties on `:root` in `src/index.css`.
  Body text `#F4F4F5` and muted `#A1A1AA` on `#09090B`/card backgrounds; light
  violet `#C084FC` for accent text; deep violet `#7C3AED` only as a fill with
  white text.
- **Interactive parts.** Experience and Skills are ARIA tabs with arrow-key
  support. The process stepper auto-advances until a step is clicked and
  pauses on hover. The carousel scrolls natively with snap points.
- **Motion.** Typing, ribbons, step auto-advance and scroll reveals are all
  switched off under `prefers-reduced-motion`; the first role shows statically.
- **No invented content.** The reference design has pricing, client reviews
  and blog sections; those were left out because there is no real data for
  them. Their slots hold Skills and Education & Achievements from the CV.
- **Fonts.** Inter loads from Google Fonts without blocking the first paint.

## Measured

Checked in headless Chrome at 1440 px and 375 px, with and without reduced
motion. Re-run Lighthouse after deploying.
