'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Languages } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('language');

  const toggle = () => {
    const nextLocale = locale === 'id' ? 'en' : 'id';
    const segments = pathname.split('/').filter(Boolean);
    const locales = ['id', 'en'];

    let newPath: string;
    if (segments[0] && locales.includes(segments[0])) {
      segments[0] = nextLocale;
      newPath = '/' + segments.join('/');
    } else {
      newPath = nextLocale === 'id' ? pathname : `/${nextLocale}${pathname}`;
    }

    router.push(newPath);
  };

  return (
    <Tooltip>
      <TooltipTrigger
        onClick={toggle}
        className="flex items-center gap-1.5 px-2 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-xs font-medium"
        aria-label={t('toggle')}
      >
        <Languages size={18} />
        <span className="uppercase">{locale}</span>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{locale === 'id' ? t('en') : t('id')}</p>
      </TooltipContent>
    </Tooltip>
  );
}
