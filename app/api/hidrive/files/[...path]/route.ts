// app/api/hidrive/files/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import client from '@/lib/hidrive';

// Configuration pour le streaming audio
const CHUNK_SIZE = 1024 * 1024; // 1MB chunks pour un streaming optimal
const MAX_CACHE_SIZE = 10 * 1024 * 1024; // 10MB max pour le cache
const AUDIO_TIMEOUT = 30000; // 30 secondes pour les fichiers audio

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const filePath = '/' + resolvedParams.path.join('/');

    // Déterminer le type MIME basé sur l'extension
    const extension = filePath.split('.').pop()?.toLowerCase();
    let contentType = 'application/octet-stream';
    let isAudioFile = false;

    if (extension) {
      const mimeTypes: Record<string, string> = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'webp': 'image/webp',
        'svg': 'image/svg+xml',
        'mp3': 'audio/mpeg',
        'wav': 'audio/wav',
        'ogg': 'audio/ogg',
        'm4a': 'audio/mp4',
        'aac': 'audio/aac',
        'flac': 'audio/flac'
      };
      contentType = mimeTypes[extension] || contentType;
      isAudioFile = contentType.startsWith('audio/');
    }

    // Vérifier si c'est une requête Range
    const range = request.headers.get('range');

    if (range && isAudioFile) {
      // Streaming par chunks pour les fichiers audio
      return await handleRangeRequest(filePath, range, contentType);
    } else {
      // Requête normale avec timeout adapté
      const timeout = isAudioFile ? AUDIO_TIMEOUT : 15000;

      const fileBuffer = await Promise.race([
        client.getFileContents(filePath) as Promise<Buffer>,
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), timeout)
        )
      ]);

      // Headers optimisés selon le type de fichier
      const headers: HeadersInit = {
        'Content-Type': contentType,
        'Content-Length': fileBuffer.length.toString(),
        'Accept-Ranges': 'bytes',
      };

      if (isAudioFile) {
        // Headers spécifiques pour l'audio streaming
        headers['Cache-Control'] = 'public, max-age=3600, stale-while-revalidate=86400';
        headers['Access-Control-Allow-Origin'] = '*';
        headers['Access-Control-Allow-Headers'] = 'range';
      } else if (contentType.startsWith('image/')) {
        // Cache plus agressif pour les images
        headers['Cache-Control'] = 'public, max-age=86400, s-maxage=31536000';
      }

      return new NextResponse(fileBuffer, { headers });
    }

  } catch (error) {
    console.error('Erreur récupération fichier:', error);
    return await handleError(error, await params);
  }
}

async function handleRangeRequest(
  filePath: string,
  range: string,
  contentType: string
): Promise<NextResponse> {
  try {
    // Parse Range header
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const requestedEnd = parts[1] ? parseInt(parts[1], 10) : null;

    // Récupérer d'abord les métadonnées du fichier pour connaître la taille
    let fileSize: number;
    try {
      // Utiliser la méthode stat
      const fileInfo = await client.stat(filePath);
      
      // Vérifier si c'est un objet détaillé avec une propriété data
      if (fileInfo && typeof fileInfo === 'object') {
        if ('data' in fileInfo && fileInfo.data) {
          // ResponseDataDetailed<FileStat>
          fileSize = (fileInfo.data as any).size || 
                (fileInfo.data as any).getcontentlength || 
                (fileInfo.data as any).contentLength || 0;
        } else {
          // FileStat direct
          fileSize = (fileInfo as any).size || 
                (fileInfo as any).getcontentlength || 
                (fileInfo as any).contentLength || 0;
        }
      } else {
        // Cas où fileInfo n'est pas un objet valide
        fileSize = 0;
      }
      
      console.log('Métadonnées du fichier:', JSON.stringify(fileInfo, null, 2));
    } catch (error) {
      console.error('Erreur lors de la récupération des métadonnées:', error);
      
      // Fallback: récupérer tout le fichier pour connaître sa taille
      const fullFile = await client.getFileContents(filePath) as Buffer;
      fileSize = fullFile.length;

      // Si le fichier est petit, le retourner entièrement
      if (fileSize <= CHUNK_SIZE) {
        const end = requestedEnd || fileSize - 1;
        const chunk = fullFile.slice(start, end + 1);

        return new NextResponse(chunk, {
          status: 206,
          headers: {
            'Content-Type': contentType,
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Content-Length': chunk.length.toString(),
            'Accept-Ranges': 'bytes',
            'Cache-Control': 'public, max-age=3600',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }

    // Calculer la fin du chunk
    const end = requestedEnd || Math.min(start + CHUNK_SIZE - 1, fileSize - 1);
    const chunkSize = (end - start) + 1;

    // Pour les gros fichiers, implémenter un streaming plus sophistiqué
    if (fileSize > MAX_CACHE_SIZE) {
      // Ici, vous pourriez implémenter une logique pour lire par chunks depuis HiDrive
      // Pour l'instant, on récupère la portion demandée
      const fileBuffer = await client.getFileContents(filePath) as Buffer;
      const chunk = fileBuffer.slice(start, end + 1);

      return new NextResponse(chunk, {
        status: 206,
        headers: {
          'Content-Type': contentType,
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Content-Length': chunkSize.toString(),
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'range',
        },
      });
    } else {
      // Pour les fichiers de taille raisonnable, récupérer entièrement
      const fileBuffer = await client.getFileContents(filePath) as Buffer;
      const chunk = fileBuffer.slice(start, end + 1);

      return new NextResponse(chunk, {
        status: 206,
        headers: {
          'Content-Type': contentType,
          'Content-Range': `bytes ${start}-${end}/${fileBuffer.length}`,
          'Content-Length': chunk.length.toString(),
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'public, max-age=3600',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

  } catch (error) {
    console.error('Erreur dans handleRangeRequest:', error);
    throw error;
  }
}

async function handleError(error: any, params: { path: string[] }): Promise<NextResponse> {
  try {
    // Retourner une image placeholder pour les images
    const extension = params.path[params.path.length - 1]?.split('.').pop()?.toLowerCase();
    if (extension && ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
      const placeholderSvg = `
        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#f3f4f6"/>
          <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial, sans-serif" font-size="16" fill="#6b7280">
            Image non disponible
          </text>
        </svg>
      `;

      return new NextResponse(placeholderSvg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'no-cache',
        },
      });
    }

    // Pour les fichiers audio, retourner une erreur JSON avec plus d'infos
    if (extension && ['mp3', 'wav', 'ogg', 'm4a', 'aac', 'flac'].includes(extension)) {
      const errorInfo = {
        error: 'Fichier audio non accessible',
        code: 'AUDIO_UNAVAILABLE',
        message: error?.message || 'Erreur inconnue',
        retry: true
      };

      return NextResponse.json(errorInfo, {
        status: 503, // Service Unavailable - peut être réessayé
        headers: {
          'Retry-After': '5', // Suggère de réessayer après 5 secondes
          'Cache-Control': 'no-cache',
        }
      });
    }

    return NextResponse.json(
      { error: 'Fichier non trouvé' },
      { status: 404 }
    );
  } catch (innerError) {
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// Gestion des requêtes OPTIONS pour CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'range, content-type',
      'Access-Control-Max-Age': '86400',
    },
  });
}