import {getTranslations} from 'next-intl/server';

import {Button} from '@/components/ui/button';
import {Link} from '@/i18n/navigation';

export default async function AboutSection() {
  const t = await getTranslations('Home');

  return (
    <section className="gridContainer py-24 sm:py-32 lg:py-40">
      <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <div data-reveal className="bezelShell min-h-[30rem] rounded-[2.5rem] p-2">
          <div className="bezelCore relative flex h-full min-h-[30rem] flex-col justify-between overflow-hidden rounded-[calc(2.5rem-0.5rem)] bg-clay p-8 text-parchment sm:p-11">
            <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-parchment/60">
              {t('aboutEyebrow')}
            </span>
            <div>
              <span
                aria-hidden="true"
                className="absolute -right-7 top-3 font-display text-[15rem] italic leading-none text-parchment/[0.09] sm:text-[20rem]"
              >
                Dr.
              </span>
              <p className="relative z-10 font-display text-6xl leading-[0.88] tracking-[-0.055em] sm:text-8xl">
                Buket
                <br />
                Bayram
              </p>
              <p className="relative z-10 mt-6 max-w-sm text-sm leading-6 text-parchment/68">
                {t('aboutSpecialty')}
              </p>
            </div>
          </div>
        </div>

        <div data-reveal className="bezelShell rounded-[2.5rem] p-2">
          <div className="bezelCore flex h-full flex-col justify-between rounded-[calc(2.5rem-0.5rem)] bg-parchment p-8 sm:p-11 lg:p-14">
            <div>
              <span className="inline-flex rounded-full bg-primary/9 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.19em] text-primary ring-1 ring-primary/10">
                {t('aboutSectionLabel')}
              </span>
              <h2 className="mt-7 max-w-[12ch] font-display text-5xl leading-[0.93] tracking-[-0.045em] sm:text-7xl">
                {t('aboutTitle')}
              </h2>
              <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground">
                {t('aboutDescription')}
              </p>
            </div>

            <div className="mt-14 flex flex-col gap-7 border-t border-foreground/10 pt-7 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-sm font-display text-2xl italic leading-snug text-primary">
                {t('aboutPrinciple')}
              </p>
              <Button asChild variant="outline" className="justify-between py-2 pl-6 pr-2">
                <Link href="/about">
                  <span>{t('aboutCta')}</span>
                  <span className="flex size-9 items-center justify-center rounded-full bg-foreground/[0.06] text-lg transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:scale-105">
                    →
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
