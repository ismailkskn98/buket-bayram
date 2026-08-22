import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  localePrefix: 'as-needed',
  localeDetection: false,
  pathnames: {
    '/': '/',
    '/treatments': {
      tr: '/uygulamalar',
      en: '/treatments'
    },
    '/treatments/[slug]': {
      tr: '/uygulamalar/[slug]',
      en: '/treatments/[slug]'
    },
    '/about': {
      tr: '/hakkimda',
      en: '/about'
    },
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/faq': {
      tr: '/sik-sorulan-sorular',
      en: '/faq'
    },
    '/contact': {
      tr: '/iletisim',
      en: '/contact'
    }
  }
});
