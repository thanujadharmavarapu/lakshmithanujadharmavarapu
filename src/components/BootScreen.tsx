import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  { text: "> INITIALIZING SENTINEL.OS...", delay: 0 },
  { text: "> Loading IoT + Cybersecurity modules...", delay: 150 },
  { text: "> ESP32 / Arduino / Raspberry Pi linked... OK", delay: 300 },
  { text: "> AI detection (YOLO) online...", delay: 450 },
  { text: "> Power BI analytics engine ready...", delay: 600 },
  { text: "> Operator profile loaded: L. THANUJA", delay: 750 },
  { text: "> SYSTEM READY", delay: 900 },
];

interface BootScreenProps {
  onComplete: () => void;
}

const BootScreen = ({ onComplete }: BootScreenProps) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [showReveal, setShowReveal] = useState(false);

  useEffect(() => {
    bootLines.forEach((_, i) => {
      setTimeout(() => setVisibleLines(i + 1), bootLines[i].delay);
    });
    setTimeout(() => setShowReveal(true), 1100);
    setTimeout(onComplete, 2400);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-background cyber-grid-bg"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Scanline overlay */}
        <div className="absolute inset-0 scanline pointer-events-none" />

        <div className="max-w-2xl w-full px-6">
          {!showReveal ? (
            <div className="font-mono text-sm space-y-1">
              {bootLines.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={
                    i === visibleLines - 1
                      ? "text-primary glow-text-blue"
                      : "text-muted-foreground"
                  }
                >
                  {line.text}
                  {i === visibleLines - 1 && (
                    <span className="animate-pulse ml-1">█</span>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-2 text-xs font-mono tracking-[0.3em] text-primary/60 uppercase"
              >
                System Operator Identified
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-3xl md:text-5xl font-display font-bold text-primary glow-text-blue tracking-wider"
              >
                LAKSHMI THANUJA DHARMAVARAPU
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="mt-3 text-sm md:text-base font-body text-secondary glow-text-purple tracking-wide max-w-lg mx-auto"
              >
                Aspiring Software Engineer · IoT • AI • Cybersecurity
              </motion.div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="mt-6 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BootScreen;
