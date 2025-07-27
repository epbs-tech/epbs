"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users } from "lucide-react";
import SessionsLoading from "@/app/(routes)/admin/dashboard/sessions/loading";

interface Session {
  id: string;
  startDate: string;
  endDate: string;
  location: string;
  priceEUR: number;
  priceMAD: number;
  maxParticipants: number;
  currentParticipants: number;
  isOpen: boolean;
  formation: {
    id: string;
    title: string;
  };
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('/api/sessions');
        const data = await response.json();
        setSessions(data);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (isLoading) {
    return <SessionsLoading/>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des sessions</h1>
        <Button asChild>
          <Link href="/admin/dashboard/sessions/new">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle session
          </Link>
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
                {sessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{session.formation.title}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>Du {new Date(session.startDate).toLocaleDateString('fr-FR')}</p>
                        <p>au {new Date(session.endDate).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </TableCell>
                    <TableCell>{session.location}</TableCell>
                    <TableCell>{session.priceEUR} € / {session.priceMAD} MAD</TableCell>
                    <TableCell>
                      {session.currentParticipants}/{session.maxParticipants}
                    </TableCell>
                    <TableCell>
                      <Badge variant={session.isOpen ? "success" : "secondary"}>
                        {session.isOpen ? "Ouverte" : "Fermée"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/dashboard/sessions/${session.id}`}>
                            Modifier
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/dashboard/sessions/${session.id}/registrations`}>
                            <Users className="h-4 w-4 mr-1" />
                            Inscriptions
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