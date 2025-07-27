'use client';

import PourquoiNousSection from '@/sections/PourquoiNous';
import CTASection from '@/sections/CTA';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ADNTicker from '@/sections/LogoTicker';
import OffresOrganisation from '@/sections/OffresOrganistion';
import QASection from '@/sections/QASection';

export default function About() {
  return (
    <>
      {/* Section d'introduction */}
      <section className="relative py-20 md:py-28 bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)]">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-mont text-4xl md:text-5xl font-bold text-white mb-6"
          >
            À propos d'EPBS Consulting
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xl text-white/90 max-w-3xl mx-auto font-lato"
          >
            Découvrez notre vision, notre expertise et notre engagement pour une croissance durable
          </motion.p>
        </div>
      </section>

      {/* Section "Mot du directeur" */}
      <section className="py-16 bg-gradient-to-b from-[white] to-[#EAEEFE]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/3">
              <div className="relative h-80 w-80 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image 
                  src="/images/team/eric-directeur.png"
                  alt="Eric, directeur EPBS Consulting"
                  width={320}
                  height={320}
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            <div className="w-full lg:w-2/3">
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
    className="font-mont text-3xl font-bold text-gray-900 mb-6"
  >
    <span className="text-[var(--color-accent)]">Mot du directeur</span>
  </motion.h2>

  <div className="space-y-5 text-gray-700">
    <motion.p 
      className="text-lg font-semibold italic text-[var(--color-primary)]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      viewport={{ once: true }}
    >
      "EPBS Consulting c’est un réseau d’experts métiers mis à votre disposition pour faire la différence."
    </motion.p>

    {[
      "Nous sommes les architectes d’une compétitivité durable, nous sommes ceux qui vous accompagnons et transformons vos défis environnementaux, sociaux et financiers en moteurs de croissance.",
      "Nos expertises, forgées à l’échelle internationale, trouvent sur les territoires des leviers de changements et de croissance. Nous nous positionnons comme le partenaire des entreprises et institutions de demain, pour représenter les acteurs du changement, ceux qui veulent conjuguer impact et performance.",
      "Nous allons là où les autres s’arrêtent. Notre approche va au-delà du simple accompagnement : nous coconstruisons avec nos clients des stratégies audacieuses, ancrées dans la réalité du terrain et alignées sur les référentiels de la RSE, de la finance verte et du développement durable."
    ].map((text, index) => (
      <motion.p 
        key={index} 
        className="font-lato leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + index * 0.1 }}
        viewport={{ once: true }}
      >
        {text}
      </motion.p>
    ))}
  </div>
</div>

          </div>
        </div>
      </section>
      <ADNTicker />
      
      {/* Détails des expertises */}
      <section className="py-16" id="expertises-details">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="font-mont text-3xl font-bold text-gray-900 mb-4"
            >
              Nos <span className="text-[var(--color-accent)]">expertises</span> en détail
            </motion.h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-lato">
              Découvrez comment nous transformons les défis en opportunités
            </p>
          </div>

          {/* Mobile Navigation for Expertises */}
          <div className="lg:hidden mb-8 sticky top-4 z-10">
            <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-md p-2 flex justify-center">
              <select 
                className="bg-transparent border-none text-gray-700 font-medium focus:ring-0 focus:outline-none"
                onChange={(e) => {
                  const element = document.getElementById(e.target.value);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                <option value="strategie-rse">Stratégie RSE & ESG</option>
                <option value="finance-verte">Finance verte</option>
                <option value="economie-circulaire">Économie circulaire</option>
                <option value="transformation">Transformation Organisationnelle</option>
              </select>
            </div>
          </div>

          <div className="space-y-28">
            {/* Stratégie RSE & ESG */}
            <motion.div 
              className="mb-20" 
              id="strategie-rse"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ margin: "-10% 0px -10% 0px" }}
            >
              <div className="flex flex-col lg:flex-row gap-10 items-center">
                <div className="w-full lg:w-1/2 order-1">
                  <motion.h3 
                    className="font-mont text-2xl font-bold text-[var(--color-primary)] mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    Stratégie RSE & ESG
                  </motion.h3>
                  <motion.p 
                    className="text-lg italic mb-6 text-gray-700"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    "Parce que la durabilité doit être un levier de compétitivité, pas une contrainte."
                  </motion.p>
                  <motion.ul 
                    className="space-y-4 text-gray-700"
                  >
                    {[
                      "Déploiement de stratégies RSE sur-mesure, adaptées aux ambitions business et aux attentes des parties prenantes",
                      "Intégration avancée des critères ESG dans les stratégies d'investissement, reporting et gouvernance",
                      "Accompagnement vers des labels de référence : ISO 14001, B-Corp, Labels RSE, taxonomie, bilan carbone.",
                      "Conception de tableaux de bord RSE et outils de suivi pour un pilotage agile et efficace."
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start gap-3 py-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ margin: "-10% 0px -10% 0px" }}
                        transition={{ 
                          delay: index * 0.15,
                          type: "spring",
                          stiffness: 100
                        }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ margin: "-10% 0px -10% 0px" }}
                          transition={{ 
                            delay: index * 0.15,
                            type: "spring"
                          }}
                        >
                          <svg 
                            className="flex-shrink-0 w-6 h-6 text-[var(--color-primary)]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <motion.path
                              d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                              initial={{ pathLength: 0, opacity: 0 }}
                              whileInView={{ pathLength: 1, opacity: 1 }}
                              viewport={{ margin: "-10% 0px -10% 0px" }}
                              transition={{ duration: 0.5 }}
                            />
                            <motion.path
                              d="M22 4L12 14.01l-3-3"
                              initial={{ pathLength: 0 }}
                              whileInView={{ pathLength: 1 }}
                              viewport={{ margin: "-10% 0px -10% 0px" }}
                              transition={{ 
                                delay: 0.2,
                                duration: 0.3
                              }}
                            />
                          </svg>
                        </motion.div>
                    
                        <motion.span
                          className="text-gray-700 text-lg"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ margin: "-10% 0px -10% 0px" }}
                          transition={{ delay: index * 0.15 + 0.2 }}
                        >
                          {item}
                        </motion.span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
                
                <motion.div 
                  className="w-full lg:w-1/2 order-2 rounded-xl overflow-hidden shadow-lg"
                  
                >
                  <Image
                    src="/images/expertises/RSE.jpg"
                    alt="Stratégie RSE & ESG"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Finance verte */}
            <motion.div 
              className="mb-20" 
              id="finance-verte"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ margin: "-10% 0px -10% 0px" }}
            >
              <div className="flex flex-col lg:flex-row gap-10 items-center">
                <motion.div 
                  className="w-full lg:w-1/2 order-2 lg:order-1 rounded-xl overflow-hidden shadow-lg"
                  
                >
                  <Image
                    src="/images/expertises/finance-verte.jpg"
                    alt="Finance verte"
                    width={600}
                    height={400}
                    className="w-full h-[400px] object-cover"
                  />
                </motion.div>
                
                <div className="w-full lg:w-1/2 order-1 lg:order-2">
                  <motion.h3
                    className="font-mont text-2xl font-bold text-[var(--color-secondary)] mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    Finance verte et performance économique durable 
                  </motion.h3>
                  <motion.p
                    className="text-lg italic mb-6 text-gray-700"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    "Accéder aux financements à impact et structurer des modèles résilients."
                  </motion.p>
                  <motion.ul
                    className="space-y-4 text-gray-700"
                  >
                    {[
                      "Optimisation des financements durables : Identification des subventions, crédits verts et fonds à impact.",
                      "Structuration de projets à forte valeur ajoutée environnementale : Energies renouvelables, gestion des ressources naturelles, réduction d'empreinte carbone",
                      "Alignement des stratégies financières avec la taxonomie européenne et les normes ESG internationales."
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start gap-3 py-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ margin: "-10% 0px -10% 0px" }}
                        transition={{ 
                          delay: index * 0.15,
                          type: "spring",
                          stiffness: 100
                        }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ margin: "-10% 0px -10% 0px" }}
                          transition={{ 
                            delay: index * 0.15,
                            type: "spring"
                          }}
                        >
                          <svg 
                            className="flex-shrink-0 w-6 h-6 text-[var(--color-secondary)]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <motion.path
                              d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                              initial={{ pathLength: 0, opacity: 0 }}
                              whileInView={{ pathLength: 1, opacity: 1 }}
                              viewport={{ margin: "-10% 0px -10% 0px" }}
                              transition={{ duration: 0.5 }}
                            />
                            <motion.path
                              d="M22 4L12 14.01l-3-3"
                              initial={{ pathLength: 0 }}
                              whileInView={{ pathLength: 1 }}
                              viewport={{ margin: "-10% 0px -10% 0px" }}
                              transition={{ 
                                delay: 0.2,
                                duration: 0.3
                              }}
                            />
                          </svg>
                        </motion.div>
                    
                        <motion.span
                          className="text-gray-700 text-lg"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ margin: "-10% 0px -10% 0px" }}
                          transition={{ delay: index * 0.15 + 0.2 }}
                        >
                          {item}
                        </motion.span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </div>
            </motion.div>

            {/* Économie circulaire */}
            <motion.div 
              className="mb-20" 
              id="economie-circulaire"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ margin: "-10% 0px -10% 0px" }}
            >
              <div className="flex flex-col lg:flex-row gap-10 items-center">
                <div className="w-full lg:w-1/2 order-1">
                  <motion.h3
                    className="font-mont text-2xl font-bold text-[var(--color-accent)] mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    Économie circulaire & développement territorial 
                  </motion.h3>
                  <motion.p
                    className="text-lg italic mb-6 text-gray-700"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    "Penser l'avenir avec des solutions adaptées aux territoires."
                  </motion.p>
                  <motion.ul
                    className="space-y-4 text-gray-700"
                  >
                    {[
                      "Études territoriales et sectorielles pour optimiser l'impact économique et social des projets",
                      "Développement de stratégies d'économie circulaire pour réduire les coûts et maximiser la rentabilité environnementale",
                      "Accompagnement des territoires vers des modèles de Smart Cities et territoires durables"
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start gap-3 py-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ margin: "-10% 0px -10% 0px" }}
                        transition={{ 
                          delay: index * 0.15,
                          type: "spring",
                          stiffness: 100
                        }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ margin: "-10% 0px -10% 0px" }}
                          transition={{ 
                            delay: index * 0.15,
                            type: "spring"
                          }}
                        >
                          <svg 
                            className="flex-shrink-0 w-6 h-6 text-[var(--color-accent)]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <motion.path
                              d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                              initial={{ pathLength: 0, opacity: 0 }}
                              whileInView={{ pathLength: 1, opacity: 1 }}
                              viewport={{ margin: "-10% 0px -10% 0px" }}
                              transition={{ duration: 0.5 }}
                            />
                            <motion.path
                              d="M22 4L12 14.01l-3-3"
                              initial={{ pathLength: 0 }}
                              whileInView={{ pathLength: 1 }}
                              viewport={{ margin: "-10% 0px -10% 0px" }}
                              transition={{ 
                                delay: 0.2,
                                duration: 0.3
                              }}
                            />
                          </svg>
                        </motion.div>
                    
                        <motion.span
                          className="text-gray-700 text-lg"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ margin: "-10% 0px -10% 0px" }}
                          transition={{ delay: index * 0.15 + 0.2 }}
                        >
                          {item}
                        </motion.span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
                
                <motion.div
                  className="w-full lg:w-1/2 order-2 rounded-xl overflow-hidden shadow-lg"
                >
                  <Image
                    src="/images/expertises/eco-circulaire.jpg"
                    alt="Économie circulaire"
                    width={600}
                    height={400}
                    className="w-full h-[450px] object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Transformation Organisationnelle */}
            <motion.div 
              id="transformation"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ margin: "-10% 0px -10% 0px" }}
            >
              <div className="flex flex-col lg:flex-row gap-10 items-center">
                <motion.div
                  className="w-full lg:w-1/2 order-2 lg:order-1 rounded-xl overflow-hidden shadow-lg"
                >
                  <Image
                    src="/images/expertises/trans-organ.jpg"
                    alt="Transformation organisationnelle"
                    width={600}
                    height={400}
                    className="w-full h-[400px] object-cover"
                  />
                </motion.div>
                
                <div className="w-full lg:w-1/2 order-1 lg:order-2">
                  <motion.h3
                    className="font-mont text-2xl font-bold text-[var(--color-primary-dark)] mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    Transformation Organisationnelle
                  </motion.h3>
                  <motion.p
                    className="text-lg italic mb-6 text-gray-700"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    "Un changement réussi repose sur l'engagement de tous."
                  </motion.p>
                  <motion.ul
                    className="space-y-4 text-gray-700"
                  >
                    {[
                      "Diagnostic interne pour intégrer les critères RSE et ESG dans la structure et la culture d'entreprise",
                      "Sensibilisation et formation des équipes aux enjeux du développement durable et de la finance responsable",
                      "Développement de roadmaps de transformation, avec des outils digitaux et des indicateurs de suivi avancés"
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start gap-3 py-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ margin: "-10% 0px -10% 0px" }}
                        transition={{ 
                          delay: index * 0.15,
                          type: "spring",
                          stiffness: 100
                        }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ margin: "-10% 0px -10% 0px" }}
                          transition={{ 
                            delay: index * 0.15,
                            type: "spring"
                          }}
                        >
                          <svg 
                            className="flex-shrink-0 w-6 h-6 text-[var(--color-primary-dark)]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <motion.path
                              d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                              initial={{ pathLength: 0, opacity: 0 }}
                              whileInView={{ pathLength: 1, opacity: 1 }}
                              viewport={{ margin: "-10% 0px -10% 0px" }}
                              transition={{ duration: 0.5 }}
                            />
                            <motion.path
                              d="M22 4L12 14.01l-3-3"
                              initial={{ pathLength: 0 }}
                              whileInView={{ pathLength: 1 }}
                              viewport={{ margin: "-10% 0px -10% 0px" }}
                              transition={{ 
                                delay: 0.2,
                                duration: 0.3
                              }}
                            />
                          </svg>
                        </motion.div>
                    
                        <motion.span
                          className="text-gray-700 text-lg"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ margin: "-10% 0px -10% 0px" }}
                          transition={{ delay: index * 0.15 + 0.2 }}
                        >
                          {item}
                        </motion.span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sections réutilisables */}
      <OffresOrganisation />
      <PourquoiNousSection />
      
      <CTASection />
      <QASection />
    </>
  );
}