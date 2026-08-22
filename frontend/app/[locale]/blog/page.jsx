import {getTranslations, setRequestLocale} from 'next-intl/server';

import PageIntro from '@/components/site/page-intro';

export default async function BlogPage({params}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Pages');

  return (
    <PageIntro
      eyebrow={t('blogEyebrow')}
      title={t('blogTitle')}
      description={t('blogDescription')}
    />
  );
}
