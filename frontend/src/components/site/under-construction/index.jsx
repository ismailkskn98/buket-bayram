import {getTranslations} from 'next-intl/server';

import {Link} from '@/i18n/navigation';

import styles from './under-construction.module.css';

export default async function UnderConstruction({
  description,
  eyebrow,
  pageTitle
}) {
  const t = await getTranslations('UnderConstruction');
  const titleId = `under-construction-${pageTitle
    .toLocaleLowerCase('tr-TR')
    .replace(/[^a-z0-9]+/gi, '-')}`;

  return (
    <section className={`${styles.section} gridContainer`} aria-labelledby={titleId}>
      <div className={styles.shell}>
        <div className={styles.orbit} aria-hidden="true">
          <span />
          <span />
        </div>

        <div className={styles.topline}>
          <p className={styles.status}>
            <span className={styles.statusDot} aria-hidden="true" />
            {t('status')}
          </p>
          <p className={styles.routeLabel}>BB Clinic / {pageTitle}</p>
        </div>

        <div className={styles.content}>
          <div className={styles.headingGroup}>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h1 id={titleId} className={styles.title}>
              <span>{pageTitle}</span>
              <span className={styles.titleAccent}>{t('title')}</span>
            </h1>
          </div>

          <div className={styles.message}>
            <span className={styles.index} aria-hidden="true">01</span>
            <p className={styles.pageDescription}>{description}</p>
            <p className={styles.notice}>{t('description')}</p>
            <Link href="/" className={styles.homeLink}>
              <span>{t('homeCta')}</span>
              <svg aria-hidden="true" viewBox="0 0 20 20">
                <path d="M3 10h13M11.5 5.5 16 10l-4.5 4.5" />
              </svg>
            </Link>
          </div>
        </div>

        <div className={styles.bottomline} aria-hidden="true">
          <span>BB</span>
          <span>{t('progress')}</span>
        </div>
      </div>
    </section>
  );
}
