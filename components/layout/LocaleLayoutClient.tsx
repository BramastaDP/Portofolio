'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileNav } from '@/components/layout/MobileNav';
import { PageTransition } from '@/components/layout/PageTransition';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { ScrollProgressBar } from '@/components/ui/scroll-progress';
import { CursorSpotlight } from '@/components/ui/cursor-spotlight';
import { useI18n, type Locale } from '@/hooks/useI18n';

const LOCALE_STORAGE_KEY = 'preferred-locale';

export function LocaleLayoutClient({ children }: { children: React.ReactNode }) {
  const [cmdOpen, setCmdOpen] = useState(false);
  const { locale, switchLocale } = useI18n();

  // Sync locale preference: if localStorage has a stored choice, ensure the
  // NEXT_LOCALE cookie is set so the middleware respects it on hard refreshes.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
      if (stored && (stored === 'id' || stored === 'en')) {
        // Always keep cookie in sync with stored preference
        document.cookie = `NEXT_LOCALE=${stored}; path=/; max-age=31536000; SameSite=Lax`;
        if (stored !== locale) {
          switchLocale(stored);
        }
      }
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <ScrollProgressBar />
      <CursorSpotlight />
      <Sidebar onCommandPalette={() => setCmdOpen(true)} />
      <main className="flex-1 lg:ml-60 pb-16 lg:pb-0 min-h-screen">
        <PageTransition>{children}</PageTransition>
      </main>
      <MobileNav />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </>
  );
}
