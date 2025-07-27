'use client';

import { motion } from 'framer-motion';
import { Send, Phone, MapPin, Linkedin, X, Instagram, Facebook } from 'lucide-react';
import { useState } from 'react';
import { SiTiktok } from 'react-icons/si';
import Link from 'next/link';

export default function NextGenFooter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <footer className="bg-[var(--color-primary)] text-white border-t border-white/10">
      {/* Version Mobile - Accordéon */}
      <div className="lg:hidden">
        <div className="container mx-auto px-4 py-12">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="grid grid-cols-2 gap-8"
          >
            {/* Colonne 1 */}
            <div className="col-span-2">
              <h3 className="font-mont text-xl font-bold mb-6 flex items-center">
                <span className="w-3 h-3 bg-[var(--color-accent)] rounded-full mr-3"></span>
                EPBS 2025
              </h3>
              <p className="text-white/80 font-lato text-sm mb-6">
                Réinventer la performance durable
              </p>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/epbs-consulting/posts/?feedView=all" className="hover:text-[var(--color-accent)] transition-colors p-2 bg-white/10 rounded-full">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://x.com/epbsconsulting?t=91iEDxWVOdDhLj8LK0rIbA&s=09" className="hover:text-[var(--color-accent)] transition-colors p-2 bg-white/10 rounded-full">
                  <X className="w-4 h-4" />
                </a>
                <a href="https://www.instagram.com/epbsconsulting?igsh=MXF6M3luYzBqanlibA==" className="hover:text-[var(--color-accent)] transition-colors p-2 bg-white/10 rounded-full">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://www.facebook.com/share/19a6ynoddQ/" className="hover:text-[var(--color-accent)] transition-colors p-2 bg-white/10 rounded-full">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://www.tiktok.com/@epbsconsulting?_t=ZM-8wISrQE2R8B&_r=1" className="hover:text-[var(--color-accent)] transition-colors p-2 bg-white/10 rounded-full">
                  <SiTiktok className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Accordéon Mobile */}
            <DetailsAccordion title="Ressources">
              <ul className="space-y-3 font-lato text-sm">
                <li><a href="/formations" className="hover:text-[var(--color-accent)] transition-colors flex items-center py-2"><span className="w-1 h-1 bg-white rounded-full mr-2"></span>Formations</a></li>
                <li><a href="/blogs" className="hover:text-[var(--color-accent)] transition-colors flex items-center py-2"><span className="w-1 h-1 bg-white rounded-full mr-2"></span>Nos Articles</a></li>
                <li><a href="/podcast" className="hover:text-[var(--color-accent)] transition-colors flex items-center py-2"><span className="w-1 h-1 bg-white rounded-full mr-2"></span>Nous écouter</a></li>
                <li><a href="/contact" className="hover:text-[var(--color-accent)] transition-colors flex items-center py-2"><span className="w-1 h-1 bg-white rounded-full mr-2"></span>Nous écrire</a></li>
              </ul>
            </DetailsAccordion>

            <DetailsAccordion title="Entreprise">
              <ul className="space-y-3 font-lato text-sm">
                <li><a href="/about" className="hover:text-[var(--color-accent)] transition-colors flex items-center py-2"><span className="w-1 h-1 bg-white rounded-full mr-2"></span>À propos</a></li>
                <li><a href="/about#expertises-details" className="hover:text-[var(--color-accent)] transition-colors flex items-center py-2"><span className="w-1 h-1 bg-white rounded-full mr-2"></span>Nos Expertises</a></li>
                <li><a href="/about#FAQ" className="hover:text-[var(--color-accent)] transition-colors flex items-center py-2"><span className="w-1 h-1 bg-white rounded-full mr-2"></span>FAQ</a></li>
                <li><a href="/podcast" className="hover:text-[var(--color-accent)] transition-colors flex items-center py-2"><span className="w-1 h-1 bg-white rounded-full mr-2"></span>Podcast</a></li>
              </ul>
            </DetailsAccordion>

            {/* Newsletter Mobile */}
            <div className="col-span-2 mt-6">
              <h4 className="font-mont text-sm font-bold mb-4 uppercase tracking-wider flex items-center">
                <Send className="w-4 h-4 mr-2" />
                Restez connecté
              </h4>
              <form onSubmit={handleSubmit} className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email professionnel" 
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 focus:border-[var(--color-accent)] focus:outline-none placeholder-white/50 text-sm"
                  required
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-2 bg-[var(--color-accent)] text-[var(--color-dark)] p-2 rounded-md"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              {isSubscribed && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[var(--color-accent)] text-xs mt-2"
                >
                  Merci pour votre inscription !
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Version Desktop */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-4 gap-12">
            {/* Colonne principale */}
            <div className="col-span-1">
              <h3 className="font-mont text-2xl font-bold mb-6">EPBS</h3>
              <p className="text-white/80 font-lato mb-8 max-w-md">
                Expert en transformation durable depuis 2012. Nous combinons expertise stratégique et innovation pour créer un impact mesurable.
              </p>
              
              
            </div>

            {/* Colonnes liens */}
            <div className="col-span-1 mb-8">
              <h4 className="font-mont text-lg font-bold mb-6 uppercase tracking-wider">Expertises</h4>
              <ul className="space-y-4 font-lato">
                <li><a href="/about#expertises-details" className="hover:text-[var(--color-accent)] transition-colors flex items-center group"><span className="w-2 h-2 bg-[var(--color-accent)] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>Stratégie RSE</a></li>
                <li><a href="/about#finance-verte" className="hover:text-[var(--color-accent)] transition-colors flex items-center group"><span className="w-2 h-2 bg-[var(--color-accent)] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>Finance durable</a></li>
                <li><a href="/about#economie-circulaire" className="hover:text-[var(--color-accent)] transition-colors flex items-center group"><span className="w-2 h-2 bg-[var(--color-accent)] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>Économie circulaire</a></li>
                <li><a href="/about#transformation" className="hover:text-[var(--color-accent)] transition-colors flex items-center group"><span className="w-2 h-2 bg-[var(--color-accent)] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Transformation</a></li>
              </ul>
            </div>
            <div className="col-span-1 mb-8">
              <h4 className="font-mont text-lg font-bold mb-6 uppercase tracking-wider">Ressources</h4>
              <ul className="space-y-4 font-lato">
                <li><a href="/blogs" className="hover:text-[var(--color-accent)] transition-colors flex items-center group"><span className="w-2 h-2 bg-[var(--color-accent)] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>Blog</a></li>
                <li><a href="formations" className="hover:text-[var(--color-accent)] transition-colors flex items-center group"><span className="w-2 h-2 bg-[var(--color-accent)] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>Formations</a></li>
                
                <li><a href="/about#FAQ" className="hover:text-[var(--color-accent)] transition-colors flex items-center group"><span className="w-2 h-2 bg-[var(--color-accent)] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>FAQ</a></li>
                <li><a href="/podcast" className="hover:text-[var(--color-accent)] transition-colors flex items-center group"><span className="w-2 h-2 bg-[var(--color-accent)] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>Podcast</a></li>
              </ul>
            </div>

            {/* Newsletter Desktop */}
            <div className="col-span-1">
              <h4 className="font-mont text-lg font-bold mb-6 uppercase tracking-wider">Nous écrire</h4>
              <form onSubmit={handleSubmit} className="mb-8">
                <div className="relative mb-4">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email professionnel" 
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 focus:border-[var(--color-accent)] focus:outline-none placeholder-white/50 text-sm"
                    required
                  />
                  <button 
                    type="submit"
                    className="absolute right-2 top-2 bg-[var(--color-accent)] text-[var(--color-dark)] p-1 rounded-md"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                {isSubscribed && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[var(--color-accent)] text-xs"
                  >
                    Merci pour votre inscription !
                  </motion.p>
                )}
              </form>

              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/epbs-consulting/posts/?feedView=all" className="hover:text-[var(--color-accent)] transition-colors p-2 bg-white/10 rounded-full">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://x.com/epbsconsulting?t=91iEDxWVOdDhLj8LK0rIbA&s=09" className="hover:text-[var(--color-accent)] transition-colors p-2 bg-white/10 rounded-full">
                  <X className="w-4 h-4" />
                </a>
                <a href="https://www.instagram.com/epbsconsulting?igsh=MXF6M3luYzBqanlibA==" className="hover:text-[var(--color-accent)] transition-colors p-2 bg-white/10 rounded-full">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://www.facebook.com/share/19a6ynoddQ/" className="hover:text-[var(--color-accent)] transition-colors p-2 bg-white/10 rounded-full">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://www.tiktok.com/@epbsconsulting?_t=ZM-8wISrQE2R8B&_r=1" className="hover:text-[var(--color-accent)] transition-colors p-2 bg-white/10 rounded-full">
                  <SiTiktok className="w-4 h-4" />
                </a>
              </div>
              
            </div>
            
          </div>
          <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start flex-1">
              <MapPin className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-[var(--color-accent)]" />
              <div>
                <h4 className="font-mont font-bold mb-1">Nos bureaux</h4>
                <p className="font-lato text-sm text-white/80">15 avenue Al Abtal-Agdal, 10090 Rabat. Maroc</p>
              </div>
            </div>
            

            <div className="flex items-start flex-1 gap-3">
  <Phone className="w-5 h-5 mt-1 text-[var(--color-accent)] flex-shrink-0" />
  <div>
    <h4 className="font-mont font-bold mb-1">Contactez-nous</h4>
    <div className="flex items-center gap-2">
      <a
        href="tel:+330645918192"
        className="font-lato text-sm hover:text-[var(--color-accent)] transition-colors"
      >
        FR +33 6 45 91 81 92
      </a>
      <span className="text-gray-400">|</span>
      <a
        href="tel:+212667185185"
        className="font-lato text-sm hover:text-[var(--color-accent)] transition-colors"
      >
        MA +212 6 67 18 51 85
      </a>
    </div>
  </div>
</div>

          </div>
        </motion.div>
          

          {/* Bas de footer */}

<div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
  <p className="text-white/60 text-sm font-lato mb-4 md:mb-0">
    © {new Date().getFullYear()} EPBS Consulting. Tous droits réservés.
  </p>
  <div className="flex space-x-6">
    <Link href="/confidentalite" className="text-white/60 hover:text-white text-sm font-lato transition-colors">Confidentialité</Link>
    <Link href="/cookies" className="text-white/60 hover:text-white text-sm font-lato transition-colors">Cookies</Link>
    <Link href="/conditions" className="text-white/60 hover:text-white text-sm font-lato transition-colors">Conditions</Link>
  </div>
</div>

        </div>
      </div>
    </footer>
  );
}

function DetailsAccordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <details className="group" open={isOpen}>
      <summary 
        className="list-none font-mont font-bold text-sm flex justify-between items-center cursor-pointer pb-2 border-b border-white/10"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        {title}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="inline-block transition-transform"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
          </svg>
        </motion.span>
      </summary>
      <div className="mt-3">
        {children}
      </div>
    </details>
  );
}