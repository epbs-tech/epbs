import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: Request,
 {params}: {params: Promise<{ id: string }>}) {
  try {
    const { id } = await params;
    const podcast = await db.podcast.findUnique({
      where: { id: id },
      include: {
        episodes: true,
      }
    })
    
    if (!podcast) {
      return NextResponse.json(
        { error: "Podcast non trouvé" },
        { status: 404 }
      )
    }
    
    return NextResponse.json(podcast)
  } catch  {
    return NextResponse.json(
      { error: "Erreur lors de la récupération du podcast" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  {params}: {params: Promise<{ id: string }>}) {
  try {
    const { id } = await params;
    const json = await request.json()
    const podcast = await db.podcast.update({
      where: { id: id },
      data: json
    })
    
    return NextResponse.json(podcast)
  } catch(error)  {
    console.log("Erreur lors de la mise à jour du podcast", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du podcast" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
 {params}: {params: Promise<{ id: string }>}) {
  try {
    const { id } = await params;
    await db.podcast.delete({
      where: { id: id }
    })
    
    return new NextResponse(null, { status: 204 })
  } catch  {
    return NextResponse.json(
      { error: "Erreur lors de la suppression du podcast" },
      { status: 500 }
    )
  }
}