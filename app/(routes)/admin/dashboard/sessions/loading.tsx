"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";

export default function SessionsLoading() {
  // Créer un tableau de faux éléments pour les squelettes
  const skeletonRows = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des sessions</h1>
        <Button disabled>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle session
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sessions programmées</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Formation</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Lieu</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {skeletonRows.map((row) => (
                  <TableRow key={row}>
                    {/* Formation */}
                    <TableCell>
                      <Skeleton className="h-5 w-48" />
                    </TableCell>

                    {/* Dates */}
                    <TableCell>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-4 w-36" />
                      </div>
                    </TableCell>

                    {/* Lieu */}
                    <TableCell>
                      <Skeleton className="h-4 w-28" />
                    </TableCell>

                    {/* Prix */}
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>

                    {/* Participants */}
                    <TableCell>
                      <Skeleton className="h-4 w-12" />
                    </TableCell>

                    {/* Statut */}
                    <TableCell>
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <div className="flex gap-2">
                        <Skeleton className="h-9 w-20 rounded-md" />
                        <Skeleton className="h-9 w-32 rounded-md" />
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