import {getLocale, getTranslations} from 'next-intl/server';

import {Link} from '@/i18n/navigation';
import {siteConfig} from '@/config/site';

import MobileNavigation from './mobile-navigation';

const navigationItems = [
  {href: '/treatments', label: 'treatments'},
  {href: '/about', label: 'about'},
  {href: '/blog', label: 'blog'},
  {href: '/faq', label: 'faq'}
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
    <header className="sticky top-0 z-40 border-b border-[#4a4541]/10 bg-[#f5f3ef]/95 backdrop-blur-xl">
      <div className="gridContainer">
        <div className="grid min-h-[4.25rem] grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[minmax(13rem,1fr)_auto_minmax(13rem,1fr)]">
          <div className="min-w-0">
            <Link
              href="/"
              aria-label={t('home')}
              className="inline-flex text-sm font-semibold tracking-[-0.03em] text-[#4a4541] lg:hidden"
            >
              BB Clinic
            </Link>

            <address className="hidden min-w-0 not-italic text-[0.62rem] leading-[1.45] text-[#69635f] lg:block">
              <span className="block max-w-[19rem] truncate" title={siteConfig.address}>
                {siteConfig.addressShort}
              </span>
              <a
                href={`tel:${siteConfig.phone}`}
                className="transition-colors duration-300 hover:text-[#4a4541]"
              >
                {siteConfig.phoneLabel}
              </a>
            </address>
          </div>

          <nav
            aria-label={t('primaryNavigation')}
            className="hidden items-center whitespace-nowrap text-[0.68rem] font-medium text-[#6f6965] xl:flex"
          >
            {translatedNavigationItems.map((navigationItem, index) => (
              <div key={navigationItem.href} className="flex items-center">
                {index > 0 ? (
                  <span aria-hidden="true" className="mx-3 text-[#b5afa9]">
                    /
                  </span>
                ) : null}
                <Link
                  href={navigationItem.href}
                  className="py-2 transition-colors duration-300 hover:text-[#4a4541]"
                >
                  {navigationItem.label}
                </Link>
              </div>
            ))}
          </nav>

          <div className="flex items-center justify-self-end gap-2">
            <Link
              href="/contact"
              className="hidden min-h-10 items-center rounded-full bg-[#e8e4df] px-5 text-[0.68rem] font-semibold text-[#4a4541] transition-[background-color,transform] duration-300 hover:bg-[#ddd7d0] active:scale-[0.98] sm:inline-flex"
            >
              {t('contact')}
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden min-h-10 items-center rounded-full bg-[#806657] px-5 text-[0.68rem] font-semibold text-[#fffaf5] transition-[background-color,transform] duration-300 hover:bg-[#665044] active:scale-[0.98] md:inline-flex"
            >
              {t('whatsappShort')}
            </a>
            <MobileNavigation
              currentLocale={locale}
              items={translatedNavigationItems}
              labels={{
                close: t('closeMenu'),
                englishShort: t('englishShort'),
                language: t('language'),
                menu: t('openMenu'),
                turkishShort: t('turkishShort'),
                whatsapp: t('whatsappShort')
              }}
              whatsappUrl={whatsappUrl}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
