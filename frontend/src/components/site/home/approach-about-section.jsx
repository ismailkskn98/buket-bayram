import Image from 'next/image';
import {getTranslations} from 'next-intl/server';

import {Link} from '@/i18n/navigation';

import ApproachAboutMotion from './approach-about-motion';

const approachSteps = [
  {title: 'approachStepOneTitle', description: 'approachStepOneDescription'},
  {title: 'approachStepTwoTitle', description: 'approachStepTwoDescription'},
  {title: 'approachStepThreeTitle', description: 'approachStepThreeDescription'},
  {title: 'approachStepFourTitle', description: 'approachStepFourDescription'}
];

export default async function ApproachAboutSection() {
  const t = await getTranslations('Home');

  return (
    <div data-one-element-root className="oneElementStory">
      <ApproachAboutMotion />

      <section
        aria-labelledby="approach-title"
        className="oneElementScene oneElementIntro gridContainer"
      >
        <div data-one-element-source className="oneElementIntroFrame">
          <div data-one-element className="oneElementVisual">
            <Image
              data-one-element-image
              src="/images/healthy-skin-editorial.webp"
              alt=""
              fill
              priority={false}
              quality={90}
              sizes="(max-width: 1023px) 92vw, 100vw"
              className="oneElementImage oneElementImageIntro"
            />
            <Image
              data-one-element-image
              src="/images/services/facial-consultation.webp"
              alt=""
              fill
              priority={false}
              quality={90}
              sizes="(max-width: 1023px) 92vw, 60vw"
              className="oneElementImage oneElementImageProcess"
            />
            <Image
              data-one-element-image
              src="/images/dermatology-examination.webp"
              alt=""
              fill
              priority={false}
              quality={90}
              sizes="(max-width: 1023px) 92vw, 36vw"
              className="oneElementImage oneElementImageAbout"
            />

            <div
              data-one-element-scrim
              className="oneElementIntroScrim"
              aria-hidden="true"
            />
          </div>

          <header data-one-element-copy className="oneElementIntroCopy">
            <p>{t('approachEyebrow')}</p>
            <h2 id="approach-title">{t('approachTitle')}</h2>
            <p>{t('approachDescription')}</p>
          </header>
        </div>
      </section>

      <section
        aria-labelledby="approach-process-title"
        className="oneElementScene oneElementProcess gridContainer"
      >
        <div className="oneElementProcessInner">
          <div className="oneElementProcessHeader">
            <p aria-hidden="true">01 — 04</p>
            <h2 id="approach-process-title">{t('approachEyebrow')}</h2>
          </div>

          <ol className="oneElementProcessGrid">
            {approachSteps.slice(0, 2).map((step, index) => (
              <li key={step.title} className="oneElementProcessStep">
                <span>0{index + 1}</span>
                <h3>{t(step.title)}</h3>
                <p>{t(step.description)}</p>
              </li>
            ))}

            <li
              data-one-element-step
              className="oneElementTarget oneElementTargetPortrait"
              aria-hidden="true"
            />

            {approachSteps.slice(2).map((step, index) => (
              <li key={step.title} className="oneElementProcessStep">
                <span>0{index + 3}</span>
                <h3>{t(step.title)}</h3>
                <p>{t(step.description)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="about-title"
        className="oneElementScene oneElementAbout gridContainer"
      >
        <div className="oneElementAboutGrid">
          <div
            data-one-element-step
            className="oneElementTarget oneElementTargetAbout"
            aria-hidden="true"
          />

          <article className="oneElementAboutCopy">
            <p className="oneElementAboutEyebrow">{t('aboutEyebrow')}</p>
            <h2 id="about-title">Dr. Buket Bayram</h2>
            <h3>{t('aboutTitle')}</h3>
            <p>{t('aboutDescription')}</p>
            <blockquote>{t('aboutPrinciple')}</blockquote>
            <Link href="/about">{t('aboutCta')}</Link>
          </article>
        </div>
      </section>
    </div>
  );
}
