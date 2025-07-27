"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function InscriptionsLoading() {
  // Créer un tableau de faux éléments pour les squelettes
  const skeletonRows = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Gestion des inscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Participant</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Formation</TableHead>
                  <TableHead>Session</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Paiement</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {skeletonRows.map((row) => (
                  <TableRow key={row}>
                    {/* Date */}
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>

                    {/* Participant */}
                    <TableCell>
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-36" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </TableCell>

                    {/* Contact */}
                    <TableCell>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </TableCell>

                    {/* Formation */}
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>

                    {/* Session */}
                    <TableCell>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-4 w-28" />
                      </div>
                    </TableCell>

                    {/* Statut */}
                    <TableCell>
                      <Skeleton className="h-10 w-[140px] rounded-md" />
                    </TableCell>

                    {/* Paiement */}
                    <TableCell>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-10 w-[140px] rounded-md" />
                      </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <Skeleton className="h-9 w-20 rounded-md" />
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