'use client'

import { usePathname } from 'next/navigation';
import ProgressButton from '@/sections/ProgressButton';

export default function ConditionalProgressButton() {
  const pathname = usePathname();

  // Masquer le bouton si l'URL commence par /podcasts
  if (pathname.startsWith('/podcasts')) return null;

  return <ProgressButton />;
}
