"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Formation } from "@/lib/types";
import { toast } from "sonner";
import { SessionSchema, SessionFormValues } from "@/schemas";

export default function NewSession() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await fetch('/api/formations');
        if (!response.ok) {
          throw new Error('Failed to fetch formations');
        }
        const data = await response.json();
        setFormations(data.filter((f: Formation) => f.isActive));
      } catch (error) {
        console.error('Error fetching formations:', error);
        toast.error("Impossible de charger les formations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFormations();
  }, []);

  const form = useForm<SessionFormValues>({
    resolver: zodResolver(SessionSchema),
    defaultValues: {
      formationId: "",
      startDate: "",
      endDate: "",
      location: "",
      priceEUR: 0,
      priceMAD: 0,
      maxParticipants: 1,
      isOpen: true
    }
  });

  const onSubmit = async (values: SessionFormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to create session');
      }

      toast.success("La nouvelle session a été ajoutée avec succès.", {
        description: "Redirection vers la liste des sessions..."
      });

      router.push("/admin/dashboard/sessions");
    } catch {
      toast.error("Une erreur est survenue lors de la création de la session.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
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
          <CardTitle>Créer une nouvelle session</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <FormField
                  control={form.control}
                  name="isOpen"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </FormControl>
                      <FormLabel className="m-0">Session ouverte aux inscriptions</FormLabel>
                    </FormItem>
                  )}
                />
              </div><FormField
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
                render={({ field: { onChange, ...restField } }) => (
                  <FormItem>
                    <FormLabel>Nombre maximum de participants</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        {...restField}
                        onChange={(e) => onChange(Number(e.target.value))}
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
                <Button type="submit" disabled={isSubmitting} className="btn-primary">
                  {isSubmitting ? "Création en cours..." : "Créer la session"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}