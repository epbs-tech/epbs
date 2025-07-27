import Link from 'next/link'
import Image from 'next/image'
import { Formation, Session } from '@prisma/client'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin, Users, ArrowRight, BadgeCheck, Info } from 'lucide-react'

interface FormationCardProps {
  formation: Formation
  sessions: Session[]
  allowRegistration?: boolean
}

export function FormationCard({ formation, sessions, allowRegistration = true }: FormationCardProps) {
  const hasOpenSessions = sessions.length > 0
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-2xl border-0 bg-white dark:bg-gray-800/90 rounded-xl">
      {/* Image avec une superposition de dégradé */}
      <div className="relative h-56">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
        <Image
          src={new URL(formation.image, baseUrl).toString()}
          alt={formation.title}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-500 hover:scale-105"
        />
        <Badge
          variant="secondary"
          className="absolute top-4 left-4 z-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-xs font-medium py-1 px-3 rounded-full shadow-sm"
        >
          {formation.category}
        </Badge>
        <div className="absolute top-4 right-4 z-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full py-1 px-3 flex items-center shadow-sm">
          <Clock className="h-3.5 w-3.5 mr-1 text-green-500" />
          <span className="text-xs font-medium">{formation.duration}</span>
        </div>
      </div>

      <CardContent className="flex-grow p-6">
        <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100 line-clamp-2">
          {formation.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-5 text-sm line-clamp-3">
          {formation.description}
        </p>

        {hasOpenSessions ? (
          <div className="space-y-3 mb-4">
            <div className="flex items-center">
              <BadgeCheck className="h-4 w-4 text-green-500 mr-2" />
              <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-200">
                Sessions disponibles:
              </h4>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/40 rounded-lg p-3">
              <ul className="space-y-3">
                {sessions.slice(0, 2).map(session => (
                  <li key={session.id} className="border-b dark:border-gray-700/50 pb-3 last:border-b-0 last:pb-0">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm font-medium">
                          {new Date(session.startDate).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{session.location}</span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center">
                      <Users className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <div className="w-full relative">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-medium">Places disponibles</span>
                          <span className="text-xs font-medium">
                            {session.currentParticipants}/{session.maxParticipants}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                          <div
                            className="bg-green-500 h-1.5 rounded-full"
                            style={{ width: `${(session.currentParticipants / session.maxParticipants) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {sessions.length > 2 && (
                <div className="mt-3 text-sm text-green-500 dark:textgreen-400 flex items-center">
                  <Info className="h-3.5 w-3.5 mr-1" />
                  <span>+{sessions.length - 2} autres sessions disponibles</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mb-5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/30 rounded-lg p-4 flex items-center">
            <Info className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Aucune session disponible actuellement
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0 gap-3">
        <Button
          variant="outline"
          asChild
          className="flex-1 border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          <Link href={`/formations/${formation.id}`}>
            <span className="flex items-center justify-center">
              <Info className="h-4 w-4 mr-2" />
              Détails
            </span>
          </Link>
        </Button>

        {hasOpenSessions && allowRegistration && (
          <Button
            asChild
            className="flex-1 btn-primary text-white"
          >
            <Link href={`/formations/${formation.id}/inscription`}>
              <span className="flex items-center justify-center">
                S'inscrire
                <ArrowRight className="h-4 w-4 ml-2" />
              </span>
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}