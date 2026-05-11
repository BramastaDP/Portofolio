import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { AboutSection } from '@/components/sections/AboutSection';

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://portofolio-five-murex.vercel.app';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const title = t('pages.about.title');
  const description = t('pages.about.description');
  const ogTitle = `${title} | Bramasta`;
  const canonical = locale === 'en' ? `${BASE}/en/about` : `${BASE}/about`;
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        'id': `${BASE}/about`,
        'en': `${BASE}/en/about`,
        'x-default': `${BASE}/about`,
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

export default function AboutPage() {
  return <AboutSection />;
}
