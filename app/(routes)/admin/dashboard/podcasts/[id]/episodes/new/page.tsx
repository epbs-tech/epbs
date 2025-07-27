"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { ArrowLeft, Music, Hash, Layers, Mic, ImageIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { EpisodeSchema } from "@/schemas";

// Import des nouveaux composants d'upload
import ImageUpload from "@/components/uploader/images-upload";
import AudioUpload from "@/components/uploader/audio-upload";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Podcast {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
}

type EpisodeFormValues = z.infer<typeof EpisodeSchema>;

export default function NewEpisode({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const form = useForm<EpisodeFormValues>({
    resolver: zodResolver(EpisodeSchema),
    defaultValues: {
      podcastId: id,
      title: "",
      description: "",
      audioUrl: "",
      duration: 0,
      episodeNumber: undefined,
      seasonNumber: undefined,
      imageUrl: ""
    }
  });

  useEffect(() => {
    const loadPodcast = async () => {
      try {
        const response = await fetch(`/api/podcasts/${id}`);
        if (!response.ok) {
          throw new Error("Podcast non trouvé");
        }
        const data = await response.json();
        setPodcast(data);
      } catch (error) {
        toast.error("Impossible de charger le podcast");
        router.push("/admin/dashboard/podcasts");
      } finally {
        setIsLoading(false);
      }
    };

    loadPodcast();
  }, [id, router]);

  const onSubmit = async (values: EpisodeFormValues) => {
    if (!values.audioUrl) {
      toast.error("Veuillez uploader un fichier audio");
      return;
    }

    setIsSubmitting(true);

    try {
      const episodeData = {
        ...values,
        podcastId: id
      };

      const response = await fetch(`/api/podcasts/${id}/episodes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(episodeData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erreur lors de la création de l\'épisode');
      }

      toast.success("Épisode créé avec succès");
      router.push(`/admin/dashboard/podcasts/${id}/episodes`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la création de l'épisode");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!podcast) {
    return null;
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6 bg-gradient-to-b from-emerald-50 to-white min-h-screen">
      <div className="mb-8">
        <Link
          href={`/admin/dashboard/podcasts/${id}/episodes`}
          className="flex items-center text-emerald-700 hover:text-emerald-900 font-medium transition-colors group"
        >
          <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
          Retour aux épisodes
        </Link>
      </div>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">Nouvel Épisode</h1>
        <p className="text-emerald-600">Ajoutez un épisode à votre podcast</p>
      </div>

      <Card className="border-none shadow-lg bg-white overflow-hidden">
        <CardHeader className="bg-emerald-700 text-white px-6 py-8">
          <div className="flex items-center space-x-4">
            <div className="bg-emerald-800 p-3 rounded-full">
              <Mic className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Ajouter un nouvel épisode</CardTitle>
              <p className="text-emerald-100 mt-1">
                Podcast : {podcast.title}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Information du podcast parent */}
          <div className="mb-8 p-5 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start space-x-4">
            {podcast.imageUrl ? (
              <div className="relative h-20 w-20 rounded-lg overflow-hidden shadow-md">
                <Image
                  src={new URL(podcast.imageUrl, baseUrl).toString()}
                  alt={podcast.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-20 w-20 bg-emerald-200 rounded-lg">
                <Music className="h-10 w-10 text-emerald-700" />
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-emerald-800">{podcast.title}</h3>
              <p className="text-emerald-600 line-clamp-2 mt-1">
                {podcast.description}
              </p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <input type="hidden" {...form.register("podcastId")} />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-emerald-700">
                      <Music className="h-4 w-4 mr-2" />
                      Titre de l'épisode
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Mon super épisode"
                        {...field}
                        className="border-emerald-200 focus-visible:ring-emerald-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-emerald-700">
                      <span className="flex items-center">
                        <ArrowLeft className="h-4 w-4 mr-2 rotate-180" />
                        Description
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description de l'épisode"
                        className="min-h-[120px] border-emerald-200 focus-visible:ring-emerald-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="episodeNumber"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-emerald-700">
                        <Hash className="h-4 w-4 mr-2" />
                        Numéro d'épisode
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1"
                          value={value === undefined ? "" : value}
                          onChange={(e) => onChange(e.target.value ? Number(e.target.value) : undefined)}
                          className="border-emerald-200 focus-visible:ring-emerald-500"
                          {...rest}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="seasonNumber"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-emerald-700">
                        <Layers className="h-4 w-4 mr-2" />
                        Saison
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1"
                          value={value === undefined ? "" : value}
                          onChange={(e) => onChange(e.target.value ? Number(e.target.value) : undefined)}
                          className="border-emerald-200 focus-visible:ring-emerald-500"
                          {...rest}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Upload d'image pour l'épisode */}
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-emerald-700">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Image de l'épisode (optionnel)
                    </FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                        type="episode"
                        id={`episode-${Date.now()}`} // ID temporaire, sera remplacé par l'ID réel après création
                        disabled={isSubmitting}
                        className="max-w-md"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* Upload audio */}
              <FormField
                control={form.control}
                name="audioUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-emerald-700">
                      <Music className="h-4 w-4 mr-2" />
                      Fichier audio *
                    </FormLabel>
                    <FormControl>
                      <AudioUpload
                        value={field.value}
                        onChange={(url, duration) => {
                          field.onChange(url);
                          if (duration) {
                            form.setValue('duration', duration);
                          }
                        }}
                        episodeId={`episode-${Date.now()}`} // ID temporaire
                        podcastId={id}
                        disabled={isSubmitting}
                        onDurationChange={(duration) => {
                          form.setValue('duration', duration);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting || !form.watch('audioUrl')}
                  className={`bg-emerald-600 text-white hover:bg-emerald-700 ${
                    isSubmitting || !form.watch('audioUrl') ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
                      Création en cours...
                    </span>
                  ) : (
                    "Créer l'épisode"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}