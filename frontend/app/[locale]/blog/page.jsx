import {getTranslations, setRequestLocale} from 'next-intl/server';

import UnderConstruction from '@/components/site/under-construction';

export const metadata = {
  robots: {index: false, follow: false}
};

export default async function BlogPage({params}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Pages');

  return (
    <UnderConstruction
      eyebrow={t('blogEyebrow')}
      description={t('blogDescription')}
      pageTitle={t('blogTitle')}
    />
  );
}
