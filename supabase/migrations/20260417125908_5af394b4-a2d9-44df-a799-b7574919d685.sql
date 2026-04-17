-- Generic updated_at function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- ===== PROFILES =====
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles viewable by owner"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data ->> 'display_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ===== COMPLETED DRILLS =====
CREATE TABLE public.completed_drills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  drill_id TEXT NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, drill_id)
);

ALTER TABLE public.completed_drills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own completed drills"
  ON public.completed_drills FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own completed drills"
  ON public.completed_drills FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own completed drills"
  ON public.completed_drills FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_completed_drills_user ON public.completed_drills(user_id);

-- ===== TRAINING LOG =====
CREATE TABLE public.training_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  minutes INTEGER NOT NULL DEFAULT 0 CHECK (minutes >= 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, log_date)
);

ALTER TABLE public.training_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own training log"
  ON public.training_log FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own training log"
  ON public.training_log FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own training log"
  ON public.training_log FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own training log"
  ON public.training_log FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_training_log_updated_at
  BEFORE UPDATE ON public.training_log
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_training_log_user_date ON public.training_log(user_id, log_date);