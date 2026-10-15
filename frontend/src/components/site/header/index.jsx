import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

import { serviceCatalog } from "@/config/services";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";

import NavigationMenu from "./navigation-menu";
import ServicesMegaMenu from "./services-mega-menu";

const navigationItems = [
  { href: "/about", label: "about" },
  { href: "/blog", label: "blog" },
  { href: "/faq", label: "faq" },
];

export default async function SiteHeader() {
  const [locale, t, tHome] = await Promise.all([getLocale(), getTranslations("Navigation"), getTranslations("Home")]);
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(t("whatsappMessage"))}`;
  const translatedNavigationItems = navigationItems.map((navigationItem) => ({
    href: navigationItem.href,
    label: t(navigationItem.label),
  }));
  const menuNavigationItems = [{ href: "/treatments", label: t("treatments") }, ...translatedNavigationItems, { href: "/contact", label: t("contact") }];
  const translatedServices = serviceCatalog.map((service, index) => ({
    ...service,
    description: tHome(`serviceItems.${service.key}.description`),
    index: index + 1,
    title: tHome(`serviceItems.${service.key}.title`),
  }));

  return (
    <header className="relative z-[60] border-b border-primary-foreground/10 bg-primary text-primary-foreground">
      <div className="gridContainer">
        <div className="grid min-h-[4.25rem] grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[minmax(13rem,1fr)_auto_minmax(13rem,1fr)]">
          <div className="min-w-0">
            <Link href="/" aria-label={`BB Clinic - ${t("home")}`} className="inline-flex items-center transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
              <Image src="/images/logo/logo-yatay.webp" alt="" width={401} height={81} sizes="(max-width: 639px) 10.75rem, 14rem" priority className="siteHeaderLogo mt-1" />
            </Link>
          </div>
          <nav aria-label={t("primaryNavigation")} className="hidden items-center whitespace-nowrap text-xs font-medium text-primary-foreground/75 xl:flex">
            <ServicesMegaMenu
              groups={[
                { key: "face", label: t("megaFace") },
                { key: "skin", label: t("megaSkin") },
                { key: "bodyHair", label: t("megaBodyHair") },
              ]}
              labels={{
                close: t("closeServices"),
                explore: t("exploreService"),
                trigger: t("treatments"),
                viewAll: t("viewAllServices"),
              }}
              services={translatedServices}
            />
            {translatedNavigationItems.map((navigationItem) => (
              <div key={navigationItem.href} className="flex items-center">
                <span aria-hidden="true" className="mx-3 text-primary-foreground/30">
                  /
                </span>
                <Link href={navigationItem.href} className="py-2 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-primary-foreground">
                  {navigationItem.label}
                </Link>
              </div>
            ))}
          </nav>

          <div className="flex items-center justify-self-end gap-2">
            <Link
              href="/contact"
              className="hidden min-h-10 items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-5 text-xs font-semibold text-primary-foreground transition-[background-color,border-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-primary-foreground/35 hover:bg-primary-foreground/16 active:scale-[0.98] sm:inline-flex"
            >
              {t("contact")}
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden min-h-10 items-center rounded-full bg-primary-foreground px-5 text-xs font-semibold text-primary transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary-soft active:scale-[0.98] md:inline-flex"
            >
              {t("whatsappShort")}
            </a>
            <NavigationMenu
              currentLocale={locale}
              groups={[
                { key: "face", label: t("megaFace") },
                { key: "skin", label: t("megaSkin") },
                { key: "bodyHair", label: t("megaBodyHair") },
              ]}
              items={menuNavigationItems}
              labels={{
                backToTop: t("backToTop"),
                close: t("closeMenu"),
                contact: t("contact"),
                englishShort: t("englishShort"),
                language: t("language"),
                menu: t("openMenu"),
                navigation: t("primaryNavigation"),
                turkishShort: t("turkishShort"),
                whatsapp: t("whatsappShort"),
              }}
              services={translatedServices}
              whatsappUrl={whatsappUrl}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
