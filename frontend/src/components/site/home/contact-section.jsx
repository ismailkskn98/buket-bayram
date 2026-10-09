import {getTranslations} from 'next-intl/server';

import {Button} from '@/components/ui/button';
import {siteConfig} from '@/config/site';

export default async function ContactSection({whatsappUrl}) {
  const t = await getTranslations('Home');

  return (
    <section className="gridContainer py-24 sm:py-32 lg:py-40">
      <div data-reveal className="bezelShell rounded-[2.7rem] bg-foreground/[0.07] p-2">
        <div className="bezelCore relative overflow-hidden rounded-[calc(2.7rem-0.5rem)] bg-forest px-6 py-16 text-parchment sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <span
            aria-hidden="true"
            className="absolute -bottom-28 -right-12 font-display text-[20rem] italic leading-none text-white/[0.035] sm:text-[28rem]"
          >
            +
          </span>
          <div className="relative z-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <span className="inline-flex rounded-full bg-white/[0.07] px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.19em] text-sage ring-1 ring-white/10">
                {t('contactEyebrow')}
              </span>
              <h2 className="mt-7 max-w-[10ch] font-display text-5xl leading-[0.9] tracking-[-0.05em] sm:text-7xl lg:text-8xl">
                {t('contactTitle')}
              </h2>
            </div>
            <div>
              <p className="max-w-lg text-base leading-8 text-parchment/60">
                {t('contactDescription')}
              </p>
              <Button asChild variant="light" className="mt-8 w-full justify-between py-2 pl-6 pr-2 sm:w-auto sm:min-w-72">
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  <span>{t('primaryCta')}</span>
                  <span className="flex size-9 items-center justify-center rounded-full bg-forest/10 text-lg transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105">
                    ↗
                  </span>
                </a>
              </Button>
            </div>
          </div>

          <div className="relative z-10 mt-14 grid gap-5 border-t border-white/10 pt-7 text-sm text-parchment/60 sm:grid-cols-2 lg:mt-20">
            <address className="not-italic">
              <span className="block text-[0.6rem] font-bold uppercase tracking-[0.18em] text-parchment/35">
                {t('contactAddressLabel')}
              </span>
              <span className="mt-2 block max-w-lg leading-6">{siteConfig.address}</span>
            </address>
            <div className="sm:text-right">
              <span className="block text-[0.6rem] font-bold uppercase tracking-[0.18em] text-parchment/35">
                {t('contactPhoneLabel')}
              </span>
              <a
                href={`tel:${siteConfig.phone}`}
                className="mt-2 inline-block text-parchment transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-sage"
              >
                {siteConfig.phoneLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
