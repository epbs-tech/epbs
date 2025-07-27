/*import { NextApiRequest, NextApiResponse } from 'next';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Configuration du client S3 pour Ionos
const s3Client = new S3Client({
  region: 'de', // Région Ionos (généralement 'de' pour l'Allemagne)
  endpoint: 'https://s3-eu-central-1.ionoscloud.com', // Point de terminaison Ionos
  credentials: {
    accessKeyId: process.env.IONOS_ACCESS_KEY!,
    secretAccessKey: process.env.IONOS_SECRET_KEY!,
  },
  forcePathStyle: true // Important pour Ionos
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  try {
    const form = formidable({
      maxFileSize: 100 * 1024 * 1024, // 100MB max
    });

    const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const file = files.file as formidable.File;
    const podcastId = Array.isArray(fields.podcastId) ? fields.podcastId[0] : fields.podcastId;

    if (!file || !podcastId) {
      return res.status(400).json({ message: 'Fichier ou podcastId manquant' });
    }

    // Vérification du type de fichier
    const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/aac', 'audio/mp4'];
    if (!allowedTypes.includes(file.mimetype || '')) {
      return res.status(400).json({
        message: 'Type de fichier non autorisé. Utilisez MP3, WAV, AAC ou M4A'
      });
    }

    // Organisation des fichiers par date pour une meilleure gestion
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');

    // Génération d'un nom de fichier unique
    const fileExtension = path.extname(file.originalFilename || '');
    const fileName = `${uuidv4()}${fileExtension}`;

    // Construction du chemin de stockage
    const s3Key = `podcasts/${year}/${month}/${podcastId}/${fileName}`;

    // Upload vers Ionos
    const fileStream = fs.createReadStream(file.filepath);
    const uploadParams = {
      Bucket: process.env.IONOS_BUCKET_NAME!,
      Key: s3Key,
      Body: fileStream,
      ContentType: file.mimetype || 'audio/mpeg',
      // Ajout de métadonnées utiles
      Metadata: {
        'original-filename': file.originalFilename || '',
        'upload-date': new Date().toISOString(),
        'podcast-id': podcastId,
      }
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    // Construction de l'URL publique
    const fileUrl = `https://${process.env.IONOS_BUCKET_NAME}.s3-eu-central-1.ionoscloud.com/${s3Key}`;

    // Nettoyage du fichier temporaire
    fs.unlinkSync(file.filepath);

    // Enregistrement en base de données si nécessaire
    // await db.audioFile.create({ ... });

    return res.status(200).json({
      url: fileUrl,
      key: s3Key,
      fileName: fileName,
      originalName: file.originalFilename,
      size: file.size,
      type: file.mimetype
    });

  } catch (error) {
    console.error('Erreur lors de l\'upload:', error);
    return res.status(500).json({
      message: 'Erreur lors de l\'upload du fichier audio',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
}*/

// api/upload/audio/route.ts
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import slugify from 'slugify';

// Configuration de stockage des fichiers
const STORAGE_PATH: string = process.env.STORAGE_PATH || path.join(process.cwd(), 'public', 'uploads');
const AUDIO_PATH: string = path.join(STORAGE_PATH, 'podcasts');
const MAX_FILE_SIZE: number = 100 * 1024 * 1024; // 100MB

// Vérification du type de fichier audio
const isValidAudioType = (mimetype: string): boolean => {
  const validTypes: string[] = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/aac', 'audio/mp4', 'audio/x-m4a'];
  return validTypes.includes(mimetype);
};

// Fonction pour assurer l'existence du répertoire
async function ensureDirectoryExists(directory: string): Promise<void> {
  try {
    await fs.access(directory);
  } catch (error) {
    await fs.mkdir(directory, { recursive: true });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Vérification de l'authentification
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    // Accès aux données du formulaire
    const formData = await request.formData();
    const audioFile = formData.get('file') as File | null;
    const podcastId = formData.get('podcastId') as string | null;

    // Validation des données requises
    if (!audioFile || !podcastId) {
      return NextResponse.json(
        { error: 'Fichier audio et ID du podcast requis' },
        { status: 400 }
      );
    }

    // Validation du type de fichier
    if (!isValidAudioType(audioFile.type)) {
      return NextResponse.json(
        { error: 'Format audio non pris en charge' },
        { status: 400 }
      );
    }

    // Validation de la taille du fichier
    if (audioFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Fichier trop volumineux (max 100MB)' },
        { status: 400 }
      );
    }

    // Récupérer les informations du podcast pour nommer le fichier
    const podcast = await db.podcast.findUnique({
      where: { id: podcastId },
      select: { id: true, title: true }
    });

    if (!podcast) {
      return NextResponse.json({ error: 'Podcast non trouvé' }, { status: 404 });
    }

    // Créer un slug pour le nom du podcast
    const podcastSlug = slugify(podcast.title, { lower: true, strict: true });

    // Définir le chemin du répertoire pour ce podcast
    const podcastPath = path.join(AUDIO_PATH, podcastId);
    await ensureDirectoryExists(podcastPath);

    // Préparer le nom du fichier
    const fileExtension = path.extname(audioFile.name).toLowerCase();
    const fileName = audioFile.name.replace(fileExtension, '');
    const safeFileName = slugify(fileName, { lower: true, strict: true });

    // Format: podcast-slug_episode-name_timestamp_uuid.extension
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
    const uniqueId = uuidv4().substring(0, 8);
    const finalFileName = `${podcastSlug}_${safeFileName}_${timestamp}_${uniqueId}${fileExtension}`;

    const filePath = path.join(podcastPath, finalFileName);
    const relativePath = path.join('/uploads/podcasts', podcastId, finalFileName).replace(/\\/g, '/');

    // Écrire le fichier sur le disque
    const fileArrayBuffer = await audioFile.arrayBuffer();
    const fileBuffer = Buffer.from(fileArrayBuffer);
    await fs.writeFile(filePath, fileBuffer);

    // Retourner l'URL du fichier uploadé
    return NextResponse.json({
      url: relativePath,
      fileName: finalFileName,
      size: audioFile.size,
      type: audioFile.type
    }, { status: 200 });

  } catch (error) {
    console.error('Erreur upload audio:', error);
    return NextResponse.json(
      { error: 'Erreur lors du téléchargement du fichier' },
      { status: 500 }
    );
  }
}