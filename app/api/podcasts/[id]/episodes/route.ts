import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: Request,
   {params}: {params: Promise<{ id: string }>}) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url)
    const season = searchParams.get('season')
    
    const episodes = await db.episode.findMany({
      where: {
        podcastId: id,
        ...(season ? { seasonNumber: parseInt(season) } : {})
      },
      orderBy: [
        { seasonNumber: 'asc' },
        { episodeNumber: 'asc' }
      ]
    })
    
    return NextResponse.json(episodes)
  } catch  {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des épisodes" },
      { status: 500 }
    )
  }
}

export async function POST(
  request: Request,
 {params}: {params: Promise<{ id: string }>}) {
  try {
    const { id } = await params;
    const json = await request.json()
    const episode = await db.episode.create({
      data: {
        ...json,
        podcastId: id,
      }
    })
    
    await db.podcast.update({
      where: { id: id },
      data: { totalEpisodes: { increment: 1 } }
    })
    
    return NextResponse.json(episode, { status: 201 })
  } catch(error)  {
    console.error("Erreur lors de la création de l'épisode:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de l'épisode" },
      { status: 500 }
    )
  }
}