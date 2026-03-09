import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, LogOut, Plus, Trash2, Save } from "lucide-react";
import {
  getData, setData,
  defaultSkills, defaultProjects, defaultExperience, defaultCertificates, defaultAchievements,
  type Skill, type Project, type Experience, type Certificate, type Achievement,
} from "@/lib/defaultData";

type Tab = "skills" | "projects" | "experience" | "certificates" | "achievements";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("sentinel_admin") !== "true") {
      navigate("/admin");
    }
  }, [navigate]);

  const [tab, setTab] = useState<Tab>("skills");
  const [skills, setSkills] = useState(() => getData<Skill[]>("portfolio_skills", defaultSkills));
  const [projects, setProjects] = useState(() => getData<Project[]>("portfolio_projects", defaultProjects));
  const [experience, setExperience] = useState(() => getData<Experience[]>("portfolio_experience", defaultExperience));
  const [certificates, setCertificates] = useState(() => getData<Certificate[]>("portfolio_certificates", defaultCertificates));
  const [achievements, setAchievements] = useState(() => getData<Achievement[]>("portfolio_achievements", defaultAchievements));
  const [saved, setSaved] = useState(false);

  const save = () => {
    setData("portfolio_skills", skills);
    setData("portfolio_projects", projects);
    setData("portfolio_experience", experience);
    setData("portfolio_certificates", certificates);
    setData("portfolio_achievements", achievements);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const logout = () => {
    localStorage.removeItem("sentinel_admin");
    navigate("/admin");
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "skills", label: "SKILLS" },
    { id: "projects", label: "PROJECTS" },
    { id: "experience", label: "EXPERIENCE" },
    { id: "certificates", label: "CERTS" },
    { id: "achievements", label: "ACHIEVEMENTS" },
  ];

  const inputCls = "w-full bg-muted/50 border border-border/50 rounded px-3 py-1.5 text-sm font-mono text-foreground focus:outline-none focus:border-primary/50";
  const labelCls = "font-mono text-[10px] text-muted-foreground block mb-0.5";

  return (
    <div className="min-h-screen bg-background cyber-grid-bg">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield size={18} className="text-primary" />
            <span className="font-display text-sm tracking-wider text-primary">ADMIN CONTROL</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={save} className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono rounded border border-neon-green/30 text-neon-green hover:bg-neon-green/10 transition-colors">
              <Save size={12} /> SAVE
            </button>
            <button onClick={logout} className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono rounded border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors">
              <LogOut size={12} /> LOGOUT
            </button>
          </div>
        </div>
      </header>

      {saved && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="fixed top-16 left-1/2 -translate-x-1/2 z-30 font-mono text-xs text-neon-green bg-card border border-neon-green/30 rounded px-4 py-2">
          ✓ DATA SAVED SUCCESSFULLY
        </motion.div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 text-xs font-display tracking-wider rounded transition-colors whitespace-nowrap ${
                tab === t.id
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "text-muted-foreground border border-transparent hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Skills */}
        {tab === "skills" && (
          <div className="space-y-3">
            {skills.map((s, i) => (
              <div key={i} className="flex items-center gap-2 p-3 border border-border/30 rounded bg-card/50">
                <div className="flex-1 grid grid-cols-3 gap-2">
                  <div>
                    <label className={labelCls}>NAME</label>
                    <input value={s.name} onChange={(e) => { const n = [...skills]; n[i] = { ...s, name: e.target.value }; setSkills(n); }} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>CATEGORY</label>
                    <input value={s.category} onChange={(e) => { const n = [...skills]; n[i] = { ...s, category: e.target.value }; setSkills(n); }} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>LEVEL (0-100)</label>
                    <input type="number" min={0} max={100} value={s.level} onChange={(e) => { const n = [...skills]; n[i] = { ...s, level: Number(e.target.value) }; setSkills(n); }} className={inputCls} />
                  </div>
                </div>
                <button onClick={() => setSkills(skills.filter((_, j) => j !== i))} className="text-destructive/60 hover:text-destructive"><Trash2 size={14} /></button>
              </div>
            ))}
            <button onClick={() => setSkills([...skills, { name: "", category: "", level: 50 }])} className="flex items-center gap-1 text-xs font-mono text-primary hover:text-neon-cyan"><Plus size={14} /> ADD SKILL</button>
          </div>
        )}

        {/* Projects */}
        {tab === "projects" && (
          <div className="space-y-4">
            {projects.map((p, i) => (
              <div key={p.id} className="p-4 border border-border/30 rounded bg-card/50 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div><label className={labelCls}>TITLE</label><input value={p.title} onChange={(e) => { const n = [...projects]; n[i] = { ...p, title: e.target.value }; setProjects(n); }} className={inputCls} /></div>
                  <div><label className={labelCls}>SUBTITLE</label><input value={p.subtitle} onChange={(e) => { const n = [...projects]; n[i] = { ...p, subtitle: e.target.value }; setProjects(n); }} className={inputCls} /></div>
                </div>
                <div><label className={labelCls}>DESCRIPTION</label><textarea value={p.description} onChange={(e) => { const n = [...projects]; n[i] = { ...p, description: e.target.value }; setProjects(n); }} className={inputCls + " h-16 resize-none"} /></div>
                <div><label className={labelCls}>FEATURES (comma separated)</label><input value={p.features.join(", ")} onChange={(e) => { const n = [...projects]; n[i] = { ...p, features: e.target.value.split(",").map(f => f.trim()) }; setProjects(n); }} className={inputCls} /></div>
                <div className="grid grid-cols-2 gap-2">
                  <div><label className={labelCls}>TECH STACK (comma separated)</label><input value={p.techStack.join(", ")} onChange={(e) => { const n = [...projects]; n[i] = { ...p, techStack: e.target.value.split(",").map(t => t.trim()) }; setProjects(n); }} className={inputCls} /></div>
                  <div><label className={labelCls}>GITHUB URL</label><input value={p.github || ""} onChange={(e) => { const n = [...projects]; n[i] = { ...p, github: e.target.value }; setProjects(n); }} className={inputCls} /></div>
                </div>
                <button onClick={() => setProjects(projects.filter((_, j) => j !== i))} className="text-xs font-mono text-destructive/60 hover:text-destructive flex items-center gap-1"><Trash2 size={12} /> REMOVE</button>
              </div>
            ))}
            <button onClick={() => setProjects([...projects, { id: Date.now().toString(), title: "", subtitle: "", description: "", features: [], techStack: [], github: "" }])} className="flex items-center gap-1 text-xs font-mono text-primary hover:text-neon-cyan"><Plus size={14} /> ADD PROJECT</button>
          </div>
        )}

        {/* Experience */}
        {tab === "experience" && (
          <div className="space-y-3">
            {experience.map((e, i) => (
              <div key={e.id} className="p-3 border border-border/30 rounded bg-card/50 space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <div><label className={labelCls}>YEAR</label><input value={e.year} onChange={(ev) => { const n = [...experience]; n[i] = { ...e, year: ev.target.value }; setExperience(n); }} className={inputCls} /></div>
                  <div><label className={labelCls}>TITLE</label><input value={e.title} onChange={(ev) => { const n = [...experience]; n[i] = { ...e, title: ev.target.value }; setExperience(n); }} className={inputCls} /></div>
                  <div><label className={labelCls}>ORGANIZATION</label><input value={e.organization} onChange={(ev) => { const n = [...experience]; n[i] = { ...e, organization: ev.target.value }; setExperience(n); }} className={inputCls} /></div>
                </div>
                <div><label className={labelCls}>DESCRIPTION</label><textarea value={e.description} onChange={(ev) => { const n = [...experience]; n[i] = { ...e, description: ev.target.value }; setExperience(n); }} className={inputCls + " h-16 resize-none"} /></div>
                <button onClick={() => setExperience(experience.filter((_, j) => j !== i))} className="text-xs font-mono text-destructive/60 hover:text-destructive flex items-center gap-1"><Trash2 size={12} /> REMOVE</button>
              </div>
            ))}
            <button onClick={() => setExperience([...experience, { id: Date.now().toString(), year: "", title: "", organization: "", description: "" }])} className="flex items-center gap-1 text-xs font-mono text-primary hover:text-neon-cyan"><Plus size={14} /> ADD ENTRY</button>
          </div>
        )}

        {/* Certificates */}
        {tab === "certificates" && (
          <div className="space-y-3">
            {certificates.map((c, i) => (
              <div key={c.id} className="flex items-center gap-2 p-3 border border-border/30 rounded bg-card/50">
                <div className="flex-1 grid grid-cols-3 gap-2">
                  <div><label className={labelCls}>TITLE</label><input value={c.title} onChange={(e) => { const n = [...certificates]; n[i] = { ...c, title: e.target.value }; setCertificates(n); }} className={inputCls} /></div>
                  <div><label className={labelCls}>ORGANIZATION</label><input value={c.organization} onChange={(e) => { const n = [...certificates]; n[i] = { ...c, organization: e.target.value }; setCertificates(n); }} className={inputCls} /></div>
                  <div><label className={labelCls}>DATE</label><input value={c.date} onChange={(e) => { const n = [...certificates]; n[i] = { ...c, date: e.target.value }; setCertificates(n); }} className={inputCls} /></div>
                </div>
                <button onClick={() => setCertificates(certificates.filter((_, j) => j !== i))} className="text-destructive/60 hover:text-destructive"><Trash2 size={14} /></button>
              </div>
            ))}
            <button onClick={() => setCertificates([...certificates, { id: Date.now().toString(), title: "", organization: "", date: "" }])} className="flex items-center gap-1 text-xs font-mono text-primary hover:text-neon-cyan"><Plus size={14} /> ADD CERTIFICATE</button>
          </div>
        )}

        {/* Achievements */}
        {tab === "achievements" && (
          <div className="space-y-3">
            {achievements.map((a, i) => (
              <div key={a.id} className="p-3 border border-border/30 rounded bg-card/50 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div><label className={labelCls}>TITLE</label><input value={a.title} onChange={(e) => { const n = [...achievements]; n[i] = { ...a, title: e.target.value }; setAchievements(n); }} className={inputCls} /></div>
                  <div><label className={labelCls}>ORGANIZATION</label><input value={a.organization} onChange={(e) => { const n = [...achievements]; n[i] = { ...a, organization: e.target.value }; setAchievements(n); }} className={inputCls} /></div>
                </div>
                <div><label className={labelCls}>DESCRIPTION</label><input value={a.description} onChange={(e) => { const n = [...achievements]; n[i] = { ...a, description: e.target.value }; setAchievements(n); }} className={inputCls} /></div>
                <button onClick={() => setAchievements(achievements.filter((_, j) => j !== i))} className="text-xs font-mono text-destructive/60 hover:text-destructive flex items-center gap-1"><Trash2 size={12} /> REMOVE</button>
              </div>
            ))}
            <button onClick={() => setAchievements([...achievements, { id: Date.now().toString(), title: "", organization: "", description: "" }])} className="flex items-center gap-1 text-xs font-mono text-primary hover:text-neon-cyan"><Plus size={14} /> ADD ACHIEVEMENT</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
