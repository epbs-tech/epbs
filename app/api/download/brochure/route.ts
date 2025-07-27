import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import {auth} from "@/auth";

export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await auth()

    if (!session) {
      return NextResponse.json(
        { error: 'Non autorisé', redirect: '/auth/login?callbackUrl=' + encodeURIComponent('/api/download/brochure') },
        { status: 401 }
      )
    }

    // Chemin vers le fichier
    const filePath = path.join(process.cwd(), 'public','docs','plaquetteEpbs.pdf')


    // Vérifier que le fichier existe
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Fichier non trouvé' },
        { status: 404 }
      )
    }

    // Lire le fichier
    const fileBuffer = fs.readFileSync(filePath)

    // Log du téléchargement (optionnel pour analytics)
    console.log(`Téléchargement brochure par ${session.user?.email} à ${new Date().toISOString()}`)

    // Envoyer le fichier
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="MAJ_PRESENTATION_OFFRE_EPBS_2025.pdf"',
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
    })

  } catch (error) {
    console.error('Erreur téléchargement:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}