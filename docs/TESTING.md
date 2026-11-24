# Testing documentation

## Automated checks

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # ESLint (Next flat config)
npm run build       # production build + route generation
```

All three passed at implementation time. The build generated all public routes, both project detail pages, sitemap, robots and admin routes without errors.

## Manual verification performed

| Area | Result |
|---|---|
| Homepage render | Pass — no console errors, no horizontal overflow at the tested viewport |
| Navigation routes | `/`, `/about`, `/projects`, `/projects/cyclela`, `/certifications` all render with correct titles |
| Unknown route | `/does-not-exist` renders the 404 page |
| Admin protection | `/admin` redirects to `/admin/login` when unauthenticated |
| Theme toggle | `html` class switches `dark` → `light` |
| Mobile menu | Button exposes `aria-expanded` and reveals `#mobile-navigation` |
| Contact validation | Empty submission shows four field-level errors |
| Contact fallback | Valid submission with no Supabase config returns a clear configuration message |
| Project search/filter | Searching `cyclela` reduces 2 cards to 1 |
| Images | Local avatar and Cyclela screenshots load; `next/image` optimization works |

## Lighthouse (in-app browser audit)

| Category | Score |
|---|---|
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |
| Performance | Not benchmarked (the available audit does not emulate a device or run a performance benchmark) |

Initial findings (prohibited ARIA on animated text and two label/accessible-name mismatches) were fixed and the audit was re-run to 100.

## Responsive checklist

Layouts were authored mobile-first and reviewed at breakpoint boundaries (320/375/768/1024/1440 target widths). Mechanisms:

- `container-page` uses `min(100% - 2.5rem, 1200px)` — no fixed widths.
- All multi-column grids collapse to one column below `sm`/`md`/`lg`.
- Long headings wrap naturally after fixing non-breaking spaces in `TextReveal`.
- `body { overflow-x: hidden }`, `Marquee` uses `overflow-hidden`, and floating decorations stay within the container.
- Tap targets use 44 px icon buttons and 11 px/12 px padded controls.

A physical device matrix test is still recommended before launch; the browser tooling available here did not expose viewport resizing.

## Supabase / RLS verification

With credentials configured, follow [`SUPABASE_SETUP.md`](SUPABASE_SETUP.md §5). Important expectations:

1. Anonymous client cannot `select` from `contact_messages`.
2. Anonymous client can `insert` into `contact_messages`.
3. Anonymous client sees only published projects/certifications/etc.
4. Anonymous client sees only approved **and** published testimonials.
5. A non-admin authenticated user cannot insert/update/delete portfolio content.
6. A provisioned admin can perform all CRUD operations.
7. Storage writes to `portfolio-images` require admin; reads are public.

## Accessibility notes

- Skip link, semantic landmarks, labelled form fields, visible focus rings.
- `aria-current` on active navigation links, `aria-expanded`/`aria-controls` on menus.
- Animated text exposes a screen-reader-only copy and hides decorative spans.
- `prefers-reduced-motion` disables animations and smooth scrolling globally.

## Known limitations

- No automated component test runner was installed; checks above are command-line and browser based.
- GitHub activity visualization is intentionally absent to avoid unauthenticated API rate limits.
- Formal RLS tests require real Supabase credentials, which were not available in this environment.
