'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { Briefcase, GraduationCap, ChevronDown, MapPin, Download, ListChecks, Lightbulb, TrendingUp, Check } from 'lucide-react';
import { profile, education, experience, type Experience } from '@/data/profile';
import { AnchorButton } from '@/components/ui/link-button';
import { MagneticWrapper } from '@/components/ui/magnetic';
import { cn } from '@/lib/utils';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

function SectionDivider() {
  return <div className="h-px bg-white/6 my-12" />;
}

function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
      className="mb-8"
    >
      <motion.div variants={fadeUp} className="flex items-center gap-2 mb-1">
        <span className="text-amber-400">{icon}</span>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-amber-400/80">{title}</h2>
      </motion.div>
      <motion.p variants={fadeUp} className="text-sm text-neutral-500">{subtitle}</motion.p>
    </motion.div>
  );
}

// ─── Section 1: Bio ───────────────────────────────────────────────────────────

function BioSection() {
  const t = useTranslations('about');
  const locale = useLocale() as 'id' | 'en';
  const paragraphs = profile.bio.long[locale].split('\n\n');

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
      className="py-12"
    >
      {/* Page header */}
      <motion.div variants={fadeUp} className="mb-8">
        <h1 className="text-3xl font-bold text-white">{t('title')}</h1>
        <p className="text-neutral-500 text-sm mt-1">{t('subtitle')}</p>
        <div className="h-px w-12 bg-amber-500/60 mt-4" />
      </motion.div>

      {/* Bio paragraphs */}
      <div className="space-y-5 max-w-2xl mb-10">
        {paragraphs.map((para, i) => (
          <motion.p key={i} variants={fadeUp} className="text-sm leading-relaxed text-neutral-400">
            {para}
          </motion.p>
        ))}
      </div>

      {/* Signature + CV */}
      <motion.div variants={fadeUp} className="flex flex-col gap-4">
        <span
          className="font-signature text-3xl text-neutral-400 select-none"
          aria-hidden="true"
        >
          {profile.name.toLowerCase()}
        </span>
        {profile.cv && (
          <MagneticWrapper>
            <AnchorButton
              href={profile.cv}
              download
              variant="outline"
              size="sm"
              className="gap-2 border-white/10 text-neutral-400 hover:text-white hover:border-white/20 bg-white/4"
            >
              <Download size={13} />
              {t('download_cv')}
            </AnchorButton>
          </MagneticWrapper>
        )}
      </motion.div>
    </motion.section>
  );
}

// ─── Section 2: Career ────────────────────────────────────────────────────────

