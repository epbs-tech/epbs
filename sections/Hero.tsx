'use client';

import { motion, useTransform, useScroll } from 'framer-motion';
import {Play, ChevronDown, Download, MapPin, Loader2} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {toast} from "sonner";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { scrollY } = useScroll();
// Référence pour la vidéo
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const { data: session, status } = useSession();
  const [isDownloading, setIsDownloading] = useState(false)
  const router = useRouter()
  

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleDownload = async () => {
    // Si pas connecté, rediriger vers login avec retour vers téléchargement
    if (!session) {
      router.push(`/auth/login?callbackUrl=/`)
      return
    }

    setIsDownloading(true)

    try {
      // Appel à l'API route sécurisée
      const response = await fetch('/api/download/brochure', {
        method: 'GET',
        credentials: 'include', // Important pour les cookies de session
      })

      if (!response.ok) {
        if (response.status === 401) {
          // Session expirée, rediriger vers login
          router.push('/auth/login?callbackUrl=/')
          return
        }
        throw new Error('Erreur lors du téléchargement')
      }

      // Créer le blob et télécharger
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'MAJ_PRESENTATION_OFFRE_EPBS_2025.pdf'
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      // Optionnel : notification de succès
      // console.log('Téléchargement réussi')

    } catch (error) {
      console.error('Erreur:', error)
      toast.error('Erreur lors du téléchargement. Veuillez réessayer.')
    } finally {
      setIsDownloading(false)
    }
  }
  

  // Valeurs de transformation pour l'effet parallaxe
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentY = useTransform(scrollY, [0, 500], [0, 30]);
  const markersY = useTransform(scrollY, [0, 500], [0, 75]);

  // Détection des appareils
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Villes avec noms affichés (uniquement sur desktop)
  const namedLocations = [
    { id: 1, name: 'Rabat', x: '46.60%', y: '42%', size: 'md' },
    { id: 2, name: 'Paris', x: '51%', y: '27%', size: 'lg' }
  ];

  // Marqueurs aléatoires pour desktop
  const desktopRandomMarkers = [
    { id: 3, x: '42%', y: '60%' },
    { id: 4, x: '10%', y: '38%' },
    { id: 5, x: '55%', y: '50%' },
    { id: 6, x: '5%', y: '35%' },
    { id: 7, x: '50%', y: '55%' },
    { id: 8, x: '28%', y: '5%' },
    { id: 9, x: '58%', y: '5%' },
    { id: 10, x: '60%', y: '75%' },
    { id: 11, x: '20%', y: '78%' },
    { id: 12, x: '52%', y: '65%' },
    { id: 13, x: '48%', y: '64%' }
  ];

  // Animation de pulsation
  const pulseAnimation = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 lg:pb-28 text-white px-3 sm:px-4 md:px-6 overflow-hidden min-h-screen"
    >
      {/* Fond par défaut pour mobile/tablette, carte pour desktop */}
      {!isMobile && !isTablet ? (
        <>
          {/* Carte de fond avec parallaxe (uniquement desktop) */}
          <motion.div
            className="absolute inset-0 bg-[url('/images/MapChart_Map.png')] bg-cover bg-center opacity-90"
            style={{
              backgroundSize: '180%',
              backgroundPositionY: '50%',
              pointerEvents: 'none',
              y: backgroundY
            }}
          />

          {/* Marqueurs de position avec parallaxe (uniquement desktop) */}
          <motion.div 
            className="absolute inset-0 z-0 overflow-hidden"
            style={{ y: markersY }}
          >
            {/* Villes avec noms */}
            {namedLocations.map((location) => (
              <motion.div
                key={location.id}
                className="absolute"
                style={{
                  left: location.x,
                  top: location.y,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <MapPin className={`${location.size === 'lg' ? 'w-8 h-8' : 'w-6 h-6'} text-[var(--color-accent)] drop-shadow-lg`} />
                <motion.span
                  className="absolute whitespace-nowrap text-xs font-bold mt-1 left-1/2 transform -translate-x-1/2 bg-black/70 px-2 py-1 rounded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {location.name}
                </motion.span>
              </motion.div>
            ))}

            {/* Marqueurs aléatoires */}
            {desktopRandomMarkers.map((marker) => (
              <motion.div
                key={marker.id}
                className="absolute"
                style={{
                  left: marker.x,
                  top: marker.y,
                }}
                animate={pulseAnimation}
              >
                <MapPin className="w-5 h-5 text-[var(--color-accent)] drop-shadow-lg" />
              </motion.div>
            ))}
          </motion.div>
        </>
      ) : (
        /* Fond par défaut pour mobile/tablette */
        <div className="absolute inset-0" />
      )}

      {/* Contenu principal avec effet de flottement */}
      <motion.div 
        className="container relative z-10 mx-auto max-w-7xl"
        style={{ y: contentY }}
      >
        <div className="flex flex-col items-center gap-6 sm:gap-8 lg:gap-16 lg:flex-row">
          {/* Partie texte */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4 sm:mb-6 flex justify-center lg:justify-start items-center gap-2 sm:gap-3"
            >
              <div className="h-px w-10 sm:w-16 bg-[var(--color-primary)]"></div>
              <span className="font-sans text-lg sm:text-xl md:text-2xl font-semibold uppercase tracking-wider text-[var(--color-primary)]">
                EPBS Consulting
              </span>
              <div className="h-px w-10 sm:w-0 bg-[var(--color-primary)]"></div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-mont text-3xl sm:text-4xl md:text-5xl text-[var(--color-primary)] font-bold leading-tight lg:text-[3rem] lg:leading-[1.2]"
            >
              <span className="text-[var(--color-accent)]">Architectes</span> d'une{' '}<br className="hidden sm:block" />
              compétitivité{' '}
              <span className="relative inline-block text-[var(--color-accent)]">
                durable
                <svg
                  className="absolute -bottom-1 sm:-bottom-2 left-0 h-1 sm:h-2 w-full text-[var(--color-accent)]"
                  viewBox="0 0 200 10"
                >
                  <path
                    d="M0,5 Q50,10 100,5 T200,5"
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth="2"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-lato mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-lg leading-relaxed text-gray-400 mx-auto lg:mx-0 max-w-sm sm:max-w-md md:max-w-xl"
            >
              Un partenaire engagé pour votre croissance durable EPBS Consulting accompagne les entreprises et institutions à transformer leurs défis environnementaux, sociaux et financiers en moteurs de performance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 sm:mt-8 md:mt-12 flex flex-col xs:flex-row justify-center lg:justify-start gap-3 sm:gap-4"
            >
              <button
                onClick={() => scrollToSection('book-meeting')}
                className="relative overflow-hidden rounded-sm bg-[var(--color-accent)] px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 font-alt text-sm sm:text-base md:text-lg font-semibold text-[var(--color-dark)] shadow-lg transition-all duration-300 hover:bg-[var(--color-accent-light)] hover:shadow-xl"
              >
                <span className="relative z-10">Prendre rendez-vous</span>
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-sm border-2 border-[var(--color-accent)] bg-transparent px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 font-alt text-sm sm:text-base md:text-lg font-semibold text-[var(--color-accent)] transition-all duration-300 hover:bg-[var(--color-accent)]/10 mt-2 xs:mt-0"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="whitespace-nowrap">
                  {isDownloading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Téléchargement...
                </>
              ) : (
                <>
                  Téléchargez notre plaquette
                </>
              )}
                </span>
              </button>
            </motion.div>
          </div>

          {/* Partie visuelle - Vidéo toujours visible */}
          <div className="w-full lg:w-1/2 mt-10 sm:mt-12 lg:mt-0 lg:ml-8 lg:mr-0"> {/* Ajout d'espace en haut sur mobile/tablette */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative overflow-hidden rounded-xl shadow-2xl mx-auto max-w-lg sm:max-w-xl md:max-w-2xl"
      >
        <video
          ref={videoRef}
          className="w-full aspect-video object-cover"
          poster="/images/EPBS.png"
          controls
          muted
        >
          <source src="/images/videos/hero-video.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handlePlay}
              className="flex h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-[var(--color-accent)] shadow-lg transition-all duration-300 hover:scale-110"
            >
              <Play className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-[var(--color-dark)]" />
            </button>
          </div>
        )}

        {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4 md:p-6">
          <p className="font-alt text-xs sm:text-sm md:text-base text-white">
            "La durabilité n'est pas un coût, c'est une stratégie"
          </p>
        </div> */}
      </motion.div>

      {/* Logos clients */}
      <div className="mt-6 sm:mt-8 md:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-8 opacity-90">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-6 sm:h-8 md:h-10 grayscale transition-all hover:grayscale-0">
            <div className="h-full w-12 sm:w-16 md:w-24 rounded bg-white/20"></div>
          </div>
        ))}
      </div>
    </div>
        </div>

        {/* Flèche de scroll */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 flex flex-col items-center cursor-pointer"
          onClick={() => scrollToSection('expertises')}
        >
          <p className="mb-1 sm:mb-2 font-alt text-xs sm:text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
            Découvrir nos expertises
          </p>
          <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 animate-bounce text-[var(--color-accent)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}