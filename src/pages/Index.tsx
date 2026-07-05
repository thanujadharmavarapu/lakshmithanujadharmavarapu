import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Cpu, FolderOpen, Clock, Award, Trophy, Radio, Shield } from "lucide-react";
import ParticleField from "@/components/ParticleField";
import BootScreen from "@/components/BootScreen";
import ModulePanel from "@/components/ModulePanel";
import SkillsModule from "@/components/SkillsModule";
import ProjectsModule from "@/components/ProjectsModule";
import ExperienceModule from "@/components/ExperienceModule";
import CertificatesModule from "@/components/CertificatesModule";
import AchievementsModule from "@/components/AchievementsModule";
import ContactModule from "@/components/ContactModule";

const modules = [
{ id: "skills", label: "SKILLS", icon: <Cpu size={22} />, color: "blue" as const, desc: "Technical capabilities" },
{ id: "projects", label: "PROJECTS", icon: <FolderOpen size={22} />, color: "purple" as const, desc: "System deployments" },
{ id: "experience", label: "EXPERIENCE", icon: <Clock size={22} />, color: "cyan" as const, desc: "Operational history" },
{ id: "certificates", label: "CERTIFICATES", icon: <Award size={22} />, color: "green" as const, desc: "Verified credentials" },
{ id: "achievements", label: "ACHIEVEMENTS", icon: <Trophy size={22} />, color: "pink" as const, desc: "Mission completions" },
{ id: "contact", label: "CONTACT", icon: <Radio size={22} />, color: "blue" as const, desc: "Communication terminal" }];


const moduleContent: Record<string, React.ReactNode> = {
  skills: <SkillsModule />,
  projects: <ProjectsModule />,
  experience: <ExperienceModule />,
  certificates: <CertificatesModule />,
  achievements: <AchievementsModule />,
  contact: <ContactModule />
};

const Index = () => {
  const navigate = useNavigate();
  const [booted, setBooted] = useState(false);
  const [openModule, setOpenModule] = useState<string | null>(null);

  const handleBootComplete = useCallback(() => setBooted(true), []);

  return (
    <div className="min-h-screen bg-background cyber-grid-bg relative overflow-hidden">
      <ParticleField />

      {/* Boot screen */}
      {!booted && <BootScreen onComplete={handleBootComplete} />}

      {/* Main dashboard */}
      {booted &&
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 min-h-screen flex flex-col">
        
          {/* Top bar */}
          <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-primary" />
                <span className="font-display text-sm tracking-wider text-primary glow-text-blue">Thanuja

              </span>
                <span className="text-xs font-mono text-muted-foreground hidden sm:inline">v 1.0 | STATUS: ONLINE

              </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span 
                    onClick={() => navigate('/admin')}
                    className="w-2 h-2 rounded-full bg-neon-green animate-pulse-glow cursor-pointer hover:scale-150 transition-transform" 
                  />
                  <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
                    ALL SYSTEMS NOMINAL
                  </span>
                </div>
                <div className="text-xs font-mono text-muted-foreground">
                  {new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </div>
              </div>
            </div>
          </header>

          {/* Hero area */}
          <div className="flex-shrink-0 py-12 md:py-16 text-center relative">
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}>
            
              <div className="text-xs font-mono tracking-[0.3em] text-primary/60 mb-2">
                SYSTEM OPERATOR
              </div>
              <h1 className="text-2xl md:text-4xl font-display font-bold text-primary glow-text-blue tracking-wider">LAKSHMI THANUJA DHARMAVARAPU</h1>
              <p className="mt-2 text-base md:text-lg font-body text-secondary glow-text-purple tracking-wide">Aspiring Software Engineer · IoT • AI • Cybersecurity

            </p>
              <p className="mt-3 text-sm font-mono text-muted-foreground max-w-lg mx-auto">"Designing Intelligent Security Systems with IoT and AI and Building Interactive Webpages for Dynamic User Experiences"

            </p>
              <div className="mt-4 h-[1px] max-w-xs mx-auto bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            </motion.div>
          </div>

          {/* Module grid */}
          <div className="flex-1 max-w-5xl mx-auto px-4 pb-16 w-full">
            <div className="font-mono text-xs text-muted-foreground mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
              SELECT MODULE TO ACCESS
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {modules.map((mod, i) =>
            <motion.button
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setOpenModule(mod.id)}
              className="group relative p-5 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:bg-card/80 transition-all duration-300 text-left hover:shadow-[0_0_30px_hsla(195,100%,50%,0.08)]">
              
                  {/* Icon */}
                  <div className="mb-3 text-muted-foreground group-hover:text-primary transition-colors">
                    {mod.icon}
                  </div>

                  {/* Label */}
                  <h3 className="font-display text-xs tracking-wider text-foreground group-hover:text-primary transition-colors">
                    {mod.label}
                  </h3>
                  <p className="text-[11px] font-mono text-muted-foreground mt-1">
                    {mod.desc}
                  </p>

                  {/* Corner markers */}
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-transparent group-hover:border-primary/30 transition-colors" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-transparent group-hover:border-primary/30 transition-colors" />
                </motion.button>
            )}
            </div>
          </div>

          {/* Footer */}
          <footer className="border-t border-border/30 py-3 text-center">
            <span className="text-xs font-mono text-muted-foreground/50">
              SENTINEL.OS © 2026 | LAKSHMI THANUJA
            </span>
          </footer>
        </motion.div>
      }

      {/* Module panels */}
      {modules.map((mod) =>
      <ModulePanel
        key={mod.id}
        title={mod.label}
        icon={mod.icon}
        isOpen={openModule === mod.id}
        onClose={() => setOpenModule(null)}
        color={mod.color}>
        
          {moduleContent[mod.id]}
        </ModulePanel>
      )}
    </div>);

};

export default Index;