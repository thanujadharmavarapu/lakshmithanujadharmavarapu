import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { X } from "lucide-react";

interface ModulePanelProps {
  title: string;
  icon: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  color?: "blue" | "purple" | "cyan" | "green" | "pink";
}

const colorMap = {
  blue: {
    border: "border-neon-blue/30",
    glow: "glow-blue",
    text: "text-neon-blue glow-text-blue",
    bg: "bg-neon-blue/5",
    line: "from-transparent via-neon-blue to-transparent",
  },
  purple: {
    border: "border-neon-purple/30",
    glow: "glow-purple",
    text: "text-neon-purple glow-text-purple",
    bg: "bg-neon-purple/5",
    line: "from-transparent via-neon-purple to-transparent",
  },
  cyan: {
    border: "border-neon-cyan/30",
    glow: "glow-cyan",
    text: "text-neon-cyan glow-text-cyan",
    bg: "bg-neon-cyan/5",
    line: "from-transparent via-neon-cyan to-transparent",
  },
  green: {
    border: "border-neon-green/30",
    glow: "",
    text: "text-neon-green",
    bg: "bg-neon-green/5",
    line: "from-transparent via-neon-green to-transparent",
  },
  pink: {
    border: "border-neon-pink/30",
    glow: "",
    text: "text-neon-pink",
    bg: "bg-neon-pink/5",
    line: "from-transparent via-neon-pink to-transparent",
  },
};

const ModulePanel = ({ title, icon, isOpen, onClose, children, color = "blue" }: ModulePanelProps) => {
  const c = colorMap[color];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel */}
          <motion.div
            className={`relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-lg border ${c.border} ${c.bg} backdrop-blur-xl ${c.glow}`}
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border/50 bg-card/90 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className={c.text}>{icon}</span>
                <h2 className={`font-display text-lg tracking-wider uppercase ${c.text}`}>
                  {title}
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label={`Close ${title} panel`}
                className="p-1 rounded border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Decorative line */}
            <div className={`h-[1px] bg-gradient-to-r ${c.line}`} />

            {/* Content */}
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModulePanel;
