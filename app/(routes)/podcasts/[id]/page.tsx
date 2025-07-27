'use client';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {Play, Share2, Clock, Calendar, Mic, Headphones, ChevronDown} from 'lucide-react';
import Image from 'next/image';
import AudioPlayer from '@/components/podcast/audio-player';
import {podcastData} from "@/data/podcast-data";
import CTASection from "@/sections/CTA";
import {use} from "react"
import Loading from "@/app/(routes)/podcasts/[id]/loading";

interface Episode {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  duration: number;
  publishedAt: Date;
  episodeNumber: number | null;
  seasonNumber: number | null;
  plays: number;
  podcastId: string;
  imageUrl?: string | null; // Ajout de l'image d'épisode
}

interface Podcast {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: string | null;
  language: string;
  totalEpisodes: number;
  plays: number;
  episodes: Episode[];
}

export default function PodcastPage({params}: {params: Promise<{ id: string }>}) {
  const { id } = use(params);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState<{
    audioUrl: string;
    title: string;
    imageUrl?: string;
  } | null>(null);
  const [visibleEpisodes, setVisibleEpisodes] = useState(3);

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const response = await fetch(`/api/podcasts/${id}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du podcast');
        }
        const data = await response.json();
        setPodcast(data);
      } catch (error) {
        console.error('Erreur:', error);
        setError('Impossible de charger le podcast');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPodcast();
  }, [id]);

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const playEpisode = async (id: string, episode: Episode) => {
    // Incrémenter les plays avant de lancer la lecture
    try {
      const response = await fetch(`/api/podcasts/${id}/episodes/${episode.id}/plays`, {
        method: 'POST',
      });

      if (response.ok) {
        // Mettre à jour les plays localement pour l'affichage immédiat
        setPodcast(prevPodcast => {
          if (!prevPodcast) return null;

          return {
            ...prevPodcast,
            plays: prevPodcast.plays + 1,
            episodes: prevPodcast.episodes.map(ep =>
              ep.id === episode.id
                ? { ...ep, plays: ep.plays + 1 }
                : ep
            )
          };
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'incrémentation des plays:', error);
      // Continuer avec la lecture même si l'incrémentation échoue
    }

    setCurrentEpisode({
      audioUrl: episode.audioUrl,
      title: episode.title,
      imageUrl: episode.imageUrl || podcast?.imageUrl || '/images/default-podcast.png'
    });
  };

  const loadMoreEpisodes = () => {
    setVisibleEpisodes(prevValue => {
      // Calculate how many more episodes to load (either 3 more or all remaining)
      if (!podcast) return prevValue;

      const newValue = prevValue + 3;
      // Don't exceed total episodes count
      return Math.min(newValue, podcast.episodes.length);
    });
  };

  if (isLoading) {
    return (
      <Loading/>
    );
  }

  if (error || !podcast) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-red-500 mb-4">{error || 'Podcast non trouvé'}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  const hasMoreEpisodes = podcast.episodes.length > visibleEpisodes;

  return (
    <div className="bg-white">
      {/* Audio Player */}
      {currentEpisode && (
        <AudioPlayer
          src={new URL(currentEpisode.audioUrl, baseUrl).toString()}
          title={currentEpisode.title}
          image={currentEpisode.imageUrl || ""}
        />
      )}

      {/* Hero Section */}
      <section className="relative h-screen min-h-[500px] max-h-[800px] overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)]"
          style={{ opacity, scale }}
        >
            {podcast.imageUrl && (
                <Image
                    src={new URL(podcast.imageUrl, baseUrl).toString()}
                    alt={podcast.title}
                    fill
                    className="object-cover opacity-20"
                    priority
                />
            )}
        </motion.div>

        <div className="container h-full mx-auto px-4 sm:px-6 flex flex-col justify-center relative z-10">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="h-px w-8 sm:w-12 bg-[var(--color-accent)] mr-3 sm:mr-4"></div>
              <span className="text-xs sm:text-sm font-medium uppercase tracking-widest text-white/80">
                Nouvel épisode disponible
              </span>
            </div>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {podcast.title}
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-lg line-clamp-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {podcast.description}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 sm:gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <button
                onClick={() => podcast.episodes.length > 0 && playEpisode(podcast.id,podcast.episodes[0])}
                className="flex items-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white rounded-lg transition-all group text-sm sm:text-base"
              >
                <div className="mr-2 sm:mr-3 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                  <Play size={14}  fill="currentColor" />
                </div>
                Écouter maintenant
              </button>

              <button className="flex items-center px-4 sm:px-6 py-3 sm:py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all backdrop-blur-sm text-sm sm:text-base">
                <Share2 size={16} className="mr-2 sm:mr-3" />
                Partager
              </button>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 flex justify-center">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <polyline points="7 13 12 18 17 13"></polyline>
              <polyline points="7 6 12 11 17 6"></polyline>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Podcast Host Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative aspect-[4/5] w-full max-w-sm sm:max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={new URL(podcast.imageUrl, baseUrl).toString()|| ""}
                  alt={podcast.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8">
                  <div className="bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm">
                    <div className="flex items-center">
                      <Mic className="text-[var(--color-accent)] mr-1.5 sm:mr-2" size={16} />
                      <span className="font-medium text-xs sm:text-sm">Équipe EPBS</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 mt-8 lg:mt-0"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center lg:text-left">
                <span className="text-[var(--color-primary)]">Bienvenue sur {podcast.title.split(' ')[0]}</span> {podcast.title.split(' ').slice(1).join(' ')}
              </h2>

              <div className="space-y-4 sm:space-y-6 text-gray-700 text-sm sm:text-base">
                {podcastData.about.content.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                  <div className="text-[var(--color-primary)] font-bold text-xl sm:text-2xl mb-0.5 sm:mb-1">{podcast.totalEpisodes}+</div>
                  <div className="text-gray-600 text-xs sm:text-sm">Épisodes</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                  <div className="text-[var(--color-primary)] font-bold text-xl sm:text-2xl mb-0.5 sm:mb-1">{podcast.plays.toLocaleString()}+</div>
                  <div className="text-gray-600 text-xs sm:text-sm">Écoutes</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                  <div className="text-[var(--color-primary)] font-bold text-xl sm:text-2xl mb-0.5 sm:mb-1">4.9</div>
                  <div className="text-gray-600 text-xs sm:text-sm">Note moyenne</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Episodes List */}
      <section className="py-10 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Les <span className="text-[var(--color-primary)]">épisodes</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Parcourez notre bibliothèque de conversations enrichissantes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 item-center">
              {podcast.episodes.slice(0, visibleEpisodes).map((episode, index) => (
                <motion.div
                  key={episode.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: index * 0.1
                    }
                  }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  {/* Image de l'épisode */}
                  {episode.imageUrl && (
                    <div className="relative w-full h-48 sm:h-52 md:h-48">
                      <Image
                        src={new URL(episode.imageUrl, baseUrl).toString()}
                        alt={episode.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Overlay avec bouton play */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button
                          onClick={() => playEpisode(podcast?.id, episode)}
                          className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                        >
                          <Play size={20} className="text-[var(--color-primary)] ml-1" />
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-center mb-2 sm:mb-3 text-xs sm:text-sm">
                      <div className="text-gray-500">
                        <Calendar size={14} className="inline mr-1" />
                        {new Date(episode.publishedAt).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="text-gray-500">
                        <Clock size={14} className="inline mr-1" />
                        {formatDuration(episode.duration)}
                      </div>
                    </div>

                    {(episode.seasonNumber || episode.episodeNumber) && (
                      <div className="text-xs sm:text-sm text-gray-500 mb-1.5 sm:mb-2">
                        {episode.seasonNumber && `Saison ${episode.seasonNumber}`}
                        {episode.seasonNumber && episode.episodeNumber && ' - '}
                        {episode.episodeNumber && `Épisode ${episode.episodeNumber}`}
                      </div>
                    )}

                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                      {episode.title}
                    </h3>

                    <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2">
                      {episode.description}
                    </p>

                    <div className="flex items-center justify-between mt-4">
                      <button
                        onClick={() => playEpisode(podcast?.id,episode)}
                        className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors text-xs sm:text-sm"
                      >
                        <Play size={14} />
                        Écouter
                      </button>
                      <span className="text-xs sm:text-sm text-gray-500">
                        {episode.plays} écoutes
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {hasMoreEpisodes && (
            <div className="mt-10 sm:mt-16 text-center">
              <button
                onClick={loadMoreEpisodes}
                className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 hover:border-gray-400 rounded-lg text-gray-700 hover:text-gray-900 transition-all text-sm sm:text-base"
              >
                Charger plus d'épisodes
                <ChevronDown size={16} className="ml-2" />
              </button>
            </div>
          )}

          {podcast.episodes.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <p className="text-gray-500 text-sm sm:text-base">Aucun épisode disponible pour ce podcast</p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 md:py-20 bg-[var(--color-primary-light)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-3 sm:mb-4">
              Témoignages
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Ce que nos auditeurs pensent du podcast
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {podcastData.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4 sm:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="14" height="14" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-700 italic mb-4 sm:mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 mr-3 sm:mr-4 overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">{testimonial.author}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-[var(--color-primary)] text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Ne manquez aucun épisode
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Abonnez-vous pour recevoir les nouveaux épisodes directement dans votre boîte mail
            </p>

            <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-grow px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] placeholder-white/60 text-sm sm:text-base"
              />
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white rounded-lg transition-all font-medium text-sm sm:text-base whitespace-nowrap">
                S'abonner
              </button>
            </form>

            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-4 sm:gap-6">
              {podcastData.hero.platforms.map((platform, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center text-white/80 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  <Headphones className="mr-1.5 sm:mr-2" size={14}  />
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}