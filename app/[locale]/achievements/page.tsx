import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { AchievementsSection } from '@/components/sections/AchievementsSection';

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://portofolio-five-murex.vercel.app';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const title = t('pages.achievements.title');
  const description = t('pages.achievements.description');
  const ogTitle = `${title} | Bramasta`;
  const canonical = locale === 'en' ? `${BASE}/en/achievements` : `${BASE}/achievements`;
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        'id': `${BASE}/achievements`,
        'en': `${BASE}/en/achievements`,
        'x-default': `${BASE}/achievements`,
      },
    },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
    },
  };
}

export default function AchievementsPage() {
  return <AchievementsSection />;
}
