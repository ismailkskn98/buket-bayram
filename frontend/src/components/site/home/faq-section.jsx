import {getTranslations} from 'next-intl/server';

import {Link} from '@/i18n/navigation';

const faqItems = [
  'consultation',
  'suitability',
  'preparation',
  'recovery',
  'sessions',
  'appointment'
];

export default async function FaqSection() {
  const t = await getTranslations('Home');

  return (
    <section
      aria-labelledby="home-faq-title"
      className="gridContainer border-y border-primary/15 py-[clamp(4.5rem,8vw,7rem)]"
    >
      <div className="grid gap-[clamp(3rem,6vw,6rem)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <header data-reveal className="self-start">
          <p className="text-xs text-primary sm:text-sm">{t('faqEyebrow')}</p>
          <h2
            id="home-faq-title"
            className="mt-5 max-w-[20ch] text-[clamp(2.25rem,3.7vw,4rem)] font-light leading-[1.01] tracking-[-0.045em] text-primary"
          >
            {t('faqTitle')}
          </h2>
          <p className="mt-7 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
            {t('faqDescription')}
          </p>
          <Link
            href="/faq"
            className="group mt-8 inline-flex items-center gap-3 border-b border-primary/45 pb-1 text-sm font-semibold text-primary transition-colors duration-300 hover:border-primary/20 hover:text-primary/70"
          >
            {t('faqCta')}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-out group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </header>

        <div data-reveal className="border-t border-primary/25">
          {faqItems.map((item, index) => (
            <details
              key={item}
              name="home-faq"
              open={index === 0}
              className="group border-b border-primary/20"
            >
              <summary className="grid list-none cursor-pointer grid-cols-[1fr_2.25rem] items-center gap-4 py-[clamp(1.25rem,2vw,1.75rem)] text-left marker:content-none [&::-webkit-details-marker]:hidden">
                <h3 className="max-w-[42ch] text-[clamp(1rem,1.15vw,1.2rem)] font-medium leading-[1.45] tracking-[-0.015em] transition-colors duration-300 group-hover:text-primary">
                  {t(`faqItems.${item}.question`)}
                </h3>
                <span
                  aria-hidden="true"
                  className="relative size-9 justify-self-end rounded-full border border-primary/25 transition-colors duration-300 group-hover:border-primary/60 group-open:bg-primary"
                >
                  <span className="absolute left-1/2 top-1/2 h-px w-3.5 -translate-x-1/2 -translate-y-1/2 bg-primary transition-colors duration-300 group-open:bg-primary-foreground" />
                  <span className="absolute left-1/2 top-1/2 h-3.5 w-px -translate-x-1/2 -translate-y-1/2 bg-primary transition-[transform,background-color] duration-300 group-open:rotate-90 group-open:bg-primary-foreground" />
                </span>
              </summary>
              <div className="grid grid-cols-[1fr_2.25rem] gap-4 pb-[clamp(1.5rem,2.5vw,2.25rem)]">
                <p className="max-w-[62ch] text-[clamp(0.875rem,0.95vw,0.975rem)] leading-[1.8] text-muted-foreground">
                  {t(`faqItems.${item}.answer`)}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
