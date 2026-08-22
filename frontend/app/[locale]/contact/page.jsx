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
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto w-[min(92%,72rem)]">
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
