import { NextRequest, NextResponse } from 'next/server';
import client from '@/lib/hidrive';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // 'formation' | 'blog' | 'podcast' | 'episode'
    const id = formData.get('id') as string;

    if (!file || !type || !id) {
      return NextResponse.json(
        { error: 'File, type et id sont requis' },
        { status: 400 }
      );
    }

    // Vérifier que c'est bien une image
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Le fichier doit être une image' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const extension = file.name.split('.').pop();
    const fileName = `${id}_${Date.now()}.${extension}`;
    const remotePath = `/public/images/${type}s/${fileName}`;

    // Créer le dossier s'il n'existe pas
    try {
      await client.createDirectory(`/public/images/${type}s`, { recursive: true });
    } catch (error) {
      // Le dossier existe déjà, on continue
      console.log('Dossier déjà existant ou erreur de création:', error);
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
      type: file.type
    });

  } catch (error) {
    console.error('Erreur upload image:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'upload de l\'image' },
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

    console.log('Tentative de suppression du fichier:', path);

    try {
      // Vérifier d'abord si le fichier existe
      const fileExists = await client.exists(path);
      if (!fileExists) {
        console.log('Le fichier n\'existe pas:', path);
        return NextResponse.json({
          success: true,
          message: 'Fichier déjà supprimé ou inexistant'
        });
      }

      // Tenter la suppression
      await client.deleteFile(path);
      console.log('Fichier supprimé avec succès:', path);

    } catch (deleteError: any) {
      console.error('Erreur lors de la suppression:', deleteError);

      // Si c'est une erreur 404, le fichier n'existe pas (c'est OK)
      if (deleteError.status === 404 || deleteError.message?.includes('404')) {
        return NextResponse.json({
          success: true,
          message: 'Fichier déjà supprimé ou inexistant'
        });
      }

      // Si c'est une erreur 403, problème de permissions
      if (deleteError.status === 403) {
        console.error('Erreur de permissions pour:', path);
        return NextResponse.json(
          { error: 'Permissions insuffisantes pour supprimer ce fichier' },
          { status: 403 }
        );
      }

      // Autres erreurs
      throw deleteError;
    }

    return NextResponse.json({
      success: true,
      message: 'Image supprimée avec succès'
    });

  } catch (error: any) {
    console.error('Erreur suppression image:', error);

    // Gérer les différents types d'erreurs
    const errorMessage = error.message || 'Erreur lors de la suppression de l\'image';
    const statusCode = error.status || 500;

    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}