import {getTranslations, setRequestLocale} from 'next-intl/server';

import PageIntro from '@/components/site/page-intro';

export default async function TreatmentsPage({params}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Pages');

  return (
    <PageIntro
      eyebrow={t('treatmentsEyebrow')}
      title={t('treatmentsTitle')}
      description={t('treatmentsDescription')}
    />
  );
}
