import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { ProjectsSection } from '@/components/sections/ProjectsSection';

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://portofolio-five-murex.vercel.app';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const title = t('pages.projects.title');
  const description = t('pages.projects.description');
  const ogTitle = `${title} | Bramasta`;
  const canonical = locale === 'en' ? `${BASE}/en/projects` : `${BASE}/projects`;
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        'id': `${BASE}/projects`,
        'en': `${BASE}/en/projects`,
        'x-default': `${BASE}/projects`,
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

export default function ProjectsPage() {
  return <ProjectsSection />;
}
