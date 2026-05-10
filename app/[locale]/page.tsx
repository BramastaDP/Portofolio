import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { HomeSection } from '@/components/sections/HomeSection';

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://bramasta.dev';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const title = t('title');
  const description = t('pages.home.description');
  const canonical = locale === 'en' ? `${BASE}/en` : `${BASE}/`;
  return {
    title: t('pages.home.title'),
    description,
    alternates: {
      canonical,
      languages: {
        'id': `${BASE}/`,
        'en': `${BASE}/en`,
        'x-default': `${BASE}/`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function HomePage() {
  return <HomeSection />;
}
