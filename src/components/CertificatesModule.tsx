import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { getData, defaultCertificates, type Certificate } from "@/lib/defaultData";

const CertificatesModule = () => {
  const certificates = getData<Certificate[]>("portfolio_certificates", defaultCertificates);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {certificates.map((cert, i) => (
        <motion.div
          key={cert.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="group relative border border-neon-green/20 rounded-lg p-4 bg-neon-green/5 hover:border-neon-green/40 hover:shadow-[0_0_20px_hsla(165,100%,45%,0.1)] transition-all duration-300"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded border border-neon-green/30 bg-neon-green/10">
              <Award size={20} className="text-neon-green" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-sm tracking-wider text-foreground">
                {cert.title}
              </h3>
              <p className="text-xs text-muted-foreground font-mono mt-1">
                {cert.organization}
              </p>
              <p className="text-xs text-neon-green/60 font-mono mt-1">
                {cert.date}
              </p>
            </div>
          </div>
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-neon-green/30" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-neon-green/30" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-neon-green/30" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-neon-green/30" />
        </motion.div>
      ))}
    </div>
  );
};

export default CertificatesModule;
