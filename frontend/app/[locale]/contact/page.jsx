import {getTranslations, setRequestLocale} from 'next-intl/server';

import PageIntro from '@/components/site/page-intro';
import {Button} from '@/components/ui/button';
import {siteConfig} from '@/config/site';

export default async function ContactPage({params}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const [pages, navigation] = await Promise.all([
    getTranslations('Pages'),
    getTranslations('Navigation')
  ]);
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    navigation('whatsappMessage')
  )}`;

  return (
    <>
      <PageIntro
        eyebrow={pages('contactEyebrow')}
        title={pages('contactTitle')}
        description={pages('contactDescription')}
      />
      <section className="gridContainer py-16 sm:py-20">
        <div>
          <Button asChild>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              {navigation('whatsapp')}
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
