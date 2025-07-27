'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';

const offresData = [
  {
    id: 1,
    title: "Grandes Entreprises & Groupes Multinationaux",
    subtitle: "",
    items: [
      "Audit 360° des pratiques ESG pour identifier les leviers stratégiques",
      "Accompagnement sur les réglementations européennes et internationales",
      "Optimisation de la stratégie d'investissement en intégrant les critères RSE",
      "Mise en conformité ISO et certifications de référence"
    ],
    bgImage: "/images/organisation/international-group.jpg"
  },
  {
    id: 2,
    title: "PME ET PMI",
    subtitle: "",
    items: [
      "Structuration de la gouvernance RSE et développement d'une feuille de route actionnable",
      "Accès aux financements verts et optimisation des coûts énergétiques et environnementaux",
      "Création d'un positionnement de marque fort autour des engagements responsables"
    ],
    bgImage: "/images/organisation/PME.jpg"
  },
  {
    id: 3,
    title: "Startups & Entrepreneurs",
    subtitle: "",
    items: [
      "Accompagnement dans la structuration d'un business model à impact",
      "Recherche de financements dédiés",
      "Mise en place d'une stratégie de différenciation par l'innovation durable"
    ],
    bgImage: "/images/organisation/startup.jpg"
  },
  {
    id: 4,
    title: "Institutions & Secteur Public",
    subtitle: "",
    items: [
      "Déploiement de stratégies de développement territorial basées sur l'économie circulaire",
      "Optimisation des politiques publiques pour répondre aux enjeux de développement durable",
      "Formation des équipes sur la gestion durable et l'innovation verte"
    ],
    bgImage: "/images/organisation/inst-publiques.jpg"
  }
];

export default function OffresOrganisation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      containerRef.current.scrollBy({ 
        left: scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <section className="relative py-20">
      <div className="container mx-auto px-4">
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
              APPROCHE SUR-MESURE
            </span>
            <div className="h-px w-12 bg-[var(--color-accent)] ml-3"></div>
          </div>
          <h2 className="font-mont text-3xl md:text-4xl font-bold mb-4">
            <span className="text-[var(--color-primary)]">Votre organisation,</span>
            <span className="text-gray-900"> Notre Expertise</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-lato">
            Services conçus pour chaque type d'organisation
          </p>
        </motion.div>

        {/* Navigation mobile */}
        <div className="lg:hidden flex justify-end mb-6">
          <div className="flex space-x-4">
            <button 
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-white shadow-md text-gray-700 hover:bg-gray-50 transition-all hover:shadow-lg"
              aria-label="Précédent"
            >
              <ChevronLeft size={24} strokeWidth={2} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-white shadow-md text-gray-700 hover:bg-gray-50 transition-all hover:shadow-lg"
              aria-label="Suivant"
            >
              <ChevronRight size={24} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Conteneur des cartes */}
        <div className="relative">
          {/* Version Desktop - Grille parfaitement alignée */}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {offresData.map((offre, index) => (
              <motion.div
                key={offre.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.5,
                    delay: index * 0.1
                  }
                }}
                viewport={{ once: true }}
                className="flex flex-col h-full group"
                onMouseEnter={() => setHoveredCard(offre.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100 overflow-hidden relative">
                  {/* Header de la carte avec effet de survol combiné */}
                  <div className="p-6 relative overflow-hidden min-h-[140px] flex items-center justify-center">
                    {/* Couleur de base qui se translate */}
                    <div 
                      className="absolute inset-0 bg-[var(--color-primary)] group-hover:translate-y-full transition-transform duration-500 z-0"
                    />
                    
                    {/* Image de fond qui apparaît */}
                    <div 
                      className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${hoveredCard === offre.id ? 'opacity-100' : 'opacity-0'}`}
                      style={{ backgroundImage: `url(${offre.bgImage})` }}
                    />
                    
                    {/* Overlay sombre pour lisibilité */}
                    <div 
                      className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${hoveredCard === offre.id ? 'opacity-100' : 'opacity-0'}`}
                    />
                    
                    <div className="relative z-10 w-full text-center">
                      <h3 className="font-mont text-lg font-bold text-white group-hover:text-white transition duration-300">
                        {offre.title}
                      </h3>
                    </div>
                  </div>

                  {/* Contenu de la carte */}
                  <div className="p-6 pt-4 flex-grow">
                    <ul className="space-y-3">
                      {offre.items.map((item, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-start"
                          whileHover={{ x: 5 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5 text-xs font-medium text-white bg-[var(--color-primary)]">
                            {idx + 1}
                          </div>
                          <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Version Mobile avec AnimatePresence */}
          <div 
            ref={containerRef}
            className="lg:hidden flex overflow-x-auto pb-8 scrollbar-hide gap-6 px-2 -mx-4"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            <AnimatePresence>
              {offresData.map((offre, index) => (
                <motion.div
                  key={offre.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { duration: 0.4 }
                  }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-[85vw] ml-4 group"
                  style={{ scrollSnapAlign: 'start' }}
                  onHoverStart={() => setHoveredCard(offre.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <div className="bg-white rounded-xl shadow-xl h-full flex flex-col border border-gray-100 overflow-hidden relative">
                    {/* Header de la carte mobile avec effet combiné */}
                    <div className="p-6 relative overflow-hidden min-h-[140px] flex items-center justify-center bg-[var(--color-accent)]">
                      {/* Couleur de base qui se translate */}
                      <div className="absolute inset-0 bg-[var(--color-primary)] group-hover:translate-y-full transition-transform duration-500 z-0" />
                      
                      {/* Image de fond qui apparaît */}
                      <div 
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${hoveredCard === offre.id ? 'opacity-100' : 'opacity-0'}`}
                        style={{ backgroundImage: `url(${offre.bgImage})` }}
                      />
                      
                      {/* Overlay sombre */}
                      <div 
                        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${hoveredCard === offre.id ? 'opacity-100' : 'opacity-0'}`}
                      />
                      
                      <div className="relative z-10 w-full text-center">
                        <h3 className="font-mont text-lg font-bold text-white group-hover:text-white transition duration-300">
                          {offre.title}
                        </h3>
                      </div>
                    </div>

                    {/* Contenu mobile */}
                    <div className="p-6 pt-4 flex-grow">
                      <ul className="space-y-3">
                        {offre.items.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mr-2 mt-0.5 text-xs font-medium text-white bg-[var(--color-accent)]">
                              {idx + 1}
                            </div>
                            <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}