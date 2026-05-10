'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, User, FolderOpen, Trophy, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/hooks/useI18n';

const navItems = [
  { key: 'home', href: '/', icon: Home },
  { key: 'about', href: '/about', icon: User },
  { key: 'projects', href: '/projects', icon: FolderOpen },
  { key: 'achievements', href: '/achievements', icon: Trophy },
  { key: 'contact', href: '/contact', icon: Mail },
] as const;

export function MobileNav() {
  const t = useTranslations('nav');
  const { locale, switchLocale } = useI18n();
  const pathname = usePathname();

  const isActive = (href: string) => {
    const segments = pathname.split('/').filter(Boolean);
    const locales = ['id', 'en'];
    const clean = segments[0] && locales.includes(segments[0])
      ? '/' + segments.slice(1).join('/')
      : pathname;
    if (href === '/') return clean === '/' || clean === '';
    return clean.startsWith(href);
  };

  const localizedHref = (href: string) =>
    locale === 'en' ? `/en${href === '/' ? '' : href}` : href;

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-sidebar border-t border-sidebar-border">
      <div className="flex items-center justify-around h-16 px-1">
        {navItems.map(({ key, href, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={key}
              href={localizedHref(href)}
              className={cn(
                'flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-lg transition-all duration-150',
                active ? 'text-amber-400' : 'text-neutral-600 hover:text-neutral-300'
              )}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium capitalize">{t(key)}</span>
            </Link>
          );
        })}

        {/* Language toggle */}
        <button
          onClick={() => switchLocale(locale === 'id' ? 'en' : 'id')}
          className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-lg transition-all duration-150 text-neutral-600 hover:text-neutral-300"
          aria-label="Toggle language"
        >
          <span className="text-lg leading-none">{locale === 'id' ? '🇮🇩' : '🇬🇧'}</span>
          <span className="text-[10px] font-medium uppercase">{locale}</span>
        </button>
      </div>
    </nav>
  );
}
