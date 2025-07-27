import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Transformez votre <span className="text-primary">carrière</span> avec nos formations d'excellence
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            EPBS Consulting propose des formations professionnelles de haute qualité
            pour développer vos compétences et accélérer votre évolution professionnelle.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/formations" className="flex items-center gap-2">
                Voir nos formations
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/catalogue">
                Parcourir le catalogue
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}