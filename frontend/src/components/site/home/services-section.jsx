import {getTranslations} from 'next-intl/server';

import {serviceCatalog} from '@/config/services';

import ServicesRail from './services-rail';

const services = serviceCatalog.map((service, index) => ({
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
