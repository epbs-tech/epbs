'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Calendar, Headphones, Plus,  } from 'lucide-react';
import Image from 'next/image';
import AudioPlayer from '@/components/podcast/audio-player';
import { podcastData } from "@/data/podcast-data";
import CTASection from "@/sections/CTA";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Loading from "@/app/(routes)/podcasts/loading";

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
  imageUrl: string | null;
  author: string | null;
  language: string;
  totalEpisodes: number;
  episodes: Episode[];
}

export default function PodcastsPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [currentEpisode, setCurrentEpisode] = useState<{
    audioUrl: string;
    title: string;
    podcast: Podcast | null;
    imageUrl?: string | null; // Ajout de l'image pour le lecteur
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleEpisodesCount, setVisibleEpisodesCount] = useState<Record<string, number>>({});
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  // Handle responsive display based on screen size
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      // Update the number of visible episodes for each podcast based on screen size
      const newVisibleCount: Record<string, number> = {};
      podcasts.forEach(podcast => {
        if (screenWidth >= 1280) { // xl
          newVisibleCount[podcast.id] = 3;
        } else if (screenWidth >= 768) { // md
          newVisibleCount[podcast.id] = 2;
        } else {
          newVisibleCount[podcast.id] = 1;
        }
      });

      setVisibleEpisodesCount(newVisibleCount);
    };

    // Initial setup
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [podcasts]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch('/api/podcasts');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        setPodcasts(data);

        // Initialize visible episodes count
        const initialVisibleCount: Record<string, number> = {};
        data.forEach((podcast: Podcast) => {
          const screenWidth = window.innerWidth;
          if (screenWidth >= 1280) {
            initialVisibleCount[podcast.id] = 3;
          } else if (screenWidth >= 768) {
            initialVisibleCount[podcast.id] = 2;
          } else {
            initialVisibleCount[podcast.id] = 1;
          }
        });
        setVisibleEpisodesCount(initialVisibleCount);
      } catch (error) {
        console.error('Erreur:', error);
        setError('Impossible de charger les podcasts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Function to increment plays count
  const incrementPlays = async (id: string, episodeId: string) => {
    try {
      const response = await fetch(`/api/podcasts/${id}/episodes/${episodeId}/plays`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'incrémentation des plays');
      }

      const result = await response.json();

      // Update local state to reflect the new plays count
      setPodcasts(prevPodcasts =>
        prevPodcasts.map(podcast => ({
          ...podcast,
          episodes: podcast.episodes.map(episode =>
            episode.id === episodeId
              ? { ...episode, plays: result.data.episode.plays }
              : episode
          )
        }))
      );

      return result;
    } catch (error) {
      console.error('Erreur lors de l\'incrémentation des plays:', error);
      // Don't throw error to prevent disrupting the audio playback
    }
  };

  const playEpisode = async (episode: Episode, podcast: Podcast) => {
    // Set the current episode to start playing
    setCurrentEpisode({
      audioUrl: episode.audioUrl,
      title: episode.title,
      podcast: podcast,
      imageUrl: episode.imageUrl // Utiliser l'image de l'épisode si disponible
    });

    // Increment plays count in the background
    await incrementPlays(podcast.id,episode.id);
  };

  if (isLoading) {
    return (
      <Loading/>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-red-500 mb-4">{error}</p>
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

  if (podcasts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Aucun podcast disponible
          </h2>
          <p className="text-gray-600">
            Revenez plus tard pour découvrir nos nouveaux podcasts.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Audio Player */}
      {currentEpisode && (
        <AudioPlayer
          src={new URL(currentEpisode.audioUrl, baseUrl).toString()}
          title={currentEpisode.title}
          image={
            currentEpisode.imageUrl ||
            currentEpisode.podcast?.imageUrl ||
            "/images/default-podcast.png"
          }
        />
      )}

      {/* Hero Section */}
      <section className="bg-[var(--color-primary)] py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
              Nos Podcasts
            </h1>
            <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto">
              Découvrez notre collection de podcasts
            </p>
          </div>
        </div>
      </section>

      {/* Podcasts List */}
      {podcasts.map((podcast) => (
        <section key={podcast.id} className="py-10 md:py-14 lg:py-16 border-b border-gray-200 last:border-0">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mb-8 md:mb-12">
              {podcast.imageUrl && (
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 relative flex-shrink-0 mx-auto sm:mx-0">
                  <Image
                    src={new URL(podcast.imageUrl, baseUrl).toString()}
                    alt={podcast.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="text-center sm:text-left mt-4 sm:mt-0">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">{podcast.title}</h2>
                <p className="text-gray-600 mb-2 text-sm sm:text-base">{podcast.description}</p>
                {podcast.author && (
                  <p className="text-xs sm:text-sm text-gray-500">Par {podcast.author}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {podcast.episodes.slice(0, visibleEpisodesCount[podcast.id] || 1).map((episode, index) => (
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
                          onClick={() => playEpisode(episode, podcast)}
                          className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                        >
                          <Play size={20} className="text-[var(--color-primary)] ml-1" />
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-center mb-3 text-xs sm:text-sm">
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
                      <div className="text-xs sm:text-sm text-gray-500 mb-2">
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
                        onClick={() => playEpisode(episode, podcast)}
                        className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors text-sm sm:text-base"
                      >
                        <Play size={16}  />
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

            {podcast.episodes.length > (visibleEpisodesCount[podcast.id] || 1) && (
              <div className="mt-6 sm:mt-8 text-center">
                <Button variant="outline" asChild className="text-sm sm:text-base">
                  <Link href={`/podcasts/${podcast.id}`} className="flex items-center">
                    Voir tous les épisodes
                    <Plus className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                </Button>
              </div>
            )}

            {podcast.episodes.length === 0 && (
              <div className="text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">
                Aucun épisode disponible pour ce podcast
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Testimonials */}
      <section className="py-12 md:py-16 lg:py-20 bg-[var(--color-primary-light)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 md:mb-16">
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
      <section className="py-12 md:py-16 lg:py-20 bg-[var(--color-primary)] text-white">
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
                  <Headphones className="mr-1 sm:mr-2" size={14} />
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