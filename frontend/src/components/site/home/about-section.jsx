import Image from 'next/image';
import {getTranslations} from 'next-intl/server';

import {Link} from '@/i18n/navigation';

export default async function AboutSection() {
  const t = await getTranslations('Home');

  return (
    <section aria-labelledby="about-title" className="gridContainer py-[clamp(5rem,10vw,9rem)]">
      <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-14">
        <header data-reveal className="lg:col-span-12 lg:grid lg:grid-cols-12 lg:items-end lg:gap-8">
          <p className="text-xs text-primary sm:text-sm lg:col-span-3 lg:pb-2">
            {t('aboutEyebrow')}
          </p>
          <h2 id="about-title" className="mt-4 text-[clamp(3.2rem,6.8vw,7rem)] font-light leading-[0.87] tracking-[-0.06em] text-primary lg:col-span-9 lg:mt-0">
            Dr. Buket Bayram
          </h2>
        </header>

        <figure data-reveal className="lg:col-span-7">
          <div className="relative aspect-[5/6] overflow-hidden bg-muted sm:aspect-[4/3] lg:aspect-[5/6]">
            <Image
              src="/images/dermatology-examination.webp"
              alt={t('aboutImageAlt')}
              fill
              sizes="(max-width: 1023px) 92vw, 54vw"
              className="object-cover object-center"
            />
          </div>
          <figcaption className="mt-3 max-w-2xl text-xs leading-5 text-muted-foreground">
            {t('aboutSpecialty')}
          </figcaption>
        </figure>

        <div data-reveal className="self-center lg:col-span-4 lg:col-start-9">
          <h3 className="max-w-[16ch] text-[clamp(2rem,3.3vw,3.4rem)] font-light leading-[1.02] tracking-[-0.045em]">
            {t('aboutTitle')}
          </h3>
          <p className="mt-7 text-base leading-8 text-muted-foreground">
            {t('aboutDescription')}
          </p>
          <p className="mt-8 border-l border-primary pl-5 text-lg leading-7 text-primary">
            {t('aboutPrinciple')}
          </p>
          <Link
            href="/about"
            className="mt-9 inline-flex border-b border-primary pb-1 text-sm font-semibold text-primary transition-opacity duration-300 hover:opacity-60"
          >
            {t('aboutCta')}
          </Link>
        </div>
      </div>
    </section>
  );
}
