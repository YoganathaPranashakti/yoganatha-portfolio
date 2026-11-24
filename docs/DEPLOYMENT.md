# Deployment

Target: **GitHub → Vercel Free → Supabase Free**, aiming for Rp0 infrastructure cost.

No remote repository was created, pushed to, or deployed during implementation.

## 1. GitHub

```bash
git init
git add .
git commit -m "Initial portfolio implementation"
git remote add origin https://github.com/<owner>/<repository>.git
git push -u origin main
```

Confirm `.env.local` is ignored. Only `.env.example` should be committed.

## 2. Vercel

1. Import the GitHub repository in Vercel with framework preset **Next.js**.
2. Build command: `npm run build`; output: default (`.next`). Node.js version: 22.x.
3. Add environment variables (Project Settings → Environment Variables) for Production and Preview:
   - `NEXT_PUBLIC_SITE_URL=https://<your-domain>`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (only if you use it server-side; never expose it)
4. Deploy. Pushes to `main` trigger production deployments; pull requests trigger preview deployments.
5. Verify the deployment by visiting the URL and checking `/sitemap.xml`, `/robots.txt` and `/admin`.

Automatic deployment is **not** claimed as configured until you complete steps 1–4 and verify a deployment.

## 3. Custom domain

Update `NEXT_PUBLIC_SITE_URL` to the final domain so canonical URLs, Open Graph metadata and the sitemap are correct. Add the domain in Vercel and configure DNS as instructed.

## 4. CI workflow

`.github/workflows/ci.yml` runs lint, TypeScript check and production build on every push and pull request. It does not deploy.

## 5. Free-tier awareness

- Vercel Free and Supabase Free have usage limits, quotas and inactivity policies that can change. Review their current documentation before launch.
- Supabase free projects may pause after inactivity; public pages still render from verified static fallbacks during an outage.
- Keep uploaded images small (4 MB app limit) and avoid unnecessary background work.
- No paid API is required for any core feature.
- Optional GitHub activity visualization was intentionally omitted to avoid rate limits and token handling; GitHub links and verified repository data are used instead.

## 6. Post-deploy checks

| Check | Expected |
|---|---|
| `/` | Loads, dark/light toggle works, no horizontal overflow |
| `/projects/cyclela` | Case study with working repo and demo links |
| `/admin` | Redirects to `/admin/login` when signed out |
| Contact form | Stores message when Supabase is configured; clear error otherwise |
| `/sitemap.xml` | Contains public pages and published project URLs |
| `/robots.txt` | Disallows `/admin` and `/api/` |
