import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ResetPassword = () => {
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState<{ text: string; kind: "error" | "info" } | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase parses the recovery token from the URL hash and emits a PASSWORD_RECOVERY event.
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const submit = async () => {
    setMessage(null);
    if (password.length < 8) {
      setMessage({ text: "Password must be at least 8 characters.", kind: "error" });
      return;
    }
    if (password !== confirm) {
      setMessage({ text: "Passwords do not match.", kind: "error" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setMessage({ text: "Password updated. Redirecting to sign in...", kind: "info" });
      await supabase.auth.signOut();
      setTimeout(() => navigate("/admin"), 1500);
    } catch (e: any) {
      setMessage({ text: e?.message ?? "Could not update password", kind: "error" });
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
            RESET CREDENTIALS
          </h1>
          <p className="font-mono text-xs text-muted-foreground mt-1">
            SET A NEW ACCESS KEY
          </p>
        </div>

        {!ready ? (
          <div className="font-mono text-xs text-muted-foreground text-center">
            Verifying recovery link... open this page from the email link.
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="font-mono text-xs text-muted-foreground block mb-1">NEW PASSWORD:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-muted/50 border border-border/50 rounded px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-primary/50"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-muted-foreground block mb-1">CONFIRM PASSWORD:</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                className="w-full bg-muted/50 border border-border/50 rounded px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-primary/50"
              />
            </div>

            {message && (
              <div className={`font-mono text-xs ${message.kind === "error" ? "text-destructive" : "text-neon-green"}`}>
                {message.text}
              </div>
            )}

            <button
              onClick={submit}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2 rounded border border-primary/30 bg-primary/10 text-primary font-display text-sm tracking-wider hover:bg-primary/20 transition-colors disabled:opacity-50"
            >
              <Lock size={14} />
              {loading ? "..." : "UPDATE PASSWORD"}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ResetPassword;
