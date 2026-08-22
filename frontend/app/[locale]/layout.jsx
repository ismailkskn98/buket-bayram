import {hasLocale} from 'next-intl';
import {NextIntlClientProvider} from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale
} from 'next-intl/server';
import {notFound} from 'next/navigation';

import SiteFooter from '@/components/site/footer';
import SiteHeader from '@/components/site/header';
import {routing} from '@/i18n/routing';
import {siteConfig} from '@/config/site';

import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({locale, namespace: 'Metadata'});
  const canonical = locale === 'tr' ? '/' : '/en';

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t('title'),
      template: `%s | ${siteConfig.name}`
    },
    description: t('description'),
    alternates: {
      canonical,
      languages: {
        tr: '/',
        en: '/en',
        'x-default': '/'
      }
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export default async function LocaleLayout({children, params}) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
