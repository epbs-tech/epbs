"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import FormationsLoading from "@/app/(routes)/admin/dashboard/formations/loading";

interface Formation {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  isActive: boolean;
}

export default function FormationsPage() {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await fetch('/api/formations');
        const data = await response.json();
        setFormations(data);
      } catch (error) {
        console.error('Error fetching formations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFormations();
  }, []);

  if (isLoading) {
    return <FormationsLoading/>
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des formations</h1>
        <Button asChild className="btn-primary">
          <Link href="/admin/dashboard/formations/new">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle formation
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des formations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Formation</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Durée</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formations.map((formation) => (
                  <TableRow key={formation.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{formation.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-3">{formation.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>{formation.category}</TableCell>
                    <TableCell>{formation.duration}</TableCell>
                    <TableCell>
                      <Badge variant={formation.isActive ? "success" : "secondary"}>
                        {formation.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/dashboard/formations/${formation.id}`}>
                            Modifier
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}