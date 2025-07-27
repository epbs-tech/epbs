
"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, ChevronLeft, PlayCircle } from "lucide-react";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";

interface Episode {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  duration: number;
  publishedAt: string;
  episodeNumber?: number;
  seasonNumber?: number;
  plays: number;
}

interface Podcast {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export default function EpisodesPage({params}: {params: Promise<{ id: string }>}) {
  const { id } = use(params);
  const router = useRouter();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const podcastResponse = await fetch(`/api/podcasts/${id}`);
      if (!podcastResponse.ok) throw new Error("Podcast non trouvé");
      const podcastData = await podcastResponse.json();
      setPodcast(podcastData);

      const episodesResponse = await fetch(`/api/podcasts/${id}/episodes`);
      if (!episodesResponse.ok) throw new Error("Erreur lors du chargement des épisodes");
      const episodesData = await episodesResponse.json();
      setEpisodes(episodesData);
    } catch (error) {
      toast.error("Impossible de charger les données");
      router.push("/podcasts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleDelete = async (episodeId: string) => {
    try {
      const response = await fetch(`/api/podcasts/${id}/episodes/${episodeId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erreur lors de la suppression');

      toast.success("Épisode supprimé avec succès");
      fetchData();
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'épisode");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-emerald-50 to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent">
        </div>
      </div>
    );
  }

  if (!podcast) return null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-emerald-50 to-white"
    >
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <Link
            href="/admin/dashboard/podcasts"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-white shadow-sm hover:shadow-md text-emerald-600 hover:text-emerald-700 font-medium transition-all duration-200"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Retour aux podcasts
          </Link>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">{podcast.title}</h1>
              <p className="text-gray-600 max-w-2xl">{podcast.description}</p>
            </div>
            <Button
              asChild
              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Link href={`/admin/dashboard/podcasts/${id}/episodes/new`}>
                <Plus className="h-5 w-5 mr-2" />
                Nouvel épisode
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="shadow-xl bg-white overflow-hidden">
            <CardHeader className="border-b border-gray-100 bg-emerald-50">
              <CardTitle className="text-xl text-emerald-900 flex items-center">
                <PlayCircle className="h-6 w-6 mr-2 text-emerald-600" />
                Liste des épisodes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-emerald-50/50">
                      <TableHead className="text-emerald-900 font-semibold">Titre</TableHead>
                      <TableHead className="text-emerald-900 font-semibold">Saison</TableHead>
                      <TableHead className="text-emerald-900 font-semibold">Durée</TableHead>
                      <TableHead className="text-emerald-900 font-semibold">Publication</TableHead>
                      <TableHead className="text-emerald-900 font-semibold">Écoutes</TableHead>
                      <TableHead className="text-emerald-900 font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {episodes.map((episode, index) => (
                      <TableRow
                        key={episode.id}
                        className="hover:bg-emerald-50/30 transition-colors duration-200"
                      >
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-semibold text-gray-900">{episode.title}</p>
                            <p className="text-sm text-gray-500 line-clamp-1">
                              {episode.description}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {episode.seasonNumber ? (
                            <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm">
                              S{episode.seasonNumber}E{episode.episodeNumber}
                            </span>
                          ) : '-'}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {Math.floor(episode.duration / 60)} min
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {new Date(episode.publishedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                            {episode.plays}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover:bg-emerald-50 border-emerald-200 transition-colors duration-200"
                              asChild
                            >
                              <Link href={`/admin/dashboard/podcasts/${id}/episodes/${episode.id}`}>
                                <Pencil className="h-4 w-4 text-emerald-600" />
                              </Link>
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 border-red-200 transition-colors duration-200"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-white">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-gray-900">
                                    Confirmer la suppression
                                  </AlertDialogTitle>
                                  <AlertDialogDescription className="text-gray-600">
                                    Êtes-vous sûr de vouloir supprimer cet épisode ?
                                    Cette action est irréversible.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
                                    Annuler
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(episode.id)}
                                    className="bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                                  >
                                    Supprimer
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}