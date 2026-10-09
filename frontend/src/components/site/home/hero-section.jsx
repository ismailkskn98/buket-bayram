import Image from 'next/image';
import {getTranslations} from 'next-intl/server';

import {Button} from '@/components/ui/button';
import {Link} from '@/i18n/navigation';

export default async function HeroSection({whatsappUrl}) {
  const t = await getTranslations('Home');

  return (
    <section className="gridContainer relative overflow-hidden pb-24 pt-8 sm:pb-32 lg:min-h-[calc(100dvh-6.5rem)] lg:items-center lg:pb-24 lg:pt-10">
      <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 xl:gap-20">
        <div className="relative z-10 max-w-4xl">
          <div
            data-hero-reveal
            className="inline-flex items-center gap-2 rounded-full bg-foreground/[0.055] px-3 py-1.5 text-[0.64rem] font-bold uppercase tracking-[0.19em] text-primary ring-1 ring-foreground/[0.06]"
          >
            <span className="size-1.5 rounded-full bg-clay" />
            {t('eyebrow')}
          </div>

          <h1 className="mt-8 max-w-[13ch] font-display text-[clamp(4rem,8.6vw,8.8rem)] font-normal leading-[0.82] tracking-[-0.062em]">
            <span data-hero-reveal className="block">
              {t('heroTitleStart')}
            </span>
            <span
              data-hero-reveal
              className="block pl-[0.6em] italic text-clay"
            >
              {t('heroTitleAccent')}
            </span>
            <span data-hero-reveal className="block">
              {t('heroTitleEnd')}
            </span>
          </h1>

          <div
            data-hero-line
            className="mt-8 h-px w-full max-w-xl bg-foreground/14"
          />

          <div className="mt-7 grid max-w-2xl gap-7 sm:grid-cols-[1fr_auto] sm:items-end">
            <p
              data-hero-reveal
              className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
            >
              {t('description')}
            </p>
            <span
              data-hero-reveal
              aria-hidden="true"
              className="hidden font-display text-5xl italic text-primary/45 sm:block"
            >
              01
            </span>
          </div>

          <div data-hero-reveal className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="justify-between py-2 pl-6 pr-2 sm:min-w-64">
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                <span>{t('primaryCta')}</span>
                <span className="flex size-9 items-center justify-center rounded-full bg-white/12 text-lg transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105">
                  ↗
                </span>
              </a>
            </Button>
            <Button asChild variant="outline" className="justify-between py-2 pl-6 pr-2">
              <Link href="/treatments">
                <span>{t('secondaryCta')}</span>
                <span className="flex size-9 items-center justify-center rounded-full bg-foreground/[0.06] text-lg transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:scale-105">
                  →
                </span>
              </Link>
            </Button>
          </div>
        </div>

        <div data-hero-media className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="bezelShell rounded-[2.6rem] bg-foreground/[0.06] p-2">
            <div className="bezelCore relative aspect-[4/5] overflow-hidden rounded-[calc(2.6rem-0.5rem)] bg-muted">
              <Image
                src="/images/skin-layers-editorial.webp"
                alt={t('heroImageAlt')}
                fill
                preload
                sizes="(max-width: 1023px) 92vw, 43vw"
                className="object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 rounded-[1.4rem] bg-parchment/92 p-4 shadow-[0_12px_40px_rgba(24,33,27,0.12)] sm:inset-x-5 sm:bottom-5 sm:p-5">
                <div>
                  <p className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    {t('heroCardEyebrow')}
                  </p>
                  <p className="mt-1.5 font-display text-xl leading-none tracking-[-0.025em] sm:text-2xl">
                    {t('heroCardTitle')}
                  </p>
                </div>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  +
                </span>
              </div>
            </div>
          </div>

          <div className="absolute -left-3 top-12 hidden rounded-full bg-forest px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.17em] text-parchment shadow-[0_16px_40px_rgba(24,49,38,0.18)] sm:block lg:-left-7">
            {t('heroFloatingNote')}
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-4 border-t border-foreground/10 pt-5 sm:grid-cols-3 lg:mt-10">
        {['trustSpecialist', 'trustPersonal', 'trustLocation'].map((key, index) => (
          <div
            key={key}
            data-hero-reveal
            className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"
          >
            <span className="font-display text-lg italic text-clay">
              0{index + 1}
            </span>
            {t(key)}
          </div>
        ))}
      </div>
    </section>
  );
}
