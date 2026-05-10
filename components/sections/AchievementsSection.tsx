'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Search, ChevronDown, Copy, Check, X, ExternalLink, Star } from 'lucide-react';
import { achievements, type Achievement, type AchievementCategory, type AchievementType, achievementCategoryLabel } from '@/data/achievements';
import { cn } from '@/lib/utils';

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_GRADIENT: Record<AchievementCategory, string> = {
  professional: 'from-amber-500/20 via-amber-900/10 to-neutral-900/40',
  course:       'from-sky-500/20 via-sky-900/10 to-neutral-900/40',
  award:        'from-yellow-400/25 via-orange-900/10 to-neutral-900/40',
  recognition:  'from-violet-500/20 via-violet-900/10 to-neutral-900/40',
};

const CATEGORY_TAG: Record<AchievementCategory, string> = {
  professional: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  course:       'bg-sky-500/10 text-sky-400 border-sky-500/20',
  award:        'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  recognition:  'bg-violet-500/10 text-violet-400 border-violet-500/20',
};

const TYPE_TAG: Record<AchievementType, string> = {
  certificate: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  badge:       'bg-pink-500/10 text-pink-400 border-pink-500/20',
};

const MONTH_EN = ['', 'January','February','March','April','May','June','July','August','September','October','November','December'];
const MONTH_ID = ['', 'Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(date: string, locale: string): string {
  if (!date) return '';
  if (date.includes('/')) {
    const [m, y] = date.split('/');
    const months = locale === 'id' ? MONTH_ID : MONTH_EN;
    return `${months[parseInt(m)] ?? ''} ${y}`.toUpperCase().trim();
  }
  return date.toUpperCase();
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-white/8 overflow-hidden">
      <div className="aspect-[4/3] bg-white/5 animate-pulse" />
      <div className="p-4 space-y-2.5">
        <div className="h-4 bg-white/5 rounded-md w-4/5 animate-pulse" />
        <div className="h-3 bg-white/5 rounded-md w-1/2 animate-pulse" />
        <div className="flex gap-1.5 pt-1">
          <div className="h-5 w-20 bg-white/5 rounded-full animate-pulse" />
          <div className="h-5 w-16 bg-white/5 rounded-full animate-pulse" />
        </div>
        <div className="h-3 bg-white/5 rounded-md w-2/3 animate-pulse" />
      </div>
    </div>
  );
}

// ─── Filter Dropdown ──────────────────────────────────────────────────────────

function FilterSelect({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all duration-150',
          open
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
            : 'bg-white/4 border-white/10 text-neutral-400 hover:border-white/20 hover:text-neutral-200'
        )}
      >
        <span>{current?.label ?? label}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.15 }}>
          <ChevronDown size={12} />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full mt-1.5 left-0 z-50 min-w-[160px] bg-[#0d0d0d] border border-white/12 rounded-xl overflow-hidden shadow-2xl"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={cn(
                  'w-full text-left px-3 py-2 text-xs transition-colors hover:bg-white/6',
                  value === opt.value ? 'text-amber-400 bg-amber-500/8' : 'text-neutral-400'
                )}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Certificate image with gradient fallback ─────────────────────────────────

function CertImage({ src, alt, category }: { src?: string; alt: string; category: AchievementCategory }) {
  const [err, setErr] = useState(false);
  const showGradient = !src || err;

  return (
    <div className={cn('relative w-full h-full', showGradient && `bg-gradient-to-br ${CATEGORY_GRADIENT[category]}`)}>
      {!showGradient && (
        <Image
          src={src!}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => setErr(true)}
        />
      )}
      {showGradient && (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-5xl font-black text-white/8 select-none">{alt.charAt(0)}</span>
        </div>
      )}
    </div>
  );
}

// ─── Achievement Card ─────────────────────────────────────────────────────────

const cardVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.3 } },
  exit:   { opacity: 0, y: -8, scale: 0.96, transition: { duration: 0.18 } },
};

