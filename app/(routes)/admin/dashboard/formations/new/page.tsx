"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { FormationSchema } from "@/schemas"
import ImageUpload from "@/components/uploader/images-upload";


type FormationFormValues = z.infer<typeof FormationSchema>;

export default function NewFormation() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [objectives, setObjectives] = useState<string[]>([""]);
  const [prerequisites, setPrerequisites] = useState<string[]>([""]);
  const [syllabus, setSyllabus] = useState<{ title: string; content: string[] }[]>([
    { title: "", content: [""] }
  ]);

  const form = useForm<FormationFormValues>({
    resolver: zodResolver(FormationSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: "",
      category: "",
      level: "",
      image: "",
      isActive: true,
      detailedDescription: "",
      targetAudience: "",
      teachingMethod: "",
      objectives: [],
      prerequisites: [],
      syllabus: []
    }
  });

  const onSubmit = async (values: FormationFormValues) => {
    console.log("Formulaire soumis avec les valeurs:", values);

    // Validation pour s'assurer que nous avons une image
    if (!values.image) {
      toast.error("Image manquante", {
        description: "Veuillez sélectionner une image pour la formation."
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Préparer les données à envoyer
      const formationData = {
        ...values,
        // Filtrer les valeurs vides
        objectives: objectives.filter(obj => obj.trim() !== ""),
        prerequisites: prerequisites.filter(pre => pre.trim() !== ""),
        // Filtrer les sections du syllabus qui ont un titre non-vide et au moins un contenu non-vide
        syllabus: syllabus
          .filter(s => s.title.trim() !== "" && s.content.some(c => c.trim() !== ""))
          .map(s => ({
            title: s.title,
            // Nettoyer également le contenu pour ne garder que les éléments non-vides
            content: s.content.filter(c => c.trim() !== "")
          }))
      };

      // Envoyer les données
      const response = await fetch('/api/formations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create formation');
      }

      // Utilisation de Sonner pour les notifications de succès
      toast.success("Formation créée", {
        description: "La nouvelle formation a été ajoutée avec succès."
      });

      router.push("/admin/dashboard/formations");
    } catch (error) {
      console.error("Erreur lors de la création:", error);
      // Utilisation de Sonner pour les notifications d'erreur
      toast.error("Erreur", {
        description: "Une erreur est survenue lors de la création de la formation."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addObjective = () => setObjectives([...objectives, ""]);
  const removeObjective = (index: number) => {
    const newObjectives = [...objectives];
    newObjectives.splice(index, 1);
    setObjectives(newObjectives);
  };

  const addPrerequisite = () => setPrerequisites([...prerequisites, ""]);
  const removePrerequisite = (index: number) => {
    const newPrerequisites = [...prerequisites];
    newPrerequisites.splice(index, 1);
    setPrerequisites(newPrerequisites);
  };

  const addSyllabusDay = () => setSyllabus([...syllabus, { title: "", content: [""] }]);
  const removeSyllabusDay = (index: number) => {
    const newSyllabus = [...syllabus];
    newSyllabus.splice(index, 1);
    setSyllabus(newSyllabus);
  };
  const addSyllabusContent = (dayIndex: number) => {
    const newSyllabus = [...syllabus];
    newSyllabus[dayIndex].content.push("");
    setSyllabus(newSyllabus);
  };
  const removeSyllabusContent = (dayIndex: number, contentIndex: number) => {
    const newSyllabus = [...syllabus];
    newSyllabus[dayIndex].content.splice(contentIndex, 1);
    setSyllabus(newSyllabus);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <Link href="/admin/dashboard/formations" className="flex items-center text-primary hover:text-primary/80 font-medium transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Retour aux formations
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Créer une nouvelle formation</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre de la formation</FormLabel>
                    <FormControl>
                      <Input placeholder="Titre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Niveau de la formation</FormLabel>
                    <FormControl>
                      <Input placeholder="Niveau" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description courte</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description courte de la formation"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Public cible</FormLabel>
                    <FormControl>
                      <Input placeholder="Public cible" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Durée</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 3 jours" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catégorie</FormLabel>
                      <FormControl>
                        <Input placeholder="Catégorie" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Section ImageUpload */}
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image de la formation</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value}
                          onChange={field.onChange}
                          type="formation"
                          id="new-formation"
                          disabled={isSubmitting}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Formation active</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="detailedDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description détaillée</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Description détaillée de la formation"
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teachingMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Méthodes pédagogiques</FormLabel>
                    <FormControl>
                      <Input placeholder="Méthodes pédagogiques" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Objectifs</h3>
                {objectives.map((objective, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={objective}
                      onChange={(e) => {
                        const newObjectives = [...objectives];
                        newObjectives[index] = e.target.value;
                        setObjectives(newObjectives);
                      }}
                      placeholder="Objectif"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeObjective(index)}
                    >
                      Supprimer
                    </Button>
                  </div>
                ))}
                <Button type="button" className="btn-primary" onClick={addObjective}>
                  Ajouter un objectif
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Prérequis</h3>
                {prerequisites.map((prerequisite, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={prerequisite}
                      onChange={(e) => {
                        const newPrerequisites = [...prerequisites];
                        newPrerequisites[index] = e.target.value;
                        setPrerequisites(newPrerequisites);
                      }}
                      placeholder="Prérequis"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removePrerequisite(index)}
                    >
                      Supprimer
                    </Button>
                  </div>
                ))}
                <Button type="button" className="btn-primary" onClick={addPrerequisite}>
                  Ajouter un prérequis
                </Button>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-medium">Programme</h3>
                {syllabus.map((day, dayIndex) => (
                  <div key={dayIndex} className="border p-4 rounded-lg space-y-4">
                    <div className="flex gap-2">
                      <Input
                        value={day.title}
                        onChange={(e) => {
                          const newSyllabus = [...syllabus];
                          newSyllabus[dayIndex].title = e.target.value;
                          setSyllabus(newSyllabus);
                        }}
                        placeholder="Titre du jour"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeSyllabusDay(dayIndex)}
                      >
                        Supprimer le jour
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {day.content.map((content, contentIndex) => (
                        <div key={contentIndex} className="flex gap-2">
                          <Input
                            value={content}
                            onChange={(e) => {
                              const newSyllabus = [...syllabus];
                              newSyllabus[dayIndex].content[contentIndex] = e.target.value;
                              setSyllabus(newSyllabus);
                            }}
                            placeholder="Contenu"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => removeSyllabusContent(dayIndex, contentIndex)}
                          >
                            Supprimer
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button" className="btn-primary"
                        variant="outline"
                        onClick={() => addSyllabusContent(dayIndex)}
                      >
                        Ajouter un contenu
                      </Button>
                    </div>
                  </div>
                ))}
                <Button type="button" className="btn-primary" onClick={addSyllabusDay}>
                  Ajouter un jour
                </Button>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/dashboard/formations")}
                >
                  Annuler
                </Button>
                <Button type="submit" disabled={isSubmitting} className="btn-primary">
                  {isSubmitting ? "Création en cours..." : "Créer la formation"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}