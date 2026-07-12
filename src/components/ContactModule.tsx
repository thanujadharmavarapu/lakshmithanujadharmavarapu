import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Send } from "lucide-react";

const ContactModule = () => {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      setSent(true);
      setMessage("");
      setTimeout(() => setSent(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Terminal header */}
      <div className="font-mono text-xs text-primary">
        ┌─── COMMUNICATION TERMINAL ─────────────
      </div>

      {/* Contact links */}
      <div className="space-y-3">
        {[
          { icon: <Mail size={16} />, label: "EMAIL", value: "thanujadharmavarapu@gmail.com", href: "mailto:thanujadharmavarapu@gmail.com" },
          { icon: <Phone size={16} />, label: "PHONE", value: "+91 8297889975", href: "tel:+918297889975" },
          { icon: <Linkedin size={16} />, label: "LINKEDIN", value: "/in/lakshmi-thanuja-dharmavarapu", href: "https://linkedin.com/in/lakshmi-thanuja-dharmavarapu-software-developer" },
        ].map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 p-3 rounded border border-border/50 hover:border-primary/40 bg-card/50 hover:bg-card transition-all group"
          >
            <span className="text-primary group-hover:text-neon-cyan transition-colors">{link.icon}</span>
            <div>
              <div className="font-mono text-[10px] text-muted-foreground">{link.label}</div>
              <div className="text-sm text-foreground/80 font-body">{link.value}</div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Message input */}
      <div className="space-y-2">
        <div className="font-mono text-xs text-muted-foreground">
          {">"} SEND_MESSAGE:
        </div>
        <div className="flex gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-muted/50 border border-border/50 rounded px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
          />
          <button
            onClick={handleSend}
            aria-label="Send message"
            className="px-4 py-2 rounded border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
        {sent && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xs text-neon-green"
          >
            ✓ MESSAGE TRANSMITTED SUCCESSFULLY
          </motion.div>
        )}
      </div>

      <div className="font-mono text-xs text-primary">
        └────────────────────────────────────────
      </div>
    </div>
  );
};

export default ContactModule;
