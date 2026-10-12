import {getTranslations} from 'next-intl/server';

import {serviceCatalog} from '@/config/services';

import ServicesRail from './services-rail';

const featuredServiceKeys = new Set([
  'botox',
  'fullFaceFiller',
  'lipFiller',
  'mesotherapy',
  'skinBooster',
  'hifu',
  'fractionalLaser',
  'laserHairRemoval',
  'acne'
]);

const services = serviceCatalog
  .filter((service) => featuredServiceKeys.has(service.key))
  .map((service, index) => ({
    ...service,
    aspect: index % 2 === 0 ? 'portrait' : 'square'
  }));

export default async function ServicesSection() {
  const t = await getTranslations('Home');

  return (
    <ServicesRail
      description={t('servicesDescription')}
      eyebrow={t('servicesEyebrow')}
      linkLabel={t('serviceLink')}
      services={services.map((service) => ({
        ...service,
        description: t(`serviceItems.${service.key}.description`),
        title: t(`serviceItems.${service.key}.title`)
      }))}
      title={t('servicesTitle')}
    />
  );
}
