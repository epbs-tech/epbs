"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowLeft, Mic, User, Globe, Rss, Languages, ImageIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { PodcastSchema } from "@/schemas";

// Import du composant ImageUpload
import ImageUpload from "@/components/uploader/images-upload";

type PodcastFormValues = z.infer<typeof PodcastSchema>;

export default function NewPodcast() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PodcastFormValues>({
    resolver: zodResolver(PodcastSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      language: "fr",
      explicit: false,
      websiteUrl: "",
      feedUrl: "",
      imageUrl: ""
    }
  });

  const onSubmit = async (values: PodcastFormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/podcasts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création du podcast');
      }

      toast.success("Podcast créé avec succès");
      router.push("/admin/dashboard/podcasts");
      router.refresh();
    } catch {
      toast.error("Erreur lors de la création du podcast");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-6 bg-gradient-to-b from-emerald-50 to-white min-h-screen">
      <div className="mb-8">
        <Link
          href="/admin/dashboard/podcasts"
          className="flex items-center text-emerald-700 hover:text-emerald-900 font-medium transition-colors group"
        >
          <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
          Retour aux podcasts
        </Link>
      </div>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">Nouveau Podcast</h1>
        <p className="text-emerald-600">Créez votre nouveau podcast</p>
      </div>

      <Card className="border-none shadow-lg bg-white overflow-hidden">
        <CardHeader className="bg-emerald-700 text-white px-6 py-8">
          <div className="flex items-center space-x-4">
            <div className="bg-emerald-800 p-3 rounded-full">
              <Mic className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Créer un nouveau podcast</CardTitle>
              <p className="text-emerald-100 mt-1">
                Configurez les informations de base de votre podcast
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-emerald-700">
                      <Mic className="h-4 w-4 mr-2" />
                      Titre du podcast
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Mon super podcast"
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
                      <ArrowLeft className="h-4 w-4 mr-2 rotate-180" />
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description du podcast"
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
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-emerald-700">
                        <User className="h-4 w-4 mr-2" />
                        Auteur
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nom de l'auteur"
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
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-emerald-700">
                        <Languages className="h-4 w-4 mr-2" />
                        Langue
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="fr"
                          {...field}
                          className="border-emerald-200 focus-visible:ring-emerald-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Upload d'image pour le podcast */}
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-emerald-700">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Image du podcast
                    </FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                        type="podcast"
                        id={`podcast-${Date.now()}`} // ID temporaire, sera remplacé par l'ID réel après création
                        disabled={isSubmitting}
                        className="max-w-md"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="explicit"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-emerald-200 p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-emerald-700 font-medium">
                        Contenu explicite
                      </FormLabel>
                      <p className="text-sm text-emerald-600">
                        Indiquez si votre podcast contient du contenu explicite
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-emerald-600"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="websiteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-emerald-700">
                        <Globe className="h-4 w-4 mr-2" />
                        Site web
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://monpodcast.com"
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
                  name="feedUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-emerald-700">
                        <Rss className="h-4 w-4 mr-2" />
                        URL du flux RSS
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://monpodcast.com/feed.xml"
                          {...field}
                          className="border-emerald-200 focus-visible:ring-emerald-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/dashboard/podcasts")}
                  className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-emerald-600 text-white hover:bg-emerald-700 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
                      Création en cours...
                    </span>
                  ) : (
                    "Créer le podcast"
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