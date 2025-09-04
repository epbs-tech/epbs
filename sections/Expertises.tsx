'use client';

import { motion } from 'framer-motion';
import { Leaf, DollarSign, Globe, Building, Code } from 'lucide-react';

export default function ExpertisesSection() {
  const expertises = [
    {
      title: "Stratégie RSE & ESG",
      icon: <Leaf className="w-5 h-5" />,
      items: [
        "Stratégies RSE sur mesure",
        "Tableaux de bord et KPI",
        "Intégration des enjeux ESG",
        "Accompagnement labels & normes"
      ],
      color: "bg-[var(--color-primary)]"
    },
    {
      title: "Finance verte",
      icon: <DollarSign className="w-5 h-5" />,
      items: [
        "Modélisation économique durable",
        "Accès financements verts",
        "Évaluation risques/opportunités",
        "Optimisation responsable"
      ],
      color: "bg-[var(--color-secondary)]"
    },
    {
      title: "Économie circulaire",
      icon: <Globe className="w-5 h-5" />,
      items: [
        "Développement filières locales",
        "Écoconception industrielle",
        "Innovation territoriale",
        "Partenariats durables"
      ],
      color: "bg-[var(--color-accent)]"
    },
    {
      title: "Transformation",
      icon: <Building className="w-5 h-5" />,
      items: [
        "Accompagnement au changement",
        "Modèles d'affaires responsables",
        "Politiques internes durables",
        "Culture d'entreprise RSE"
      ],
      color: "bg-[var(--color-primary-dark)]"
    },
    {
      title: "Technologie",
      icon: <Code className="w-5 h-5" />,
      items: [
        "Sensibilisation & compétences durables",
        "Solutions digitales responsables & sécurisées",
        "IA, data & pilotage en temps réel",
        "Roadmaps de transformation & Green IT",
      ],
      color: "bg-[var(--color-primary-dark)]"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section className=" py-16 "
      id="expertises">

      <div className="container-fluid max-w-7xl mx-auto px-4 ">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-mont text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-3">
            <span className="text-[var(--color-accent)]">Nos expertises</span> stratégiques
          </h2>
          <p className="text-lg text-[var(--color-dark)]/80 max-w-2xl mx-auto font-lato">
            Chaque mission vise à intégrer le développement durable dans le modèle économique des organisations.
          </p>
        </motion.div>


        {/* Grille responsive */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-row gap-3 overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-5"
        >
          {expertises.map((expertise, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="min-w-[280px] md:min-w-0 h-full"
            >
              <div className="bg-white rounded-2xl shadow-md h-full flex flex-col overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className={`h-2 ${expertise.color}`} />

                <div className="p-6 flex-1 flex flex-col items-center text-center">
                  <div className={`w-14 h-14 ${expertise.color} rounded-xl flex items-center justify-center mb-5 text-white`}>
                    {expertise.icon}
                  </div>

                  <h3 className="font-mont text-xl font-semibold text-[var(--color-dark)] mb-4">
                    {expertise.title}
                  </h3>

                  <ul className="space-y-3 text-left">
                    {expertise.items.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-start"
                      >
                        <div className={`w-2 h-2 mt-2 mr-3 rounded-full ${expertise.color}`} />
                        <span className="text-[var(--color-dark)]/90 text-sm font-lato leading-relaxed">
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="px-6 pb-6 text-center">
                  <motion.a
                    href="/about#expertises-details"
                    className="text-[var(--color-primary)] text-sm font-medium hover:underline inline-flex items-center font-lato"
                    whileHover={{ x: 3 }}
                  >
                    En savoir plus
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.a>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="/contact"
            className="btn-primary inline-flex items-center px-8 py-3 font-lato font-medium rounded-md"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Parler à un expert
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}