'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, FolderOpen, Trophy, Mail, X } from 'lucide-react';

const navItems = [
  { key: 'home', href: '/', icon: Home },
  { key: 'about', href: '/about', icon: User },
  { key: 'projects', href: '/projects', icon: FolderOpen },
  { key: 'achievements', href: '/achievements', icon: Trophy },
  { key: 'contact', href: '/contact', icon: Mail },
] as const;

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();

  const navigate = useCallback((href: string) => {
    const path = locale === 'en' ? `/en${href === '/' ? '' : href}` : href;
    router.push(path);
    onClose();
  }, [locale, router, onClose]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (open) onClose();
      }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-x-0 top-[20%] z-[101] mx-auto max-w-md px-4"
          >
            <div className="bg-[#0d0d0d] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
                <span className="text-sm font-medium text-neutral-400">
                  {locale === 'id' ? 'Navigasi Cepat' : 'Quick Navigation'}
                </span>
                <button
                  onClick={onClose}
                  aria-label={locale === 'id' ? 'Tutup palet perintah' : 'Close command palette'}
                  className="p-1 rounded-md text-neutral-600 hover:text-neutral-300 hover:bg-white/5 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Nav items */}
              <div className="p-2">
                {navItems.map(({ key, href, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => navigate(href)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-400 hover:text-amber-400 hover:bg-amber-500/8 transition-all duration-100 group"
                  >
                    <Icon size={16} className="group-hover:text-amber-400 transition-colors" />
                    <span className="capitalize">{t(key)}</span>
                    <span className="ml-auto text-xs text-neutral-700 font-mono">{href}</span>
                  </button>
                ))}
              </div>

              {/* Footer hint */}
              <div className="px-4 py-2 border-t border-white/8 flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 rounded bg-white/8 border border-white/10 text-xs text-neutral-600 font-mono">esc</kbd>
                <span className="text-xs text-neutral-700">
                  {locale === 'id' ? 'untuk menutup' : 'to close'}
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
