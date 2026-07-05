import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { ChevronLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ball from "@/assets/ball-removebg.png";

const authSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email" }).max(255),
  password: z.string().min(6, { message: "Min 6 characters" }).max(100),
  displayName: z
    .string()
    .trim()
    .min(2, { message: "Min 2 characters" })
    .max(40)
    .optional(),
});

const Auth = () => {
  const { t } = useLanguage();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate("/training", { replace: true });
  }, [user, loading, navigate]);

  if (loading) return null;
  if (user) return <Navigate to="/training" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = authSchema.safeParse({
      email,
      password,
      ...(mode === "signup" ? { displayName } : {}),
    });
    if (!parsed.success) {
      toast({
        title: "Invalid input",
        description: parsed.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/training`,
            data: { display_name: parsed.data.displayName ?? "" },
          },
        });
        if (error) throw error;
        toast({ title: "Account created", description: "You're signed in!" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) throw error;
        toast({ title: "Welcome back!" });
      }
    } catch (err: any) {
      toast({
        title: mode === "signup" ? "Sign up failed" : "Login failed",
        description: err.message ?? "Try again",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 bg-background">
      
      <button
        onClick={() => navigate("/")}
        className="absolute z-10 top-4 left-4 flex items-center gap-2 px-4 py-1 rounded-full bg-background border border-border shadow-md transition-all group-hover:bg-secondary  text-sm font-bold text-foreground hover:text-primary transition-colors"
      >
        <ChevronLeft className="h-4 w-4" /> {t("nav.home")}
      </button>
      <div className="w-full max-w-sm card-3d rounded-2xl p-6 bg-card">
        <div className="flex flex-col items-center mb-6">
          <div className="h-16 w-16 rounded-full flex items-center justify-center  mb-3">
            <img
              src={ball}
              alt="Basketball player training"
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-2xl font-black">
            {mode === "login" ? t("auth.login.title") : t("auth.signup.title")}
          </h1>

          <p className="text-xs text-muted-foreground mt-1">
            {mode === "login"
              ? t("auth.login.subtitle")
              : t("auth.signup.subtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-1.5">
              <Label htmlFor="displayName">{t("auth.pseudo")}</Label>
              <Input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                minLength={2}
                maxLength={40}
              />
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="email">{t("auth.email")}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={255}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">{t("auth.password")}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              maxLength={100}
            />
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting
              ? t("auth.loading")
              : mode === "login"
                ? t("auth.login.cta")
                : t("auth.signup.cta")}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="w-full mt-4 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          {mode === "login"
            ? t("auth.switch.toSignup")
            : t("auth.switch.toLogin")}
        </button>
      </div>
    </div>
  );
};

export default Auth;
