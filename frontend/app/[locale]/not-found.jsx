import {getTranslations} from 'next-intl/server';

import {Button} from '@/components/ui/button';
import {Link} from '@/i18n/navigation';

export default async function NotFoundPage() {
  const t = await getTranslations('Pages');

  return (
    <section className="py-24 text-center sm:py-36">
      <div className="mx-auto w-[min(92%,48rem)]">
        <p className="text-sm font-medium text-primary">404</p>
        <h1 className="mt-4 text-4xl font-semibold">{t('notFoundTitle')}</h1>
        <p className="mt-4 text-muted-foreground">{t('notFoundDescription')}</p>
        <Button asChild className="mt-8">
          <Link href="/">{t('backHome')}</Link>
        </Button>
      </div>
    </section>
  );
}
