import {getTranslations, setRequestLocale} from 'next-intl/server';

import PageIntro from '@/components/site/page-intro';

export default async function FaqPage({params}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Pages');

  return (
    <PageIntro
      eyebrow={t('faqEyebrow')}
      title={t('faqTitle')}
      description={t('faqDescription')}
    />
  );
}
