import { ReactNode } from 'react';
import Link from 'next/link';

interface LegalLayoutProps {
  children: ReactNode;
  title: string;
  lastUpdated: string;
}

export default function LegalLayout({ children, title, lastUpdated }: LegalLayoutProps) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-[var(--color-primary)] text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
            <p className="mt-2 opacity-80">Dernière mise à jour : {lastUpdated}</p>
          </div>
        </header>
        
        <main>{children}</main>
        
        <footer className="bg-gray-100 py-8 border-t">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <Link href="/" className="hover:text-[var(--color-primary)]">
              ← Retour à l'accueil
            </Link>
          </div>
        </footer>
      </div>
    );
  }