"use client";

import {use, useEffect, useState} from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { SessionSchema } from '@/schemas';
import {Formation, Session} from "@prisma/client";
import Loading from "@/app/(routes)/admin/dashboard/sessions/[id]/loading";

type SessionFormValues = z.infer<typeof SessionSchema>;

export default function SessionDetails({params}: {params: Promise<{ id: string }>}) {
  const { id } = use(params);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session>();
  const [formations, setFormations] = useState<Formation[]>([]);

  const form = useForm<SessionFormValues>({
    resolver: zodResolver(SessionSchema),
    defaultValues: {
      formationId: "",
      startDate: "",
      endDate: "",
      priceEUR: 0,
      priceMAD: 0,
      location: "",
      maxParticipants: 0,
      isOpen: true
    }
  });

  // Charger les données de la session et des formations
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);

        // Charger la session via API
        const sessionResponse = await fetch(`/api/sessions/${id}`);
        if (!sessionResponse.ok) {
          if (sessionResponse.status === 404) {
            return notFound();
          }
          throw new Error(`Error fetching session: ${sessionResponse.statusText}`);
        }
        const sessionData = await sessionResponse.json();
        setSession(sessionData);

        // Charger les formations actives via API
        const formationsResponse = await fetch('/api/formations');
        if (!formationsResponse.ok) {
          throw new Error(`Error fetching formations: ${formationsResponse.statusText}`);
        }
        const formationsData = await formationsResponse.json();

        const activeFormations = formationsData.filter((formation: Formation) => formation.isActive);
        setFormations(activeFormations);

        // Formater les dates pour les inputs de type date
        const startDate = new Date(sessionData.startDate);
        const endDate = new Date(sessionData.endDate);

        const formatDateForInput = (date: Date) => {
          return date.toISOString().split('T')[0]; // Format YYYY-MM-DD
        };

        // Mettre à jour le formulaire avec les données
        form.reset({
          formationId: sessionData.formationId,
          startDate: formatDateForInput(startDate),
          endDate: formatDateForInput(endDate),
          priceEUR: sessionData.priceEUR,
          priceMAD: sessionData.priceMAD,
          location: sessionData.location,
          maxParticipants: sessionData.maxParticipants,
          isOpen: sessionData.isOpen
        });
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        toast.error("Impossible de charger les détails de la session.");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [id, form]);

  const onSubmit = async (values: SessionFormValues) => {
    setIsSubmitting(true);

    try {
      // Mettre à jour la session via API
      const response = await fetch(`/api/sessions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Error updating session: ${response.statusText}`);
      }

      const updatedSession = await response.json();

      toast.success("Session mise à jour", {
        description: "Les modifications ont été enregistrées avec succès."
      });

      setSession(updatedSession);
      router.push("/admin/dashboard/sessions");
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error("Une erreur s'est produite lors de la mise à jour de la session.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Loading />
    );
  }

  if (!session) {
    return notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <Link href="/admin/dashboard/sessions" className="flex items-center text-primary hover:text-primary/80 font-medium transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Retour aux sessions
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Modifier la session</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="formationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Formation</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une formation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {formations.map(formation => (
                          <SelectItem key={formation.id} value={formation.id}>
                            {formation.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date de début</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date de fin</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lieu</FormLabel>
                    <FormControl>
                      <Input placeholder="Paris, Lyon, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
        control={form.control}
        name="priceEUR"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Prix (€)</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="0"
                step="0.01"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="priceMAD"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Prix (MAD)</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="0"
                step="0.01"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
              
              <FormField
                control={form.control}
                name="maxParticipants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre maximum de participants</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isOpen"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Session ouverte aux inscriptions</FormLabel>
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
              
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/dashboard/sessions")}
                >
                  Annuler
                </Button>
                <Button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}