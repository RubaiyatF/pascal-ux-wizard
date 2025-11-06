-- Trigger types generation
CREATE OR REPLACE FUNCTION public.get_current_timestamp()
RETURNS timestamptz
LANGUAGE sql
STABLE
SET search_path = public
AS $$
  SELECT now();
$$;