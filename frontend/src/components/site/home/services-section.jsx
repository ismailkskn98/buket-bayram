import {getTranslations} from 'next-intl/server';

import {Link} from '@/i18n/navigation';

const serviceCards = [
  {
    description: 'medicalDescription',
    number: '01',
    title: 'medicalTitle',
    style: 'bg-forest text-parchment',
    textStyle: 'text-parchment/65',
    numberStyle: 'text-parchment/18',
    className: 'md:col-span-7 md:row-span-2'
  },
  {
    description: 'cosmeticDescription',
    number: '02',
    title: 'cosmeticTitle',
    style: 'bg-[#d8c7b8] text-foreground',
    textStyle: 'text-foreground/62',
    numberStyle: 'text-foreground/12',
    className: 'md:col-span-5'
  },
  {
    description: 'laserDescription',
    number: '03',
    title: 'laserTitle',
    style: 'bg-sage text-forest',
    textStyle: 'text-forest/65',
    numberStyle: 'text-forest/12',
    className: 'md:col-span-5'
  }
];

export default async function ServicesSection() {
  const t = await getTranslations('Home');

  return (
    <section className="gridContainer bg-parchment py-24 sm:py-32 lg:py-40">
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
        <div data-reveal>
          <span className="inline-flex rounded-full bg-primary/9 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.19em] text-primary ring-1 ring-primary/10">
            {t('servicesEyebrow')}
          </span>
          <h2 className="mt-6 max-w-[12ch] font-display text-5xl leading-[0.93] tracking-[-0.045em] sm:text-7xl">
            {t('servicesTitle')}
          </h2>
        </div>
        <p
          data-reveal
          className="max-w-2xl text-base leading-7 text-muted-foreground lg:ml-auto lg:text-lg lg:leading-8"
        >
          {t('servicesDescription')}
        </p>
      </div>

      <div className="mt-16 grid gap-4 md:grid-cols-12 md:auto-rows-[17rem]">
        {serviceCards.map((serviceCard) => (
          <article
            key={serviceCard.title}
            data-reveal
            className={`bezelShell min-h-72 rounded-[2.3rem] md:min-h-0 ${serviceCard.className}`}
          >
            <div
              className={`bezelCore relative flex h-full min-h-72 flex-col justify-between overflow-hidden rounded-[calc(2.3rem-0.375rem)] p-7 sm:p-9 md:min-h-0 ${serviceCard.style}`}
            >
              <span
                aria-hidden="true"
                className={`absolute -right-2 -top-8 font-display text-[9rem] italic leading-none tracking-[-0.08em] sm:text-[11rem] ${serviceCard.numberStyle}`}
              >
                {serviceCard.number}
              </span>
              <div className="relative z-10">
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.19em] opacity-55">
                  {t('serviceLabel')} · {serviceCard.number}
                </span>
                <h3 className="mt-5 max-w-[11ch] font-display text-4xl leading-[0.95] tracking-[-0.04em] sm:text-5xl">
                  {t(serviceCard.title)}
                </h3>
              </div>
              <div className="relative z-10 mt-12 flex items-end justify-between gap-5">
                <p className={`max-w-md text-sm leading-6 ${serviceCard.textStyle}`}>
                  {t(serviceCard.description)}
                </p>
                <Link
                  href="/treatments"
                  aria-label={`${t('serviceLink')}: ${t(serviceCard.title)}`}
                  className="group flex size-11 shrink-0 items-center justify-center rounded-full bg-parchment text-forest shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 active:scale-95"
                >
                  <span className="transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
