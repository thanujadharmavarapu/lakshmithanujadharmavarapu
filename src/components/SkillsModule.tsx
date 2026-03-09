import { motion } from "framer-motion";
import { getData, defaultSkills, type Skill } from "@/lib/defaultData";

const categoryColors: Record<string, string> = {
  "Programming": "text-neon-blue",
  "Web Development": "text-neon-purple",
  "IoT & Embedded": "text-neon-cyan",
  "AI": "text-neon-green",
  "Tools": "text-neon-pink",
};

const categoryBarColors: Record<string, string> = {
  "Programming": "bg-neon-blue",
  "Web Development": "bg-neon-purple",
  "IoT & Embedded": "bg-neon-cyan",
  "AI": "bg-neon-green",
  "Tools": "bg-neon-pink",
};

const SkillsModule = () => {
  const skills = getData<Skill[]>("portfolio_skills", defaultSkills);
  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <div className="space-y-8">
      {/* Radar-inspired visualization */}
      <div className="flex justify-center mb-8">
        <div className="relative w-64 h-64">
          {/* Radar circles */}
          {[1, 2, 3, 4].map((ring) => (
            <motion.div
              key={ring}
              className="absolute rounded-full border border-primary/10"
              style={{
                width: `${ring * 25}%`,
                height: `${ring * 25}%`,
                top: `${50 - ring * 12.5}%`,
                left: `${50 - ring * 12.5}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: ring * 0.15, duration: 0.5 }}
            />
          ))}
          {/* Cross lines */}
          <div className="absolute top-0 left-1/2 w-[1px] h-full bg-primary/10" />
          <div className="absolute top-1/2 left-0 h-[1px] w-full bg-primary/10" />

          {/* Rotating sweep */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-1/2 h-[1px] origin-left"
            style={{
              background: "linear-gradient(90deg, hsla(195,100%,50%,0.4), transparent)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1 -translate-y-1 rounded-full bg-primary animate-pulse-glow" />

          {/* Skill dots on radar */}
          {skills.slice(0, 12).map((skill, i) => {
            const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
            const radius = (skill.level / 100) * 45;
            const x = 50 + Math.cos(angle) * radius;
            const y = 50 + Math.sin(angle) * radius;
            return (
              <motion.div
                key={skill.name}
                className="absolute w-2 h-2 rounded-full bg-neon-cyan"
                style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                title={skill.name}
              >
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-muted-foreground whitespace-nowrap">
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Skill bars by category */}
      {categories.map((cat, ci) => (
        <motion.div
          key={cat}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: ci * 0.1 }}
        >
          <h3 className={`font-display text-sm tracking-wider mb-3 ${categoryColors[cat] || "text-foreground"}`}>
            {cat.toUpperCase()}
          </h3>
          <div className="space-y-2">
            {skills
              .filter((s) => s.category === cat)
              .map((skill, si) => (
                <div key={skill.name} className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground w-28 truncate">
                    {skill.name}
                  </span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${categoryBarColors[cat] || "bg-primary"}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: 0.3 + si * 0.1, duration: 0.8, ease: "easeOut" }}
                      style={{ opacity: 0.8 }}
                    />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground w-8 text-right">
                    {skill.level}%
                  </span>
                </div>
              ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkillsModule;
