import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { getData, defaultAchievements, type Achievement } from "@/lib/defaultData";

const AchievementsModule = () => {
  const achievements = getData<Achievement[]>("portfolio_achievements", defaultAchievements);

  return (
    <div className="space-y-4">
      {achievements.map((ach, i) => (
        <motion.div
          key={ach.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="relative border border-neon-pink/20 rounded-lg p-4 bg-neon-pink/5 overflow-hidden"
        >
          {/* Mission badge icon */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full border border-neon-pink/30 bg-neon-pink/10">
              <Trophy size={18} className="text-neon-pink" />
            </div>
            <div>
              <div className="font-mono text-[10px] text-neon-pink/60 mb-1">
                MISSION COMPLETE
              </div>
              <h3 className="font-display text-sm tracking-wider text-foreground">
                {ach.title}
              </h3>
              <p className="text-xs text-muted-foreground font-body mt-1">
                {ach.organization}
              </p>
              <p className="text-sm text-foreground/70 font-body mt-2">
                {ach.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AchievementsModule;
