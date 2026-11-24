# GitHub integration

## Inspected sources (2026-11-24)

| Resource | URL | Notes |
|---|---|---|
| Profile | https://github.com/YoganathaPranashakti | 3 public repositories, 22 contributions in the last year |
| Profile README | `YoganathaPranashakti/README.md` | Contact details, interests, categorized skill badges, CV link |
| Cyclela | https://github.com/YoganathaPranashakti/Cyclela | Verified PWA; README and screenshots used for case study |
| Personal | https://github.com/YoganathaPranashakti/Personal | Verified single-page Hello World site |
| Profile repo | https://github.com/YoganathaPranashakti/YoganathaPranashakti | Profile documentation and assets |

## Implemented integration

- Header/footer GitHub links point to the verified profile.
- Project cards and detail pages link to verified repository URLs.
- Verified technology tags come from READMEs and profile badges.
- Featured repositories section is the homepage Projects section.
- The owner's GitHub avatar was downloaded to `public/images/profile.jpg` for local, optimized delivery.
- Cyclela screenshots were downloaded to `public/images/projects/` from the repository's `assets/screenshots` folder.

## Intentionally not implemented

- **Live GitHub activity visualization**: unauthenticated GitHub API allows only 60 requests/hour and can rate-limit a public site. Adding it would require a server-side token and careful caching. The static, verified snapshot above is used instead.
- **Automatic repository syncing**: no repository metadata is fetched at runtime. New projects are added through the admin dashboard after verification.

## Rules for future content

- Verify a repository's README and files before publishing it as a project.
- Never publish stars, forks, contributions or metrics that were not verified at the time of writing.
- Never put a GitHub token in `NEXT_PUBLIC_*` variables or client bundles.
