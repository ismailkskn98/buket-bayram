import {siteConfig} from '@/config/site';

const localizedPages = [
  {tr: '/', en: '/en'},
  {tr: '/uygulamalar', en: '/en/treatments'},
  {tr: '/hakkimda', en: '/en/about'},
  {tr: '/blog', en: '/en/blog'},
  {tr: '/sik-sorulan-sorular', en: '/en/faq'},
  {tr: '/iletisim', en: '/en/contact'}
];

export default function sitemap() {
  const lastModified = new Date();

  return localizedPages.flatMap((page) => {
    const trUrl = new URL(page.tr, siteConfig.url).toString();
    const enUrl = new URL(page.en, siteConfig.url).toString();
    const alternates = {
      languages: {
        tr: trUrl,
        en: enUrl,
        'x-default': trUrl
      }
    };

    return [
      {
        url: trUrl,
        lastModified,
        changeFrequency: 'weekly',
        alternates
      },
      {
        url: enUrl,
        lastModified,
        changeFrequency: 'weekly',
        alternates
      }
    ];
  });
}
