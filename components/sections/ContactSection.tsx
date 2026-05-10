'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { profile } from '@/data/profile';
import { cn } from '@/lib/utils';

// ─── Brand SVG icons ──────────────────────────────────────────────────────────

function GmailIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M2 6.5C2 5.12 3.12 4 4.5 4h15C20.88 4 22 5.12 22 6.5v11c0 1.38-1.12 2.5-2.5 2.5h-15C3.12 20 2 18.88 2 17.5v-11Z" fill="white" fillOpacity=".12" />
      <path d="M2 7l10 6.5L22 7" stroke="white" strokeOpacity=".5" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 7l10 6.5L22 7M2 6.5C2 5.12 3.12 4 4.5 4h15C20.88 4 22 5.12 22 6.5v11c0 1.38-1.12 2.5-2.5 2.5h-15C3.12 20 2 18.88 2 17.5v-11Z" stroke="white" strokeOpacity=".3" strokeWidth="1.2" />
    </svg>
  );
}

function InstagramIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white" fillOpacity=".85">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function LinkedInIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white" fillOpacity=".85">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TikTokIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white" fillOpacity=".85">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.84 4.84 0 0 1-1.01-.07z" />
    </svg>
  );
}

function GitHubIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white" fillOpacity=".85">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

// ─── Zod schema ───────────────────────────────────────────────────────────────

function makeSchema(t: ReturnType<typeof useTranslations<'contact'>>) {
  return z.object({
    name:    z.string().min(1, t('validation.name_required')),
    email:   z.string().min(1, t('validation.email_required')).email(t('validation.email_invalid')),
    message: z.string().min(10, t('validation.message_min')),
  });
}

type FormValues = { name: string; email: string; message: string };

// ─── Bento card configs ───────────────────────────────────────────────────────

interface CardConfig {
  key: 'email' | 'instagram' | 'linkedin' | 'tiktok' | 'github';
  href: string;
  bg: string;
  iconBg: string;
  size: 'wide' | 'md' | 'sm';
  Icon: React.ComponentType<{ size?: number }>;
}

// ─── Bento Card ───────────────────────────────────────────────────────────────

