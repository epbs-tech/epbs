'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function BrochureDownloadPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      // Rediriger vers /login avec ?redirect=/brochure-download
      router.push('/auth/login?callbackUrl=/brochure-download')
    } else {
      // Démarrer le téléchargement
      const link = document.createElement('a')
      link.href = '/docs/plaquetteEpbs.pdf'
      link.download = 'plaquetteEpbs.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Redirection vers page d'accueil (facultatif)
      setTimeout(() => router.push('/'))//m, 2000)
    }
  }, [status, session, router])

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
      Préparation du téléchargement...
    </div>
  )
}