const TYPE_COLORS: Record<Experience['type'], string> = {
  fulltime:   'bg-blue-500/10 text-blue-400 border-blue-500/20',
  parttime:   'bg-violet-500/10 text-violet-400 border-violet-500/20',
  internship: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  freelance:  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

const MODE_COLORS: Record<Experience['mode'], string> = {
  hybrid: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  remote: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  onsite: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
};

function CompanyLogo({ company, logo }: { company: string; logo?: string }) {
  const [err, setErr] = useState(false);
  if (logo && !err) {
    return (
      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 overflow-hidden shadow-sm ring-1 ring-white/10">
        <Image src={logo} alt={company} width={32} height={32} className="object-contain" onError={() => setErr(true)} />
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
      <span className="text-sm font-bold text-neutral-300">{company.charAt(0)}</span>
    </div>
  );
}

// ── Duration calculator ────────────────────────────────────────────────────────

const MONTH_MAP: Record<string, number> = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, mei: 5, jun: 6,
  jul: 7, aug: 8, agu: 8, sep: 9, oct: 10, okt: 10, nov: 11, dec: 12, des: 12,
};

function parsePeriodDate(s: string): { year: number; month: number } | null {
  const t = s.trim().toLowerCase();
  if (t === 'sekarang' || t === 'present' || t === 'now') {
    const n = new Date();
    return { year: n.getFullYear(), month: n.getMonth() + 1 };
  }
  const tokens = t.split(/\s+/);
  if (tokens.length === 2) {
    const m = MONTH_MAP[tokens[0]];
    const y = parseInt(tokens[1]);
    if (m && !isNaN(y)) return { year: y, month: m };
  }
  if (tokens.length === 1 && !isNaN(parseInt(tokens[0]))) {
    return { year: parseInt(tokens[0]), month: 1 };
  }
  return null;
}

function calcDuration(period: string, locale: string): string {
  const parts = period.split(/\s*[–\-]\s*/);
  if (parts.length !== 2) return '';
  const start = parsePeriodDate(parts[0]);
  const end = parsePeriodDate(parts[1]);
  if (!start || !end) return '';
  const total = (end.year - start.year) * 12 + (end.month - start.month);
  if (total <= 0) return '';
  const yrs = Math.floor(total / 12);
  const mos = total % 12;
  if (locale === 'id') {
    if (yrs > 0 && mos > 0) return `${yrs} tahun ${mos} bulan`;
    if (yrs > 0) return `${yrs} tahun`;
    return `${mos} bulan`;
  } else {
    if (yrs > 0 && mos > 0) return `${yrs} yr ${mos} mo`;
    if (yrs > 0) return yrs === 1 ? '1 year' : `${yrs} years`;
    return mos === 1 ? '1 month' : `${mos} months`;
  }
}

// ── Checkmark bullet ───────────────────────────────────────────────────────────

function CheckItem({ text, checkColor = 'text-neutral-600' }: { text: string; checkColor?: string }) {
  return (
    <li className="flex items-start gap-2 text-xs text-neutral-400">
      <Check size={12} className={cn('mt-0.5 shrink-0', checkColor)} />
      <span className="leading-relaxed">{text}</span>
    </li>
  );
}

// ── Expanded sub-section header ────────────────────────────────────────────────

function SubHeader({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  return (
    <div className={cn('flex items-center gap-1.5 mb-2.5', color)}>
      {icon}
      <span className="text-xs font-semibold uppercase tracking-widest">{label}</span>
    </div>
  );
}

// ── Career card ────────────────────────────────────────────────────────────────

function CareerCard({ exp, index }: { exp: Experience; index: number }) {
  const t = useTranslations('about');
  const locale = useLocale() as 'id' | 'en';
  const [open, setOpen] = useState(false);
  const duration = calcDuration(exp.period, locale);

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, delay: index * 0.07 } } }}
    >
      <div className={cn(
        'rounded-xl border bg-white/3 transition-colors duration-200',
        open ? 'border-white/12' : 'border-white/8 hover:border-white/12'
      )}>
        {/* Card header */}
        <div className="p-4">
          <div className="flex items-start gap-3">
            <CompanyLogo company={exp.company} logo={exp.logo} />

            <div className="flex-1 min-w-0">
              {/* Role + current badge */}
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-white">{exp.role[locale]}</p>
                  {exp.current && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-green-500/10 border border-green-500/20 text-xs text-green-400 font-medium">
                      <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                      {t('current')}
                    </span>
                  )}
                </div>
              </div>

              {/* Company name + location */}
              <p className="text-xs text-neutral-500 mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                <span>{exp.fullCompanyName ?? exp.company}</span>
                {exp.flag && <span>{exp.flag}</span>}
                <span className="text-neutral-700">·</span>
                <MapPin size={10} className="text-neutral-600 shrink-0" />
                <span>{exp.location}</span>
              </p>

              {/* Meta line: period · duration · type · mode */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-xs text-neutral-600">
                <span>{exp.period}</span>
                {duration && (
                  <>
                    <span className="text-neutral-700">·</span>
                    <span>{duration}</span>
                  </>
                )}
                <span className="text-neutral-700">·</span>
                <span className={cn('px-1.5 py-0.5 rounded border text-xs', TYPE_COLORS[exp.type])}>{t(exp.type)}</span>
                <span className={cn('px-1.5 py-0.5 rounded border text-xs', MODE_COLORS[exp.mode])}>{t(exp.mode)}</span>
              </div>
            </div>
          </div>

          {/* Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="mt-3 flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-300 transition-colors"
          >
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={13} />
            </motion.div>
            {open ? t('hide_details') : t('show_details')}
          </button>
        </div>

        {/* Expandable */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-5 border-t border-white/8 pt-4 space-y-5">
                {/* TUGAS — amber */}
                <div>
                  <SubHeader icon={<ListChecks size={13} />} label={t('tasks')} color="text-amber-400/80" />
                  <ul className="space-y-2">
                    {exp.responsibilities.map((r, i) => (
                      <CheckItem key={i} text={r[locale]} checkColor="text-amber-500" />
                    ))}
                  </ul>
                </div>

                {/* PELAJARI + DAMPAK side by side */}
                {(exp.learnings?.length || exp.impact?.length) ? (
                  <div className="grid sm:grid-cols-2 gap-5 pt-1 border-t border-white/6">
                    {exp.learnings?.length ? (
                      <div>
                        {/* PELAJARI — sky/blue */}
                        <SubHeader icon={<Lightbulb size={13} />} label={t('learnings_title')} color="text-sky-400/80" />
                        <ul className="space-y-2">
                          {exp.learnings.map((l, i) => (
                            <CheckItem key={i} text={l[locale]} checkColor="text-sky-500" />
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {exp.impact?.length ? (
                      <div>
                        {/* DAMPAK — emerald */}
                        <SubHeader icon={<TrendingUp size={13} />} label={t('impact_title')} color="text-emerald-400/80" />
                        <ul className="space-y-2">
                          {exp.impact.map((m, i) => (
                            <CheckItem key={i} text={m[locale]} checkColor="text-emerald-500" />
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {/* Tech stack */}
                {exp.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1 border-t border-white/6">
                    {exp.tech.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-xs text-neutral-500">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function CareerSection() {
  const t = useTranslations('about');

  const sorted = [...experience].sort((a, b) => {
    if (a.current && !b.current) return -1;
    if (!a.current && b.current) return 1;
    return 0;
  });

  return (
    <section>
      <SectionHeader
        icon={<Briefcase size={14} />}
        title={t('experience_title')}
        subtitle={t('career_subtitle')}
      />
      <div className="relative pl-5">
        {/* Animated vertical timeline line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-[7px] top-3 bottom-3 w-px bg-gradient-to-b from-amber-400/50 via-amber-400/20 to-transparent origin-top"
        />

        {sorted.map((exp, i) => (
          <div key={exp.id} className="relative mb-3 last:mb-0">
            {/* Timeline dot */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.12 }}
              className="absolute -left-5 top-[18px] w-[14px] h-[14px] rounded-full border-2 border-amber-400/40 bg-neutral-950 flex items-center justify-center"
            >
              <span className={cn(
                'w-1.5 h-1.5 rounded-full',
                exp.current ? 'bg-amber-400 animate-pulse' : 'bg-amber-400/40'
              )} />
            </motion.div>
            <CareerCard exp={exp} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Section 3: Education ─────────────────────────────────────────────────────

function EducationSection() {
  const t = useTranslations('about');
  const locale = useLocale() as 'id' | 'en';

  return (
    <section>
      <SectionHeader
        icon={<GraduationCap size={14} />}
        title={t('education_title')}
        subtitle={t('education_subtitle')}
      />
      <div className="space-y-3">
        {education.map((edu, i) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="rounded-xl border border-white/8 bg-white/3 p-4"
          >
            <div className="flex items-start gap-3">
              {/* Logo / Initial */}
              {edu.logo ? (
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 overflow-hidden shadow-sm ring-1 ring-white/10">
                  <Image src={edu.logo} alt={edu.institution} width={32} height={32} className="object-contain" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-neutral-300">{edu.institution.charAt(0)}</span>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <p className="text-sm font-semibold text-white">{edu.degree[locale]}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{edu.institution}</p>
                  </div>
                  <span className="text-xs text-neutral-600 shrink-0">{edu.period}</span>
                </div>

                {edu.gpa && (
                  <span className="inline-flex items-center mt-2 px-2 py-0.5 rounded-md bg-amber-500/8 border border-amber-500/15 text-xs text-amber-400/80">
                    {t('gpa')} {edu.gpa}
                  </span>
                )}

                <p className="text-xs text-neutral-500 mt-2.5 leading-relaxed">
                  {edu.description[locale]}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Composed About ───────────────────────────────────────────────────────────

export function AboutSection() {
  return (
    <div className="max-w-2xl mx-auto px-6 lg:px-0">
      <BioSection />
      <SectionDivider />
      <CareerSection />
      <SectionDivider />
      <EducationSection />
      <div className="h-12" />
    </div>
  );
}
