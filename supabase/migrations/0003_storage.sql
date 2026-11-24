-- Public bucket for portfolio imagery. Writes are admin-only through RLS.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio-images',
  'portfolio-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml']
)
on conflict (id) do nothing;

drop policy if exists "Public can view portfolio images" on storage.objects;
create policy "Public can view portfolio images"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'portfolio-images');

drop policy if exists "Admins can upload portfolio images" on storage.objects;
create policy "Admins can upload portfolio images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'portfolio-images' and public.is_admin());

drop policy if exists "Admins can update portfolio images" on storage.objects;
create policy "Admins can update portfolio images"
  on storage.objects for update to authenticated
  using (bucket_id = 'portfolio-images' and public.is_admin())
  with check (bucket_id = 'portfolio-images' and public.is_admin());

drop policy if exists "Admins can delete portfolio images" on storage.objects;
create policy "Admins can delete portfolio images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'portfolio-images' and public.is_admin());
