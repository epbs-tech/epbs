import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/lib/db";



export async function POST(
  request: NextRequest,
  {params}: {params: Promise<{ episodeId: string }>}
) {
  try {
    const { episodeId } = await params;

    // Vérifier que l'épisode existe
    const episode = await db.episode.findUnique({
      where: { id: episodeId },
      select: { id: true, podcastId: true }
    });

    if (!episode) {
      return NextResponse.json(
        { error: 'Épisode introuvable' },
        { status: 404 }
      );
    }

    // Transaction pour incrémenter les deux compteurs de manière atomique
    const result = await db.$transaction(async (tx) => {
      // Incrémenter les plays de l'épisode
      const updatedEpisode = await tx.episode.update({
        where: { id: episodeId },
        data: { plays: { increment: 1 } },
        select: { id: true, plays: true, title: true }
      });

      // Incrémenter les plays du podcast
      const updatedPodcast = await tx.podcast.update({
        where: { id: episode.podcastId },
        data: { plays: { increment: 1 } },
        select: { id: true, plays: true, title: true }
      });

      return { episode: updatedEpisode, podcast: updatedPodcast };
    });

    return NextResponse.json({
      success: true,
      message: 'Plays incrémentés avec succès',
      data: result
    });

  } catch (error) {
    console.error('Erreur lors de l\'incrémentation des plays:', error);
    
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

// Optionnel : méthode GET pour récupérer les statistiques actuelles
export async function GET(
  request: NextRequest,
  {params}: {params: Promise<{ episodeId: string }>}
) {
  try {
    const { episodeId } = await params;

    const episode = await db.episode.findUnique({
      where: { id: episodeId },
      select: {
        id: true,
        title: true,
        plays: true,
        audioUrl: true,
        podcast: {
          select: {
            id: true,
            title: true,
            plays: true
          }
        }
      }
    });

    if (!episode) {
      return NextResponse.json(
        { error: 'Épisode introuvable' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: episode
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}