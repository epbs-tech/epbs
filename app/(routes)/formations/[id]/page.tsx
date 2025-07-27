import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getFormationById, getSessionsByFormationId } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Calendar, MapPin, Users, Award } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export async function generateMetadata({params}: {params: Promise<{ id: string }>}) {
  const { id } = await params;
  const formation = await getFormationById(id);

  if (!formation) {
    return {
      title: 'Formation non trouvée - EPBS Consulting',
      description: 'La formation que vous recherchez n\'existe pas.'
    };
  }

  return {
    title: `${formation.title} - EPBS Consulting`,
    description: formation.description
  };
}

export default async function FormationDetailsPage({params}: {params: Promise<{ id: string }>}) {
  const { id } = await params;
  const formation = await getFormationById(id);
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!formation) {
    notFound();
  }

  const sessions = await getSessionsByFormationId(id);
  const hasOpenSessions = sessions.length > 0;

  return (
    <div className="py-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/formations" className="flex items-center text-primary hover:text-primary/80 font-medium transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Retour aux formations
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-72 sm:h-96 overflow-hidden mb-6">
                <Image
                  src={new URL(formation.image, baseUrl).toString()}
                  alt={formation.title}
                  fill
                  priority
                  style={{ objectFit: 'cover' }}
                  className="transition-transform hover:scale-105 duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <Badge variant="secondary" className="mb-3 bg-primary/90 text-white hover:bg-primary">
                    {formation.category}
                  </Badge>
                  <h1 className="text-3xl font-bold text-white drop-shadow-sm">{formation.title}</h1>
                </div>
              </div>

              <div className="px-6 pb-6">
                <div className="flex flex-wrap gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-primary mr-2" />
                    <span>{formation.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-primary mr-2" />
                    <span>Certification ISO 9001</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-primary mr-2" />
                    <span>{formation.level}</span>
                  </div>
                </div>

                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="mb-6 w-full grid grid-cols-3 bg-muted/50">
                    <TabsTrigger value="description" className="text-sm sm:text-base">Description</TabsTrigger>
                    <TabsTrigger value="programme" className="text-sm sm:text-base">Programme</TabsTrigger>
                    <TabsTrigger value="infos" className="text-sm sm:text-base">Informations</TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="space-y-8">
                    <div className="animate-fadeIn">
                      <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                        <span className="w-1.5 h-6 bg-primary rounded-full mr-2"></span>
                        À propos de cette formation
                      </h2>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {formation.detailedDescription || formation.description}
                      </p>
                    </div>

                    {formation.objectives && formation.objectives.length > 0 && (
                      <div className="bg-white rounded-lg p-6 border border-gray-200 animate-fadeIn">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Objectifs</h3>
                        <ul className="space-y-3">
                          {formation.objectives.map((objective, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {formation.prerequisites && formation.prerequisites.length > 0 && (
                      <div className="bg-white rounded-lg p-6 border border-gray-200 animate-fadeIn">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Prérequis</h3>
                        <ul className="space-y-3">
                          {formation.prerequisites.map((prerequisite, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{prerequisite}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="programme" className="space-y-6 animate-fadeIn">
                    {formation.syllabus && formation.syllabus.length > 0 ? (
                      <div className="space-y-6">
                        {formation.syllabus.map((day, index) => (
                          <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs mr-3">{index + 1}</span>
                              {day.title}
                            </h3>
                            <ul className="space-y-3 ml-9">
                              {day.content.map((item, itemIndex) => (
                                <li key={itemIndex} className="flex items-start">
                                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 bg-white border border-gray-200 rounded-lg">
                        <p className="text-gray-600">
                          Programme détaillé non disponible pour cette formation.
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="infos" className="space-y-6 animate-fadeIn">
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <h3 className="text-lg font-semibold mb-4 text-gray-800">Informations pratiques</h3>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                            <Clock className="h-4 w-4 text-primary mr-2" />
                            Durée
                          </h4>
                          <p className="text-gray-700">{formation.duration}</p>
                        </div>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                            <Users className="h-4 w-4 text-primary mr-2" />
                            Public cible
                          </h4>
                          <p className="text-gray-700">{formation.targetAudience}</p>
                        </div>
                        <div className="bg-muted/30 p-4 rounded-lg sm:col-span-2">
                          <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                            <Award className="h-4 w-4 text-primary mr-2" />
                            Méthodes pédagogiques
                          </h4>
                          <p className="text-gray-700">
                            {formation.teachingMethod}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-center text-gray-800">Sessions disponibles</h2>

              <div className="space-y-4 mb-6">
                {hasOpenSessions ? (
                  <div className="space-y-6">
                    {sessions.map((session) => (
                      <div key={session.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-primary/50 transition-colors group">
                        <div className="bg-gray-50 p-4 border-b border-gray-200">
                          <div className="flex items-center mb-2">
                            <Calendar className="h-5 w-5 text-primary mr-2" />
                            <span className="font-medium">
                              {new Date(session.startDate).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 ml-7">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{session.location}</span>
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="flex justify-between items-center mb-3">
                            <div className="text-sm text-gray-600">
                              <span className="font-medium text-primary">{session.maxParticipants - session.currentParticipants}</span> places disponibles
                            </div>
                            {
                              /*
                            <div className="font-bold text-xl text-gray-800">
                              {session.price} €
                            </div>*/
                            }
                          </div>

                          <Button
                            className="w-full btn-primary hover:bg-primary/90 text-white font-medium transition-all group-hover:shadow-md"
                            asChild
                          >
                            <Link href={`/formations/${formation.id}/inscription?session=${session.id}`}>
                              S'inscrire à cette session
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-amber-800 text-center">
                      Aucune session disponible actuellement.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5 font-medium">
                  Demander des informations
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}