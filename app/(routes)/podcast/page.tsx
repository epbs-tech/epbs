'use client';
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, ExternalLink, Mic, Headphones, Share2, Clock, Calendar } from 'lucide-react';
import Image from 'next/image';
import { podcastData } from '@/data/podcast-data';
import CTASection from '@/sections/CTA';
import AudioPlayer from '@/components/podcast/audio-player';

export default function PodcastPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  const [currentEpisode, setCurrentEpisode] = useState<{
    audioSrc: string;
    title: string;
    image: string;
  } | null>(null);

  const playEpisode = (episode: typeof podcastData.episodes[0]) => {
    setCurrentEpisode({
      audioSrc: episode.audioFile,
      title: episode.title,
      image: episode.image
    });
  };

  return (
    <div className="bg-white">
      {/* Audio Player */}
      {currentEpisode && (
        <AudioPlayer 
          src={currentEpisode.audioSrc} 
          title={currentEpisode.title} 
          image={currentEpisode.image} 
        />
      )}

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] max-h-[800px] overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)]"
          style={{ opacity, scale }}
        >
          <Image
            src="/images/podcast/hero-bg.png"
            alt="Podcast studio"
            fill
            className="object-cover opacity-25"
            priority
          />
        </motion.div>
        
        <div className="container h-full mx-auto px-6 flex flex-col justify-center relative z-10">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <div className="h-px w-12 bg-[var(--color-accent)] mr-4"></div>
              <span className="text-sm font-medium uppercase tracking-widest text-white/80">
                Nouvel épisode disponible
              </span>
            </div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {podcastData.hero.title}
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/90 mb-8 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {podcastData.hero.subtitle}
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <button 
                onClick={() => playEpisode(podcastData.episodes[0])}
                className="flex items-center px-8 py-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white rounded-lg transition-all group"
              >
                <div className="mr-3 flex items-center justify-center w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                  <Play size={16} fill="currentColor" />
                </div>
                Écouter maintenant
              </button>
              
              <button className="flex items-center px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all backdrop-blur-sm">
                <Share2 size={18} className="mr-3" />
                Partager
              </button>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative aspect-[4/5] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/podcast/hero-bg.png"
                  alt="Animateur du podcast"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                    <div className="flex items-center">
                      <Mic className="text-[var(--color-accent)] mr-2" size={18} />
                      <span className="font-medium text-sm">Équipe EPBS</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                <span className="text-[var(--color-primary)]">{podcastData.about.title.split(' ')[0]}</span> {podcastData.about.title.split(' ').slice(1).join(' ')}
              </h2>
              
              <div className="space-y-6 text-gray-700">
                {podcastData.about.content.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-[var(--color-primary)] font-bold text-2xl mb-1">10+</div>
                  <div className="text-gray-600 text-sm">Épisodes</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-[var(--color-primary)] font-bold text-2xl mb-1">10K+</div>
                  <div className="text-gray-600 text-sm">Écoutes</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-[var(--color-primary)] font-bold text-2xl mb-1">4.0</div>
                  <div className="text-gray-600 text-sm">Note moyenne</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Episode */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Épisode <span className="text-[var(--color-primary)]">vedette</span>
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Notre sélection du moment pour vous inspirer
            </motion.p>
          </div>

          {podcastData.episodes.filter(ep => ep.featured).map((episode) => (
            <motion.div 
              key={episode.id}
              className="bg-white rounded-2xl overflow-hidden shadow-xl max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-2/5 relative h-64 lg:h-auto">
                  <Image
                    src={episode.image}
                    alt={episode.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  <button 
                    onClick={() => playEpisode(episode)}
                    className="absolute bottom-6 left-6 w-14 h-14 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white rounded-full flex items-center justify-center shadow-lg transition-all"
                  >
                    <Play size={20} fill="currentColor" />
                  </button>
                </div>
                
                <div className="lg:w-3/5 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={16} className="mr-1" />
                      {episode.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={16} className="mr-1" />
                      {episode.duration}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{episode.title}</h3>
                  
                  <p className="text-gray-700 mb-6">{episode.description}</p>
                  
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-3">Dans cet épisode :</h4>
                    <ul className="space-y-3">
                      {episode.highlights.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] mr-3"></div>
                          </div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => playEpisode(episode)}
                      className="flex items-center px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white rounded-lg transition-all"
                    >
                      <Play className="mr-2" size={16} />
                      Écouter maintenant
                    </button>
                    <button className="flex items-center px-6 py-3 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-all">
                      <Share2 className="mr-2" size={16} />
                      Partager
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* All Episodes */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tous les <span className="text-[var(--color-primary)]">épisodes</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Parcourez notre bibliothèque de conversations enrichissantes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {podcastData.episodes.map((episode, index) => (
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
                viewport={{ once: true, margin: "-50px" }}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={episode.image}
                    alt={episode.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  <button className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-900 rounded-full p-2 shadow-sm transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="12" cy="5" r="1"></circle>
                      <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider">
                      {episode.date}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock size={12} className="mr-1" />
                      {episode.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                    {episode.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{episode.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => playEpisode(episode)}
                      className="inline-flex items-center text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium text-sm"
                    >
                      Écouter l'épisode
                      <ExternalLink size={14} className="ml-2" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="inline-flex items-center px-6 py-3 border border-gray-300 hover:border-gray-400 rounded-lg text-gray-700 hover:text-gray-900 transition-all">
              Charger plus d'épisodes
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[var(--color-primary-light)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
              Témoignages
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ce que nos auditeurs pensent du podcast
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {podcastData.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-4 overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.author}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="py-20 bg-[var(--color-primary)] text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ne manquez aucun épisode
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Abonnez-vous pour recevoir les nouveaux épisodes directement dans votre boîte mail
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="flex-grow px-6 py-4 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] placeholder-white/60"
              />
              <button className="px-8 py-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white rounded-lg transition-all font-medium">
                S'abonner
              </button>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              {podcastData.hero.platforms.map((platform, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center text-white/80 hover:text-white transition-colors"
                >
                  <Headphones className="mr-2" size={18} />
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