function AchievementCard({
  ach,
  onOpen,
}: {
  ach: Achievement;
  onOpen: (a: Achievement) => void;
}) {
  const t = useTranslations('achievements');
  const locale = useLocale() as 'id' | 'en';
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = ach.credentialUrl ?? ach.credentialId ?? '';
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const categoryLabel = achievementCategoryLabel[ach.category];

  return (
    <motion.div
      variants={cardVariants}
      layout
      onClick={() => onOpen(ach)}
      className="group relative rounded-xl border border-white/8 bg-white/3 overflow-hidden cursor-pointer hover:border-white/16 hover:bg-white/5 transition-colors duration-200"
    >
      {/* Image area 4:3 */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <CertImage src={ach.image} alt={ach.title} category={ach.category} />

        {/* Featured star */}
        {ach.featured && (
          <div className="absolute top-2.5 left-2.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/30 text-xs text-amber-400 backdrop-blur-sm">
              <Star size={9} className="fill-amber-400" /> {t('featured')}
            </span>
          </div>
        )}

        {/* Credential ID overlay */}
        {ach.credentialId && (
          <div className="absolute bottom-2.5 left-2.5 right-2.5">
            <span className="inline-block px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] text-neutral-400 font-mono truncate max-w-full">
              #{ach.credentialId}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 mb-1.5">
          {ach.title}
        </h3>

        {/* Issuer */}
        <p className="text-xs text-neutral-500 mb-3">{ach.issuer}</p>

        {/* Category + type tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-medium', CATEGORY_TAG[ach.category])}>
            {categoryLabel[locale]}
          </span>
          <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-medium', TYPE_TAG[ach.type])}>
            {t(`type.${ach.type}`)}
          </span>
        </div>

        {/* Date + copy */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] tracking-widest font-medium text-neutral-600 uppercase">
            {t('issued_on_label')} {formatDate(ach.date, locale)}
          </span>
          {(ach.credentialUrl || ach.credentialId) && (
            <button
              onClick={handleCopy}
              className={cn(
                'p-1.5 rounded-md transition-colors',
                copied
                  ? 'text-green-400 bg-green-500/10'
                  : 'text-neutral-600 hover:text-neutral-300 hover:bg-white/8'
              )}
              aria-label={copied ? t('copied') : t('copy_link')}
            >
              {copied ? <Check size={11} /> : <Copy size={11} />}
            </button>
          )}
        </div>

        {/* Expand divider + plus button */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/8">
          <div className="flex-1 h-px bg-white/0" />
          <button
            onClick={(e) => { e.stopPropagation(); onOpen(ach); }}
            aria-label={t('view_credential')}
            className="flex items-center justify-center w-6 h-6 rounded-full bg-white/8 border border-white/12 text-neutral-400 hover:bg-amber-500/15 hover:text-amber-400 hover:border-amber-500/30 transition-all text-xs font-bold"
          >
            +
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────

function DetailModal({ ach, onClose }: { ach: Achievement; onClose: () => void }) {
  const t = useTranslations('achievements');
  const locale = useLocale() as 'id' | 'en';

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [onClose]);

  return (
    <AnimatePresence>
      {ach && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto w-full max-w-lg bg-[#111111] border border-white/12 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] shrink-0">
                <CertImage src={ach.image} alt={ach.title} category={ach.category} />
                <button
                  onClick={onClose}
                  aria-label={t('close')}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/70 transition-colors"
                >
                  <X size={15} />
                </button>
                {ach.featured && (
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/30 text-xs text-amber-400 backdrop-blur-sm">
                      <Star size={9} className="fill-amber-400" /> {t('featured')}
                    </span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="overflow-y-auto p-5 space-y-4">
                {/* Title + tags */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-medium', CATEGORY_TAG[ach.category])}>
                      {achievementCategoryLabel[ach.category][locale]}
                    </span>
                    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-medium', TYPE_TAG[ach.type])}>
                      {t(`type.${ach.type}`)}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-white leading-snug">{ach.title}</h2>
                  <p className="text-sm text-neutral-500 mt-1">{ach.issuer}</p>
                </div>

                {/* Dates */}
                <div className="flex flex-wrap gap-4 text-xs">
                  <div>
                    <p className="text-[10px] tracking-widest text-neutral-600 uppercase mb-0.5">{t('issued_on')}</p>
                    <p className="text-neutral-300 font-medium">{formatDate(ach.date, locale)}</p>
                  </div>
                  {ach.expiry && (
                    <div>
                      <p className="text-[10px] tracking-widest text-neutral-600 uppercase mb-0.5">{t('expires')}</p>
                      <p className="text-neutral-300 font-medium">{formatDate(ach.expiry, locale)}</p>
                    </div>
                  )}
                </div>

                {/* Credential ID */}
                {ach.credentialId && (
                  <div>
                    <p className="text-[10px] tracking-widest text-neutral-600 uppercase mb-1">{t('credential_id')}</p>
                    <p className="text-xs font-mono text-neutral-400 bg-white/4 border border-white/8 rounded-lg px-3 py-2 break-all">
                      {ach.credentialId}
                    </p>
                  </div>
                )}

                {/* Description */}
                <div>
                  <p className="text-xs text-neutral-400 leading-relaxed">{ach.description[locale]}</p>
                </div>

                {/* Tags */}
                {ach.tags.length > 0 && (
                  <div>
                    <p className="text-[10px] tracking-widest text-neutral-600 uppercase mb-2">{t('tags')}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {ach.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-xs text-neutral-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* View credential */}
                {ach.credentialUrl && (
                  <a
                    href={ach.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm text-amber-400 font-medium hover:bg-amber-500/15 transition-colors"
                  >
                    <ExternalLink size={14} />
                    {t('view_credential')}
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

const gridVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
  exit:  { opacity: 0, transition: { duration: 0.15 } },
};

export function AchievementsSection() {
  const t = useTranslations('achievements');
  const locale = useLocale() as 'id' | 'en';

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | AchievementType>('all');
  const [filterCategory, setFilterCategory] = useState<'all' | AchievementCategory>('all');
  const [selected, setSelected] = useState<Achievement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(id);
  }, []);

  const filtered = achievements.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      a.title.toLowerCase().includes(q) ||
      a.issuer.toLowerCase().includes(q) ||
      a.tags.some((tag) => tag.toLowerCase().includes(q));
    const matchType = filterType === 'all' || a.type === filterType;
    const matchCat = filterCategory === 'all' || a.category === filterCategory;
    return matchSearch && matchType && matchCat;
  });

  const filterKey = `${search}|${filterType}|${filterCategory}`;

  const typeOptions = [
    { value: 'all', label: t('all_types') },
    { value: 'certificate', label: t('type.certificate') },
    { value: 'badge', label: t('type.badge') },
  ];

  const categoryOptions = [
    { value: 'all', label: t('all_categories') },
    { value: 'professional', label: achievementCategoryLabel.professional[locale] },
    { value: 'course', label: achievementCategoryLabel.course[locale] },
    { value: 'award', label: achievementCategoryLabel.award[locale] },
    { value: 'recognition', label: achievementCategoryLabel.recognition[locale] },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-0 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-bold text-white">{t('title')}</h1>
            <p className="text-neutral-500 text-sm mt-1">{t('subtitle')}</p>
          </div>
          <span className="text-xs text-neutral-600 font-medium">
            {t('total')}: <span className="text-amber-400/80">{achievements.length}</span>
          </span>
        </div>
        <div className="h-px w-12 bg-amber-500/60 mt-4" />
      </motion.div>

      {/* Search + Filters */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-wrap items-center gap-2 mb-8"
      >
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('search_placeholder')}
            aria-label={t('search_placeholder')}
            className="w-full pl-8 pr-3 py-2 rounded-lg bg-white/4 border border-white/10 text-xs text-neutral-300 placeholder-neutral-600 focus:outline-none focus:border-amber-500/40 focus:bg-white/6 transition-all"
          />
        </div>

        {/* Type filter */}
        <FilterSelect
          value={filterType}
          onChange={(v) => setFilterType(v as typeof filterType)}
          options={typeOptions}
          label={t('filter_type')}
        />

        {/* Category filter */}
        <FilterSelect
          value={filterCategory}
          onChange={(v) => setFilterCategory(v as typeof filterCategory)}
          options={categoryOptions}
          label={t('filter_category')}
        />

        {/* Results count */}
        {(search || filterType !== 'all' || filterCategory !== 'all') && (
          <span className="text-xs text-neutral-600">
            {filtered.length} / {achievements.length}
          </span>
        )}
      </motion.div>

      {/* Grid */}
      {!mounted ? (
        /* Skeleton */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center text-neutral-600 text-sm"
            >
              {t('no_results')}
            </motion.div>
          ) : (
            <motion.div
              key={filterKey}
              variants={gridVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filtered.map((ach) => (
                <AchievementCard key={ach.id} ach={ach} onOpen={setSelected} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Modal */}
      {selected && <DetailModal ach={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
