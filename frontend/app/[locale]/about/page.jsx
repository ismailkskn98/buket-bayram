import {getTranslations, setRequestLocale} from 'next-intl/server';

import UnderConstruction from '@/components/site/under-construction';

export const metadata = {
  robots: {index: false, follow: false}
};

export default async function AboutPage({params}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Pages');

  return (
    <UnderConstruction
      eyebrow={t('aboutEyebrow')}
      description={t('aboutDescription')}
      pageTitle={t('aboutTitle')}
    />
  );
}
