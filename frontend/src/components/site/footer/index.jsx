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
    <footer id="site-footer" className="siteFooter gridContainer overflow-hidden border-t border-primary/8 bg-[#EFEFEF] pt-[clamp(3.5rem,7vw,6.5rem)] text-foreground">
      <div className="grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-12 sm:grid-cols-2 lg:grid-cols-12">
        <div className="sm:col-span-2 lg:col-span-4">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-primary/60">{footer("specialty")}</p>
          <div className="mt-5 max-w-sm space-y-3 text-sm leading-6 tracking-[-0.01em] text-foreground/68">
            <p>{footer("brandStatement")}</p>
            <p>{footer("brandDescription")}</p>
          </div>

          <div className="mt-7 flex items-center gap-2.5">
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex size-10 items-center justify-center rounded-full border border-primary/20 text-primary/75 transition-[color,background-color,border-color,transform] duration-300 hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[17px] fill-none stroke-current" strokeWidth="1.6">
                <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.35" cy="6.75" r="1" className="fill-current stroke-none" />
              </svg>
            </a>
            <a
              href={siteConfig.facebookUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="inline-flex size-10 items-center justify-center rounded-full border border-primary/20 text-primary/75 transition-[color,background-color,border-color,transform] duration-300 hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[17px] fill-current">
                <path d="M13.6 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.4V13h2.8v8h3.4Z" />
              </svg>
            </a>
          </div>
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
            <p className="max-w-xs whitespace-pre-line text-sm leading-6 text-foreground/70">{siteConfig.address}</p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <a href={`tel:${siteConfig.phone}`} className="footerLink text-foreground/70">
                {siteConfig.phoneLabel}
              </a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="footerLink text-foreground/70">
                {footer("whatsapp")}
              </a>
            </div>
          </address>
        </div>
      </div>

      <div className="mt-[clamp(3.5rem,7vw,6rem)] grid gap-5 border-t border-primary/10 pt-5 text-xs leading-5 text-foreground/55 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <p className="max-w-3xl">{footer("medicalNotice")}</p>
        <p className="md:text-right">
          © {new Date().getFullYear()} {siteConfig.name}. {footer("rights")}
        </p>
      </div>

      <PressedWordmark />
    </footer>
  );
}
