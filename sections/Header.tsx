'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/public/epbs_logo.svg';
import Image from 'next/image';
import MenuIcon from '@/assets/menu.svg';
import { X, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { UserButton } from "@/app/components/auth/user-button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/about', label: 'Qui sommes-nous' },
    { 
      label: 'Ressources',
      submenu: [
        { href: '/blogs', label: 'Blog' },
        { href: '/podcasts', label: 'Podcasts' },
        { href: '/catalogue', label: 'Catalogue' },
        { href: '/formations', label: 'Formations' }
      ]
    },
    { href: '/contact', label: 'Contact' }
  ];

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
      if (!isOpen) {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
          if (currentScrollY > lastScrollY) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
        } else {
          setIsScrolled(false);
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isOpen]);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <>
      {/* Navbar principale */}
      <header className={`fixed w-full z-50 transition-transform duration-300 ${isScrolled && !isOpen ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="bg-white backdrop-blur-md shadow-sm border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-5">
              <Link href="/" className="flex items-center z-60">
                <Image
                  src={Logo}
                  alt="EPBS Logo"
                  height={150}
                  width={150}
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                />
              </Link>

              <nav className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => (
                  <div key={link.label} className="relative">
                    {link.submenu ? (
                      <div className="group">
                        <button
                          onClick={() => toggleSubmenu(link.label)}
                          className="flex items-center gap-1 text-gray-700 hover:text-[--color-primary] font-medium transition-colors text-sm"
                        >
                          {link.label}
                          {openSubmenu === link.label ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </button>
                        
                        <AnimatePresence>
                          {openSubmenu === link.label && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute left-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100"
                            >
                              {link.submenu.map((subItem) => (
                                <Link
                                  key={subItem.label}
                                  href={subItem.href}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[--color-primary]"
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-gray-700 hover:text-[--color-primary] font-medium transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
                <button
                  onClick={handleScrollToSection}
                  className="btn btn-primary ml-2 flex items-center gap-2 pointer-events-auto px-6 py-3 rounded-xl cursor-pointer"
                >
                  <Calendar size={18} />
                  Rendez-vous
                </button>
                <UserButton />
              </nav>

              <div className="md:hidden flex items-center gap-4">
                <UserButton />
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors z-60"
                  aria-label="Menu"
                >
                  {isOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="h-20"></div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[var(--color-primary)] backdrop-blur-sm z-50 pt-24 px-6 overflow-y-auto"
            style={{ marginTop: '80px' }}
          >
            <div className="flex flex-col h-full pb-20">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    {link.submenu ? (
                      <div>
                        <button
                          onClick={() => toggleSubmenu(link.label)}
                          className="w-full text-left py-4 px-6 text-white hover:bg-[var(--color-secondary)] rounded-xl transition-colors font-medium text-xl flex justify-between items-center"
                        >
                          {link.label}
                          {openSubmenu === link.label ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </button>
                        
                        {openSubmenu === link.label && (
                          <div className="pl-6 mt-2 space-y-2">
                            {link.submenu.map((subItem) => (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                onClick={() => setIsOpen(false)}
                                className="block py-3 px-6 text-white hover:bg-[var(--color-secondary)] rounded-xl transition-colors font-medium text-lg"
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block py-4 px-6 text-white hover:bg-[var(--color-secondary)] rounded-xl transition-colors font-medium text-xl"
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
                <UserButton />
              </div>

              <div className="mt-auto pt-6">
                <button
                  onClick={() => {
                    handleScrollToSection();
                    setIsOpen(!isOpen);
                  }}
                  className="btn btn-primary flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-lg w-full"
                >
                  <Calendar size={18} />
                  Rendez-vous
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;