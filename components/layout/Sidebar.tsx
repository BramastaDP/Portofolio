'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useI18n } from '@/hooks/useI18n';
import NextImage from 'next/image';
import {
  Home,
  User,
  FolderOpen,
  Trophy,
  Mail,
  ChevronRight,
  Sun,
  Moon,
  Terminal,
} from 'lucide-react';
import { profile } from '@/data/profile';
import { cn } from '@/lib/utils';

const navItems = [
  { key: 'home', href: '/', icon: Home },
  { key: 'about', href: '/about', icon: User },
  { key: 'projects', href: '/projects', icon: FolderOpen },
  { key: 'achievements', href: '/achievements', icon: Trophy },
  { key: 'contact', href: '/contact', icon: Mail },
] as const;

function VerifiedIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <circle cx="12" cy="12" r="12" fill="#3B82F6" />
      <path
        d="M7 12.5l3.5 3.5 6.5-7"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sidebar({ onCommandPalette }: { onCommandPalette?: () => void }) {
  const t = useTranslations('nav');
  const { locale, switchLocale } = useI18n();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const isActive = (href: string) => {
    const segments = pathname.split('/').filter(Boolean);
    const locales = ['id', 'en'];
    const clean = segments[0] && locales.includes(segments[0])
      ? '/' + segments.slice(1).join('/')
      : pathname;
    if (href === '/') return clean === '/' || clean === '';
    return clean.startsWith(href);
  };

  const isDark = resolvedTheme === 'dark';

  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 fixed inset-y-0 left-0 z-40 bg-sidebar border-r border-sidebar-border">
      {/* Profile block */}
      <div className="px-5 pt-7 pb-5 border-b border-sidebar-border">
        <div className="flex items-start gap-3 mb-4">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-14 h-14 rounded-full ring-1 ring-white/10 overflow-hidden bg-gradient-to-br from-amber-400/30 to-amber-600/10 flex items-center justify-center">
              {profile.avatar ? (
                <NextImage
                  src={profile.avatar}
                  alt={profile.name}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                  priority
                />
              ) : (
                <span className="text-xl font-bold text-amber-400">{profile.name.charAt(0)}</span>
              )}
            </div>
            {/* Online dot */}
            <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-sidebar" />
          </div>

          {/* Name + role */}
          <div className="flex-1 min-w-0 pt-0.5">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-white truncate">{profile.name}</span>
              <VerifiedIcon />
            </div>
            <p className="text-xs text-neutral-500 mt-0.5 truncate leading-relaxed">
              {profile.role.en.split('&')[0].trim()}
            </p>
          </div>
        </div>

        {/* Status pill */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
          <span className="text-xs text-amber-400 font-medium">
            {profile.status?.available
              ? (locale === 'id' ? 'Tersedia' : 'Available')
              : (locale === 'id' ? 'Tidak Tersedia' : 'Unavailable')}
          </span>
        </div>

        {/* Controls row */}
        <div className="flex items-center gap-2">
          {/* Language switcher — segmented pill */}
          <div className="flex items-center rounded-lg bg-white/5 border border-white/8 p-0.5 gap-0.5">
            {(['id', 'en'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => switchLocale(lang)}
                aria-label={lang === 'id' ? 'Ganti ke Bahasa Indonesia' : 'Switch to English'}
                aria-pressed={locale === lang}
                className={cn(
                  'flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold transition-all duration-150',
                  locale === lang
                    ? 'bg-amber-500/15 border border-amber-500/25 text-amber-400'
                    : 'text-neutral-600 hover:text-neutral-300 border border-transparent'
                )}
              >
                <span className="text-sm leading-none">{lang === 'id' ? '🇮🇩' : '🇬🇧'}</span>
                <span className="uppercase tracking-widest">{lang}</span>
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/8 transition-colors text-neutral-400 hover:text-neutral-200"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          )}

        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-0.5">
        {navItems.map(({ key, href, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={key}
              href={locale === 'en' ? `/en${href === '/' ? '' : href}` : href}
              className={cn(
                'group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-amber-500/10 text-amber-400'
                  : 'text-neutral-500 hover:text-neutral-200 hover:bg-white/5'
              )}
            >
              <Icon size={16} className={active ? 'text-amber-400' : ''} />
              <span className="flex-1">{t(key)}</span>
              {active && (
                <motion.div layoutId="sidebar-active-arrow">
                  <ChevronRight size={14} className="text-amber-400/70" />
                </motion.div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 pb-5 space-y-1 border-t border-sidebar-border pt-3">
        {/* Command palette button */}
        {onCommandPalette && (
          <button
            onClick={onCommandPalette}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-500 hover:text-neutral-200 hover:bg-white/5 transition-all duration-150"
          >
            <Terminal size={16} />
            <span className="flex-1 text-left">
              {locale === 'id' ? 'Palet Perintah' : 'Command Palette'}
            </span>
            <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/8 border border-white/10 text-xs text-neutral-600 font-mono">
              ⌘K
            </kbd>
          </button>
        )}

        {/* Footer */}
        <p className="px-3 pt-2 text-xs text-neutral-700">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </aside>
  );
}
