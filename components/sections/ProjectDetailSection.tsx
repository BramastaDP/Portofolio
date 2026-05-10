'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ExternalLink, Star } from 'lucide-react';
import Link from 'next/link';
import { SkillIcon } from '@/components/ui/skill-icon';
import { type Project, type ProjectCategory, type ProjectType } from '@/data/projects';
import { cn } from '@/lib/utils';

// ─── Constants ────────────────────────────────────────────────────────────────

const CAT_GRADIENT: Record<ProjectCategory, string> = {
  web:       'from-sky-500/20 via-sky-900/10 to-neutral-900/40',
  mobile:    'from-violet-500/20 via-violet-900/10 to-neutral-900/40',
  ai:        'from-emerald-500/20 via-emerald-900/10 to-neutral-900/40',
  fullstack: 'from-amber-500/20 via-amber-900/10 to-neutral-900/40',
  other:     'from-neutral-500/20 via-neutral-900/10 to-neutral-900/40',
};

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

// ─── Thumbnail ────────────────────────────────────────────────────────────────

function ProjectThumb({ src, alt, category }: { src?: string; alt: string; category: ProjectCategory }) {
  const [err, setErr] = useState(false);
  const showGradient = !src || err;
  return (
    <div className={cn('relative w-full h-full', showGradient && `bg-gradient-to-br ${CAT_GRADIENT[category]}`)}>
      {!showGradient && (
        <Image src={src!} alt={alt} fill className="object-cover" sizes="100vw" onError={() => setErr(true)} />
      )}
      {showGradient && (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-8xl font-black text-white/8 select-none">{alt.charAt(0)}</span>
        </div>
      )}
    </div>
  );
}

// ─── GitHub icon ──────────────────────────────────────────────────────────────

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ProjectDetailSection({ project }: { project: Project }) {
  const t = useTranslations('projects');
  const locale = useLocale() as 'id' | 'en';
  const [descLang, setDescLang] = useState<'id' | 'en'>(locale);

  const backHref = locale === 'en' ? '/en/projects' : '/projects';

  const statusLabel: Record<string, string> = {
    completed:     t('status.completed'),
    'in-progress': t('status.in_progress'),
    archived:      t('status.archived'),
  };

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-0 py-12">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-xs text-neutral-500 hover:text-neutral-200 transition-colors group"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          {t('back_to_projects')}
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-8"
      >
        {/* Thumbnail */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/8">
          <ProjectThumb src={project.thumbnail} alt={project.title} category={project.category} />
          {project.featured && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/25 border border-amber-500/35 text-xs text-amber-300 backdrop-blur-sm font-medium">
                <Star size={10} className="fill-amber-300" />
                {t('featured')}
              </span>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span className={cn('inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium', CAT_TAG[project.category])}>
            {t(`categories.${project.category}`)}
          </span>
          <span className={cn('inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium', TYPE_TAG[project.type])}>
            {t(`type_labels.${project.type}`)}
          </span>
          <span className={cn('inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium', STATUS_TAG[project.status])}>
            {statusLabel[project.status]}
          </span>
        </div>

        {/* Title + role */}
        <div>
          <h1 className="text-3xl font-bold text-white leading-snug">{project.title}</h1>
          {project.role && (
            <p className="text-neutral-500 mt-2 text-sm">{project.role[locale]}</p>
          )}
          <div className="h-px w-12 bg-amber-500/60 mt-4" />
        </div>

        {/* Description with EN/ID toggle */}
        <div>
          <div className="flex items-center justify-between mb-4">
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
          <p className="text-neutral-400 leading-relaxed">{project.longDescription[descLang]}</p>
        </div>

        {/* Tech stack */}
        <div>
          <p className="text-[10px] tracking-widest text-neutral-600 uppercase font-medium mb-4">
            {t('tech_stack')}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-sm text-neutral-400"
              >
                <SkillIcon name={tech} size={15} />
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-white/3 border border-white/8">
            <p className="text-[10px] text-neutral-600 uppercase tracking-wide">{t('year')}</p>
            <p className="text-xl font-bold text-neutral-300 mt-1">{project.year}</p>
          </div>
          {project.duration && (
            <div className="p-4 rounded-xl bg-white/3 border border-white/8">
              <p className="text-[10px] text-neutral-600 uppercase tracking-wide">{t('duration')}</p>
              <p className="text-xl font-bold text-neutral-300 mt-1">{project.duration}</p>
            </div>
          )}
          {project.teamSize && (
            <div className="p-4 rounded-xl bg-white/3 border border-white/8">
              <p className="text-[10px] text-neutral-600 uppercase tracking-wide">{t('team_size')}</p>
              <p className="text-xl font-bold text-neutral-300 mt-1">
                {project.teamSize}{' '}
                <span className="text-sm font-normal text-neutral-500">
                  {locale === 'id' ? 'orang' : project.teamSize === 1 ? 'person' : 'people'}
                </span>
              </p>
            </div>
          )}
          {project.role && (
            <div className="p-4 rounded-xl bg-white/3 border border-white/8">
              <p className="text-[10px] text-neutral-600 uppercase tracking-wide">{t('role')}</p>
              <p className="text-sm font-bold text-neutral-300 mt-1 line-clamp-2">{project.role[locale]}</p>
            </div>
          )}
        </div>

        {/* CTA buttons */}
        {(project.liveUrl || project.githubUrl) && (
          <div className="flex gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm text-amber-400 font-medium hover:bg-amber-500/15 transition-colors"
              >
                <ExternalLink size={15} />
                {t('live_preview')}
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-neutral-400 font-medium hover:bg-white/8 hover:text-neutral-200 transition-colors',
                  project.liveUrl ? 'px-6' : 'flex-1'
                )}
              >
                <GithubIcon size={15} />
                {t('source_code')}
              </a>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
