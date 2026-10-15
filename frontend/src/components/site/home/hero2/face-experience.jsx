"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./hero2.module.css";

export default function FaceExperience({ services, imageAlt, caption }) {
  const [activeService, setActiveService] = useState(services[1].id);

  const activeServiceData = services.find((service) => service.id === activeService) || services[0];

  return (
    <figure data-hero2-media className={styles.faceExperience}>
      <div className={styles.visualStage}>
        <span aria-hidden="true" className={styles.faceHalo} />
        <span aria-hidden="true" className={styles.faceOrbit} />

        <div className={styles.portraitFrame}>
          <Image
            src="/images/hero2/hero-model-before-2.webp"
            alt=""
            fill
            preload
            quality={95}
            sizes="(min-width: 1920px) 48rem, (min-width: 1200px) 38vw, (min-width: 768px) 39rem, 86vw"
            className={styles.portraitImage}
          />

          <div aria-hidden="true" className={styles.afterLayer}>
            <Image
              src="/images/hero2/hero-model-after.webp"
              alt=""
              fill
              preload
              quality={95}
              sizes="(min-width: 1920px) 48rem, (min-width: 1200px) 38vw, (min-width: 768px) 39rem, 86vw"
              className={styles.portraitImage}
            />
          </div>

          <span aria-hidden="true" className={styles.scanLight} />
        </div>

        <div className={styles.desktopCallouts}>
          {services.map((service, index) => {
            const isActive = activeService === service.id;

            return (
              <div key={service.id} className={styles.callout} data-service={service.id} data-active={isActive ? "true" : "false"} onMouseEnter={() => setActiveService(service.id)}>
                <button
                  type="button"
                  className={styles.calloutButton}
                  aria-expanded={isActive}
                  aria-controls={`hero-service-${service.id}`}
                  onClick={() => setActiveService(service.id)}
                  onFocus={() => setActiveService(service.id)}
                >
                  <span className={styles.calloutIndex}>{String(index + 1).padStart(2, "0")}</span>
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
                data-active={isActive ? "true" : "false"}
                onClick={() => setActiveService(service.id)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {service.title}
              </button>
            );
          })}
        </div>

        <p id="hero-mobile-service-panel" role="tabpanel" aria-live="polite" aria-labelledby={`hero-mobile-service-tab-${activeService}`} className={styles.mobileServiceDescription}>
          {activeServiceData.description}
        </p>
      </div>
    </figure>
  );
}
