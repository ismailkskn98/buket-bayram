'use client';

import Image from 'next/image';
import {useState} from 'react';

import styles from './hero2.module.css';

export default function FaceExperience({
  services,
  imageAlt,
  caption,
  replayLabel
}) {
  const [activeService, setActiveService] = useState(services[1].id);
  const [replayKey, setReplayKey] = useState(0);

  const activeServiceData =
    services.find((service) => service.id === activeService) || services[0];

  return (
    <figure data-hero-media className={styles.faceExperience}>
      <div className={styles.visualStage}>
        <span aria-hidden="true" className={styles.faceHalo} />
        <span aria-hidden="true" className={styles.faceOrbit} />

        <div className={styles.portraitFrame}>
          <Image
            src="/images/hero2/hero-face-before.webp"
            alt=""
            fill
            preload
            sizes="(min-width: 1280px) 42rem, (min-width: 768px) 36rem, 96vw"
            className={styles.portraitImage}
          />

          <div
            key={`after-${replayKey}`}
            aria-hidden="true"
            className={styles.afterLayer}
          >
            <Image
              src="/images/hero2/hero-face-after.webp"
              alt=""
              fill
              preload
              sizes="(min-width: 1280px) 42rem, (min-width: 768px) 36rem, 96vw"
              className={styles.portraitImage}
            />
          </div>

          <span
            key={`scan-${replayKey}`}
            aria-hidden="true"
            className={styles.scanLight}
          />
        </div>

        <div className={styles.desktopCallouts}>
          {services.map((service, index) => {
            const isActive = activeService === service.id;

            return (
              <div
                key={service.id}
                className={styles.callout}
                data-service={service.id}
                data-active={isActive ? 'true' : 'false'}
                onMouseEnter={() => setActiveService(service.id)}
              >
                <button
                  type="button"
                  className={styles.calloutButton}
                  aria-expanded={isActive}
                  aria-controls={`hero-service-${service.id}`}
                  onClick={() => setActiveService(service.id)}
                  onFocus={() => setActiveService(service.id)}
                >
                  <span className={styles.calloutIndex}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{service.title}</span>
                </button>

                <span aria-hidden="true" className={styles.connector}>
                  <span className={styles.connectorDot} />
                </span>

                <p id={`hero-service-${service.id}`} className={styles.calloutDetail}>
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.figureMeta}>
        <figcaption className={styles.figureCaption}>
          <span className="sr-only">{imageAlt}</span>
          {caption}
        </figcaption>

        <button
          type="button"
          className={styles.replayButton}
          onClick={() => setReplayKey((currentKey) => currentKey + 1)}
        >
          {replayLabel}
        </button>
      </div>

      <div className={styles.mobileServices}>
        <div className={styles.mobileServiceTabs} role="tablist">
          {services.map((service, index) => {
            const isActive = activeService === service.id;

            return (
              <button
                key={service.id}
                id={`hero-mobile-service-tab-${service.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="hero-mobile-service-panel"
                className={styles.mobileServiceTab}
                data-active={isActive ? 'true' : 'false'}
                onClick={() => setActiveService(service.id)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                {service.title}
              </button>
            );
          })}
        </div>

        <p
          id="hero-mobile-service-panel"
          role="tabpanel"
          aria-live="polite"
          aria-labelledby={`hero-mobile-service-tab-${activeService}`}
          className={styles.mobileServiceDescription}
        >
          {activeServiceData.description}
        </p>
      </div>
    </figure>
  );
}
