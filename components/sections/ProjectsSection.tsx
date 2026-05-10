'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ExternalLink, X, Star } from 'lucide-react';
import Link from 'next/link';
import { SkillIcon } from '@/components/ui/skill-icon';
import {
  projects,
  type Project,
  type ProjectCategory,
  type ProjectType,
} from '@/data/projects';
import { cn } from '@/lib/utils';

// ─── Inline icons ─────────────────────────────────────────────────────────────

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CAT_TAG: Record<ProjectCategory, string> = {
  web:       'bg-sky-500/10 text-sky-400 border-sky-500/20',
  mobile:    'bg-violet-500/10 text-violet-400 border-violet-500/20',
  ai:        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  fullstack: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  other:     'bg-neutral-500/10 text-neutral-400 border-neutral-500/20',
};

const TYPE_TAG: Record<ProjectType, string> = {
  personal:    'bg-sky-500/10 text-sky-400 border-sky-500/20',
  freelance:   'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  internship:  'bg-orange-500/10 text-orange-400 border-orange-500/20',
  competition: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
};

const STATUS_TAG: Record<string, string> = {
  completed:     'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'in-progress': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  archived:      'bg-neutral-500/10 text-neutral-400 border-neutral-500/20',
};

const CAT_GRADIENT: Record<ProjectCategory, string> = {
  web:       'from-sky-500/20 via-sky-900/10 to-neutral-900/40',
  mobile:    'from-violet-500/20 via-violet-900/10 to-neutral-900/40',
  ai:        'from-emerald-500/20 via-emerald-900/10 to-neutral-900/40',
  fullstack: 'from-amber-500/20 via-amber-900/10 to-neutral-900/40',
  other:     'from-neutral-500/20 via-neutral-900/10 to-neutral-900/40',
};

const PRESET_EMOJIS = ['😍', '🔥', '👍', '💡', '⭐', '🚀', '🎯', '💯'];

const ALL_CATS: ('all' | ProjectCategory)[] = ['all', 'web', 'mobile', 'ai', 'fullstack', 'other'];
const ALL_TYPES: ('all' | ProjectType)[] = ['all', 'personal', 'internship', 'freelance', 'competition'];

// ─── Thumbnail ────────────────────────────────────────────────────────────────

function ProjectThumb({ src, alt, category }: { src?: string; alt: string; category: ProjectCategory }) {
  const [err, setErr] = useState(false);
  const showGradient = !src || err;

  return (
    <div className={cn('relative w-full h-full', showGradient && `bg-gradient-to-br ${CAT_GRADIENT[category]}`)}>
      {!showGradient && (
        <Image
          src={src!}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
          onError={() => setErr(true)}
        />
      )}
      {showGradient && (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-6xl font-black text-white/8 select-none">{alt.charAt(0)}</span>
        </div>
      )}
    </div>
  );
}

// ─── Emoji reactions ──────────────────────────────────────────────────────────

