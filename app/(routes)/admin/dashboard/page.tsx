"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, BarChart3, Layers, Calendar, LogOut, Book, FileText } from "lucide-react"
import { Formation, Session, Registration } from '@/lib/types'
import { LogoutButton } from "@/app/components/auth/logout-button"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from 'react'
import { motion } from 'framer-motion'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

// Composant Skeleton pour les cartes
const CardSkeleton = () => (
  <Card className="overflow-hidden">
    <CardHeader className="pb-2">
      <Skeleton className="h-6 w-[150px]" />
      <Skeleton className="h-4 w-[200px] mt-2" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-12 w-12 rounded-full" />
    </CardContent>
    <CardFooter>
      <Skeleton className="h-10 w-full" />
    </CardFooter>
  </Card>
)

// Composant Skeleton pour le tableau
const TableSkeleton = () => (
  <div className="rounded-lg border overflow-hidden">
    <Table>
      <TableHeader>
        <TableRow>
          {[...Array(7)].map((_, i) => (
            <TableHead key={i}>
              <Skeleton className="h-4 w-full" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(3)].map((_, i) => (
          <TableRow key={i}>
            {[...Array(7)].map((_, j) => (
              <TableCell key={j}>
                <Skeleton className="h-4 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
)

// Format date en français
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("formations")
  const [formations, setFormations] = useState<Formation[]>([])
  const [sessions, setSessions] = useState<Session[]>([])
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First, close any past sessions
        await fetch('/api/sessions/close-past-sessions');

        // Then fetch data, using the open-sessions endpoint for sessions
        const [formationsRes, openSessionsRes, registrationsRes] = await Promise.all([
          fetch('/api/formations'),
          fetch('/api/sessions/open'),
          fetch('/api/registrations')
        ]);

        if (!formationsRes.ok || !openSessionsRes.ok || !registrationsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const formationsData = await formationsRes.json();
        const openSessionsData = await openSessionsRes.json();
        const registrationsResData = await registrationsRes.json();

        setFormations(formationsData);
        setSessions(openSessionsData.sessions);
        setRegistrations(registrationsResData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setTimeout(() => setIsLoading(false), 500); // Slight delay for smoother transition
      }
    };

    fetchData();
  }, []);

  const activeFormations = formations.filter(f => f.isActive);
  const inactiveFormations = formations.filter(f => !f.isActive);

  // All sessions are already open (isOpen = true) from the API call
  const openSessions = sessions;

  // Sort upcoming sessions by start date
  const upcomingSessions = [...openSessions]
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  if (isLoading) {
    return (
      <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Skeleton className="h-10 w-[300px]" />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-[150px]" />
            <Skeleton className="h-10 w-[120px]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>

        <div>
          <div className="mb-4">
            <Skeleton className="h-10 w-[300px]" />
          </div>
          <TableSkeleton />
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Chargement...</div>}>
      <motion.div
        className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b"
          variants={itemVariants}
        >
          <div className="flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="btn-primary">
              <Link href="/admin/dashboard/blogs" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Gérer les blogs
              </Link>
            </Button>
            <Button asChild className="btn-primary">
              <Link href="/admin/dashboard/podcasts" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                Gérer les podcasts
              </Link>
            </Button>
            <LogoutButton>
              <Button className="rounded-lg bg-red-500 hover:bg-red-600 transition-all flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Déconnexion
              </Button>
            </LogoutButton>
          </div>
        </motion.div>

        {/* Stat Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border-l-4 border-l-blue-500 transition-all hover:shadow-md">
              <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-transparent">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Layers className="h-5 w-5 text-blue-500" />
                  Formations actives
                </CardTitle>
                <CardDescription>Formations disponibles actuellement</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-blue-500">{activeFormations.length}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full rounded-lg border-blue-200 hover:bg-blue-50 hover:text-blue-600 transition-all">
                  <Link href="/admin/dashboard/formations" className="flex items-center justify-center gap-2">
                    Gérer les formations
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border-l-4 border-l-green-500 transition-all hover:shadow-md">
              <CardHeader className="pb-2 bg-gradient-to-r from-green-50 to-transparent">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-500" />
                  Sessions ouvertes
                </CardTitle>
                <CardDescription>Sessions disponibles à l'inscription</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-green-500">{openSessions.length}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full rounded-lg border-green-200 hover:bg-green-50 hover:text-green-600 transition-all">
                  <Link href="/admin/dashboard/sessions" className="flex items-center justify-center gap-2">
                    Gérer les sessions
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border-l-4 border-l-purple-500 transition-all hover:shadow-md">
              <CardHeader className="pb-2 bg-gradient-to-r from-purple-50 to-transparent">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  Inscriptions
                </CardTitle>
                <CardDescription>Inscriptions en attente de traitement</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-purple-500">{registrations.length}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full rounded-lg border-purple-200 hover:bg-purple-50 hover:text-purple-600 transition-all">
                  <Link href="/admin/dashboard/inscriptions" className="flex items-center justify-center gap-2">
                    Voir les inscriptions
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>

        {/* Tabs Section */}
        <motion.div variants={itemVariants}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-lg mb-6">
              <TabsTrigger
                value="formations"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white py-3"
              >
                <Layers className="h-4 w-4 mr-2" />
                Formations
              </TabsTrigger>
              <TabsTrigger
                value="sessions"
                className="data-[state=active]:bg-green-500 data-[state=active]:text-white py-3"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Sessions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="formations" className="space-y-4 mt-2">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Gestion des formations</h2>
                <Button asChild className="btn-primary">
                  <Link href="/admin/dashboard/formations/new" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Nouvelle formation
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="overflow-hidden border-none shadow-md">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <CardTitle>Formations actives</CardTitle>
                    <CardDescription className="text-blue-100">
                      Formations actuellement disponibles à la vente.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {activeFormations.length > 0 ? (
                        activeFormations.map(formation => (
                          <div
                            key={formation.id}
                            className="p-4 hover:bg-blue-50 transition-colors flex items-center justify-between"
                          >
                            <div>
                              <p className="font-medium">{formation.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {formation.duration}
                              </p>
                            </div>
                            <Button variant="outline" asChild size="sm" className="rounded-lg border-blue-200 hover:bg-blue-100">
                              <Link href={`/admin/dashboard/formations/${formation.id}`}>
                                Modifier
                              </Link>
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground p-4 text-center italic">Aucune formation active.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border-none shadow-md">
                  <CardHeader className="bg-gradient-to-r from-slate-500 to-slate-600 text-white">
                    <CardTitle>Formations inactives</CardTitle>
                    <CardDescription className="text-slate-100">
                      Formations non disponibles à la vente.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {inactiveFormations.length > 0 ? (
                        inactiveFormations.map(formation => (
                          <div
                            key={formation.id}
                            className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between"
                          >
                            <div>
                              <p className="font-medium">{formation.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {formation.duration}
                              </p>
                            </div>
                            <Button variant="outline" asChild size="sm" className="rounded-lg border-slate-200 hover:bg-slate-100">
                              <Link href={`/admin/dashboard/formations/${formation.id}`}>
                                Modifier
                              </Link>
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground p-4 text-center italic">Aucune formation inactive.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sessions" className="space-y-4 mt-2">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-500" />
                  Prochaines sessions
                </h2>
                <Button asChild className="rounded-lg bg-green-500 hover:bg-green-600 transition-all">
                  <Link href="/admin/dashboard/sessions/new" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Ajouter une session
                  </Link>
                </Button>
              </div>

              <Card className="overflow-hidden border-none shadow-md">
                <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Sessions à venir
                  </CardTitle>
                  <CardDescription className="text-green-100">
                    Sessions programmées pour les prochaines semaines.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-green-50">
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
                        {upcomingSessions.length > 0 ? (
                          upcomingSessions.map((session) => (
                            <TableRow key={session.id} className="hover:bg-green-50 transition-colors">
                              <TableCell>
                                <div>
                                  <p className="font-medium">{session?.formation?.title}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  <span className="text-sm">{formatDate(session.startDate)}</span>
                                  <span className="text-xs text-muted-foreground">au {formatDate(session.endDate)}</span>
                                </div>
                              </TableCell>
                              <TableCell>{session.location}</TableCell>
                              <TableCell className="font-medium">{session.priceEURO} € / {session.priceMAD} MAD</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="bg-gray-200 rounded-full h-2 w-16 overflow-hidden">
                                    <div
                                      className="bg-green-500 h-full"
                                      style={{ width: `${(session.currentParticipants / session.maxParticipants) * 100}%` }}
                                    />
                                  </div>
                                  <span className="text-sm">
                                    {session.currentParticipants}/{session.maxParticipants}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant={session.isOpen ? "success" : "secondary"} className={`
                                  ${session.isOpen ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} 
                                  rounded-full px-3 py-1
                                `}>
                                  {session.isOpen ? "Ouverte" : "Fermée"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm" asChild className="rounded-lg border-green-200 hover:bg-green-100 text-green-700">
                                    <Link href={`/admin/dashboard/sessions/${session.id}`}>
                                      Modifier
                                    </Link>
                                  </Button>
                                  <Button variant="outline" size="sm" asChild className="rounded-lg border-purple-200 hover:bg-purple-100 text-purple-700">
                                    <Link href={`/admin/dashboard/sessions/${session.id}/registrations`}>
                                      <Users className="h-4 w-4 mr-1" />
                                      Inscrits
                                    </Link>
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center text-muted-foreground h-32">
                              <div className="flex flex-col items-center justify-center gap-2 p-8">
                                <Calendar className="h-12 w-12 text-gray-300" />
                                <p>Aucune session programmée</p>
                                <Button asChild variant="outline" size="sm" className="mt-2">
                                  <Link href="/admin/dashboard/sessions/new">
                                    <Plus className="h-4 w-4 mr-1" />
                                    Créer une session
                                  </Link>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </Suspense>
  )
}