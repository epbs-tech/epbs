'use client';

import { motion } from 'framer-motion';
import { Globe, Network, BarChart, Target } from 'lucide-react';

export default function WhyChooseUs() {
  const advantages = [
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Expertises Sectorielles internationales",
      description: "Adaptée au contexte local, nos méthodes et outils sont basés sur les standards internationaux, mais nous les adaptons aux réalités des territoires pour garantir une mise en œuvre efficace et pertinente."
    },
    {
      icon: <BarChart className="w-5 h-5" />,
      title: "Stratégie et IMPACT ",
      description: "Nous ne livrons pas que des rapports théoriques : Nous implantons des solutions concrètes, mesurables et orientées résultats."
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "UNE VALEUR UNIQUE ",
      description: "Nous associons les stratégies RSE, la finance vert et la transformation organisationnelle pour créer une offre 360 ° , uniques pour les entreprises et les territoires."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-[#EAEEFE] to-[color:var(--color-light)]">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* En-tête avec animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center mb-8">
            <div className="h-px w-12 bg-[var(--color-accent)] mr-3"></div>
            <span className="text-base md:text-base font-medium text-[var(--color-accent)] uppercase tracking-widest">
              Valeur ajoutée
            </span>
            <div className="h-px w-12 bg-[var(--color-accent)] ml-3"></div>
          </div>
          <h2 className="font-mont text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-3">
            Pourquoi <span className="text-[var(--color-primary)]">nous choisir</span> ?
          </h2>
          <p className="text-lg text-[var(--color-dark)]/80 max-w-2xl mx-auto font-lato">
            L'excellence EPBS en 3 atouts différenciants
          </p>
        </motion.div>

        {/* Grille d'avantages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <div className="bg-white rounded-xl p-8 h-full flex flex-col border border-[var(--color-light)] shadow-sm hover:shadow-md transition-all duration-300">
                <div className={`w-12 h-12 bg-[var(--color-primary)]/10 rounded-lg flex items-center justify-center mb-6 text-[var(--color-primary)]`}>
                  {advantage.icon}
                </div>
                
                <h3 className="font-mont text-xl font-bold text-[var(--color-dark)] mb-3">
                  {advantage.title}
                </h3>
                
                <p className="text-[var(--color-dark)]/80 font-lato mt-2 flex-1">
                  {advantage.description}
                </p>
                
                <div className="mt-6">
                  <div className="w-8 h-1 bg-[var(--color-accent)]"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chiffres clés */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-20 bg-[var(--color-primary)] rounded-xl p-8 md:p-12 text-white"
        >
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6  text-center">
            <div className="p-4">
              <div className="font-mont text-2xl md:text-4xl font-bold mb-2">15+</div>
              <div className="font-lato text-sm uppercase tracking-wider">Pays couverts</div>
            </div>
            <div className="p-4">
              <div className="font-mont text-2xl md:text-4xl font-bold mb-2">98%</div>
              <div className="font-lato text-sm uppercase tracking-wider">Clients satisfaits</div>
            </div>
            
            <div className="p-4">
              <div className="font-mont text-2xl md:text-4xl font-bold mb-2">15</div>
              <div className="font-lato text-sm uppercase tracking-wider">SECTEURS D'EXPERTISES</div>
            </div>
          </div>
        </motion.div>

        {/* Témoignage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16 max-w-4xl mx-auto bg-white rounded-xl p-8 border border-[var(--color-light)] shadow-sm"
        >
          <div className="flex items-start">
            <div className="text-[var(--color-accent)] text-5xl font-serif mr-4">"</div>
            <div>
              <p className="text-lg text-[var(--color-dark)] italic mb-4">
              EPBS a su allier performance business et transition durable. Grâce à eux, nous avons mis en place un plan d’action RSE agile, adapté à notre structure tech. Leur maîtrise des enjeux numériques responsables a été un vrai plus
              </p>
              <div className="font-mont font-bold text-[var(--color-dark)]">Sofia. R</div>
              <div className="font-lato text-sm text-[var(--color-dark)]/70">Directrice</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}