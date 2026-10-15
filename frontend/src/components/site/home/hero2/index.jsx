import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import FaceExperience from "./face-experience";
import styles from "./hero2.module.css";

export default async function Hero2({ whatsappUrl }) {
  const t = await getTranslations("Home");
  const services = [
    {
      id: "fillers",
      title: t("hero2Services.fillers.title"),
      description: t("hero2Services.fillers.description"),
    },
    {
      id: "acne",
      title: t("hero2Services.acne.title"),
      description: t("hero2Services.acne.description"),
    },
    {
      id: "rejuvenation",
      title: t("hero2Services.rejuvenation.title"),
      description: t("hero2Services.rejuvenation.description"),
    },
  ];

  return (
    <section aria-labelledby="home-hero-title" className={`${styles.hero} gridContainer`}>
      <div className={styles.heroFrame}>
        <span aria-hidden="true" className={`${styles.backdropWord} tracking-wider`}>
          {t("hero2Backdrop")}
        </span>

        <div className={styles.copyBlock}>
          <h1 data-hero2-reveal="heading" id="home-hero-title" className={styles.title}>
            <span>{t("hero2TitleLead")}</span>
            <span>{t("hero2TitleEnd")}</span>
          </h1>
        </div>

        <FaceExperience services={services} imageAlt={t("hero2ImageAlt")} caption={t("hero2Caption")} />

        <div data-hero2-reveal="support" className={styles.supportRail}>
          <p className={styles.description}>{t("hero2Description")}</p>

          <div className={styles.actions}>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className={styles.primaryAction}>
              {t("hero2PrimaryCta")}
            </a>
            <Link href="/treatments" className={styles.secondaryAction}>
              {t("hero2SecondaryCta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
