# Supabase setup

All SQL is in `supabase/migrations/`. Apply the files **in order** using the Supabase SQL editor (or the Supabase CLI with `supabase db push`).

## 1. Create the project

1. Create a free Supabase project.
2. Copy **Project URL** and **publishable/anon key** from Project Settings → API.
3. Fill `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<publishable-or-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<only-if-needed>
```

`SUPABASE_SERVICE_ROLE_KEY` is optional for this app. Admin CRUD uses the anon key plus RLS and an explicit `admin_users` check. If you set it, keep it server-only and never prefix it with `NEXT_PUBLIC_`.

## 2. Run migrations

```text
supabase/migrations/0001_schema.sql        tables, constraints, indexes, is_admin()
supabase/migrations/0002_rls_policies.sql  Row Level Security policies
supabase/migrations/0003_storage.sql       portfolio-images bucket and policies
```

## 3. Provision the first administrator

Public registration is intentionally not implemented. Create the user from the Supabase dashboard:

1. **Authentication → Users → Add user** → enter email/password. Optionally confirm the email.
2. Copy the generated user UUID.
3. Run this in the SQL editor (replacing the UUID and email):

```sql
insert into public.admin_users (user_id, email)
values ('00000000-0000-0000-0000-000000000000', 'admin@example.com')
on conflict (user_id) do nothing;
```

4. Sign in at `/admin/login`.

To revoke access: `delete from public.admin_users where user_id = '…';`

## 4. What RLS enforces

| Table | Public | Administrator |
|---|---|---|
| profiles | read | all |
| projects | read where `published = true` | all |
| project_images | read only for published projects | all |
| skills / experiences / education / certifications | read where `published = true` | all |
| testimonials | read where `published = true AND approved = true` | all |
| contact_messages | insert only; **no read** | all |

Storage bucket `portfolio-images` is publicly readable (needed for images) but only administrators can upload, update or delete. Maximum upload enforced by the app: 4 MB; allowed types: JPEG/PNG/WebP/AVIF/SVG.

## 5. Verify RLS manually

In the SQL editor, impersonate roles to confirm policies:

```sql
-- Should return only published projects
select id, title from public.projects;

-- Should return zero rows for anon/authenticated non-admin
select * from public.contact_messages;

-- Should be true for a provisioned admin, false otherwise
select public.is_admin();
```

For a more realistic test, use the Supabase client with the anon key:

```js
// Anon client: no rows expected
const { data } = await supabase.from("contact_messages").select("*");

// Anon client: insert allowed
const { error } = await supabase.from("contact_messages").insert({
  name: "Test", email: "test@example.com",
  subject: "RLS check", message: "This is a private test message.",
});
```

Expected: select returns `[]` (or a permission error depending on version), insert succeeds, and the row is visible only in the admin dashboard.

## 6. Free-tier limits and graceful fallbacks

Supabase free projects have quotas and may pause after inactivity. The app handles this by:

- falling back to verified static content for all public reads;
- showing a clear configuration error from the contact API instead of losing the message silently;
- never depending on background jobs or paid APIs.

Check the current Supabase pricing documentation before launch, since limits and policies change. If the project pauses, the public site still renders from fallback content; the admin dashboard will require Supabase to be awake for sign-in.

## 7. Seed content (optional)

After signing in, use the admin dashboard to add content. If you prefer SQL, note that `published` defaults to false on projects, experiences, education, certifications and testimonials — set it to `true` deliberately.
