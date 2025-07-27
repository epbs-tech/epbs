"use client"

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, MapPin, Users } from 'lucide-react'
import { Session } from "@prisma/client";
import {useCurrency} from "@/hooks/useCurrency";

interface SessionSelectProps {
  sessions: Session[]
  onSessionSelect: (sessionId: string) => void
  defaultValue?: string
}

export function SessionSelect({ sessions, onSessionSelect, defaultValue }: SessionSelectProps) {
  const [selectedSession, setSelectedSession] = useState(defaultValue || '')
  const { currency} = useCurrency()

  const handleSessionChange = (value: string) => {
    setSelectedSession(value)
    onSessionSelect(value)
  }

  function formatDate(date: Date | string) {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    return parsedDate.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  if (sessions.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">
        Aucune session disponible pour cette formation.
      </div>
    )
  }

  const selectedSessionData = sessions.find(s => s.id === selectedSession)

  return (
    <div className="space-y-6">
      <div className="w-full">
        <Select value={selectedSession} onValueChange={handleSessionChange}>
          <SelectTrigger>
            <SelectValue placeholder="Choisir une session" />
          </SelectTrigger>
          <SelectContent>
            {sessions.map((session) => (
              <SelectItem key={session.id} value={session.id}>
                {formatDate(session.startDate)} - {session.location} - {currency === 'EUR' ? `${session.priceEUR} € `  : `${session.priceMAD} MAD`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedSessionData && (
        <div className="bg-gray-50 rounded-lg p-4 border">
          <h3 className="font-medium text-lg mb-4">
            Détails de la session
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span>Date : Du {formatDate(selectedSessionData.startDate)} au {formatDate(selectedSessionData.endDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span>Lieu : {selectedSessionData.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-500" />
              <span>Places disponibles : {selectedSessionData.maxParticipants - selectedSessionData.currentParticipants} / {selectedSessionData.maxParticipants}</span>
            </div>
            <div className="font-medium">
              Prix :  {currency === 'EUR' ? `${selectedSessionData.priceEUR} €`  : `${selectedSessionData.priceMAD} MAD`}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}