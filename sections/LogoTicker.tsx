'use client';

import { motion } from 'framer-motion';
import { Sparkles, Award, Target } from 'lucide-react';

export default function ADNTicker() {
  const valeursADN = [
    {
      title: "INNOVATION",
      icon: <Sparkles className="w-6 h-6" />,
      description: "Nous repoussons les limites"
    },
    {
      title: "EXCELLENCE", 
      icon: <Award className="w-6 h-6" />,
      description: "Qualité inégalée"
    },
    {
      title: "IMPACT",
      icon: <Target className="w-6 h-6" />,
      description: "Résultats tangibles"
    }
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 overflow-hidden">
        {/* Titre "Notre ADN" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-mont text-4xl md:text-5xl font-bold text-[var(--color-dark)] mb-4">
            Notre <span className="text-[var(--color-accent)]">ADN</span>
          </h2>
          <p className="text-xl font-lato text-gray-600 max-w-2xl mx-auto">
            Capacite d'anticipation,&nbsp; Approche ROI-Driven,&nbsp; Réseau influent.</p>
          {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            <i>Les piliers fondamentaux qui guident chaque intervention EPBS</i>
          </p> */}
        </motion.div>

        {/* Animation infinie */}
        <div className="relative w-full bg-[var(--color-light)]">
          <div className="flex w-max animate-infinite-scroll space-x-12">
            {[...valeursADN, ...valeursADN, ...valeursADN].map((valeur, index) => (
              <motion.div
                key={`${valeur.title}-${index}`}
                className="flex-shrink-0 flex items-center gap-4 px-6 py-3"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-[var(--color-accent)]">
                  {valeur.icon}
                </div>
                <div className="text-left">
                  <h4 className="font-mont text-xl font-bold text-[var(--color-dark)]">
                    {valeur.title}
                  </h4>
                  <p className="text-sm text-[var(--color-dark)]/80 mt-1">
                    {valeur.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Style intégré pour l'animation fluide */}
        <style jsx>{`
          @keyframes infinite-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-infinite-scroll {
            animation: infinite-scroll 30s linear infinite;
          }
        `}</style>
      </div>
      <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
        ></motion.div>
    </div>
    
  );
}