"use client";

import { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function ShapedProgressCTA() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const handleScrollToSection = () => {
    if (pathname === '/') {
      const section = document.getElementById('book-meeting');
      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      window.location.href = '/#book-meeting';
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / totalHeight) * 100);
      setIsVisible(window.scrollY > window.innerHeight * 0.3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Version Mobile - Cercle */}
      <div className="md:hidden relative">
        <svg 
          className="w-14 h-14 transform -rotate-90"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="var(--color-gray)"
            strokeWidth="1"
            strokeOpacity="0.2"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * scrollProgress) / 100}
          />
        </svg>
        <button 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[var(--color-primary)] text-white rounded-full p-3 shadow-lg"
        onClick={handleScrollToSection}>
          <Calendar className="w-5 h-5" />
        </button>
      </div>

      {/* Version Desktop - Forme rectangulaire arrondie */}
      <div className="hidden md:block relative">
        <div className="absolute -inset-1.5 rounded-lg overflow-hidden" aria-hidden="true">
          <div 
            className="relative w-full h-full rounded-lg"
            style={{
              background: `linear-gradient(to right, var(--color-accent) ${scrollProgress}%, transparent ${scrollProgress}%)`,
              border: '1px solid var(--color-gray)',
              opacity: 0.8
            }}
          />
        </div>
        <button
          className={`
            relative flex items-center justify-center
            bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]
            text-white rounded-lg px-5 py-3
            transition-all duration-300 hover:scale-[1.02]
            focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-light)]
            shadow-lg
          `}
          onClick={handleScrollToSection}
          aria-label={`Prendre rendez-vous (${Math.round(scrollProgress)}% parcouru)`}
        >
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">Rendez-vous</span>
        </button>
      </div>
    </div>
  );
}