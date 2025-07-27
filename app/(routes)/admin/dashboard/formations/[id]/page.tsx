"use client";

import {use, useEffect, useState} from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, BookOpen, User, Clock, Tag, ImageIcon, Target, FileText, Users, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { FormationSchema } from "@/schemas";
import {Formation, Syllabus} from "@prisma/client";
import FormationDetailLoading from "@/app/(routes)/admin/dashboard/formations/[id]/loading";

// Import du composant ImageUpload
import ImageUpload from "@/components/uploader/images-upload";

type FormationFormValues = z.infer<typeof FormationSchema>;

export default function FormationDetails({params}: {params: Promise<{ id: string }>}) {
  const { id } = use(params);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formation, setFormation] = useState<Formation>();
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

  // Charger les données de la formation
  useEffect(() => {
    async function loadFormation() {
      try {
        setIsLoading(true);

        const res = await fetch(`/api/formations/${id}`);
        const formationData = await res.json();
        setFormation(formationData);

        if (!formationData) {
          return notFound();
        }

        setFormation(formationData);

        // Mise à jour des valeurs du formulaire
        form.reset({
          title: formationData.title,
          description: formationData.description,
          duration: formationData.duration,
          category: formationData.category,
          level: formationData.level,
          image: formationData.image || "",
          isActive: formationData.isActive,
          detailedDescription: formationData.detailedDescription || "",
          targetAudience: formationData.targetAudience || "",
          teachingMethod: formationData.teachingMethod || "",
          objectives: formationData.objectives || [],
          prerequisites: formationData.prerequisites || [],
          syllabus: formationData.syllabus || []
        });

        // Initialiser les états locaux
        setObjectives(formationData.objectives?.length ? formationData.objectives : [""]);
        setPrerequisites(formationData.prerequisites?.length ? formationData.prerequisites : [""]);

        // Traiter le syllabus qui est une relation dans Prisma
        const syllabusData = formationData.syllabus?.length
          ? formationData.syllabus.map((item: Syllabus) => ({
              title: item.title,
              content: Array.isArray(item.content) ? item.content : [item.content]
            }))
          : [{ title: "", content: [""] }];

        setSyllabus(syllabusData);
      } catch (error) {
        console.error("Erreur lors du chargement de la formation:", error);
        toast.error("Impossible de charger les détails de la formation");
      } finally {
        setIsLoading(false);
      }
    }

    loadFormation();
  }, [id, form]);

  const onSubmit = async (values: FormationFormValues) => {
    setIsSubmitting(true);

    // Filtrer les champs vides
    const filteredObjectives = objectives.filter(obj => obj.trim() !== "");
    const filteredPrerequisites = prerequisites.filter(pre => pre.trim() !== "");
    const filteredSyllabus = syllabus
      .filter(s => s.title.trim() !== "")
      .map(s => ({
        title: s.title,
        content: s.content.filter(c => c.trim() !== "")
      }))
      .filter(s => s.content.length > 0);

    // Construire le corps de la requête
    const formData = {
      ...values,
      objectives: filteredObjectives,
      prerequisites: filteredPrerequisites,
      syllabus: filteredSyllabus
    };

    try {
      const response = await fetch(`/api/formations/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Erreur serveur: ${response.status}`);
      }

      toast.success("Formation mise à jour avec succès");
      router.push("/admin/dashboard/formations");
      router.refresh();
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error("Erreur lors de la mise à jour de la formation");
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

  if (isLoading) {
    return (
      <FormationDetailLoading/>
    );
  }

  if (!formation) {
    return notFound();
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="mb-8">
        <Link
          href="/admin/dashboard/formations"
          className="flex items-center text-blue-700 hover:text-blue-900 font-medium transition-colors group"
        >
          <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
          Retour aux formations
        </Link>
      </div>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">Modifier la Formation</h1>
        <p className="text-blue-600">Modifiez les informations de votre formation</p>
      </div>

      <Card className="border-none shadow-lg bg-white overflow-hidden">
        <CardHeader className="bg-blue-700 text-white px-6 py-8">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-800 p-3 rounded-full">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Modifier la formation</CardTitle>
              <p className="text-blue-100 mt-1">
                Mettez à jour les informations de votre formation
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
                    <FormLabel className="flex items-center text-blue-700">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Titre de la formation
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Titre de la formation"
                        {...field}
                        className="border-blue-200 focus-visible:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-blue-700">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      Niveau de la formation
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Débutant, Intermédiaire, Avancé"
                        {...field}
                        className="border-blue-200 focus-visible:ring-blue-500"
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
                    <FormLabel className="flex items-center text-blue-700">
                      <FileText className="h-4 w-4 mr-2" />
                      Description courte
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description courte de la formation"
                        className="min-h-[100px] border-blue-200 focus-visible:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-blue-700">
                      <Users className="h-4 w-4 mr-2" />
                      Public cible
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Développeurs, Chefs de projet, etc."
                        {...field}
                        className="border-blue-200 focus-visible:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-blue-700">
                        <Clock className="h-4 w-4 mr-2" />
                        Durée
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: 3 jours, 40 heures"
                          {...field}
                          className="border-blue-200 focus-visible:ring-blue-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-blue-700">
                        <Tag className="h-4 w-4 mr-2" />
                        Catégorie
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Développement, Design, Marketing"
                          {...field}
                          className="border-blue-200 focus-visible:ring-blue-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Upload d'image pour la formation */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-blue-700">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Image de la formation
                    </FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                        type="formation"
                        id={id} // Utiliser l'ID réel de la formation
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
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-blue-200 p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-blue-700 font-medium">
                        Formation active
                      </FormLabel>
                      <p className="text-sm text-blue-600">
                        Indiquez si cette formation est actuellement disponible
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-blue-600"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="detailedDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-blue-700">
                      <FileText className="h-4 w-4 mr-2" />
                      Description détaillée
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description détaillée de la formation"
                        className="min-h-[150px] border-blue-200 focus-visible:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teachingMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-blue-700">
                      <User className="h-4 w-4 mr-2" />
                      Méthodes pédagogiques
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Cours magistraux, ateliers pratiques, projets"
                        {...field}
                        className="border-blue-200 focus-visible:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-800 flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Objectifs
                </h3>
                {objectives.map((objective, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={objective}
                      onChange={(e) => {
                        const newObjectives = [...objectives];
                        newObjectives[index] = e.target.value;
                        setObjectives(newObjectives);
                      }}
                      placeholder="Objectif de la formation"
                      className="border-blue-200 focus-visible:ring-blue-500"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeObjective(index)}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Supprimer
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={addObjective}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Ajouter un objectif
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-800 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Prérequis
                </h3>
                {prerequisites.map((prerequisite, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={prerequisite}
                      onChange={(e) => {
                        const newPrerequisites = [...prerequisites];
                        newPrerequisites[index] = e.target.value;
                        setPrerequisites(newPrerequisites);
                      }}
                      placeholder="Prérequis pour suivre la formation"
                      className="border-blue-200 focus-visible:ring-blue-500"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removePrerequisite(index)}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Supprimer
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={addPrerequisite}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Ajouter un prérequis
                </Button>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-medium text-blue-800 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Programme
                </h3>
                {syllabus.map((day, dayIndex) => (
                  <div key={dayIndex} className="border border-blue-200 p-4 rounded-lg space-y-4 bg-blue-50/30">
                    <div className="flex gap-2">
                      <Input
                        value={day.title}
                        onChange={(e) => {
                          const newSyllabus = [...syllabus];
                          newSyllabus[dayIndex].title = e.target.value;
                          setSyllabus(newSyllabus);
                        }}
                        placeholder="Titre du jour/module"
                        className="border-blue-200 focus-visible:ring-blue-500"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeSyllabusDay(dayIndex)}
                        className="border-red-200 text-red-600 hover:bg-red-50"
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
                            placeholder="Contenu du cours"
                            className="border-blue-200 focus-visible:ring-blue-500"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => removeSyllabusContent(dayIndex, contentIndex)}
                            className="border-red-200 text-red-600 hover:bg-red-50"
                          >
                            Supprimer
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addSyllabusContent(dayIndex)}
                        className="border-blue-200 text-blue-600 hover:bg-blue-50"
                      >
                        Ajouter un contenu
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={addSyllabusDay}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Ajouter un jour
                </Button>
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/dashboard/formations")}
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-blue-600 text-white hover:bg-blue-700 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
                      Enregistrement...
                    </span>
                  ) : (
                    "Enregistrer les modifications"
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