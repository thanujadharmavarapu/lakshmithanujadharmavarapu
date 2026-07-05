import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const OWNER_EMAIL = "thanujadharmavarapu@gmail.com";

const AdminLogin = () => {
  const [mode, setMode] = useState<"signin" | "forgot">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{ text: string; kind: "error" | "info" } | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin/dashboard");
    });
  }, [navigate]);

  const handleSignIn = async () => {
    setMessage(null);
    setLoading(true);
    try {
      const emailNorm = email.trim().toLowerCase();

      let { error: err } = await supabase.auth.signInWithPassword({ email: emailNorm, password });

      // One-time silent bootstrap: if the owner account doesn't exist yet, create it and sign in.
      if (err && emailNorm === OWNER_EMAIL && /invalid/i.test(err.message)) {
        const { error: signUpErr } = await supabase.auth.signUp({
          email: emailNorm,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin/dashboard` },
        });
        if (!signUpErr) {
          const res = await supabase.auth.signInWithPassword({ email: emailNorm, password });
          err = res.error;
        }
      }

      if (err) throw err;
      navigate("/admin/dashboard");
    } catch (e: any) {
      setMessage({ text: e?.message ?? "Authentication failed", kind: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async () => {
    setMessage(null);
    setLoading(true);
    try {
      const emailNorm = email.trim().toLowerCase();
      if (emailNorm !== OWNER_EMAIL) {
        throw new Error("Password reset is only available for the site owner.");
      }
      const { error: err } = await supabase.auth.resetPasswordForEmail(emailNorm, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (err) throw err;
      setMessage({ text: "Reset link sent. Check your inbox to set a new password.", kind: "info" });
    } catch (e: any) {
      setMessage({ text: e?.message ?? "Could not send reset link", kind: "error" });
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
            {mode === "signin" ? "AUTHORIZED PERSONNEL ONLY" : "PASSWORD RECOVERY"}
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

          {mode === "signin" && (
            <div>
              <label className="font-mono text-xs text-muted-foreground block mb-1">PASSWORD:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                className="w-full bg-muted/50 border border-border/50 rounded px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-primary/50"
              />
            </div>
          )}

          {message && (
            <div className={`font-mono text-xs ${message.kind === "error" ? "text-destructive" : "text-neon-green"}`}>
              {message.text}
            </div>
          )}

          <button
            onClick={mode === "signin" ? handleSignIn : handleForgot}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2 rounded border border-primary/30 bg-primary/10 text-primary font-display text-sm tracking-wider hover:bg-primary/20 transition-colors disabled:opacity-50"
          >
            <Lock size={14} />
            {loading ? "..." : mode === "signin" ? "AUTHENTICATE" : "SEND RESET LINK"}
          </button>

          <button
            type="button"
            onClick={() => { setMessage(null); setMode(mode === "signin" ? "forgot" : "signin"); }}
            className="w-full text-center font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors"
          >
            {mode === "signin" ? "» FORGOT PASSWORD?" : "« BACK TO SIGN IN"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
