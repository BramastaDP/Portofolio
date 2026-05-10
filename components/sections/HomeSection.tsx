'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Code2, ArrowRight, Star } from 'lucide-react';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import Link from 'next/link';
import { skills, type SkillCategoryKey } from '@/data/skills';
import { SkillIcon } from '@/components/ui/skill-icon';
import { Typewriter } from '@/components/ui/typewriter';
import { cn } from '@/lib/utils';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0  },
};

const stagger = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.1 } },
};

function SectionDivider() {
  return <div className="h-px bg-white/6 mx-6 lg:mx-0" />;
}

// ─── Text reveal heading ───────────────────────────────────────────────────────

function SectionHeader({
  icon, title, subtitle,
}: {
  icon: React.ReactNode; title: string; subtitle: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="mb-8">
      <div className="flex items-center gap-2 mb-1 overflow-hidden">
        <motion.span
          className="text-amber-400"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          {icon}
        </motion.span>
        <div className="overflow-hidden">
          <motion.h2
            className="text-xs font-semibold uppercase tracking-widest text-amber-400/80"
            initial={{ y: '100%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
          </motion.h2>
        </div>
      </div>
      <div className="overflow-hidden">
        <motion.p
          className="text-neutral-600 dark:text-neutral-500 text-sm"
          initial={{ y: '100%', opacity: 0 }}
          animate={inView ? { y: '0%', opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
}


// ─── Section 1: Hero ──────────────────────────────────────────────────────────

function HeroBlock() {
  const t = useTranslations('home');
  const locale = useLocale() as 'id' | 'en';
  const bioParagraphs = profile.bio.long[locale].split('\n\n');

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={stagger}
      className="relative px-6 lg:px-0 py-12 lg:py-14 overflow-hidden"
    >
      {/* Dot-grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Warm glow */}
      <div aria-hidden className="pointer-events-none absolute -top-16 right-0 w-80 h-80 bg-amber-500/8 rounded-full blur-3xl -z-10" />

      {/* Status badge */}
      <motion.div variants={fadeUp} className="mb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          {profile.status.available ? t('available') : t('not_available')}
        </span>
      </motion.div>

      {/* Greeting + Name */}
      <motion.div variants={fadeUp} className="mb-3">
        <p className="text-neutral-500 text-sm mb-2 font-medium tracking-wide">
          {t('greeting')}
        </p>
        <h1 className="flex items-end gap-1 leading-none">
          <span className="font-signature text-6xl lg:text-7xl text-white">
            {profile.name}
          </span>
          <span className="text-amber-400 font-bold text-5xl lg:text-6xl leading-none pb-1">.</span>
        </h1>
      </motion.div>

      {/* Role (typewriter) + location */}
      <motion.div
        variants={fadeUp}
        className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-8 text-sm text-neutral-500"
      >
        <span className="text-neutral-400 font-medium">
          <Typewriter text={profile.role[locale]} delay={900} speed={35} />
        </span>
        <span className="text-neutral-700">·</span>
        <span className="flex items-center gap-1.5">
          <span>{profile.location.flag}</span>
          <span>{profile.location.city}</span>
        </span>
        <span className="text-neutral-700">·</span>
        <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-xs text-neutral-500">
          {t('work_mode')}
        </span>
      </motion.div>

      {/* Bio */}
      <div className="space-y-4 max-w-xl">
        {bioParagraphs.map((para, i) => (
          <motion.p
            key={i}
            variants={fadeUp}
            className="text-sm leading-relaxed text-neutral-400"
          >
            {para}
          </motion.p>
        ))}
      </div>
    </motion.section>
  );
}

// ─── Featured project teaser ──────────────────────────────────────────────────

const CAT_GRADIENT: Record<string, string> = {
  web:       'from-sky-500/20 via-sky-900/10 to-neutral-900/60',
  mobile:    'from-violet-500/20 via-violet-900/10 to-neutral-900/60',
  ai:        'from-emerald-500/20 via-emerald-900/10 to-neutral-900/60',
  fullstack: 'from-amber-500/20 via-amber-900/10 to-neutral-900/60',
  other:     'from-neutral-500/20 via-neutral-900/10 to-neutral-900/60',
};

function FeaturedProjectBlock() {
  const locale = useLocale() as 'id' | 'en';
  const featured = projects.find((p) => p.featured);
  const [imgErr, setImgErr] = useState(false);

  if (!featured) return null;

  const href = locale === 'en'
    ? `/en/projects/${featured.slug}`
    : `/projects/${featured.slug}`;

  const showGradient = !featured.thumbnail || imgErr;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="px-6 lg:px-0 py-6"
    >
      <p className="text-[10px] uppercase tracking-widest text-neutral-600 mb-3">
        {locale === 'id' ? 'Project Unggulan' : 'Featured Project'}
      </p>

      <Link href={href}>
        <motion.div
          whileHover={{ scale: 1.015 }}
          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          className="group relative rounded-2xl border border-white/8 bg-white/3 overflow-hidden hover:border-amber-500/25 hover:shadow-[0_0_32px_rgba(245,158,11,0.08)] transition-colors duration-200 flex flex-col sm:flex-row"
        >
          {/* Thumbnail */}
          <div className="relative sm:w-56 shrink-0 aspect-[16/9] sm:aspect-auto overflow-hidden">
            {showGradient ? (
              <div className={`w-full h-full bg-gradient-to-br ${CAT_GRADIENT[featured.category]} flex items-center justify-center`}>
                <span className="text-5xl font-black text-white/8 select-none">
                  {featured.title.charAt(0)}
                </span>
              </div>
            ) : (
              <Image
                src={featured.thumbnail!}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 224px"
                onError={() => setImgErr(true)}
              />
            )}
            {/* Featured badge */}
            <div className="absolute top-2.5 left-2.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/25 border border-amber-500/35 text-[10px] text-amber-300 backdrop-blur-sm font-medium">
                <Star size={9} className="fill-amber-300" />
                {locale === 'id' ? 'Unggulan' : 'Featured'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between p-5 flex-1 min-w-0">
            <div>
              <h3 className="text-base font-bold text-white leading-snug line-clamp-1 group-hover:text-amber-100 transition-colors">
                {featured.title}
              </h3>
              <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed line-clamp-2">
                {featured.description[locale]}
              </p>
            </div>

            <div className="flex items-center justify-between mt-4 gap-3 flex-wrap">
              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5">
                {featured.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/5 border border-white/8 text-[10px] text-neutral-500"
                  >
                    <SkillIcon name={tech} size={10} />
                    {tech}
                  </span>
                ))}
                {featured.techStack.length > 4 && (
                  <span className="text-[10px] text-neutral-600">+{featured.techStack.length - 4}</span>
                )}
              </div>

              {/* CTA */}
              <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-medium group-hover:gap-2.5 transition-all duration-200 shrink-0">
                {locale === 'id' ? 'Lihat Detail' : 'View Details'}
                <ArrowRight size={13} />
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// ─── Section 2: Skills ────────────────────────────────────────────────────────

type FilterKey = 'all' | SkillCategoryKey;

function SkillsBlock() {
  const t = useTranslations('home');
  const locale = useLocale() as 'id' | 'en';
  const [active, setActive] = useState<FilterKey>('all');

  const filterKeys: FilterKey[] = ['all', ...skills.map((c) => c.key as FilterKey)];
  const allSkills  = skills.flatMap((cat) => cat.skills);
  const filtered   = active === 'all'
    ? allSkills
    : (skills.find((c) => c.key === active)?.skills ?? []);

  const highlighted = active === 'all' ? filtered.filter((s) => s.highlighted) : [];
  const regular     = active === 'all' ? filtered.filter((s) => !s.highlighted) : filtered;

  const getLabel = (key: FilterKey) => {
    if (key === 'all') return t('skills_filter_all');
    return skills.find((c) => c.key === key)?.category[locale] ?? key;
  };

  const getCount = (key: FilterKey) =>
    key === 'all'
      ? allSkills.length
      : (skills.find((c) => c.key === key)?.skills.length ?? 0);

  return (
    <section className="px-6 lg:px-0 py-12">
      <SectionHeader
        icon={<Code2 size={14} />}
        title={t('skills_title')}
        subtitle={t('skills_subtitle')}
      />

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap gap-1.5 mb-7"
      >
        {filterKeys.map((key) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150',
              active === key
                ? 'bg-amber-500/15 border border-amber-500/30 text-amber-400'
                : 'bg-white/4 border border-white/8 text-neutral-500 hover:text-neutral-300 hover:bg-white/8'
            )}
          >
            <span>{getLabel(key)}</span>
            <span className={cn('tabular-nums', active === key ? 'text-amber-400/70' : 'text-neutral-700')}>
              {getCount(key)}
            </span>
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {/* Core skills — featured row */}
          {highlighted.length > 0 && (
            <>
              <p className="text-[10px] uppercase tracking-widest text-neutral-600 mb-3">
                {locale === 'id' ? 'Keahlian Utama' : 'Core Skills'}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {highlighted.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/8 border border-amber-500/20 text-neutral-200 font-medium hover:bg-amber-500/12 hover:border-amber-500/35 transition-all duration-150 cursor-default"
                  >
                    <SkillIcon name={skill.name} size={16} />
                    <span className="text-sm">{skill.name}</span>
                  </span>
                ))}
              </div>
              <div className="h-px bg-white/6 mb-5" />
              <p className="text-[10px] uppercase tracking-widest text-neutral-600 mb-3">
                {locale === 'id' ? 'Lainnya' : 'Other Skills'}
              </p>
            </>
          )}

          {/* Regular pills */}
          <div className="flex flex-wrap gap-2">
            {regular.map((skill) => (
              <motion.span
                key={`${active}-${skill.name}`}
                layout
                className="group inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/4 border border-white/8 hover:border-white/16 hover:bg-white/7 transition-all duration-150 cursor-default"
              >
                <span className="shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                  <SkillIcon name={skill.name} size={14} />
                </span>
                <span className="text-xs font-medium text-neutral-500 group-hover:text-neutral-300 transition-colors">
                  {skill.name}
                </span>
              </motion.span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

// ─── Composed Home ─────────────────────────────────────────────────────────────

export function HomeSection() {
  return (
    <div className="max-w-2xl mx-auto lg:py-4">
      <HeroBlock />
      <SectionDivider />
      <FeaturedProjectBlock />
      <SectionDivider />
      <SkillsBlock />
      <div className="h-8" />
    </div>
  );
}
