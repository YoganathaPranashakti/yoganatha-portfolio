-- Row Level Security. Anon clients can only read published content and submit
-- contact messages. All writes to portfolio content require admin_users membership.

alter table public.admin_users enable row level security;
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.project_images enable row level security;
alter table public.skills enable row level security;
alter table public.experiences enable row level security;
alter table public.education enable row level security;
alter table public.certifications enable row level security;
alter table public.testimonials enable row level security;
alter table public.contact_messages enable row level security;

-- NOTE: no RLS policy is created for public insert/update/delete on admin_users.
-- Only the service role can provision admins. A user may only read their own
-- row so the server can perform an explicit authorization check.
drop policy if exists "Users can read their own admin status" on public.admin_users;
create policy "Users can read their own admin status"
  on public.admin_users for select to authenticated
  using (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- Public read policies
-- ---------------------------------------------------------------------------
drop policy if exists "Anyone can read the profile" on public.profiles;
create policy "Anyone can read the profile"
  on public.profiles for select to anon, authenticated
  using (true);

drop policy if exists "Public reads published projects" on public.projects;
create policy "Public reads published projects"
  on public.projects for select to anon, authenticated
  using (published = true);

drop policy if exists "Public reads images of published projects" on public.project_images;
create policy "Public reads images of published projects"
  on public.project_images for select to anon, authenticated
  using (
    exists (
      select 1 from public.projects
      where projects.id = project_images.project_id and projects.published = true
    )
  );

drop policy if exists "Public reads published skills" on public.skills;
create policy "Public reads published skills"
  on public.skills for select to anon, authenticated
  using (published = true);

drop policy if exists "Public reads published experience" on public.experiences;
create policy "Public reads published experience"
  on public.experiences for select to anon, authenticated
  using (published = true);

drop policy if exists "Public reads published education" on public.education;
create policy "Public reads published education"
  on public.education for select to anon, authenticated
  using (published = true);

drop policy if exists "Public reads published certifications" on public.certifications;
create policy "Public reads published certifications"
  on public.certifications for select to anon, authenticated
  using (published = true);

drop policy if exists "Public reads approved testimonials" on public.testimonials;
create policy "Public reads approved testimonials"
  on public.testimonials for select to anon, authenticated
  using (published = true and approved = true);

-- ---------------------------------------------------------------------------
-- Contact messages: INSERT only for visitors. Never SELECT by the public.
-- ---------------------------------------------------------------------------
drop policy if exists "Visitors can submit contact messages" on public.contact_messages;
create policy "Visitors can submit contact messages"
  on public.contact_messages for insert to anon, authenticated
  with check (true);

-- ---------------------------------------------------------------------------
-- Administrator policies (RLS enforced even for logged-in non-admins)
-- ---------------------------------------------------------------------------
drop policy if exists "Admins manage the profile" on public.profiles;
create policy "Admins manage the profile"
  on public.profiles for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage projects" on public.projects;
create policy "Admins manage projects"
  on public.projects for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage project images" on public.project_images;
create policy "Admins manage project images"
  on public.project_images for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage skills" on public.skills;
create policy "Admins manage skills"
  on public.skills for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage experience" on public.experiences;
create policy "Admins manage experience"
  on public.experiences for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage education" on public.education;
create policy "Admins manage education"
  on public.education for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage certifications" on public.certifications;
create policy "Admins manage certifications"
  on public.certifications for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage testimonials" on public.testimonials;
create policy "Admins manage testimonials"
  on public.testimonials for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage contact messages" on public.contact_messages;
create policy "Admins manage contact messages"
  on public.contact_messages for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