function EmojiRow({
  reactions,
  onReact,
}: {
  reactions: { emoji: string; count: number }[];
  onReact: (emoji: string) => void;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setPickerOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  return (
    <div className="flex items-center gap-1.5 flex-wrap" ref={ref}>
      {reactions.map(({ emoji, count }) => (
        <motion.button
          key={emoji}
          whileTap={{ scale: 0.88 }}
          onClick={(e) => { e.stopPropagation(); onReact(emoji); }}
          className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-xs hover:bg-white/10 hover:border-white/16 transition-colors"
        >
          <span className="text-sm leading-none">{emoji}</span>
          <span className="text-[10px] text-neutral-500">{count}</span>
        </motion.button>
      ))}

      {/* + button */}
      <div className="relative">
        <button
          onClick={(e) => { e.stopPropagation(); setPickerOpen((v) => !v); }}
          aria-label="Add reaction"
          aria-expanded={pickerOpen}
          className={cn(
            'w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold transition-colors',
            pickerOpen
              ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
              : 'bg-white/5 border-white/8 text-neutral-600 hover:bg-white/10 hover:text-neutral-300'
          )}
        >
          +
        </button>

        <AnimatePresence>
          {pickerOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: -4 }}
              transition={{ duration: 0.12 }}
              className="absolute bottom-full mb-2 left-0 z-50 flex gap-0.5 p-1.5 rounded-xl bg-[#0d0d0d] border border-white/12 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {PRESET_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => { onReact(emoji); setPickerOpen(false); }}
                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/8 text-base transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/8 overflow-hidden">
      <div className="aspect-[16/9] bg-white/5 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-white/5 rounded-md w-3/4 animate-pulse" />
        <div className="h-3 bg-white/5 rounded-md w-full animate-pulse" />
        <div className="h-3 bg-white/5 rounded-md w-4/5 animate-pulse" />
        <div className="flex gap-1.5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-5 w-16 bg-white/5 rounded-md animate-pulse" />
          ))}
        </div>
        <div className="flex gap-1.5 pt-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 w-12 bg-white/5 rounded-full animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.3 } },
  exit:   { opacity: 0, y: -8, scale: 0.96, transition: { duration: 0.18 } },
};

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const t = useTranslations('projects');
  const locale = useLocale() as 'id' | 'en';
  const cardRef = useRef<HTMLDivElement>(null);
  const [reactions, setReactions] = useState<{ emoji: string; count: number }[]>(
    project.reactions ?? []
  );

  // 3D tilt
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-60, 60], [6, -6]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(rawX, [-60, 60], [-6, 6]), { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left - rect.width / 2);
    rawY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const handleReact = (emoji: string) => {
    setReactions((prev) => {
      const hit = prev.find((r) => r.emoji === emoji);
      if (hit) return prev.map((r) => (r.emoji === emoji ? { ...r, count: r.count + 1 } : r));
      return [...prev, { emoji, count: 1 }];
    });
  };

  const statusLabel: Record<string, string> = {
    completed:     t('status.completed'),
    'in-progress': t('status.in_progress'),
    archived:      t('status.archived'),
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      layout
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(project)}
      className="group cursor-pointer rounded-2xl border border-white/8 bg-white/3 overflow-hidden hover:border-amber-500/20 hover:shadow-[0_0_24px_rgba(245,158,11,0.07)] transition-colors duration-200 flex flex-col"
    >
      {/* Thumbnail 16:9 */}
      <div className="relative aspect-[16/9] overflow-hidden shrink-0">
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <ProjectThumb src={project.thumbnail} alt={project.title} category={project.category} />
        </motion.div>

        {/* Featured */}
        {project.featured && (
          <div className="absolute top-2.5 left-2.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/25 border border-amber-500/35 text-[11px] text-amber-300 backdrop-blur-sm font-medium">
              <Star size={9} className="fill-amber-300" /> {t('featured')}
            </span>
          </div>
        )}

        {/* Status */}
        <div className="absolute top-2.5 right-2.5">
          <span className={cn('inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-medium backdrop-blur-sm', STATUS_TAG[project.status])}>
            {statusLabel[project.status]}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-sm font-bold text-white line-clamp-1 mb-1.5 group-hover:text-amber-100 transition-colors">
          {project.title}
        </h3>

        {/* Description — 2 lines */}
        <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2 mb-3 flex-1">
          {project.description[locale]}
        </p>

        {/* Tech icons — max 4 + overflow count */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/5 border border-white/8 text-[10px] text-neutral-500"
            >
              <SkillIcon name={tech} size={12} />
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-[10px] text-neutral-600 font-medium">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Reactions — stop propagation so clicks don't open modal */}
        <div onClick={(e) => e.stopPropagation()}>
          <EmojiRow reactions={reactions} onReact={handleReact} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const t = useTranslations('projects');
  const locale = useLocale() as 'id' | 'en';
  const [descLang, setDescLang] = useState<'id' | 'en'>(locale);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [onClose]);

  const statusLabel: Record<string, string> = {
    completed: t('status.completed'),
    'in-progress': t('status.in_progress'),
    archived: t('status.archived'),
  };

  const slugHref = locale === 'en' ? `/en/projects/${project.slug}` : `/projects/${project.slug}`;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[200] bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto w-full max-w-2xl bg-[#111111] border border-white/12 rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
        >
          {/* Image */}
          <div className="relative aspect-[16/9] shrink-0 overflow-hidden">
            <ProjectThumb src={project.thumbnail} alt={project.title} category={project.category} />

            {/* Link to full page */}
            <motion.div
              className="absolute bottom-3 left-3"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Link
                href={slugHref}
                onClick={(e) => e.stopPropagation()}
                className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 hover:text-white hover:bg-black/80 hover:border-white/30 transition-all duration-200 text-xs font-medium"
              >
                <ExternalLink size={11} className="group-hover:rotate-12 transition-transform duration-200" />
                {locale === 'id' ? 'Lihat Selengkapnya' : 'View Full Page'}
              </Link>
            </motion.div>

            <button
              onClick={onClose}
              aria-label={t('back_to_projects')}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/55 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/75 transition-colors"
            >
              <X size={15} />
            </button>

            {project.featured && (
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/25 border border-amber-500/35 text-xs text-amber-300 backdrop-blur-sm">
                  <Star size={9} className="fill-amber-300" /> {t('featured')}
                </span>
              </div>
            )}
          </div>

          {/* Scrollable body */}
          <div className="overflow-y-auto p-6 space-y-5">
            {/* Badges row */}
            <div className="flex flex-wrap gap-1.5">
              <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-medium', CAT_TAG[project.category])}>
                {t(`categories.${project.category}`)}
              </span>
              <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-medium', TYPE_TAG[project.type])}>
                {t(`type_labels.${project.type}`)}
              </span>
              <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-medium', STATUS_TAG[project.status])}>
                {statusLabel[project.status]}
              </span>
            </div>

            {/* Title + role */}
            <div>
              <h2 className="text-xl font-bold text-white leading-snug">{project.title}</h2>
              {project.role && (
                <p className="text-sm text-neutral-500 mt-1">{project.role[locale]}</p>
              )}
            </div>

            {/* Description with EN/ID toggle */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] tracking-widest text-neutral-600 uppercase font-medium">
                  {locale === 'id' ? 'Deskripsi' : 'Description'}
                </p>
                <div className="flex rounded-lg overflow-hidden border border-white/10">
                  {(['id', 'en'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setDescLang(lang)}
                      className={cn(
                        'px-3 py-1 text-[10px] font-semibold uppercase tracking-wider transition-colors',
                        descLang === lang
                          ? 'bg-amber-500/15 text-amber-400'
                          : 'text-neutral-600 hover:text-neutral-300'
                      )}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {project.longDescription[descLang]}
              </p>
            </div>

            {/* Tech stack */}
            <div>
              <p className="text-[10px] tracking-widest text-neutral-600 uppercase font-medium mb-3">
                {t('tech_stack')}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/8 text-xs text-neutral-400"
                  >
                    <SkillIcon name={tech} size={14} />
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Meta details grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-white/3 border border-white/8">
                <p className="text-[10px] text-neutral-600 uppercase tracking-wide">{t('year')}</p>
                <p className="text-sm font-bold text-neutral-300 mt-1">{project.year}</p>
              </div>
              {project.duration && (
                <div className="p-3 rounded-xl bg-white/3 border border-white/8">
                  <p className="text-[10px] text-neutral-600 uppercase tracking-wide">{t('duration')}</p>
                  <p className="text-sm font-bold text-neutral-300 mt-1">{project.duration}</p>
                </div>
              )}
              {project.teamSize && (
                <div className="p-3 rounded-xl bg-white/3 border border-white/8">
                  <p className="text-[10px] text-neutral-600 uppercase tracking-wide">{t('team_size')}</p>
                  <p className="text-sm font-bold text-neutral-300 mt-1">
                    {project.teamSize} {locale === 'id'
                      ? 'orang'
                      : project.teamSize === 1 ? 'person' : 'people'
                    }
                  </p>
                </div>
              )}
              {project.role && (
                <div className="p-3 rounded-xl bg-white/3 border border-white/8">
                  <p className="text-[10px] text-neutral-600 uppercase tracking-wide">{t('role')}</p>
                  <p className="text-sm font-bold text-neutral-300 mt-1 line-clamp-1">{project.role[locale]}</p>
                </div>
              )}
            </div>

            {/* CTA buttons */}
            {(project.liveUrl || project.githubUrl) && (
              <div className="flex gap-3 pt-1">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm text-amber-400 font-medium hover:bg-amber-500/15 transition-colors"
                  >
                    <ExternalLink size={14} />
                    {t('live_preview')}
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-neutral-400 font-medium hover:bg-white/8 hover:text-neutral-200 transition-colors',
                      project.liveUrl ? 'px-5' : 'flex-1'
                    )}
                  >
                    <GithubIcon size={14} />
                    {t('source_code')}
                  </a>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}

// ─── Filter pill ──────────────────────────────────────────────────────────────

function FilterPill({
  active,
  onClick,
  count,
  children,
}: {
  active: boolean;
  onClick: () => void;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-150',
        active
          ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
          : 'bg-white/4 border-white/10 text-neutral-400 hover:border-white/20 hover:text-neutral-200'
      )}
    >
      {children}
      {count !== undefined && (
        <span className={cn('text-[10px]', active ? 'text-amber-400/60' : 'text-neutral-600')}>
          {count}
        </span>
      )}
    </button>
  );
}

