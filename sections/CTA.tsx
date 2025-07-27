'use client'

import { motion } from 'framer-motion'
import { Calendar, Download, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from "sonner"

export default function CTASection() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    // Si pas connecté, rediriger vers login avec retour vers téléchargement
    if (!session) {
      const currentUrl = window.location.pathname + window.location.search
      router.push(`/auth/login?callbackUrl=/`)
      return
    }

    setIsDownloading(true)

    try {
      // Appel à l'API route sécurisée
      const response = await fetch('/api/download/brochure', {
        method: 'GET',
        credentials: 'include', // Important pour les cookies de session
      })

      if (!response.ok) {
        if (response.status === 401) {
          // Session expirée, rediriger vers login
          router.push('/auth/login?callbackUrl=/')
          return
        }
        throw new Error('Erreur lors du téléchargement')
      }

      // Créer le blob et télécharger
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'MAJ_PRESENTATION_OFFRE_EPBS_2025.pdf'
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      // Optionnel : notification de succès
      console.log('Téléchargement réussi')

    } catch (error) {
      console.error('Erreur:', error)
      toast.error('Erreur lors du téléchargement. Veuillez réessayer.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <section className="py-16 bg-[var(--color-light)]">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center mb-8">
            <div className="h-px w-12 bg-[var(--color-accent)] mr-3" />
            <span className="text-base font-medium text-[var(--color-accent)] uppercase tracking-widest">
              passons à l'action
            </span>
            <div className="h-px w-12 bg-[var(--color-accent)] ml-3" />
          </div>

          <h2 className="font-mont text-3xl font-bold text-[var(--color-dark)] mb-6">
            Conjuguer <span className="text-[var(--color-primary)]">IMPACT</span> et <span className="text-[var(--color-primary)]">PERFORMANCE</span> :
          </h2>

          <p className="text-lg text-[var(--color-dark)]/80 mb-10 font-lato">
            Notre équipe d'experts vous accompagne dans votre transformation durable
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* Bouton RDV */}
            <motion.a
              href="/contact"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-medium py-4 px-8 rounded-md transition-colors"
            >
              <Calendar className="w-5 h-5" />
              Prenez RDV avec un expert
            </motion.a>

            {/* Bouton de téléchargement sécurisé */}
            <motion.button
              onClick={handleDownload}
              disabled={isDownloading || status === 'loading'}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 font-medium py-4 px-8 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Téléchargement...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Téléchargez notre plaquette
                </>
              )}
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex items-center justify-center text-sm text-[var(--color-dark)]/70 font-lato"
          >
            <svg className="w-4 h-4 mr-2 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {session ? 'Sans engagement • Confidentialité garantie' : 'Connexion requise • Téléchargement immédiat après connexion'}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}