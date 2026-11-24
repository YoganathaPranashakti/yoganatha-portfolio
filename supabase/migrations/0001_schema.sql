-- Initial portfolio schema. Safe to re-run only on a fresh project.
-- Apply with the Supabase SQL editor or `supabase db push`.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Administrator authorization
-- ---------------------------------------------------------------------------
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated, service_role;

-- ---------------------------------------------------------------------------
-- Personal profile (single row)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  headline text not null default '',
  summary text not null default '',
  location text,
  availability text,
  about text,
  philosophy text,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Projects and images
-- ---------------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  thumbnail text,
  gallery jsonb not null default '[]'::jsonb,
  category text not null default 'Project',
  technologies jsonb not null default '[]'::jsonb,
  role text not null default '',
  features jsonb not null default '[]'::jsonb,
  challenges jsonb not null default '[]'::jsonb,
  solutions jsonb not null default '[]'::jsonb,
  results jsonb not null default '[]'::jsonb,
  overview text,
  problem text,
  objectives jsonb not null default '[]'::jsonb,
  process jsonb not null default '[]'::jsonb,
  live_url text,
  github_url text,
  featured boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint projects_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint projects_url_scheme check (
    (live_url is null or live_url ~ '^https?://')
    and (github_url is null or github_url ~ '^https?://')
  )
);

create table if not exists public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  url text not null,
  alt text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Content tables
-- ---------------------------------------------------------------------------
create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  note text,
  sort_order integer not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  organization text not null,
  type text not null default 'Project',
  start_date text,
  end_date text,
  description text,
  highlights jsonb not null default '[]'::jsonb,
  url text,
  published boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists public.education (
  id uuid primary key default gen_random_uuid(),
  institution text not null,
  program text not null,
  degree text,
  gpa text,
  start_date text,
  end_date text,
  description text,
  published boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  issuer text not null,
  issue_date text,
  credential_id text,
  verification_url text,
  image_url text,
  description text,
  published boolean not null default false,
  updated_at timestamptz not null default now(),
  constraint certifications_url_scheme check (
    verification_url is null or verification_url ~ '^https?://'
  )
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  author_role text,
  organization text,
  content text not null,
  approved boolean not null default false,
  featured boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Private contact messages
-- ---------------------------------------------------------------------------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  is_read boolean not null default false,
  is_replied boolean not null default false,
  archived boolean not null default false,
  created_at timestamptz not null default now(),
  constraint contact_message_lengths check (
    char_length(name) between 2 and 80
    and char_length(email) between 3 and 160
    and char_length(subject) between 3 and 120
    and char_length(message) between 10 and 2000
  )
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------
create index if not exists projects_published_featured_idx
  on public.projects (published, featured, created_at desc);
create index if not exists projects_category_idx on public.projects (category);
create index if not exists project_images_project_idx on public.project_images (project_id, sort_order);
create index if not exists skills_published_order_idx on public.skills (published, sort_order);
create index if not exists experiences_published_idx on public.experiences (published);
create index if not exists education_published_idx on public.education (published);
create index if not exists certifications_published_idx on public.certifications (published);
create index if not exists testimonials_public_idx on public.testimonials (approved, published, featured);
create index if not exists contact_messages_inbox_idx
  on public.contact_messages (archived, is_read, created_at desc);

-- ---------------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------------
create trigger set_projects_updated_at before update on public.projects
  for each row execute function public.set_updated_at();
create trigger set_skills_updated_at before update on public.skills
  for each row execute function public.set_updated_at();
create trigger set_experiences_updated_at before update on public.experiences
  for each row execute function public.set_updated_at();
create trigger set_education_updated_at before update on public.education
  for each row execute function public.set_updated_at();
create trigger set_certifications_updated_at before update on public.certifications
  for each row execute function public.set_updated_at();
create trigger set_testimonials_updated_at before update on public.testimonials
  for each row execute function public.set_updated_at();
create trigger set_profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
