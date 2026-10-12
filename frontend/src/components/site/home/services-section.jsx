import Image from 'next/image';
import {getTranslations} from 'next-intl/server';

import {Link} from '@/i18n/navigation';

const services = [
  {
    description: 'medicalDescription',
    image: '/images/dermatology-examination.webp',
    imageClassName: 'object-center',
    title: 'medicalTitle'
  },
  {
    description: 'cosmeticDescription',
    image: '/images/bb-clinic-hero.webp',
    imageClassName: 'object-[58%_center]',
    title: 'cosmeticTitle'
  },
  {
    description: 'laserDescription',
    image: '/images/skin-layers-editorial.webp',
    imageClassName: 'object-center',
    title: 'laserTitle'
  }
];

export default async function ServicesSection() {
  const t = await getTranslations('Home');

  return (
    <section className="gridContainer border-t border-primary/20 py-20 sm:py-28 lg:py-36">
      <div className="homeSectionContent">
        <p data-reveal className="text-xs text-primary sm:text-sm">
          {t('servicesEyebrow')}
        </p>

        <h2 className="servicesDisplayTitle mt-5 font-light uppercase text-primary">
          <span data-reveal className="block">{t('servicesDisplayStart')}</span>
          <span data-reveal className="block text-right">{t('servicesDisplayEnd')}</span>
        </h2>

        <p
          data-reveal
          className="ml-auto mt-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
        >
          {t('servicesDescription')}
        </p>

        <div className="mt-14 grid gap-x-4 gap-y-12 md:grid-cols-3 lg:mt-20 lg:gap-x-6">
          {services.map((service) => (
            <article key={service.title} data-reveal>
              <Link href="/treatments" className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 92vw, 30vw"
                    className={`object-cover transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.025] ${service.imageClassName}`}
                  />
                </div>
                <div className="border-t border-primary/25 pt-5">
                  <div className="flex items-start justify-between gap-5">
                    <h3 className="max-w-[16ch] text-xl font-medium leading-tight tracking-[-0.025em] sm:text-2xl">
                      {t(service.title)}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-1 text-xl text-primary transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                  <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
                    {t(service.description)}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
