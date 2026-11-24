# Yoganatha Pranashakti — Personal Portfolio

A distinctive, futuristic personal portfolio and content-managed admin dashboard built with Next.js App Router, TypeScript, Tailwind CSS, Motion and Supabase.

The site is designed to be **honest by default**: public content is sourced from the owner's PRD and verified public GitHub repositories. Anything that cannot be verified is left unpublished rather than invented. See [`docs/AUDIT.md`](docs/AUDIT.md) and the owner confirmation list below.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, React 19) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 with custom design tokens |
| Animation | Motion for React (`motion/react`) |
| Icons | Lucide React |
| Backend | Supabase (Postgres, Auth, Storage) |
| Hosting target | Vercel Free |
| Package manager | npm |

## Getting started

```bash
npm install
cp .env.example .env.local   # optional: fill in Supabase values later
npm run dev
```

Open <http://localhost:3000>. The public site works **without** Supabase credentials — it falls back to verified static content. The contact form reports that it is not configured yet instead of pretending to send.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |

## Project structure

```
app/
  (site)/                 Public pages (home, about, projects, certifications)
  admin/
    login/                Public sign-in page
    (dashboard)/          Server-protected admin pages
    actions.ts            Server actions (all re-check authorization)
  api/contact/            Contact submission endpoint
  globals.css             Design tokens + global styles
components/
  ui/                     Reusable primitives
  layout/                 Header, footer, theme toggle
  motion/                 Reveal, text reveal, rotating text, spotlight, magnetic, marquee
  sections/               Portfolio sections
  projects/               Project card and browser
  contact/                Contact form
  admin/                  Admin shell and CRUD managers
lib/
  data/                   Public fallback content + data access layer
  supabase/               Browser, server and service-role clients
  auth.ts                 Server-side admin authorization
  types.ts, utils.ts, validations.ts, site.ts
supabase/migrations/      Schema, RLS policies, storage policies
docs/                     Audit and setup/deployment/testing guides
```

## Themes and motion

- Dark mode: deep navy `#080B16`, electric blue `#2563EB`, purple `#8B5CF6`.
- Light mode: white, sky blue `#0EA5E9`, blue `#2563EB`.
- Glassmorphism, bento grids, aurora backgrounds, spotlights, text reveals and marquees.
- All animations honor `prefers-reduced-motion` and pointer-fine checks; touch devices skip pointer effects.

## Supabase

1. Create a Supabase project.
2. Run `supabase/migrations/0001_schema.sql`, `0002_rls_policies.sql`, `0003_storage.sql` in order in the SQL editor.
3. Create an admin user in **Authentication → Users** (signups stay disabled).
4. Grant it admin rights with the SQL in [`docs/SUPABASE_SETUP.md`](docs/SUPABASE_SETUP.md).
5. Set the environment variables listed in `.env.example` locally and in Vercel.

Never commit real keys. The service-role key is server-only and is not required for normal admin CRUD — admin reads and writes use the anon key with RLS plus an explicit server-side `admin_users` check.

## Verified content policy

Publicly shown:

- Owner details from `PDR.MD` (name, university, program, degree, GPA 3.71).
- GitHub profile contact links, skill badges and stated interests.
- `Cyclela` and `Personal` repositories, with descriptions taken from their READMEs and live URLs.
- The GitHub avatar as the profile photograph, downloaded locally to `public/images/profile.jpg`.

Not published until confirmed: graduation year, location, formal employment, certifications, testimonials, and the `Real Food Tangerang` / `Sistem Informasi Puskesmas` projects. The full inventory and evidence are in [`docs/AUDIT.md`](docs/AUDIT.md).

## Deployment

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md). No remote repository or deployment was modified during implementation.

## Security notes

- Admin pages are protected in the server layout **and** in the data access layer; every server action re-checks authorization.
- RLS enforces public read of published content, public insert-only contact messages, and admin-only writes.
- No public admin registration. Hidden UI is never an authorization mechanism.
- Contact messages are private to admins; visitors cannot read them.
- GitHub tokens are not used or stored anywhere.
