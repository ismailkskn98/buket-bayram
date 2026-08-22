import {getTranslations, setRequestLocale} from 'next-intl/server';

import {Button} from '@/components/ui/button';
import {siteConfig} from '@/config/site';
import {Link} from '@/i18n/navigation';

export default async function HomePage({params}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const [home, navigation] = await Promise.all([
    getTranslations('Home'),
    getTranslations('Navigation')
  ]);
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    navigation('whatsappMessage')
  )}`;

  return (
    <>
      <section className="py-24 sm:py-36">
        <div className="mx-auto w-[min(92%,90rem)]">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            {home('eyebrow')}
          </p>
          <h1 className="mt-5 max-w-5xl text-5xl font-semibold tracking-[-0.045em] sm:text-7xl">
            {home('title')}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            {home('description')}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                {navigation('whatsapp')}
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link href="/treatments">{navigation('treatments')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/40 py-16 sm:py-24">
        <div className="mx-auto grid w-[min(92%,90rem)] gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-border bg-background p-8 sm:p-10">
            <h2 className="text-2xl font-semibold">{home('medicalTitle')}</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              {home('medicalDescription')}
            </p>
          </article>
          <article className="rounded-3xl border border-border bg-background p-8 sm:p-10">
            <h2 className="text-2xl font-semibold">{home('cosmeticTitle')}</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              {home('cosmeticDescription')}
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
