import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { ContactSection } from '@/components/sections/ContactSection';

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://portofolio-five-murex.vercel.app';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const title = t('pages.contact.title');
  const description = t('pages.contact.description');
  const ogTitle = `${title} | Bramasta`;
  const canonical = locale === 'en' ? `${BASE}/en/contact` : `${BASE}/contact`;
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        'id': `${BASE}/contact`,
        'en': `${BASE}/en/contact`,
        'x-default': `${BASE}/contact`,
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

export default function ContactPage() {
  return <ContactSection />;
}
