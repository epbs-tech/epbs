"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Pencil,
  Trash2,
  PlayCircle,
  Podcast,
  Users,
  Rss,
  MoreHorizontal,
  Eye
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Podcast {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  author: string | null;
  plays: number;
  totalEpisodes: number;
  subscribers: number;
  explicit: boolean;
}

export default function PodcastsAdminPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const fetchPodcasts = async () => {
    try {
      const response = await fetch('/api/podcasts');
      const data = await response.json();
      setPodcasts(data);
    } catch (error) {
      console.error('Erreur lors du chargement des podcasts:', error);
      toast.error("Impossible de charger les podcasts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/podcasts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      toast.success("Podcast supprimé avec succès");
      fetchPodcasts(); // Recharger la liste
    } catch {
      toast.error("Erreur lors de la suppression du podcast");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="text-green-800 font-medium animate-pulse">Chargement des podcasts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500 inline-block mb-2">
            Dashboard Podcasts
          </h1>
          <p className="text-green-700 max-w-2xl">
            Gérez vos podcasts, suivez leurs performances et ajoutez de nouveaux contenus.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Podcast className="h-6 w-6" />
                    <p className="text-sm font-medium opacity-90">Total Podcasts</p>
                  </div>
                  <p className="text-4xl font-bold">{podcasts.length}</p>
                </div>
                <div className="bg-white/20 rounded-full p-3 backdrop-blur-sm">
                  <Podcast className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-teal-500 to-green-600 text-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Rss className="h-6 w-6" />
                    <p className="text-sm font-medium opacity-90">Épisodes Totaux</p>
                  </div>
                  <p className="text-4xl font-bold">
                    {podcasts.reduce((sum, podcast) => sum + podcast.totalEpisodes, 0)}
                  </p>
                </div>
                <div className="bg-white/20 rounded-full p-3 backdrop-blur-sm">
                  <Rss className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-6 w-6" />
                    <p className="text-sm font-medium opacity-90">Nombre d’écoutes</p>
                  </div>
                  <p className="text-4xl font-bold">
                    {podcasts[0].plays}
                  </p>
                </div>
                <div className="bg-white/20 rounded-full p-3 backdrop-blur-sm">
                  <Users className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <Podcast className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-800">
              Vos podcasts
            </h2>
          </div>
          <Button className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 border-none text-white shadow-md hover:shadow-lg transition-all duration-200 group">
            <Link href="/admin/dashboard/podcasts/new" className="flex items-center">
              <Plus className="h-5 w-5 mr-2 group-hover:animate-pulse" />
              Nouveau podcast
            </Link>
          </Button>
        </div>

        <Card className="overflow-hidden border-none bg-white/95 backdrop-blur-sm shadow-xl rounded-xl">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100 p-6">
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Rss className="h-5 w-5 text-green-600" />
              Liste des podcasts
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-green-50/80">
                  <TableRow>
                    <TableHead className="text-green-800 font-semibold">Podcast</TableHead>
                    <TableHead className="text-green-800 font-semibold hidden md:table-cell">Auteur</TableHead>
                    <TableHead className="text-green-800 font-semibold hidden sm:table-cell">Épisodes</TableHead>
                    <TableHead className="text-green-800 font-semibold hidden lg:table-cell">Nombre d’écoutes</TableHead>
                    <TableHead className="text-green-800 font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {podcasts.map((podcast, index) => (
                    <TableRow
                      key={podcast.id}
                      className={`hover:bg-green-50/70 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-green-50/30"}`}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {podcast.imageUrl ? (
                            <div className="relative h-16 w-16 rounded-lg overflow-hidden ring-1 ring-green-200 shadow-sm hover:shadow-md transition-all">
                              <Image
                                src={new URL(podcast.imageUrl, baseUrl).toString()}
                                alt={podcast.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
                              <Podcast className="h-8 w-8 text-green-600" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-green-900 line-clamp-1">{podcast.title}</p>
                            <p className="text-sm text-green-700 line-clamp-1 max-w-xs">
                              {podcast.description}
                            </p>
                            <div className="flex items-center gap-2 mt-1 md:hidden">
                              <Badge variant="outline" className="bg-green-50 text-xs text-green-700 border-green-200">
                                {podcast.totalEpisodes} épisodes
                              </Badge>
                              {podcast.explicit && (
                                <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">
                                  Explicit
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-green-800 hidden md:table-cell">
                        {podcast.author || "Non spécifié"}
                      </TableCell>
                      <TableCell className="font-medium text-green-800 hidden sm:table-cell">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {podcast.totalEpisodes}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-green-800 hidden lg:table-cell">
                        {podcast.plays}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="hidden sm:flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800 transition-colors"
                              asChild
                            >
                              <Link href={`/admin/dashboard/podcasts/${podcast.id}/episodes`} title="Gérer les épisodes">
                                <PlayCircle className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800 transition-colors"
                              asChild
                            >
                              <Link href={`/admin/dashboard/podcasts/${podcast.id}`} title="Modifier">
                                <Pencil className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 hidden sm:flex"
                                title="Supprimer"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-white border border-green-100 shadow-lg">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-green-900">
                                  Confirmer la suppression
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-green-700">
                                  Êtes-vous sûr de vouloir supprimer le podcast "{podcast.title}" ?
                                  Cette action est irréversible et supprimera également
                                  tous les épisodes associés.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="border-green-200 text-green-800 hover:bg-green-50">
                                  Annuler
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(podcast.id)}
                                  className="bg-red-600 text-white hover:bg-red-700"
                                >
                                  Supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-green-200 text-green-700 hover:bg-green-50 p-0 h-8 w-8 flex items-center justify-center"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="bg-white border border-green-100 shadow-lg"
                            >
                              <DropdownMenuLabel className="text-green-800">Options</DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-green-100" />
                              <DropdownMenuItem className="text-green-700 hover:bg-green-50 cursor-pointer">
                                <Link href={`/admin/dashboard/podcasts/${podcast.id}`} className="flex items-center w-full">
                                  <Pencil className="h-4 w-4 mr-2" />
                                  Modifier
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-green-700 hover:bg-green-50 cursor-pointer">
                                <Link href={`/admin/dashboard/podcasts/${podcast.id}/episodes`} className="flex items-center w-full">
                                  <PlayCircle className="h-4 w-4 mr-2" />
                                  Gérer les épisodes
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-green-700 hover:bg-green-50 cursor-pointer">
                                <Link href={`/podcasts/${podcast.id}`} className="flex items-center w-full">
                                  <Eye className="h-4 w-4 mr-2" />
                                  Voir public
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-green-100" />
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem
                                    className="text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                                    onSelect={e => e.preventDefault()}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Supprimer
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-white border border-green-100 shadow-lg">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="text-green-900">
                                      Confirmer la suppression
                                    </AlertDialogTitle>
                                    <AlertDialogDescription className="text-green-700">
                                      Êtes-vous sûr de vouloir supprimer le podcast "{podcast.title}" ?
                                      Cette action est irréversible et supprimera également
                                      tous les épisodes associés.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="border-green-200 text-green-800 hover:bg-green-50">
                                      Annuler
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(podcast.id)}
                                      className="bg-red-600 text-white hover:bg-red-700"
                                    >
                                      Supprimer
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {podcasts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="h-64 text-center">
                        <div className="flex flex-col items-center justify-center gap-4 py-10">
                          <div className="rounded-full bg-green-100 p-6">
                            <Podcast className="h-12 w-12 text-green-500" />
                          </div>
                          <div className="space-y-2 text-center">
                            <p className="text-xl font-medium text-green-800">Aucun podcast trouvé</p>
                            <p className="text-green-600 max-w-sm mx-auto">
                              Commencez à créer votre premier podcast pour le partager avec votre audience
                            </p>
                          </div>
                          <Button
                            size="lg"
                            className="mt-4 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white shadow-md hover:shadow-lg"
                            asChild
                          >
                            <Link href="/admin/dashboard/podcasts/new" className="flex items-center">
                              <Plus className="h-5 w-5 mr-2" />
                              Créer un podcast
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <footer className="mt-12 text-center text-green-700 py-6 border-t border-green-100">
          <p className="font-medium">Plateforme d'administration des podcasts &copy; {new Date().getFullYear()}</p>
          <p className="text-sm mt-1 text-green-600">Tous droits réservés</p>
        </footer>
      </div>
    </div>
  );
}