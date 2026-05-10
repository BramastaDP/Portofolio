'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

export type Locale = 'id' | 'en';

const LOCALE_STORAGE_KEY = 'preferred-locale';
const LOCALES: Locale[] = ['id', 'en'];

function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (LOCALES.includes(segments[0] as Locale)) {
    const bare = segments.slice(1).join('/');
    return bare ? `/${bare}` : '/';
  }
  return pathname || '/';
}

function buildLocalePath(locale: Locale, bare: string): string {
  return locale === 'id' ? bare : `/en${bare === '/' ? '' : bare}`;
}

export function useI18n() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      const bare = stripLocalePrefix(pathname);
      const target = buildLocalePath(next, bare);
      try {
        localStorage.setItem(LOCALE_STORAGE_KEY, next);
        // Set NEXT_LOCALE cookie so the next-intl middleware respects this choice
        // over the browser's Accept-Language header on subsequent requests
        document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; SameSite=Lax`;
      } catch {}
      router.push(target);
    },
    [locale, pathname, router]
  );

  const formatDate = useCallback(
    (date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
      const d = typeof date === 'string' ? new Date(date) : date;
      if (isNaN(d.getTime())) return '';
      return d.toLocaleDateString(
        locale === 'id' ? 'id-ID' : 'en-US',
        options ?? { year: 'numeric', month: 'long', day: 'numeric' }
      );
    },
    [locale]
  );

  return { locale, switchLocale, formatDate };
}
