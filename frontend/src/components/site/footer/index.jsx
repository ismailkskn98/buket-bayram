import Image from 'next/image';
import {getTranslations} from 'next-intl/server';

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
  const [footer, navigation] = await Promise.all([
    getTranslations('Footer'),
    getTranslations('Navigation')
  ]);

  return (
    <footer className="gridContainer overflow-hidden bg-primary pb-5 pt-14 text-primary-foreground sm:pt-20">
      <div>
        <div className="grid gap-12 border-t border-primary-foreground/25 pt-6 md:grid-cols-[1.2fr_0.7fr_1fr] md:gap-8">
          <div>
            <Link href="/" aria-label={navigation('home')} className="inline-flex">
              <Image
                src="/images/logo/logo-beyaz-icon.webp"
                alt=""
                width={805}
                height={1209}
                sizes="3rem"
                className="h-auto w-12"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-primary-foreground/65">
              {footer('specialty')}
            </p>
          </div>

          <nav aria-label={footer('quickLinks')} className="flex flex-col items-start gap-2.5 text-sm">
            {footerNavigationItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-primary-foreground/70 hover:text-primary-foreground">
                {navigation(item.label)}
              </Link>
            ))}
          </nav>

          <address className="not-italic md:text-right">
            <p className="text-sm leading-6 text-primary-foreground/70">{siteConfig.address}</p>
            <a href={`tel:${siteConfig.phone}`} className="mt-4 inline-block text-sm hover:underline">
              {siteConfig.phoneLabel}
            </a>
            <a
              href={`https://www.instagram.com/${siteConfig.instagram}/`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 block text-sm hover:underline"
            >
              @{siteConfig.instagram}
            </a>
          </address>
        </div>

        <p className="footerWordmark mt-20 whitespace-nowrap font-light uppercase leading-[0.7] tracking-[-0.055em] text-primary-foreground">
          BB Clinic
        </p>

        <div className="mt-8 grid gap-4 border-t border-primary-foreground/25 pt-5 text-xs leading-5 text-primary-foreground/55 md:grid-cols-[1fr_auto]">
          <p className="max-w-3xl">{footer('medicalNotice')}</p>
          <p>© {new Date().getFullYear()} {siteConfig.name}. {footer('rights')}</p>
        </div>
      </div>
    </footer>
  );
}
