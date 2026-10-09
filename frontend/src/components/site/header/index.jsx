import {getLocale, getTranslations} from 'next-intl/server';

import {Button} from '@/components/ui/button';
import {Link} from '@/i18n/navigation';
import {siteConfig} from '@/config/site';

import LocaleSwitcher from './locale-switcher';
import MobileNavigation from './mobile-navigation';

const navigationItems = [
  {href: '/treatments', label: 'treatments'},
  {href: '/about', label: 'about'},
  {href: '/blog', label: 'blog'},
  {href: '/faq', label: 'faq'},
  {href: '/contact', label: 'contact'}
];

export default async function SiteHeader() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations('Navigation')
  ]);
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    t('whatsappMessage')
  )}`;
  const translatedNavigationItems = navigationItems.map((navigationItem) => ({
    href: navigationItem.href,
    label: t(navigationItem.label)
  }));

  return (
    <header className="sticky top-0 z-40 px-4 py-4">
      <div className="bezelShell mx-auto max-w-[88rem] rounded-full bg-foreground/[0.045] p-1.5">
        <div className="flex min-h-14 items-center justify-between gap-4 rounded-full bg-parchment/95 px-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_16px_50px_rgba(27,34,29,0.09)] sm:px-5">
          <Link
            href="/"
            aria-label={t('home')}
            className="shrink-0 text-[1.05rem] tracking-[-0.025em]"
          >
            <span className="font-display text-xl font-medium">Dr. Buket</span>{' '}
            <span className="font-semibold">Bayram</span>
          </Link>

          <nav
            aria-label={t('primaryNavigation')}
            className="hidden items-center gap-1 xl:flex"
          >
            {translatedNavigationItems.map((navigationItem) => (
              <Link
                key={navigationItem.href}
                href={navigationItem.href}
                className="rounded-full px-3.5 py-2 text-[0.78rem] font-medium text-muted-foreground transition-[color,background-color,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-foreground/[0.055] hover:text-foreground active:scale-[0.98]"
              >
                {navigationItem.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 xl:flex">
            <LocaleSwitcher
              currentLocale={locale}
              label={t('language')}
              turkishLabel={t('turkishShort')}
              englishLabel={t('englishShort')}
            />
            <Button asChild className="min-h-11 py-2 pl-5 pr-2">
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                <span>{t('whatsappShort')}</span>
                <span className="flex size-8 items-center justify-center rounded-full bg-white/12 text-base transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105">
                  ↗
                </span>
              </a>
            </Button>
          </div>

          <MobileNavigation
            currentLocale={locale}
            items={translatedNavigationItems}
            labels={{
              close: t('closeMenu'),
              englishShort: t('englishShort'),
              language: t('language'),
              menu: t('openMenu'),
              turkishShort: t('turkishShort'),
              whatsapp: t('whatsapp')
            }}
            whatsappUrl={whatsappUrl}
          />
        </div>
      </div>
    </header>
  );
}
