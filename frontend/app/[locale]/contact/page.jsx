import {getTranslations, setRequestLocale} from 'next-intl/server';

import UnderConstruction from '@/components/site/under-construction';

export const metadata = {
  robots: {index: false, follow: false}
};

export default async function ContactPage({params}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const pages = await getTranslations('Pages');

  return (
    <UnderConstruction
      eyebrow={pages('contactEyebrow')}
      description={pages('contactDescription')}
      pageTitle={pages('contactTitle')}
    />
  );
}
