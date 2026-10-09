import {getLocale, getTranslations} from 'next-intl/server';

import {Link} from '@/i18n/navigation';
import {siteConfig} from '@/config/site';

const footerNavigationItems = [
  {href: '/treatments', label: 'treatments'},
  {href: '/about', label: 'about'},
  {href: '/blog', label: 'blog'},
  {href: '/faq', label: 'faq'},
  {href: '/contact', label: 'contact'}
];

export default async function SiteFooter() {
  const [locale, footer, navigation] = await Promise.all([
    getLocale(),
    getTranslations('Footer'),
    getTranslations('Navigation')
  ]);

  return (
    <footer className="bg-forest px-4 pb-5 pt-20 text-parchment sm:pt-28">
      <div className="mx-auto max-w-[88rem]">
        <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr_0.9fr]">
          <div>
            <Link
              href="/"
              className="font-display text-4xl font-medium tracking-[-0.045em] sm:text-5xl"
            >
              Dr. Buket Bayram
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-parchment/60">
              {footer('specialty')}
            </p>
            <a
              href={`https://www.instagram.com/${siteConfig.instagram}/`}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-white/[0.07] px-4 py-2.5 text-sm ring-1 ring-white/10 transition-[transform,background-color] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/[0.12] active:scale-[0.98]"
            >
              <span className="size-1.5 rounded-full bg-clay" />
              @{siteConfig.instagram}
            </a>
          </div>

          <nav aria-label={footer('quickLinks')}>
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-parchment/40">
              {footer('quickLinks')}
            </p>
            <div className="mt-5 flex flex-col items-start gap-3">
              {footerNavigationItems.map((navigationItem) => (
                <Link
                  key={navigationItem.href}
                  href={navigationItem.href}
                  className="text-sm text-parchment/70 transition-[color,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:translate-x-1 hover:text-parchment"
                >
                  {navigation(navigationItem.label)}
                </Link>
              ))}
            </div>
          </nav>

          <address className="not-italic">
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-parchment/40">
              {footer('addressLabel')}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-parchment/70">
              {siteConfig.address}
            </p>
            <div className="mt-5 flex flex-col items-start gap-2 text-sm">
              <a
                href={`tel:${siteConfig.phone}`}
                className="text-parchment/70 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-parchment"
              >
                {siteConfig.phoneLabel}
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="text-parchment/70 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-parchment"
              >
                {siteConfig.whatsappLabel}
              </a>
            </div>
          </address>
        </div>

        <div className="mt-20 grid gap-5 border-t border-white/10 pt-6 text-xs leading-5 text-parchment/45 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-3xl">{footer('medicalNotice')}</p>
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. {footer('rights')} ·{' '}
            {locale.toUpperCase()}
          </p>
        </div>
      </div>
    </footer>
  );
}
