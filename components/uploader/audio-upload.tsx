// components/upload/AudioUpload.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { Upload, X, Music, Clock, FileAudio, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface AudioUploadProps {
  value?: string;
  onChange: (url: string, duration?: number) => void;
  onRemove?: () => void;
  episodeId: string;
  podcastId: string;
  disabled?: boolean;
  className?: string;
  onDurationChange?: (duration: number) => void;
}

export default function AudioUpload({
  value,
  onChange,
  onRemove,
  episodeId,
  podcastId,
  disabled,
  className = "",
  onDurationChange
}: AudioUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [isAudioValid, setIsAudioValid] = useState<boolean>(true); // Par défaut valide
  const [isCheckingAudio, setIsCheckingAudio] = useState<boolean>(false);

  // Extraction du chemin depuis une URL ou un chemin relatif (même logique que ImageUpload)
  const extractPathFromUrl = useCallback((urlOrPath: string): string | null => {
    try {
      // Cas 1: URL complète
      if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
        const url = new URL(urlOrPath);
        let path = url.pathname;

        // Supprimer le préfixe /api/hidrive/files
        if (path.startsWith('/api/hidrive/files')) {
          path = path.replace('/api/hidrive/files', '');
        }

        return path || null;
      }

      // Cas 2: Chemin relatif commençant par /api/hidrive/files
      if (urlOrPath.startsWith('/api/hidrive/files')) {
        return urlOrPath.replace('/api/hidrive/files', '') || null;
      }

      // Cas 3: Chemin direct
      if (urlOrPath.startsWith('/')) {
        return urlOrPath;
      }

      // Cas 4: URL relative ou nom de fichier
      return `/${urlOrPath}`;

    } catch (error) {
      console.warn('Impossible de parser l\'URL audio:', urlOrPath, error);

      // Fallback: essayer d'extraire un chemin depuis la chaîne
      if (urlOrPath.includes('/')) {
        const parts = urlOrPath.split('/');
        const relevantPart = parts.find(part =>
          part.includes('.') && (part.includes('mp3') || part.includes('wav') || part.includes('aac') || part.includes('m4a'))
        );
        return relevantPart ? `/${relevantPart}` : null;
      }

      return null;
    }
  }, []);

  // Fonction pour reset manuel si l'audio est introuvable
  const handleManualReset = useCallback(() => {
    onChange('');
    setAudioFile(null);
    setAudioDuration(0);
    setIsAudioValid(false);
    toast.info("Champ audio reseté pour nouvel upload");
  }, [onChange]);

  // Vérifier si l'audio existe réellement (version simplifiée)
  const checkAudioExists = useCallback(async (audioUrl: string) => {
    if (!audioUrl) return false;

    setIsCheckingAudio(true);
    try {
      const response = await fetch(audioUrl, { method: 'HEAD' });
      const exists = response.ok;
      setIsAudioValid(exists);

      if (!exists) {
        console.log('Audio introuvable à l\'URL:', audioUrl);
        toast.error("Fichier audio introuvable. Cliquez sur 'Reset' pour uploader un nouveau fichier.");
      } else {
        toast.success("Fichier audio vérifié avec succès");
      }

      return exists;
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'audio:', error);
      setIsAudioValid(false);
      toast.error("Erreur lors de la vérification du fichier audio");
      return false;
    } finally {
      setIsCheckingAudio(false);
    }
  }, []);

  // Initialiser l'état valide au montage si on a une value
  useEffect(() => {
    if (value) {
      setIsAudioValid(true);
    } else {
      setIsAudioValid(false);
    }
  }, [value]);

  const calculateAudioDuration = useCallback((file: File): Promise<number> => {
    return new Promise((resolve) => {
      const audio = new Audio();
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target?.result) {
          audio.src = e.target.result as string;
          audio.addEventListener('loadedmetadata', () => {
            const duration = Math.round(audio.duration);
            resolve(duration);
          });
          audio.addEventListener('error', () => {
            console.error("Erreur de lecture du fichier audio");
            resolve(0);
          });
        } else {
          resolve(0);
        }
      };

      reader.onerror = () => {
        console.error("Erreur de lecture du fichier");
        resolve(0);
      };

      reader.readAsDataURL(file);
    });
  }, []);

  const handleUpload = useCallback(async (file: File) => {
    if (!file.type.startsWith('audio/')) {
      toast.error("Veuillez sélectionner un fichier audio valide");
      return;
    }

    // Vérifier la taille du fichier (max 100MB)
    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("Le fichier audio est trop volumineux (max 100MB)");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setAudioFile(file);

    try {
      // Calculer la durée
      const duration = await calculateAudioDuration(file);
      setAudioDuration(duration);
      if (onDurationChange) {
        onDurationChange(duration);
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('episodeId', episodeId);
      formData.append('podcastId', podcastId);

      // Simuler un chargement progressif
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 5;
        });
      }, 300);

      const response = await fetch('/api/hidrive/audio', {
        method: 'POST',
        body: formData,
      });

      clearInterval(interval);
      setUploadProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de l\'upload');
      }

      const data = await response.json();

      // Mettre à jour les états AVANT d'appeler onChange
      setIsAudioValid(true);

      // Appeler onChange en dernier
      onChange(data.url, duration);

      toast.success("Fichier audio uploadé avec succès");
    } catch (error) {
      console.error('Erreur upload audio:', error);
      toast.error(error instanceof Error ? error.message : "Erreur lors de l'upload du fichier audio");
      setAudioFile(null);
      setAudioDuration(0);
      setIsAudioValid(false);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [onChange, episodeId, podcastId, calculateAudioDuration, onDurationChange]);

  const handleRemove = useCallback(async () => {
    if (!value) return;

    try {
      const path = extractPathFromUrl(value);

      if (!path) {
        throw new Error('Impossible de déterminer le chemin du fichier audio à supprimer');
      }

      console.log('Chemin audio extrait pour suppression:', path);

      const response = await fetch(`/api/hidrive/audio?path=${encodeURIComponent(path)}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erreur de suppression' }));
        throw new Error(errorData.error || `Erreur HTTP ${response.status}`);
      }

      if (onRemove) {
        onRemove();
      } else {
        onChange('');
      }
      setAudioFile(null);
      setAudioDuration(0);
      setIsAudioValid(false);
      toast.success("Fichier audio supprimé avec succès");
    } catch (error) {
      console.error('Erreur suppression audio:', error);
      const errorMessage = error instanceof Error ? error.message : "Erreur lors de la suppression du fichier audio";
      toast.error(errorMessage);
    }
  }, [value, onChange, onRemove, extractPathFromUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  // Afficher l'interface de fichier uploadé si on a une value ET que l'audio est considéré valide
  if (value && isAudioValid) {
    return (
      <div className={`relative group ${className}`}>
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <FileAudio className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {audioFile?.name || 'Fichier audio'}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  {audioFile && (
                    <span>{formatFileSize(audioFile.size)}</span>
                  )}
                  {audioDuration > 0 && (
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{formatDuration(audioDuration)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              {/*<Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => checkAudioExists(value)}
                disabled={disabled || isCheckingAudio}
              >
                {isCheckingAudio ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  "Vérifier"
                )}
              </Button>*/}
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleManualReset}
                disabled={disabled}
              >
                Reset
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                disabled={disabled}
              >
                <X className="h-4 w-4 mr-1" />
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Afficher un état de chargement pendant la vérification
  if (isCheckingAudio) {
    return (
      <div className={`border-2 border-dashed rounded-lg p-8 text-center ${className}`}>
        <div className="bg-blue-100 p-4 rounded-full mb-4 mx-auto w-fit">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
        <span className="font-medium text-gray-700 text-lg">Vérification du fichier audio...</span>
      </div>
    );
  }

  // Interface d'upload (cas par défaut)
  return (
    <div className={className}>
      <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
        isUploading 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-300 hover:border-gray-400'
      }`}>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="hidden"
          id={`audio-upload-${episodeId}`}
          disabled={disabled || isUploading}
        />
        <label
          htmlFor={`audio-upload-${episodeId}`}
          className={`flex flex-col items-center cursor-pointer ${
            disabled || isUploading ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          <div className="bg-blue-100 p-4 rounded-full mb-4">
            {isUploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            ) : (
              <Music className="h-8 w-8 text-blue-600" />
            )}
          </div>
          <span className="font-medium text-gray-700 text-lg">
            {isUploading ? 'Upload en cours...' : 'Cliquez pour uploader un fichier audio'}
          </span>
          {!isUploading && (
            <p className="text-sm text-gray-500 mt-2">MP3, WAV, AAC ou M4A (max 100MB)</p>
          )}
        </label>

        {isUploading && uploadProgress > 0 && (
          <div className="mt-6">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-blue-700 font-medium">Téléchargement</span>
              <span className="text-blue-700 font-medium">{uploadProgress}%</span>
            </div>
            <div className="h-3 bg-blue-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}