function BentoCard({ card, size }: { card: CardConfig; size: CardConfig['size'] }) {
  const t = useTranslations('contact');

  return (
    <motion.a
      href={card.href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.025, filter: 'brightness(1.08)' }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className={cn(
        'relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 select-none',
        card.bg,
        size === 'wide' && 'col-span-2 min-h-[180px]',
        size === 'md'   && 'min-h-[160px]',
        size === 'sm'   && 'min-h-[140px]',
      )}
    >
      {/* Icon — large, top-right */}
      <div className={cn('absolute right-5 top-5 rounded-xl p-2.5 opacity-90', card.iconBg)}>
        <card.Icon size={size === 'wide' ? 36 : 28} />
      </div>

      {/* Content */}
      <div className="pr-16 flex-1">
        <p className={cn('font-bold text-white leading-snug', size === 'wide' ? 'text-lg' : 'text-sm')}>
          {t(`cards.${card.key}_title`)}
        </p>
        {size !== 'sm' && (
          <p className="mt-1 text-xs text-white/60 leading-relaxed line-clamp-2">
            {t(`cards.${card.key}_desc`)}
          </p>
        )}
      </div>

      {/* CTA button */}
      <div className="mt-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/90 hover:bg-white/22 transition-colors">
          {t(`cards.${card.key}_cta`)}
          <ArrowRight size={11} />
        </span>
      </div>
    </motion.a>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const schema = makeSchema(t);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setStatus('sending');
    try {
      // mailto: opens the default mail client with pre-filled fields
      const subject = encodeURIComponent(`Message from ${data.name}`);
      const body    = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      // Brief delay so the mailto fires before we show success
      await new Promise((r) => setTimeout(r, 600));
      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 6000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const inputBase =
    'w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-amber-500/40 focus:bg-white/8 transition-all';

  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-6 lg:p-8">
      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-6">
        {t('form_title')}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* Name + Email — side by side */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <input
              {...register('name')}
              placeholder={t('name_placeholder')}
              className={cn(inputBase, errors.name && 'border-red-500/40')}
            />
            {errors.name && (
              <p className="mt-1.5 text-[11px] text-red-400">{errors.name.message}</p>
            )}
          </div>
          <div>
            <input
              {...register('email')}
              type="email"
              placeholder={t('email_placeholder')}
              className={cn(inputBase, errors.email && 'border-red-500/40')}
            />
            {errors.email && (
              <p className="mt-1.5 text-[11px] text-red-400">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <textarea
            {...register('message')}
            rows={4}
            placeholder={t('message_placeholder')}
            className={cn(inputBase, 'resize-none', errors.message && 'border-red-500/40')}
          />
          {errors.message && (
            <p className="mt-1.5 text-[11px] text-red-400">{errors.message.message}</p>
          )}
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {status === 'success' && (
            <motion.div
              key="ok"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
            >
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-emerald-400">{t('success_title')}</p>
                <p className="text-xs text-emerald-500/80 mt-0.5">{t('success_message')}</p>
              </div>
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div
              key="err"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20"
            >
              <AlertCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-red-400">{t('error_title')}</p>
                <p className="text-xs text-red-500/80 mt-0.5">{t('error_message')}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-neutral-800 border border-white/10 text-sm font-semibold text-white hover:bg-neutral-700 hover:border-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? (
            <>
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              {t('sending')}
            </>
          ) : (
            <>
              <Send size={14} />
              {t('send')}
            </>
          )}
        </button>
      </form>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export function ContactSection() {
  const t = useTranslations('contact');

  const cards: CardConfig[] = [
    {
      key:     'email',
      href:    `mailto:${profile.email}`,
      bg:      'bg-[#C5221F]',
      iconBg:  'bg-white/10',
      size:    'wide',
      Icon:    GmailIcon,
    },
    {
      key:     'instagram',
      href:    profile.socials.instagram,
      bg:      'bg-gradient-to-br from-[#833AB4] via-[#C13584] to-[#E1306C]',
      iconBg:  'bg-white/10',
      size:    'md',
      Icon:    InstagramIcon,
    },
    {
      key:     'linkedin',
      href:    profile.socials.linkedin,
      bg:      'bg-[#0A66C2]',
      iconBg:  'bg-white/10',
      size:    'md',
      Icon:    LinkedInIcon,
    },
    {
      key:     'tiktok',
      href:    profile.socials.tiktok,
      bg:      'bg-[#161616]',
      iconBg:  'bg-white/8',
      size:    'sm',
      Icon:    TikTokIcon,
    },
    {
      key:     'github',
      href:    profile.socials.github,
      bg:      'bg-[#1a1a1a]',
      iconBg:  'bg-white/8',
      size:    'sm',
      Icon:    GitHubIcon,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-0 py-12 space-y-12">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-white">{t('title')}</h1>
        <p className="text-neutral-500 text-sm mt-1">{t('subtitle')}</p>
        <div className="h-px w-12 bg-amber-500/60 mt-4" />
      </motion.div>

      {/* ── Section 1 — Bento grid ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
      >
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-5">
          {t('socials_title')}
        </p>

        {/*
          Bento layout:
          Row 1: Gmail (col-span-2, wide)
          Row 2: Instagram (md) | LinkedIn (md)
          Row 3: TikTok (sm) | GitHub (sm)
        */}
        <div className="grid grid-cols-2 gap-3">
          {/* Gmail — full width */}
          <BentoCard card={cards[0]} size="wide" />

          {/* Instagram + LinkedIn */}
          <BentoCard card={cards[1]} size="md" />
          <BentoCard card={cards[2]} size="md" />

          {/* TikTok + GitHub */}
          <BentoCard card={cards[3]} size="sm" />
          <BentoCard card={cards[4]} size="sm" />
        </div>
      </motion.div>

      {/* ── Section 2 — Contact form ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.2 }}
      >
        <ContactForm />
      </motion.div>
    </div>
  );
}
