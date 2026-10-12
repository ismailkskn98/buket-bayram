import Image from 'next/image';
import {getTranslations} from 'next-intl/server';

import {Button} from '@/components/ui/button';
import {Link} from '@/i18n/navigation';

export default async function AboutSection() {
  const t = await getTranslations('Home');

  return (
    <section className="gridContainer py-20 sm:py-28 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div data-reveal className="lg:col-span-7 lg:pb-5">
          <p className="text-xs text-primary sm:text-sm">{t('aboutEyebrow')}</p>
          <p className="mt-7 text-[clamp(3.6rem,8.8vw,9rem)] font-light uppercase leading-[0.8] tracking-[-0.055em] text-primary">
            Dr. Buket
            <span className="block text-right">Bayram</span>
          </p>
          <h2 className="mt-12 max-w-[18ch] text-3xl font-medium leading-[1.08] tracking-[-0.04em] sm:text-5xl">
            {t('aboutTitle')}
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground">
            {t('aboutDescription')}
          </p>

          <div className="mt-10 flex flex-col gap-7 border-t border-primary/20 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-sm text-lg leading-7 text-primary">
              {t('aboutPrinciple')}
            </p>
            <Button asChild variant="outline">
              <Link href="/about">{t('aboutCta')}</Link>
            </Button>
          </div>
        </div>

        <div data-reveal className="relative aspect-[4/5] overflow-hidden bg-muted lg:col-span-5">
          <Image
            src="/images/skin-layers-editorial.webp"
            alt=""
            fill
            sizes="(max-width: 1023px) 92vw, 38vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
