CREATE OR REPLACE FUNCTION public.restrict_auth_signups()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF lower(NEW.email) <> 'thanujadharmavarapu@gmail.com' THEN
    RAISE EXCEPTION 'Registration is restricted to the site owner.';
  END IF;
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.restrict_auth_signups() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS restrict_auth_signups_trigger ON auth.users;
CREATE TRIGGER restrict_auth_signups_trigger
BEFORE INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.restrict_auth_signups();