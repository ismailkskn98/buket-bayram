import {getTranslations} from 'next-intl/server';

import {Button} from '@/components/ui/button';
import {Link} from '@/i18n/navigation';
import {siteConfig} from '@/config/site';

const navigationItems = [
  {href: '/treatments', label: 'treatments'},
  {href: '/about', label: 'about'},
  {href: '/blog', label: 'blog'},
  {href: '/faq', label: 'faq'},
  {href: '/contact', label: 'contact'}
];

export default async function SiteHeader() {
  const t = await getTranslations('Navigation');
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    t('whatsappMessage')
  )}`;

  return (
    <header className="border-b border-border bg-background/95">
      <div className="mx-auto flex min-h-20 w-[min(92%,90rem)] items-center justify-between gap-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {siteConfig.name}
        </Link>

        <nav aria-label={t('home')} className="hidden items-center gap-6 lg:flex">
          {navigationItems.map((navigationItem) => (
            <Link
              key={navigationItem.href}
              href={navigationItem.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(navigationItem.label)}
            </Link>
          ))}
        </nav>

        <Button asChild>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            {t('whatsapp')}
          </a>
        </Button>
      </div>
    </header>
  );
}
