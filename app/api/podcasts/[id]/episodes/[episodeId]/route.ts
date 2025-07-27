import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import {currentRole} from "@/lib/auth";
import {UserRole} from "@prisma/client";

// Schéma de validation pour la mise à jour
const updateEpisodeSchema = z.object({
  title: z.string().min(1, "Le titre est requis").optional(),
  description: z.string().min(1, "La description est requise").optional(),
  audioUrl: z.string().min(1, "Le fichier audio est requis").optional(),
  duration: z.number().min(1, "La durée est requise").optional(),
  publishDate: z.string().optional(),
  episodeNumber: z.number().optional(),
  season: z.number().optional(),
});

// GET - Récupérer un épisode spécifique
export async function GET(
  request: NextRequest,
  {params}: {params: Promise<{ id: string; episodeId: string }>}
) {
  try {
    const { id, episodeId } = await params;
    const episode = await db.episode.findUnique({
      where: {
        id: episodeId,
        podcastId: id,
      },
    });

    if (!episode) {
      return NextResponse.json(
        { error: "Épisode non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(episode);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'épisode:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

// PATCH - Mettre à jour un épisode
export async function PATCH(
  request: NextRequest,
  {params}: {params: Promise<{ id: string; episodeId: string }>}
) {
  try {
    // Vérifier l'authentification
    const role = await currentRole();

    if(role !== UserRole.ADMIN){
        return new NextResponse(null,{status: 403});
    }

    const { id, episodeId } = await params;
    // Vérifier que l'épisode existe
    const existingEpisode = await db.episode.findUnique({
      where: {
        id: episodeId,
        podcastId: id,
      },
    });

    if (!existingEpisode) {
      return NextResponse.json(
        { error: "Épisode non trouvé" },
        { status: 404 }
      );
    }

    // Valider les données
    const body = await request.json();
    const validatedData = updateEpisodeSchema.parse(body);

    // Mettre à jour l'épisode
    const updatedEpisode = await db.episode.update({
      where: {
        id: episodeId,
      },
      data: validatedData,
    });

    return NextResponse.json(updatedEpisode);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Erreur lors de la mise à jour de l'épisode:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un épisode
export async function DELETE(
  request: NextRequest,
  {params}: {params: Promise<{ id: string; episodeId: string }>}
) {
  try {
    // Vérifier l'authentification
    const role = await currentRole();

    if(role !== UserRole.ADMIN){
        return new NextResponse(null,{status: 403});
    }

    // Vérifier que l'épisode existe
    const { id, episodeId } = await params;
    const episode = await db.episode.findUnique({
      where: {
        id: episodeId,
        podcastId: id,
      },
    });

    if (!episode) {
      return NextResponse.json(
        { error: "Épisode non trouvé" },
        { status: 404 }
      );
    }

    // Supprimer l'épisode
    await db.episode.delete({
      where: {
        id: episodeId,
      },
    });

    //To do
    // Si nécessaire, supprimer aussi le fichier audio associé
    // Vous devrez implémenter cette partie selon votre système de stockage
    // (par exemple, avec un service cloud comme AWS S3)
    
    return NextResponse.json(
      { message: "Épisode supprimé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression de l'épisode:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}