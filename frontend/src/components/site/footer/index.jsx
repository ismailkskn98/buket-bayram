import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";

import PressedWordmark from "./pressed-wordmark";

const footerServiceItems = [
  { href: "/treatments", label: "botox" },
  { href: "/treatments", label: "fillers" },
  { href: "/treatments", label: "skinRenewal" },
  { href: "/treatments", label: "laserTreatments" },
  { href: "/treatments", label: "hairTreatments" },
];

const footerPageItems = [
  { href: "/about", label: "about" },
  { href: "/blog", label: "blog" },
  { href: "/faq", label: "faq" },
  { href: "/contact", label: "contact" },
];

export default async function SiteFooter() {
  const [footer, navigation] = await Promise.all([getTranslations("Footer"), getTranslations("Navigation")]);
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}`;

  return (
    <footer id="site-footer" className="siteFooter gridContainer overflow-hidden border-t border-primary/15 bg-primary-soft pt-[clamp(3.5rem,7vw,6.5rem)] text-foreground">
      <div className="grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-12 sm:grid-cols-2 lg:grid-cols-12">
        <div className="sm:col-span-2 lg:col-span-4">
          <Link href="/" aria-label={navigation("home")} className="inline-flex">
            <Image src="/images/logo/logo-bordo-icon.webp" alt="" width={805} height={1209} sizes="3rem" className="h-auto w-11 sm:w-12" />
          </Link>
          <p className="mt-6 max-w-sm text-[clamp(1rem,1.35vw,1.2rem)] leading-[1.65] tracking-[-0.018em] text-foreground/75">{footer("brandStatement")}</p>
        </div>

        <nav aria-label={footer("servicesTitle")} className="lg:col-span-2 lg:col-start-6">
          <p className="text-xs text-primary/60">{footer("servicesTitle")}</p>
          <div className="mt-5 flex flex-col items-start gap-2.5 text-sm">
            {footerServiceItems.map((item) => (
              <Link key={item.label} href={item.href} className="footerLink text-foreground/70">
                {footer(item.label)}
              </Link>
            ))}
          </div>
        </nav>

        <nav aria-label={footer("pagesTitle")} className="lg:col-span-2">
          <p className="text-xs text-primary/60">{footer("pagesTitle")}</p>
          <div className="mt-5 flex flex-col items-start gap-2.5 text-sm">
            {footerPageItems.map((item) => (
              <Link key={item.href} href={item.href} className="footerLink text-foreground/70">
                {navigation(item.label)}
              </Link>
            ))}
          </div>
        </nav>

        <div className="sm:col-span-2 lg:col-span-3">
          <p className="text-xs text-primary/60">{footer("contactTitle")}</p>
          <address className="mt-5 not-italic">
            <p className="max-w-xs text-sm leading-6 text-foreground/70">{siteConfig.address}</p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <a href={`tel:${siteConfig.phone}`} className="footerLink text-foreground/70">
                {siteConfig.phoneLabel}
              </a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="footerLink text-foreground/70">
                {footer("whatsapp")}
              </a>
            </div>
          </address>

          <div className="mt-8">
            <p className="text-xs text-primary/60">{footer("socialTitle")}</p>
            <a href={`https://www.instagram.com/${siteConfig.instagram}/`} target="_blank" rel="noreferrer" className="footerLink mt-4 inline-flex text-sm text-foreground/70">
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="mt-[clamp(3.5rem,7vw,6rem)] grid gap-5 border-t border-primary/20 pt-5 text-xs leading-5 text-foreground/55 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <p className="max-w-3xl">{footer("medicalNotice")}</p>
        <p className="md:text-right">
          © {new Date().getFullYear()} {siteConfig.name}. {footer("rights")}
        </p>
      </div>

      <PressedWordmark />
    </footer>
  );
}
