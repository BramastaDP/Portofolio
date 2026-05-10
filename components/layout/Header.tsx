'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const pageKeys: Record<string, 'home' | 'about' | 'projects' | 'achievements' | 'contact'> = {
  '/': 'home',
  '/about': 'about',
  '/projects': 'projects',
  '/achievements': 'achievements',
  '/contact': 'contact',
};

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);
  const locales = ['id', 'en'];
  const pathWithoutLocale = segments[0] && locales.includes(segments[0])
    ? '/' + segments.slice(1).join('/')
    : pathname;

  const currentKey = pathWithoutLocale === '' ? 'home' : pageKeys[pathWithoutLocale] ?? 'home';

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="hidden lg:flex items-center justify-between px-8 py-4 border-b border-border bg-background/60 backdrop-blur-sm sticky top-0 z-30"
    >
      <div>
        <h1 className="text-lg font-semibold text-foreground capitalize">
          {t(currentKey)}
        </h1>
        <div className="h-0.5 w-8 bg-primary rounded-full mt-1" />
      </div>
    </motion.header>
  );
}
