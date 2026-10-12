import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function HeroSection() {
  const t = await getTranslations("Home");

  return (
    <section className="gridContainer bg-background pb-20 pt-8 sm:pb-28 sm:pt-10 lg:pb-32 lg:pt-12">
      <div className="homeHeroContent">
        <h1 className="homeHeroTitle font-sans font-light text-foreground">
          <span className="homeHeroTitleLine homeHeroTitleLineStart">AESTHETIC &amp;</span>
          <span className="homeHeroTitleLine homeHeroTitleLineEnd">BEAUTY CLINIC</span>
        </h1>

        <div className="mt-6 grid grid-cols-3 gap-3 text-[0.62rem] leading-[1.4] text-muted-foreground sm:text-xs lg:mt-8 lg:text-sm">
          <p>{t("heroPromisePersonal")}</p>
          <p className="text-center">{t("heroPromiseScientific")}</p>
          <p className="text-right">{t("heroPromiseNatural")}</p>
        </div>

        <div className="homeHeroMedia relative mt-5 overflow-hidden bg-muted">
          <Image src="/images/bb-clinic-hero.webp" alt={t("heroImageAlt")} fill preload sizes="92vw" className="object-cover object-[54%_48%]" />
        </div>
      </div>
    </section>
  );
}
