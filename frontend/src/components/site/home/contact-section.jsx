import Image from 'next/image';
import {getTranslations} from 'next-intl/server';

import {Button} from '@/components/ui/button';
import {siteConfig} from '@/config/site';

export default async function ContactSection({whatsappUrl}) {
  const t = await getTranslations('Home');

  return (
    <section aria-labelledby="contact-title" className="gridContainer py-[clamp(4rem,8vw,8rem)]">
      <div className="contactEditorial relative isolate min-h-[44rem] overflow-hidden bg-primary-soft sm:min-h-[42rem] lg:min-h-[40rem]">
        <Image
          src="/images/healthy-skin-editorial.webp"
          alt={t('contactImageAlt')}
          fill
          sizes="92vw"
          className="object-cover object-[68%_center] opacity-60 sm:opacity-75 lg:opacity-100"
        />
        <div aria-hidden="true" className="contactEditorialScrim absolute inset-0" />

        <div data-reveal className="relative flex min-h-[44rem] max-w-xl flex-col justify-between p-7 sm:min-h-[42rem] sm:p-10 lg:min-h-[40rem] lg:p-14">
          <div>
            <p className="text-xs text-primary sm:text-sm">
              {t('contactEyebrow')}
            </p>
            <h2 id="contact-title" className="mt-7 max-w-[11ch] text-[clamp(2.8rem,4.8vw,4.9rem)] font-light leading-[0.94] tracking-[-0.05em] text-primary">
              {t('contactTitle')}
            </h2>
            <p className="mt-7 max-w-md text-sm leading-7 text-foreground/80 sm:text-base">
              {t('contactDescription')}
            </p>
            <Button asChild className="mt-8 h-12 w-full rounded-none px-6 shadow-none sm:w-auto">
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                {t('primaryCta')}
              </a>
            </Button>
          </div>

          <div className="mt-16 grid gap-5 border-t border-primary/12 pt-5 text-sm sm:grid-cols-2">
            <address className="not-italic">
              <span className="block text-xs text-primary/60">{t('contactAddressLabel')}</span>
              <span className="mt-2 block max-w-xs leading-6 text-foreground/75">
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
      </div>
    </section>
  );
}
