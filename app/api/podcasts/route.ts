import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') ?? '1')
    const limit = parseInt(searchParams.get('limit') ?? '10')

    const podcasts = await db.podcast.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        episodes: true
      }
    })

    return NextResponse.json(podcasts)
  } catch  {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des podcasts" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const podcast = await db.podcast.create({
      data: {
        title: json.title,
        description: json.description,
        imageUrl: json.imageUrl,
        author: json.author,
        explicit: json.explicit ?? false,
      }
    })

    return NextResponse.json(podcast, { status: 201 })
  } catch  {
    return NextResponse.json(
      { error: "Erreur lors de la création du podcast" },
      { status: 500 }
    )
  }
}