// ─── Grid variants ────────────────────────────────────────────────────────────

const gridVariants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.07 } },
  exit:   { opacity: 0, transition: { duration: 0.15 } },
};

// ─── Main ─────────────────────────────────────────────────────────────────────

export function ProjectsSection() {
  const t = useTranslations('projects');
  const locale = useLocale() as 'id' | 'en';

  const [filterCat, setFilterCat]   = useState<'all' | ProjectCategory>('all');
  const [filterType, setFilterType] = useState<'all' | ProjectType>('all');
  const [selected, setSelected]     = useState<Project | null>(null);
  const [mounted, setMounted]       = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(id);
  }, []);

  const filtered = projects.filter((p) => {
    const okCat  = filterCat  === 'all' || p.category === filterCat;
    const okType = filterType === 'all' || p.type     === filterType;
    return okCat && okType;
  });

  const filterKey = `${filterCat}|${filterType}`;

  const catCount = (cat: 'all' | ProjectCategory) =>
    cat === 'all' ? projects.length : projects.filter((p) => p.category === cat).length;
  const typeCount = (type: 'all' | ProjectType) =>
    type === 'all' ? projects.length : projects.filter((p) => p.type === type).length;

  const catLabels: Record<string, string> = {
    all:       t('categories.all'),
    web:       t('categories.web'),
    mobile:    t('categories.mobile'),
    ai:        t('categories.ai'),
    fullstack: t('categories.fullstack'),
    other:     t('categories.other'),
  };
  const typeLabels: Record<string, string> = {
    all:         t('all'),
    personal:    t('type_labels.personal'),
    freelance:   t('type_labels.freelance'),
    internship:  t('type_labels.internship'),
    competition: t('type_labels.competition'),
  };

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-0 py-12">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-bold text-white">{t('title')}</h1>
            <p className="text-neutral-500 text-sm mt-1 max-w-lg">{t('subtitle')}</p>
          </div>
          <span className="text-xs text-neutral-600">
            <span className="text-amber-400/80">{projects.filter((p) => p.featured).length}</span>{' '}
            {t('featured')} · <span className="text-amber-400/80">{projects.length}</span> {t('all')}
          </span>
        </div>
        <div className="h-px w-12 bg-amber-500/60 mt-4" />
      </motion.div>

      {/* ── Filters (two rows) ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="space-y-3 mb-8"
      >
        {/* Row 1 — Tipe (category) */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-neutral-600 font-semibold uppercase tracking-wider w-16 shrink-0">
            {t('label_type')}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {ALL_CATS.filter((cat) => catCount(cat) > 0 || cat === 'all').map((cat) => (
              <FilterPill
                key={cat}
                active={filterCat === cat}
                onClick={() => setFilterCat(cat)}
                count={catCount(cat)}
              >
                {catLabels[cat]}
              </FilterPill>
            ))}
          </div>
        </div>

        {/* Row 2 — Kategori (type) */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-neutral-600 font-semibold uppercase tracking-wider w-16 shrink-0">
            {t('label_category')}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {ALL_TYPES.filter((tp) => typeCount(tp) > 0 || tp === 'all').map((tp) => (
              <FilterPill
                key={tp}
                active={filterType === tp}
                onClick={() => setFilterType(tp)}
                count={typeCount(tp)}
              >
                {typeLabels[tp]}
              </FilterPill>
            ))}
          </div>
        </div>

        {/* Active filter summary */}
        {(filterCat !== 'all' || filterType !== 'all') && (
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs text-neutral-600">
              {filtered.length} {locale === 'id'
                ? 'proyek'
                : filtered.length === 1 ? 'project' : 'projects'
              }
            </span>
            <button
              onClick={() => { setFilterCat('all'); setFilterType('all'); }}
              className="text-[11px] text-amber-400/70 hover:text-amber-400 transition-colors"
            >
              {locale === 'id' ? 'Atur Ulang' : 'Reset'}
            </button>
          </div>
        )}
      </motion.div>

      {/* ── Grid ── */}
      {!mounted ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 text-center text-neutral-600 text-sm"
            >
              {t('no_projects')}
            </motion.div>
          ) : (
            <motion.div
              key={filterKey}
              variants={gridVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} onOpen={setSelected} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* ── Modal ── */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
