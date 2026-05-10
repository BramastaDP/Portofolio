import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getProjectBySlug, projects } from '@/data/projects';
import { ProjectDetailSection } from '@/components/sections/ProjectDetailSection';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://bramasta.dev';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const l = locale as 'id' | 'en';
  const canonical = locale === 'en' ? `${BASE}/en/projects/${slug}` : `${BASE}/projects/${slug}`;
  return {
    title: project.title,
    description: project.description[l],
    alternates: {
      canonical,
      languages: {
        'id': `${BASE}/projects/${slug}`,
        'en': `${BASE}/en/projects/${slug}`,
        'x-default': `${BASE}/projects/${slug}`,
      },
    },
    openGraph: {
      title: project.title,
      description: project.description[l],
      url: canonical,
      type: 'article',
      ...(project.thumbnail ? { images: [{ url: project.thumbnail, width: 1200, height: 675, alt: project.title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description[l],
      ...(project.thumbnail ? { images: [project.thumbnail] } : {}),
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return <ProjectDetailSection project={project} />;
}
