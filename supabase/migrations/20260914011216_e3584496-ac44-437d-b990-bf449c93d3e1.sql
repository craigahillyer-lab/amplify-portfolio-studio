DROP POLICY IF EXISTS "Anyone can read events" ON public.events;
DROP POLICY IF EXISTS "Anyone can read page views" ON public.page_views;
REVOKE SELECT ON public.events FROM anon, authenticated;
REVOKE SELECT ON public.page_views FROM anon, authenticated;