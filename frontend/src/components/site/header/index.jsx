import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";

import MobileNavigation from "./mobile-navigation";

const navigationItems = [
  { href: "/treatments", label: "treatments" },
  { href: "/about", label: "about" },
  { href: "/blog", label: "blog" },
  { href: "/faq", label: "faq" },
];

export default async function SiteHeader() {
  const [locale, t] = await Promise.all([getLocale(), getTranslations("Navigation")]);
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(t("whatsappMessage"))}`;
  const translatedNavigationItems = navigationItems.map((navigationItem) => ({
    href: navigationItem.href,
    label: t(navigationItem.label),
  }));

  return (
    <header className="sticky top-0 z-40 border-b border-primary/15 bg-background/95 backdrop-blur-xl">
      <div className="gridContainer">
        <div className="grid min-h-[4.25rem] grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[minmax(13rem,1fr)_auto_minmax(13rem,1fr)]">
          <div className="min-w-0">
            <Link href="/" aria-label={`BB Clinic - ${t("home")}`} className="inline-flex items-center transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:opacity-75">
              <Image src="/images/logo/logo-bordo-icon.webp" alt="" width={1024} height={1536} sizes="(max-width: 639px) 2rem, 2.3rem" className="mt-1 h-auto w-[clamp(2rem,3vw,2.3rem)]" />
            </Link>
          </div>
          <nav aria-label={t("primaryNavigation")} className="hidden items-center whitespace-nowrap text-[0.68rem] font-medium text-muted-foreground xl:flex">
            {translatedNavigationItems.map((navigationItem, index) => (
              <div key={navigationItem.href} className="flex items-center">
                {index > 0 ? (
                  <span aria-hidden="true" className="mx-3 text-primary/30">
                    /
                  </span>
                ) : null}
                <Link href={navigationItem.href} className="py-2 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-primary">
                  {navigationItem.label}
                </Link>
              </div>
            ))}
          </nav>

          <div className="flex items-center justify-self-end gap-2">
            <Link
              href="/contact"
              className="hidden min-h-10 items-center rounded-full bg-primary-soft px-5 text-[0.68rem] font-semibold text-primary transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary-soft-hover active:scale-[0.98] sm:inline-flex"
            >
              {t("contact")}
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden min-h-10 items-center rounded-full bg-primary px-5 text-[0.68rem] font-semibold text-primary-foreground transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary-hover active:scale-[0.98] md:inline-flex"
            >
              {t("whatsappShort")}
            </a>
            <MobileNavigation
              currentLocale={locale}
              items={translatedNavigationItems}
              labels={{
                close: t("closeMenu"),
                englishShort: t("englishShort"),
                language: t("language"),
                menu: t("openMenu"),
                turkishShort: t("turkishShort"),
                whatsapp: t("whatsappShort"),
              }}
              whatsappUrl={whatsappUrl}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
