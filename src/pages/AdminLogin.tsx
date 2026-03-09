import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Lock } from "lucide-react";

const ADMIN_EMAIL = "admin@sentinel.os";
const ADMIN_PASS = "sentinel2026";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      localStorage.setItem("sentinel_admin", "true");
      navigate("/admin/dashboard");
    } else {
      setError("ACCESS DENIED — Invalid credentials");
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
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full bg-muted/50 border border-border/50 rounded px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-primary/50"
            />
          </div>

          {error && (
            <div className="font-mono text-xs text-destructive">{error}</div>
          )}

          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-2 py-2 rounded border border-primary/30 bg-primary/10 text-primary font-display text-sm tracking-wider hover:bg-primary/20 transition-colors"
          >
            <Lock size={14} />
            AUTHENTICATE
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
