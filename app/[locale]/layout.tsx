import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { LocaleLayoutClient } from '@/components/layout/LocaleLayoutClient';
import { SplashScreen } from '@/components/layout/SplashScreen';
import { routing } from '@/i18n/routing';
import { profile } from '@/data/profile';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const title = t('title');
  const description = t('description');
  return {
    title: {
      default: title,
      template: `%s | Bramasta`,
    },
    description,
    keywords: t('keywords'),
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      siteName: profile.fullName,
      ...(profile.ogImage ? { images: [{ url: profile.ogImage, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(profile.ogImage ? { images: [profile.ogImage] } : {}),
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'id' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
        <SplashScreen />
        <div data-content-wrapper className="flex min-h-screen bg-background">
          <LocaleLayoutClient>{children}</LocaleLayoutClient>
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
