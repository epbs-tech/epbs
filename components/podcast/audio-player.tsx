'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, ChevronUp, ChevronDown, Loader2 } from 'lucide-react';
import Image from "next/image";

export default function AudioPlayer({ src, title, image }: {
  src: string;
  title: string;
  image: string
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [buffered, setBuffered] = useState(0);
  const [canPlay, setCanPlay] = useState(false);
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const audioRef = useRef<HTMLAudioElement>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Optimisation du preload et configuration streaming
  const configureAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Configuration pour le streaming
    audio.preload = 'metadata'; // Charge seulement les métadonnées
    audio.crossOrigin = 'anonymous';

    // Optimisations pour le streaming
    if ('setMediaKeys' in audio) {
      // Support pour les médias protégés si nécessaire
    }
  }, []);

  // Fonction pour démarrer la lecture automatique
  const autoPlay = useCallback(async () => {
    if (hasAutoPlayed || !audioRef.current || !canPlay) return;

    try {
      setIsLoading(true);
      await audioRef.current.play();
      setIsPlaying(true);
      setHasAutoPlayed(true);
    } catch (error) {
      console.log("Autoplay bloqué par le navigateur:", error);
      // L'autoplay peut être bloqué par le navigateur, c'est normal
    } finally {
      setIsLoading(false);
    }
  }, [hasAutoPlayed, canPlay]);

  const togglePlay = async () => {
    try {
      if (!audioRef.current) return;

      setError(null);

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);

        // Timeout pour éviter les blocages
        loadingTimeoutRef.current = setTimeout(() => {
          setIsLoading(false);
          setError("Timeout de chargement - Vérifiez votre connexion");
        }, 15000);

        // Attendre que l'audio soit prêt avant de jouer
        if (!canPlay && audioRef.current.readyState < 3) {
          audioRef.current.load(); // Force le rechargement
          await new Promise((resolve, reject) => {
            const audio = audioRef.current!;
            const onCanPlay = () => {
              audio.removeEventListener('canplay', onCanPlay);
              audio.removeEventListener('error', onError);
              resolve(void 0);
            };
            const onError = () => {
              audio.removeEventListener('canplay', onCanPlay);
              audio.removeEventListener('error', onError);
              reject(new Error('Erreur de chargement audio'));
            };
            audio.addEventListener('canplay', onCanPlay);
            audio.addEventListener('error', onError);
          });
        }

        await audioRef.current.play();
        setIsPlaying(true);

        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
        }
      }
    } catch (error) {
      console.error("Error toggling play:", error);

      let errorMessage = "Impossible de lire l'audio";
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          errorMessage = "Lecture bloquée - Cliquez à nouveau pour autoriser";
        } else if (error.name === 'NotSupportedError') {
          errorMessage = "Format audio non supporté";
        } else if (error.message.includes('network')) {
          errorMessage = "Erreur réseau - Vérifiez votre connexion";
        } else {
          errorMessage = error.message;
        }
      }

      setError(errorMessage);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    }
  };

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || isNaN(audio.duration)) return;

    const currentProgress = (audio.currentTime / audio.duration) * 100;
    setProgress(isNaN(currentProgress) ? 0 : currentProgress);
    setCurrentTime(audio.currentTime);

    // Mise à jour du buffer
    if (audio.buffered.length > 0) {
      const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
      const bufferedProgress = (bufferedEnd / audio.duration) * 100;
      setBuffered(isNaN(bufferedProgress) ? 0 : bufferedProgress);
    }
  }, []);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || isNaN(audio.duration)) return;

    const seekTime = (Number(e.target.value) / 100) * audio.duration;
    if (!isNaN(seekTime)) {
      audio.currentTime = seekTime;
      setProgress(Number(e.target.value));
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Effet pour la configuration initiale
  useEffect(() => {
    configureAudio();
  }, [configureAudio]);

  // Effet pour le changement de source
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Reset des états
    setCurrentTime(0);
    setProgress(0);
    setBuffered(0);
    setError(null);
    setCanPlay(false);
    setIsPlaying(false);
    setHasAutoPlayed(false); // Reset de l'autoplay

    // Configuration de la nouvelle source
    audio.src = src;
    audio.load(); // Force le rechargement pour le streaming

  }, [src]);

  // Effet pour la lecture automatique
  useEffect(() => {
    if (canPlay && !hasAutoPlayed) {
      autoPlay();
    }
  }, [canPlay, hasAutoPlayed, autoPlay]);

  // Effet pour les event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleCanPlay = () => {
      setCanPlay(true);
      setIsLoading(false);
    };

    const handleCanPlayThrough = () => {
      setCanPlay(true);
      setIsLoading(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
      setError(null);
    };

    const handleProgress = () => {
      if (audio.buffered.length > 0) {
        const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
        const bufferedProgress = audio.duration > 0 ? (bufferedEnd / audio.duration) * 100 : 0;
        setBuffered(isNaN(bufferedProgress) ? 0 : bufferedProgress);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };

    const handleError = () => {
      console.error("Audio error:", audio.error);
      let errorMessage = "Erreur de chargement de l'audio";

      if (audio.error) {
        switch(audio.error.code) {
          case 1: errorMessage = "Lecture interrompue par l'utilisateur"; break;
          case 2: errorMessage = "Erreur réseau - Reconnexion..."; break;
          case 3: errorMessage = "Format audio non supporté"; break;
          case 4: errorMessage = "URL audio invalide"; break;
          default: errorMessage = "Erreur audio inconnue"; break;
        }
      }

      setError(errorMessage);
      setIsPlaying(false);
      setIsLoading(false);
    };

    const handleStalled = () => {
      setIsLoading(true);
    };

    const handleLoadedData = () => {
      setIsLoading(false);
    };

    // Ajout des event listeners
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('progress', handleProgress);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('stalled', handleStalled);
    audio.addEventListener('loadeddata', handleLoadedData);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('progress', handleProgress);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('stalled', handleStalled);
      audio.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [handleTimeUpdate]);

  // Nettoyage des timeouts
  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-100 z-50">
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3 relative">
        {/* Toggle expand button for mobile */}
        <button
          onClick={toggleExpand}
          className="absolute -top-6 right-4 bg-white rounded-t-lg px-3 py-1 shadow-md border border-gray-100 border-b-0 md:hidden"
          aria-label={isExpanded ? "Réduire le lecteur" : "Agrandir le lecteur"}
        >
          {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>

        <audio
          ref={audioRef}
          preload="metadata"
          crossOrigin="anonymous"
        >
          <source src={src} type="audio/mpeg" />
          <source src={src} type="audio/ogg" />
          <source src={src} type="audio/mp3" />
          <source src={src} type="audio/mp4" />
          <source src={src} type="audio/wav" />
          Votre navigateur ne supporte pas l'élément audio.
        </audio>

        <div className={`flex flex-col ${isExpanded ? 'h-auto' : 'h-14 sm:h-auto'} overflow-hidden`}>
          {/* Main player section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={new URL(image, baseUrl).toString()}
                  alt="Now playing"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-xs sm:text-sm truncate">{title}</h4>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-500 truncate hidden xs:block">EPBS Consulting</p>
                  {isLoading && (
                    <div className="flex items-center gap-1">
                      <Loader2 size={12} className="animate-spin text-gray-400" />
                      <span className="text-xs text-gray-400">Chargement...</span>
                    </div>
                  )}
                </div>
                {error && (
                  <p className="text-xs text-red-500 truncate">{error}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              <button
                onClick={toggleMute}
                className="text-gray-500 hover:text-[var(--color-primary)] hidden sm:block"
                aria-label={isMuted ? "Activer le son" : "Désactiver le son"}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <button
                onClick={togglePlay}
                disabled={isLoading && !canPlay}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center hover:bg-[var(--color-primary-dark)] disabled:opacity-50 relative"
                aria-label={isPlaying ? "Pause" : "Lecture"}
              >
                {isLoading && !isPlaying ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : isPlaying ? (
                  <Pause size={14} fill="currentColor" />
                ) : (
                  <Play size={14} fill="currentColor" />
                )}
              </button>
            </div>
          </div>

          {/* Progress bar section - visible on mobile only when expanded */}
          <div className={`mt-2 flex items-center gap-1 sm:gap-2 ${isExpanded ? 'block' : 'hidden sm:flex'}`}>
            <span className="text-xs text-gray-500 w-8 sm:w-10 text-right">
              {formatTime(currentTime)}
            </span>

            <div className="flex-1 relative h-1">
              {/* Buffer bar - arrière-plan */}
              <div className="absolute inset-0 h-1 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-gray-300 rounded-full transition-all duration-300"
                  style={{ width: `${buffered}%` }}
                />
              </div>

              {/* Progress bar avec input range sans style par défaut */}
              <input
                type="range"
                min="0"
                max="100"
                value={isNaN(progress) ? 0 : progress}
                onChange={handleSeek}
                className="absolute inset-0 w-full h-1 appearance-none cursor-pointer bg-transparent
                          [&::-webkit-slider-thumb]:appearance-none
                          [&::-webkit-slider-thumb]:h-3
                          [&::-webkit-slider-thumb]:w-3
                          [&::-webkit-slider-thumb]:rounded-full
                          [&::-webkit-slider-thumb]:bg-[var(--color-primary)]
                          [&::-webkit-slider-thumb]:shadow-sm
                          [&::-webkit-slider-thumb]:cursor-pointer
                          [&::-webkit-slider-track]:appearance-none
                          [&::-webkit-slider-track]:h-1
                          [&::-webkit-slider-track]:bg-transparent
                          [&::-moz-range-thumb]:appearance-none
                          [&::-moz-range-thumb]:h-3
                          [&::-moz-range-thumb]:w-3
                          [&::-moz-range-thumb]:rounded-full
                          [&::-moz-range-thumb]:bg-[var(--color-primary)]
                          [&::-moz-range-thumb]:border-none
                          [&::-moz-range-thumb]:cursor-pointer
                          [&::-moz-range-track]:appearance-none
                          [&::-moz-range-track]:h-1
                          [&::-moz-range-track]:bg-transparent"
                aria-label="Progression de l'audio"
              />

              {/* Barre de progression visuelle par-dessus */}
              <div
                className="absolute top-0 left-0 h-1 bg-[var(--color-primary)] rounded-full pointer-events-none transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="text-xs text-gray-500 w-8 sm:w-10">
              {formatTime(duration)}
            </span>

            {/* Mobile mute button - only shown when expanded */}
            <button
              onClick={toggleMute}
              className="text-gray-500 hover:text-[var(--color-primary)] block sm:hidden"
              aria-label={isMuted ? "Activer le son" : "Désactiver le son"}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}