// app/api/test-hidrive/route.ts
import { NextResponse } from 'next/server';
import client from '@/lib/hidrive';

export async function GET() {
  try {
    const contents = await client.getDirectoryContents('/');

    return NextResponse.json({
      success: true,
      message: 'HiDrive répond correctement',
      rootItems: Array.isArray(contents) ? contents.length : 0
    });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      status: error.status || 'unknown'
    }, { status: 500 });
  }
}


// app/api/test-upload/route.ts
import { NextRequest } from 'next/server';


export async function POST(request: NextRequest) {
  try {
    // Tester dans le dossier public directement
    const testContent = `Test upload - ${new Date().toISOString()}`;
    const testPath = '/public/test-upload.txt';

    console.log('🔄 Test upload vers:', testPath);

    // Tenter l'upload
    await client.putFileContents(testPath, testContent);
    console.log('✅ Upload réussi');

    // Vérifier que le fichier existe
    const exists = await client.exists(testPath);
    console.log('📁 Fichier existe:', exists);

    // Nettoyer (supprimer le fichier de test)
    if (exists) {
      await client.deleteFile(testPath);
      console.log('🗑️ Fichier de test supprimé');
    }

    return NextResponse.json({
      success: true,
      message: 'Upload test réussi dans /Conjoints/public/',
      testPath,
      fileExists: exists
    });

  } catch (error: any) {
    console.error('❌ Erreur upload test:', error);

    // Si erreur sur /Conjoints/public/, tester d'autres chemins
    if (error.status === 403) {
      try {
        console.log('🔄 Test dans dossier racine disponible...');

        // Lister le contenu racine pour voir les dossiers disponibles
        const rootContents = await client.getDirectoryContents('/');
        console.log('📂 Contenu racine:', rootContents);

        return NextResponse.json({
          success: false,
          error: 'Pas de permission d\'écriture dans /Conjoints/public/',
          status: 403,
          rootContents: Array.isArray(rootContents) ? rootContents.map((item: any) => ({
            name: item.filename || item.basename,
            type: item.type,
            size: item.size
          })) : rootContents,
          suggestion: 'Vérifiez les permissions du dossier /Conjoints/public/ dans HiDrive'
        });

      } catch (listError: any) {
        return NextResponse.json({
          success: false,
          error: 'Erreur de permissions générales',
          originalError: error.message,
          listError: listError.message,
          status: 403
        }, { status: 403 });
      }
    }

    return NextResponse.json({
      success: false,
      error: error.message,
      status: error.status || 'unknown'
    }, { status: 500 });
  }
}