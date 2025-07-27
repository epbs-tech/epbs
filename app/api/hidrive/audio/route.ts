import { NextRequest, NextResponse } from 'next/server';
import client from '@/lib/hidrive';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};


export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const episodeId = formData.get('episodeId') as string;
    const podcastId = formData.get('podcastId') as string;

    if (!file || !episodeId || !podcastId) {
      return NextResponse.json(
        { error: 'File, episodeId et podcastId sont requis' },
        { status: 400 }
      );
    }

    // Vérifier que c'est bien un fichier audio
    if (!file.type.startsWith('audio/')) {
      return NextResponse.json(
        { error: 'Le fichier doit être un audio' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const extension = file.name.split('.').pop();
    const fileName = `${episodeId}_${Date.now()}.${extension}`;
    const remotePath = `/public/audio/podcasts/${podcastId}/${fileName}`;

    // Créer le dossier s'il n'existe pas
    try {
      await client.createDirectory(`/public/audio/podcasts/${podcastId}`, { recursive: true });
    } catch (error) {
      // Le dossier existe déjà, on continue
      console.log('Dossier audio déjà existant ou erreur de création:', error);
    }

    // Upload du fichier
    await client.putFileContents(remotePath, buffer);

    // Générer l'URL d'accès via notre API proxy
    //const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const publicUrl = `/api/hidrive/files${remotePath}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      path: remotePath,
      fileName,
      size: file.size,
      type: file.type,
      duration: null // À calculer côté client si nécessaire
    });

  } catch (error) {
    console.error('Erreur upload audio:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'upload de l\'audio' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');

    if (!path) {
      return NextResponse.json(
        { error: 'Le chemin du fichier est requis' },
        { status: 400 }
      );
    }

    console.log('Tentative de suppression du fichier audio:', path);

    try {
      // Vérifier d'abord si le fichier existe
      const fileExists = await client.exists(path);
      if (!fileExists) {
        console.log('Le fichier audio n\'existe pas:', path);
        return NextResponse.json({
          success: true,
          message: 'Fichier audio déjà supprimé ou inexistant'
        });
      }

      // Tenter la suppression
      await client.deleteFile(path);
      console.log('Fichier audio supprimé avec succès:', path);

    } catch (deleteError: any) {
      console.error('Erreur lors de la suppression du fichier audio:', deleteError);

      // Si c'est une erreur 404, le fichier n'existe pas (c'est OK)
      if (deleteError.status === 404 || deleteError.message?.includes('404')) {
        return NextResponse.json({
          success: true,
          message: 'Fichier audio déjà supprimé ou inexistant'
        });
      }

      // Si c'est une erreur 403, problème de permissions
      if (deleteError.status === 403) {
        console.error('Erreur de permissions pour le fichier audio:', path);
        return NextResponse.json(
          { error: 'Permissions insuffisantes pour supprimer ce fichier audio' },
          { status: 403 }
        );
      }

      // Autres erreurs
      throw deleteError;
    }

    return NextResponse.json({
      success: true,
      message: 'Audio supprimé avec succès'
    });

  } catch (error: any) {
    console.error('Erreur suppression audio:', error);

    // Gérer les différents types d'erreurs
    const errorMessage = error.message || 'Erreur lors de la suppression de l\'audio';
    const statusCode = error.status || 500;

    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}