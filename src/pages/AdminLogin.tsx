import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AdminLogin = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin/dashboard");
    });
  }, [navigate]);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error: err } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin/dashboard` },
        });
        if (err) throw err;
        setError("Account created. If email confirmation is enabled, verify your inbox, then sign in.");
        setMode("signin");
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
        navigate("/admin/dashboard");
      }
    } catch (e: any) {
      setError(e?.message ?? "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background cyber-grid-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md border border-primary/20 rounded-lg bg-card/80 backdrop-blur-xl glow-blue p-8"
      >
        <div className="text-center mb-8">
          <Shield size={32} className="text-primary mx-auto mb-3" />
          <h1 className="font-display text-xl tracking-wider text-primary glow-text-blue">
            SECURE TERMINAL
          </h1>
          <p className="font-mono text-xs text-muted-foreground mt-1">
            AUTHORIZED PERSONNEL ONLY
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="font-mono text-xs text-muted-foreground block mb-1">EMAIL:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-muted/50 border border-border/50 rounded px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-primary/50"
            />
          </div>
          <div>
            <label className="font-mono text-xs text-muted-foreground block mb-1">PASSWORD:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full bg-muted/50 border border-border/50 rounded px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-primary/50"
            />
          </div>

          {error && (
            <div className="font-mono text-xs text-destructive">{error}</div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2 rounded border border-primary/30 bg-primary/10 text-primary font-display text-sm tracking-wider hover:bg-primary/20 transition-colors disabled:opacity-50"
          >
            <Lock size={14} />
            {loading ? "..." : mode === "signin" ? "AUTHENTICATE" : "REGISTER"}
          </button>

          <button
            type="button"
            onClick={() => { setError(""); setMode(mode === "signin" ? "signup" : "signin"); }}
            className="w-full text-center font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors"
          >
            {mode === "signin" ? "» FIRST-TIME SETUP: REGISTER OPERATOR" : "» BACK TO SIGN IN"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
