"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Upload, X, Image as ImageIcon, AlertCircle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  type: 'formation' | 'blog' | 'podcast' | 'episode';
  id: string;
  disabled?: boolean;
  className?: string;
  maxSize?: number; // en MB
  acceptedFormats?: string[];
}

interface UploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
}

interface PreviewState {
  url: string | null;
  file: File | null;
  isValid: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
  type,
  id,
  disabled = false,
  className = "",
  maxSize = 10,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
}: ImageUploadProps) {
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null
  });

  const [previewState, setPreviewState] = useState<PreviewState>({
    url: null,
    file: null,
    isValid: true
  });

  const [remoteImageValid, setRemoteImageValid] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup des URLs blob au démontage du composant
  useEffect(() => {
    return () => {
      if (previewState.url?.startsWith('blob:')) {
        URL.revokeObjectURL(previewState.url);
      }
    };
  }, []);

  // Vérification de l'image distante
  useEffect(() => {
    if (!value || previewState.url) {
      setRemoteImageValid(true);
      return;
    }

    const img = new window.Image();
    img.onload = () => setRemoteImageValid(true);
    img.onerror = () => {
      setRemoteImageValid(false);
      console.warn('Image distante inaccessible:', value);
    };
    img.src = value;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [value, previewState.url]);

  // Validation du fichier
  const validateFile = useCallback((file: File): { isValid: boolean; error?: string } => {
    if (!acceptedFormats.includes(file.type)) {
      return {
        isValid: false,
        error: `Format non supporté. Formats acceptés: ${acceptedFormats.map(f => f.split('/')[1].toUpperCase()).join(', ')}`
      };
    }

    const maxSizeBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return {
        isValid: false,
        error: `Fichier trop volumineux. Taille maximale: ${maxSize}MB`
      };
    }

    return { isValid: true };
  }, [acceptedFormats, maxSize]);

  // Simulation du progrès d'upload
  const simulateProgress = useCallback(() => {
    setUploadState(prev => ({ ...prev, progress: 0 }));

    progressIntervalRef.current = setInterval(() => {
      setUploadState(prev => {
        const newProgress = Math.min(prev.progress + Math.random() * 20, 90);
        if (newProgress >= 90) {
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
          }
        }
        return { ...prev, progress: newProgress };
      });
    }, 300);
  }, []);

  // Gestion de l'upload
  const handleUpload = useCallback(async (file: File) => {
    const validation = validateFile(file);
    if (!validation.isValid) {
      toast.error(validation.error);
      return;
    }

    setUploadState({ isUploading: true, progress: 0, error: null });
    simulateProgress();

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      formData.append('id', id);

      const response = await fetch('/api/hidrive/images', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erreur de réponse serveur' }));
        throw new Error(errorData.error || `Erreur HTTP ${response.status}`);
      }

      const data = await response.json();

      // Finaliser le progrès
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      setUploadState(prev => ({ ...prev, progress: 100 }));

      // Nettoyer l'état de preview
      if (previewState.url?.startsWith('blob:')) {
        URL.revokeObjectURL(previewState.url);
      }
      setPreviewState({ url: null, file: null, isValid: true });

      // Appliquer la nouvelle URL
      onChange(data.url);
      setRemoteImageValid(true);
      toast.success("Image uploadée avec succès");

    } catch (error) {
      console.error('Erreur upload:', error);
      const errorMessage = error instanceof Error ? error.message : "Erreur lors de l'upload";
      setUploadState(prev => ({ ...prev, error: errorMessage }));
      toast.error(errorMessage);
    } finally {
      setTimeout(() => {
        setUploadState({ isUploading: false, progress: 0, error: null });
      }, 1000);
    }
  }, [validateFile, simulateProgress, type, id, onChange, previewState.url]);

  // Sélection de fichier
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Réinitialiser l'input pour permettre de re-sélectionner le même fichier
    e.target.value = '';

    const validation = validateFile(file);

    // Créer la preview immédiatement
    const previewUrl = URL.createObjectURL(file);
    setPreviewState({
      url: previewUrl,
      file,
      isValid: validation.isValid
    });

    if (validation.isValid) {
      handleUpload(file);
    } else {
      toast.error(validation.error);
    }
  }, [validateFile, handleUpload]);

  // Extraction du chemin depuis une URL ou un chemin relatif
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
      console.warn('Impossible de parser l\'URL:', urlOrPath, error);

      // Fallback: essayer d'extraire un chemin depuis la chaîne
      if (urlOrPath.includes('/')) {
        const parts = urlOrPath.split('/');
        const relevantPart = parts.find(part =>
          part.includes('.') && (part.includes('jpg') || part.includes('png') || part.includes('gif') || part.includes('webp'))
        );
        return relevantPart ? `/${relevantPart}` : null;
      }

      return null;
    }
  }, []);

  // Suppression
  const handleRemove = useCallback(async () => {
    // Cas 1: Fichier en preview local
    if (previewState.url && previewState.file) {
      if (previewState.url.startsWith('blob:')) {
        URL.revokeObjectURL(previewState.url);
      }
      setPreviewState({ url: null, file: null, isValid: true });
      onChange('');
      return;
    }

    // Cas 2: Image distante
    console.log('Suppression d\'image distante', value);
    if (!value) return;

    try {
      const path = extractPathFromUrl(value);

      if (!path) {
        throw new Error('Impossible de déterminer le chemin du fichier à supprimer');
      }

      console.log('Chemin extrait pour suppression:', path);

      const response = await fetch(`/api/hidrive/images?path=${encodeURIComponent(path)}`, {
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

      setRemoteImageValid(true);
      toast.success("Image supprimée avec succès");

    } catch (error) {
      console.error('Erreur suppression:', error);
      const errorMessage = error instanceof Error ? error.message : "Erreur lors de la suppression";
      toast.error(errorMessage);
    }
  }, [previewState, value, onChange, onRemove, extractPathFromUrl]);

  // Réinitialisation après erreur d'image distante
  const handleReset = useCallback(() => {
    setRemoteImageValid(true);
    onChange('');
    if (previewState.url?.startsWith('blob:')) {
      URL.revokeObjectURL(previewState.url);
    }
    setPreviewState({ url: null, file: null, isValid: true });
  }, [onChange, previewState.url]);

  // Déclenchement de la sélection de fichier
  const triggerFileSelect = useCallback(() => {
    if (!disabled && !uploadState.isUploading) {
      fileInputRef.current?.click();
    }
  }, [disabled, uploadState.isUploading]);

  // Détermination de l'image à afficher
  const currentImage = previewState.url || (value && remoteImageValid ? value : null);
  const hasValidImage = currentImage && previewState.isValid;
  const showError = !remoteImageValid || uploadState.error || (previewState.url && !previewState.isValid);

  // Rendu de l'image avec contrôles
  if (hasValidImage) {
    return (
      <div className={`relative group ${className}`}>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-50">
          <Image
            src={currentImage}
            alt="Image sélectionnée"
            fill
            className="object-cover transition-opacity duration-200"
            onError={() => {
              if (previewState.url) {
                setPreviewState(prev => ({ ...prev, isValid: false }));
              } else {
                setRemoteImageValid(false);
              }
            }}
            unoptimized={currentImage.startsWith('blob:')}
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay de chargement */}
          {uploadState.isUploading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
              <div className="bg-white rounded-xl p-6 shadow-xl flex flex-col items-center min-w-[200px]">
                <div className="animate-spin rounded-full h-10 w-10 border-3 border-blue-600 border-t-transparent mb-3"></div>
                <span className="font-medium text-gray-800 mb-2">Upload en cours...</span>
                <div className="w-full">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progression</span>
                    <span>{Math.round(uploadState.progress)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${uploadState.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contrôles */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200">
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="bg-white/90 hover:bg-white text-gray-700 backdrop-blur-sm"
                onClick={triggerFileSelect}
                disabled={disabled || uploadState.isUploading}
              >
                <Upload className="h-4 w-4 mr-1" />
                Changer
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="bg-red-500/90 hover:bg-red-600 backdrop-blur-sm"
                onClick={handleRemove}
                disabled={disabled || uploadState.isUploading}
              >
                <X className="h-4 w-4 mr-1" />
                Supprimer
              </Button>
            </div>
          </div>
        </div>

        {/* Input caché */}
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.join(',')}
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled || uploadState.isUploading}
        />
      </div>
    );
  }

  // Zone d'upload
  return (
    <div className={className}>
      {/* Message d'erreur */}
      {showError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-red-700 font-medium">
              {uploadState.error ||
               (!previewState.isValid ? "Format de fichier non supporté" : "Image inaccessible")}
            </p>
            <button
              onClick={handleReset}
              className="text-red-600 hover:text-red-800 underline text-sm mt-1 font-medium"
            >
              Réessayer
            </button>
          </div>
        </div>
      )}

      {/* Zone de drop */}
      <div
        className={`
          border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer
          ${uploadState.isUploading 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onClick={triggerFileSelect}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.join(',')}
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled || uploadState.isUploading}
        />

        <div className="flex flex-col items-center">
          <div className={`
            p-4 rounded-full mb-4 transition-all duration-200
            ${uploadState.isUploading ? 'bg-blue-100' : 'bg-gray-100'}
          `}>
            {uploadState.isUploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-3 border-blue-600 border-t-transparent"></div>
            ) : (
              <ImageIcon className="h-8 w-8 text-gray-600" />
            )}
          </div>

          <h3 className="font-semibold text-gray-800 mb-2">
            {uploadState.isUploading ? 'Upload en cours...' : 'Ajouter une image'}
          </h3>

          {!uploadState.isUploading && (
            <>
              <p className="text-gray-600 mb-2">
                Cliquez ici ou glissez-déposez votre image
              </p>
              <p className="text-sm text-gray-500">
                {acceptedFormats.map(f => f.split('/')[1].toUpperCase()).join(', ')} • Max {maxSize}MB
              </p>
            </>
          )}

          {/* Barre de progression dans la zone d'upload */}
          {uploadState.isUploading && uploadState.progress > 0 && (
            <div className="w-full max-w-xs mt-4">
              <div className="flex justify-between text-xs text-blue-700 mb-2">
                <span>Téléchargement</span>
                <span>{Math.round(uploadState.progress)}%</span>
              </div>
              <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${uploadState.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}