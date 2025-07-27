import Link from 'next/link'
import Image from 'next/image'
import { getActiveFormations, getOpenSessions } from '@/lib/data'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin } from 'lucide-react'

export async function FeaturedFormations() {
  // Récupérer les données de manière asynchrone
  const activeFormations = await getActiveFormations();
  const allSessions = await getOpenSessions();

  // Obtenir les 3 premières formations
  const featuredFormations = activeFormations.slice(0, 3);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nos formations en vedette</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos formations les plus populaires, conçues pour vous aider à
            développer vos compétences professionnelles et à atteindre vos objectifs.
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredFormations.map(formation => {
            const formationSessions = allSessions.filter(
              session => session.formationId === formation.id
            )
            const hasOpenSessions = formationSessions.length > 0
            const lowestPrice = hasOpenSessions
              ? Math.min(...formationSessions.map(s => s.priceMAD))
              : null

            return (
              <Card key={formation.id} className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg">
                <div className="relative h-48">
                  <Image
                    src={formation.image}
                    alt={formation.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <CardContent className="pt-6 flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="secondary" className="mb-2">
                      {formation.category}
                    </Badge>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">{formation.duration}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-3">
                    {formation.title}
                  </h3>

                  <p className="text-muted-foreground mb-4">
                    {formation.description}
                  </p>

                  {hasOpenSessions && (
                    <div className="mb-4">
                      <h4 className="font-medium text-sm mb-2">Prochaines sessions :</h4>
                      <ul className="space-y-2">
                        {formationSessions.slice(0, 2).map(session => (
                          <li key={session.id} className="flex flex-wrap items-start text-sm">
                            <div className="flex items-center mr-4 mb-1">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>
                                {new Date(session.startDate).toLocaleDateString('fr-FR', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{session.location}</span>
                            </div>
                            <div className="w-full mt-1 text-primary font-medium">
                              {session.priceMAD} MAD
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>

                <CardFooter>
                  <div className="w-full flex justify-between items-center">
                    {lowestPrice !== null && (
                      <p className="font-bold text-lg">
                        À partir de {lowestPrice} MAD
                      </p>
                    )}
                    <Button variant="outline" asChild>
                      <Link href={`/formations/${formation.id}`}>
                        Détails
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            )
          })}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link href="/formations">
              Voir toutes les formations
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}