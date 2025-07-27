import Link from 'next/link'
import { PhoneCall, Mail, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">EPBS Consulting</h3>
            <p className="text-primary-foreground/80 mb-4">
              Leader dans la formation professionnelle, nous proposons des 
              programmes de haute qualité adaptés aux besoins des entreprises.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/formations" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Formations ouvertes
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Catalogue complet
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <PhoneCall className="h-5 w-5 text-primary-foreground/80 mt-0.5" />
                <span className="text-primary-foreground/80">+33 (0)1 23 45 67 89</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary-foreground/80 mt-0.5" />
                <span className="text-primary-foreground/80">contact@epbs-consulting.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary-foreground/80 mt-0.5" />
                <span className="text-primary-foreground/80">
                  123 Avenue des Formations<br />
                  75008 Paris
                </span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Restez informé</h4>
            <p className="text-primary-foreground/80 mb-2">
              Inscrivez-vous à notre newsletter pour suivre nos actualités.
            </p>
            <form className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="px-4 py-2 rounded text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded hover:opacity-90 transition-opacity">
                S'inscrire
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-primary-foreground/20 text-primary-foreground/60 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {currentYear} EPBS Consulting. Tous droits réservés.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/mentions-legales" className="hover:text-primary-foreground transition-colors">
                Mentions légales
              </Link>
              <Link href="/politique-de-confidentialite" className="hover:text-primary-foreground transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/cgv" className="hover:text-primary-foreground transition-colors">
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}