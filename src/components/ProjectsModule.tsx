import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronRight, ChevronDown } from "lucide-react";
import { getData, defaultProjects, type Project } from "@/lib/defaultData";

const ProjectsModule = () => {
  const projects = getData<Project[]>("portfolio_projects", defaultProjects);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {projects.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="border border-border/50 rounded-lg overflow-hidden bg-card/50 hover:border-primary/30 transition-colors"
        >
          {/* Project header */}
          <button
            onClick={() => setExpanded(expanded === project.id ? null : project.id)}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse-glow" />
                <h3 className="font-display text-base tracking-wider text-primary glow-text-blue">
                  {project.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mt-1 font-body">{project.subtitle}</p>
            </div>
            {expanded === project.id ? (
              <ChevronDown size={18} className="text-primary" />
            ) : (
              <ChevronRight size={18} className="text-muted-foreground" />
            )}
          </button>

          {/* Expanded content */}
          <AnimatePresence>
            {expanded === project.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-4">
                  <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                  {/* System report header */}
                  <div className="font-mono text-xs text-muted-foreground">
                    <span className="text-primary">SYSTEM REPORT</span> // PROJECT ANALYSIS
                  </div>

                  <p className="text-sm text-foreground/80 font-body">{project.description}</p>

                  {/* Features */}
                  <div>
                    <h4 className="font-mono text-xs text-neon-cyan mb-2">FEATURES:</h4>
                    <ul className="space-y-1">
                      {project.features.map((f, fi) => (
                        <motion.li
                          key={fi}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: fi * 0.05 }}
                          className="flex items-center gap-2 text-sm text-foreground/70 font-body"
                        >
                          <span className="w-1 h-1 rounded-full bg-neon-cyan" />
                          {f}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack */}
                  <div>
                    <h4 className="font-mono text-xs text-neon-purple mb-2">TECH STACK:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-xs font-mono rounded border border-neon-purple/30 text-neon-purple bg-neon-purple/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-primary hover:text-neon-cyan transition-colors"
                    >
                      <ExternalLink size={12} />
                      VIEW ON GITHUB
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectsModule;
