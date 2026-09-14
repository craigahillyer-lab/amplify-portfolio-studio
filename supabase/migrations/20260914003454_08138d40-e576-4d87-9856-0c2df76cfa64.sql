CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name TEXT NOT NULL,
  path TEXT NOT NULL,
  device TEXT,
  visitor_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX events_created_at_idx ON public.events (created_at DESC);
CREATE INDEX events_name_idx ON public.events (event_name);

GRANT SELECT, INSERT ON public.events TO anon;
GRANT SELECT, INSERT ON public.events TO authenticated;
GRANT ALL ON public.events TO service_role;

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can record an event" ON public.events FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can read events" ON public.events FOR SELECT TO anon, authenticated USING (true);