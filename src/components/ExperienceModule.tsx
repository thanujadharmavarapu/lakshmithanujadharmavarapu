import { motion } from "framer-motion";
import { getData, defaultExperience, type Experience } from "@/lib/defaultData";

const ExperienceModule = () => {
  const experience = getData<Experience[]>("portfolio_experience", defaultExperience);

  return (
    <div className="space-y-1">
      <div className="font-mono text-xs text-primary mb-4">
        ┌─── SYSTEM LOG ────────────────────────────
      </div>

      {experience.map((exp, i) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 }}
          className="relative pl-6 pb-6 border-l border-primary/20 last:border-l-0"
        >
          {/* Timeline dot */}
          <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full border-2 border-primary bg-background" />

          <div className="font-mono text-xs text-neon-cyan mb-1">
            [{exp.year}] — {exp.organization}
          </div>
          <h3 className="font-display text-sm tracking-wider text-foreground mb-2">
            {exp.title}
          </h3>
          <p className="text-sm text-muted-foreground font-body">
            {exp.description}
          </p>
        </motion.div>
      ))}

      <div className="font-mono text-xs text-primary mt-2">
        └───────────────────────────────────────────
      </div>
    </div>
  );
};

export default ExperienceModule;
