import {getTranslations} from 'next-intl/server';

import {ImageCompare} from '@/components/ui/image-compare';

export default async function ResultsSection() {
  const t = await getTranslations('Home');

  return (
    <section
      aria-labelledby="results-title"
      className="gridContainer homeSectionSpace"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-y-0">
        <div data-reveal className="lg:col-span-5 lg:pr-[clamp(1rem,3vw,3rem)]">
          <h2
            id="results-title"
            className="homeSectionTitle max-w-[13ch] text-primary"
          >
            {t('resultsTitle')}
          </h2>
          <p className="homeSectionBody mt-6 max-w-md text-muted-foreground">
            {t('resultsDescription')}
          </p>

          <div className="mt-10 max-w-md border-t border-primary/10 pt-5">
            <p className="homeCardBody font-medium text-primary">
              {t('resultsHint')}
            </p>
            <p className="homeFineText mt-2 text-muted-foreground">
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
            className="aspect-[4/5] sm:aspect-[16/11] lg:ml-auto lg:aspect-[4/5] lg:w-[min(100%,64svh)]"
            sizes="(max-width: 639px) 92vw, (max-width: 1023px) 92vw, 46vw"
          />
        </div>
      </div>
    </section>
  );
}
