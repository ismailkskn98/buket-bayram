import {getLocale, getTranslations} from 'next-intl/server';

import {siteConfig} from '@/config/site';

export default async function SiteFooter() {
  const locale = await getLocale();
  const t = await getTranslations('Footer');

  return (
    <footer className="border-t border-border bg-muted/40 py-12">
      <div className="mx-auto grid w-[min(92%,90rem)] gap-8 md:grid-cols-2">
        <div>
          <p className="font-semibold">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">{t('specialty')}</p>
        </div>
        <address className="not-italic md:text-right">
          <p className="text-sm font-medium">{t('addressLabel')}</p>
          <p className="mt-2 text-sm text-muted-foreground">{siteConfig.address}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneLabel}</a>
          </p>
        </address>
      </div>
      <div className="mx-auto mt-10 flex w-[min(92%,90rem)] flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:justify-between">
        <p>{t('medicalNotice')}</p>
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. {t('rights')} ({locale.toUpperCase()})
        </p>
      </div>
    </footer>
  );
}
