import {getTranslations} from 'next-intl/server';

import {ImageCompare} from '@/components/ui/image-compare';

export default async function ResultsSection() {
  const t = await getTranslations('Home');

  return (
    <section
      aria-labelledby="results-title"
      className="gridContainer py-[clamp(5rem,10vw,9rem)]"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-y-0">
        <div data-reveal className="lg:col-span-5 lg:pr-[clamp(1rem,3vw,3rem)]">
          <h2
            id="results-title"
            className="max-w-[12ch] text-[clamp(2.75rem,5.2vw,5rem)] font-light leading-[0.96] tracking-[-0.055em] text-primary"
          >
            {t('resultsTitle')}
          </h2>
          <p className="mt-7 max-w-md text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {t('resultsDescription')}
          </p>

          <div className="mt-10 max-w-md border-t border-primary/20 pt-5">
            <p className="text-sm font-medium text-primary">
              {t('resultsHint')}
            </p>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              {t('resultsDisclaimer')}
            </p>
          </div>
        </div>

        <div
          data-reveal
          className="lg:col-span-6 lg:col-start-7"
        >
          <ImageCompare
            beforeImage="/images/before-treatment.webp"
            afterImage="/images/after-treatment.webp"
            alt={t('resultsImageAlt')}
            beforeLabel={t('resultsBeforeLabel')}
            afterLabel={t('resultsAfterLabel')}
            className="aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5]"
            sizes="(max-width: 639px) 92vw, (max-width: 1023px) 92vw, 46vw"
          />
        </div>
      </div>
    </section>
  );
}
