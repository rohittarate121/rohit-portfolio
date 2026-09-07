# Rohit Tarate — Developer Portfolio (V1)

A premium, production-styled full-stack developer portfolio. V1 is a fast,
fully static frontend (no backend yet) — see **Roadmap to V2** below for
what's next.

## Stack

React 19 + Vite + React Router + Tailwind CSS v4. No CMS, no database —
all content lives in one file: `src/data/portfolio.js`.

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
```

## Build for production

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

## Editing content

**Everything you'd want to change day-to-day is in `src/data/portfolio.js`:**
your bio, education, skills, experience, certifications, coding profile
links, and project details (features, tech stack, GitHub/demo links,
API endpoints shown on each case-study page).

Two items are still placeholders and marked in that file:
- `projects` → the `stockflow` entry has `github: null, demo: null` — add
  the real links (and remove `isPlaceholderLinks: true`) once you have them.
- Each project's `challenges` / `learnings` / `future` fields are marked
  `isPlaceholderDetail: true` and contain generic placeholder text — replace
  with your real answers, then delete that flag so the amber "placeholder"
  styling goes away on the detail page.

The **resume PDF** lives at `public/resume/Rohit_Tarate_Resume.pdf`. To
replace it, drop a new PDF at that same path (keep the filename, or update
`profile.resumeUrl` in the data file).

## Deploying (Vercel)

1. Push this project to a GitHub repo.
2. Go to vercel.com → **New Project** → import the repo.
3. Framework preset: **Vite**. Build command `npm run build`, output dir `dist`
   (Vercel auto-detects these — no changes needed).
4. Deploy. You'll get a `*.vercel.app` URL immediately; attach a custom
   domain from the Vercel dashboard if you have one (e.g. `rohittarate.dev`,
   referenced in the SEO meta tags in `index.html` — update those to match
   whatever domain you actually use).

No environment variables are required for V1 — it's a static site.

## Contact form (currently frontend-only)

The contact form validates input and, since no backend/form service is
connected yet, falls back to opening the visitor's email client via
`mailto:` pre-filled with their message. To make it submit silently instead:

- **Easiest:** create a free form endpoint at formspree.io and paste it
  into `FORM_ENDPOINT` at the top of `src/components/sections/Contact.jsx`.
- **Full control:** build the Spring Boot backend described in the original
  brief (Section 21/Contact Messages) and point `FORM_ENDPOINT` at your API.

## Project structure

```
src/
  components/
    ui/            Button, Card, Badge, Eyebrow, BrandIcons (Github/LinkedIn svgs)
    sections/       Hero, About, Skills, Experience, Projects, Resume, CodingProfiles, Contact
    Navbar.jsx
    Footer.jsx
  pages/
    Home.jsx        composes all sections for "/"
    ProjectDetail.jsx  case-study page for "/projects/:slug"
    NotFound.jsx
  data/
    portfolio.js    single source of truth for all content
  hooks/
    useTheme.jsx    dark/light mode (persists to localStorage)
  index.css         design tokens (colors, fonts) + global styles
```

## Roadmap to V2 (not built yet)

Per the original brief, still to come once V1 is live and you're happy
with it:

- Spring Boot backend (Java) with MySQL, JPA/Hibernate
- JWT auth + Spring Security for an admin dashboard (CRUD for projects,
  skills, experience, certifications, blog, resume upload, contact
  messages, analytics)
- Blog system with Markdown + syntax highlighting
- Live GitHub API integration (repos, stars, contribution activity) via a
  backend proxy so no token is ever exposed in the frontend
- AI portfolio assistant scoped strictly to your real content
- Docker / docker-compose / CI pipeline for the full stack

None of this is required for V1 to be a legitimate, linkable portfolio —
it's what turns the portfolio itself into a second full-stack project you
can also point to.
