'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "Qui est EPBS Consulting ?",
    answer:
      "EPBS Consulting est un cabinet international de conseil spécialisé en Responsabilité Sociétale des Organisations (RSO), Responsabilité Sociétale des Entreprises (RSE) et critères Environnementaux, Sociaux et de Gouvernance (ESG). Depuis 2015, nous accompagnons des organisations au Maroc, en Afrique et en France dans leur transition durable, avec une approche centrée sur l'humain et l'impact territorial. Notre siège est basé à Rabat au Maroc, facilitant ainsi nos interactions avec les acteurs locaux et internationaux.",
  },
  {
    question: "Quelles sont les missions d'EPBS Consulting ?",
    answer:
      "Nous proposons un accompagnement sur-mesure pour :\n• La définition et l'implémentation de stratégies RSE et ESG ;\n• L'intégration des enjeux environnementaux et sociaux dans les processus de gouvernance ;\n• L’évaluation d’impact territorial et le renforcement des écosystèmes locaux, notamment en Afrique ;\n• L’accompagnement et la mise en conformité avec les réglementations (CSRD, CS3D, VSME, Taxonomie européenne, etc.) ;\n• Le déploiement de démarches durables au sein des chaînes de valeur en France, au Maroc et à l'échelle africaine.",
  },
  {
    question: "Pourquoi choisir EPBS Consulting pour vos projets RSE et ESG ?",
    answer:
      "Notre approche se distingue par :\n• Un accompagnement personnalisé et adapté aux spécificités de chaque territoire (Maroc, France, Afrique) ;\n• Une expertise internationale combinée à une connaissance profonde des réalités locales ;\n• Un réseau de consultants experts, mobilisés pour maximiser l'impact positif de vos initiatives.",
  },
  {
    question: "Intervenez-vous au Maroc ? En France ? En Afrique ?",
    answer:
      "Oui, nous intervenons activement :\n• Au Maroc : avec un ancrage solide à Rabat, nous développons des projets locaux en partenariat avec des institutions, entreprises et ONG ;\n• En France : nous accompagnons les entreprises dans la mise en conformité réglementaire et le développement durable ;\n• En Afrique : nos projets soutiennent le développement économique local en intégrant les principes de durabilité et de responsabilité sociétale.",
  },
  {
    question: "Où se trouvent vos bureaux et comment prendre rendez-vous ?",
    answer:
      "Notre siège est situé à Rabat, Maroc. Vous pouvez prendre rendez-vous :\n• En nous écrivant à l’adresse email suivante : contact@epbs-consulting.com ;\n• En réservant un créneau via notre lien Calendly pour un échange personnalisé : https://calendly.com/epbsconsulting-sdg-esg-csr/30min .",
  },
  {
    question: "Comment EPBS Consulting aide-t-il les entreprises françaises et marocaines à se conformer aux normes européennes ?",
    answer:
      "Nous accompagnons les entreprises dans la compréhension et l'application des réglementations européennes telles que :\n• La Directive CSRD (Corporate Sustainability Reporting Directive) ;\n• La Taxonomie européenne ;\n• Les normes ISO (26000, 14001, 45001…) ;\n• Les exigences de la Due Diligence.\nNotre expertise locale au Maroc permet également d'adapter ces normes aux réalités économiques et légales marocaines, tout en facilitant les échanges avec les partenaires européens.",
  },
  {
    question: "Quels secteurs d’activité accompagnez-vous ?",
    answer:
      "Notre expertise couvre de nombreux secteurs :\n• Au Maroc : Agro-industrie, énergies renouvelables, BTP, technologie ;\n• En France : Industrie manufacturière, services financiers, développement durable ;\n• En Afrique : Projets d’infrastructures, économie verte, développement territorial.",
  },
  {
    question: "Comment se déroule l’accompagnement EPBS ?",
    answer:
      "Notre approche se décompose en plusieurs phases :\n1. Diagnostic stratégique : analyse de l’existant et des enjeux spécifiques de chaque territoire ;\n2. Co-construction d’une stratégie sur-mesure en prenant en compte les particularités locales ;\n3. Mise en œuvre des actions prioritaires ;\n4. Suivi et reporting des performances ;\n5. Amélioration continue et adaptation aux évolutions réglementaires.",
  },
  {
    question: "Est-il possible de bénéficier d’un audit RSE avant de démarrer un projet ?",
    answer:
      "Oui, nous proposons un audit RSE complet afin d’évaluer vos pratiques actuelles, identifier les axes d’amélioration et construire une feuille de route précise. Cette démarche est particulièrement utile pour les entreprises souhaitant se développer à l’international depuis le Maroc vers l’Europe et l’Afrique.",
  },
  {
    question: "Quels sont les avantages de développer une stratégie RSE ?",
    answer:
      "Les bénéfices sont multiples :\n• Amélioration de l’image de marque et de la réputation sur les marchés marocains, français et africains ;\n• Renforcement de la résilience face aux risques économiques et environnementaux ;\n• Réduction des coûts grâce à l’optimisation des ressources ;\n• Fidélisation des parties prenantes et engagement des collaborateurs ;\n• Conformité réglementaire et anticipation des évolutions légales internationales.",
  },
  {
    question: "Comment puis-je prendre contact avec EPBS Consulting ?",
    answer:
      "Vous pouvez nous contacter via :\n• Notre formulaire de contact sur le site internet ;\n• Par téléphone (numéro à spécifier) ;\n• Par email à contact@epbs-consulting.com ;\n• En prenant rendez-vous directement dans nos bureaux à Rabat ou via Calendly : https://calendly.com/epbsconsulting-sdg-esg-csr/30min.",
  },
  {
    question: "Proposez-vous des formations RSE et ESG ?",
    answer:
      "Oui, nous organisons régulièrement des formations sur les enjeux RSE, ESG, le développement durable et les obligations réglementaires :\n• Au Maroc (Rabat) : sessions en présentiel et en ligne ;\n• En France et en Europe : interventions dans les entreprises et formations dédiées ;\n• En Afrique : programmes adaptés aux contextes locaux.",
  },
  {
    question: "Sur quelles certifications pouvez-vous accompagner les entreprises ?",
    answer:
      "EPBS Consulting s’engage dans l’excellence avec des expertises dans plusieurs certifications :\n• ISO 26000 (Responsabilité Sociétale) ;\n• ISO 14001 (Management Environnemental) ;\n• ISO 27001 (Sécurité des Données et de Sécurité Informatique) ;\n• Accréditations spécifiques pour les audits ESG ;\n• Certification sur les standards européens (CSRD, VSME…).",
  },
];
const QASection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState(5);

  const toggle = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const loadMore = () => {
    setVisibleItems(prev => Math.min(prev + 5, faqs.length));
  };

  // Fonction améliorée pour formater les réponses
  const formatAnswer = (text: string) => {
    return text.split('\n').map((paragraph, i) => {
      const trimmed = paragraph.trim();
  
      if (!trimmed) return null;
  
      // Lien Calendly ou autres URLs
      const linkRegex = /(https?:\/\/[^\s]+)/g;
      const parts = trimmed.split(linkRegex);
  
      const renderText = parts.map((part, idx) => {
        if (linkRegex.test(part)) {
          return (
            <a
              key={idx}
              href={part}
              className="text-blue-600 underline hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              {part}
            </a>
          );
        }
        return <span key={idx}>{part}</span>;
      });
  
      if (trimmed.startsWith('•')) {
        return (
          <li key={i} className="flex items-start mb-2 ml-4">
            <span className="mr-2">•</span>
            <span>{renderText}</span>
          </li>
        );
      }
  
      if (/^\d+\./.test(trimmed)) {
        return (
          <li key={i} className="flex items-start mb-2 ml-4">
            <span className="mr-2">{trimmed.match(/^\d+\./)?.[0]}</span>
            <span>{renderText}</span>
          </li>
        );
      }
  
      return <p key={i} className="mb-3 whitespace-pre-line">{renderText}</p>;
    });
  };
  

  return (
    <section className="bg-[var(--color-light)] py-20 px-6 md:px-16" id="FAQ">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl font-lato font-bold text-center text-[var(--color-primary)] mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Questions Fréquentes
        </motion.h2>

        <div className="space-y-6">
          {faqs.slice(0, visibleItems).map((item, index) => (
            <motion.div
              key={index}
              className="bg-white/80 border border-gray-200 rounded-2xl shadow-sm backdrop-blur-md p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="text-lg font-semibold text-gray-800">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 transform transition-transform ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    className="mt-4 text-gray-600 leading-relaxed"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-3">
                      {formatAnswer(item.answer)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {visibleItems < faqs.length && (
          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <button
              onClick={loadMore}
              className="flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              <ChevronDown className="w-5 h-5" />
              <span>Voir plus de questions</span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default QASection;