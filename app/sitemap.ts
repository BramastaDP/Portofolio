import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://portofolio-five-murex.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/about', '/projects', '/achievements', '/contact'];
  const locales = ['', '/en'] as const;

  const pages = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE_URL}${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: page === '' ? 1 : 0.8,
    }))
  );

  const projectPages = projects.flatMap((project) => [
    {
      url: `${BASE_URL}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/en/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]);

  return [...pages, ...projectPages];
}
