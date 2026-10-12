import Image from 'next/image';
import {getTranslations} from 'next-intl/server';

import {Button} from '@/components/ui/button';
import {siteConfig} from '@/config/site';

export default async function ContactSection({whatsappUrl}) {
  const t = await getTranslations('Home');

  return (
    <section className="gridContainer py-20 sm:py-28 lg:py-36">
      <div className="grid bg-primary-soft lg:grid-cols-2">
        <div data-reveal className="flex flex-col justify-between p-7 sm:p-10 lg:p-14">
          <div>
            <p className="text-xs text-primary sm:text-sm">{t('contactEyebrow')}</p>
            <h2 className="mt-8 max-w-[10ch] text-[clamp(3rem,5.8vw,6.25rem)] font-light leading-[0.91] tracking-[-0.055em] text-primary">
              {t('contactTitle')}
            </h2>
            <p className="mt-8 max-w-lg text-base leading-7 text-muted-foreground">
              {t('contactDescription')}
            </p>
            <Button asChild className="mt-9 w-full sm:w-auto">
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                {t('primaryCta')}
              </a>
            </Button>
          </div>

          <div className="mt-16 grid gap-6 border-t border-primary/25 pt-6 text-sm sm:grid-cols-2">
            <address className="not-italic">
              <span className="block text-xs text-primary/60">{t('contactAddressLabel')}</span>
              <span className="mt-2 block max-w-xs leading-6 text-muted-foreground">
                {siteConfig.addressShort}
              </span>
            </address>
            <div>
              <span className="block text-xs text-primary/60">{t('contactPhoneLabel')}</span>
              <a href={`tel:${siteConfig.phone}`} className="mt-2 inline-block text-primary hover:underline">
                {siteConfig.phoneLabel}
              </a>
            </div>
          </div>
        </div>

        <div data-reveal className="relative min-h-[30rem] bg-muted lg:min-h-[44rem]">
          <Image
            src="/images/healthy-skin-editorial.webp"
            alt={t('contactImageAlt')}
            fill
            sizes="(max-width: 1023px) 92vw, 46vw"
            className="object-cover object-[67%_center]"
          />
        </div>
      </div>
    </section>
  );
}
