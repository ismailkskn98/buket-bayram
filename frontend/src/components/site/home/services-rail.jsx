"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { Link } from "@/i18n/navigation";

const cardSizes = {
  portrait: "w-[78vw] max-w-[23rem] md:w-[clamp(18rem,25.5vw,31rem)] md:max-w-none",
  square: "w-[78vw] max-w-[23rem] md:w-[clamp(18rem,25.5vw,31rem)] md:max-w-none",
};

const mediaSizes = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
};

export default function ServicesRail({ description, eyebrow, linkLabel, services, title }) {
  const progressRef = useRef(null);
  const scrollAreaRef = useRef(null);
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scrollArea = scrollAreaRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    const progress = progressRef.current;

    if (!section || !scrollArea || !stage || !track || !viewport || !progress) {
      return undefined;
    }

    let scrollFrame;
    const updateTouchProgress = () => {
      window.cancelAnimationFrame(scrollFrame);
      scrollFrame = window.requestAnimationFrame(() => {
        const distance = viewport.scrollWidth - viewport.clientWidth;
        const ratio = distance > 0 ? viewport.scrollLeft / distance : 0;
        progress.style.transform = `translate3d(${ratio * 300}%, 0, 0)`;
      });
    };

    viewport.addEventListener("scroll", updateTouchProgress, { passive: true });
    updateTouchProgress();

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotionQuery.matches) {
      return () => {
        window.cancelAnimationFrame(scrollFrame);
        viewport.removeEventListener("scroll", updateTouchProgress);
      };
    }

    let isCancelled = false;
    let cleanupMotion = () => {};

    async function initializeMotion() {
      const [gsapModule, scrollTriggerModule] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);

      if (isCancelled) {
        return;
      }

      const gsap = gsapModule.gsap || gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;

      gsap.registerPlugin(ScrollTrigger);

      const media = gsap.matchMedia();
      const animationContext = gsap.context(() => {
        media.add("(min-width: 768px)", () => {
          scrollArea.dataset.motion = "ready";
          viewport.scrollLeft = 0;

          const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
          const getStageOffset = () => Math.max(0, (window.innerHeight - stage.offsetHeight) / 2);
          const getScrollDistance = () => Math.max(getDistance() * 0.62, window.innerWidth * 0.85);
          const updateStickyGeometry = () => {
            scrollArea.style.setProperty("--services-stage-offset", `${getStageOffset()}px`);
            scrollArea.style.setProperty("--services-scroll-distance", `${getScrollDistance()}px`);
          };

          updateStickyGeometry();

          const timeline = gsap.timeline({
            scrollTrigger: {
              end: () => `+=${getScrollDistance()}`,
              invalidateOnRefresh: true,
              onRefreshInit: updateStickyGeometry,
              scrub: 1.1,
              start: () => `top top+=${getStageOffset()}`,
              trigger: scrollArea,
            },
          });

          timeline.to(track, { ease: "none", x: () => -getDistance() }, 0).to(progress, { ease: "none", xPercent: 300 }, 0);

          return () => {
            delete scrollArea.dataset.motion;
            scrollArea.style.removeProperty("--services-stage-offset");
            scrollArea.style.removeProperty("--services-scroll-distance");
            timeline.kill();
          };
        });
      }, section);

      const refreshFrame = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      cleanupMotion = () => {
        window.cancelAnimationFrame(refreshFrame);
        media.revert();
        animationContext.revert();
        delete scrollArea.dataset.motion;
        scrollArea.style.removeProperty("--services-stage-offset");
        scrollArea.style.removeProperty("--services-scroll-distance");
      };
    }

    initializeMotion();

    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(scrollFrame);
      viewport.removeEventListener("scroll", updateTouchProgress);
      cleanupMotion();
    };
  }, []);

  return (
    <section ref={sectionRef} className="servicesScroller py-[clamp(3rem,6vh,5rem)]" aria-labelledby="services-title">
      <div className="gridContainer">
        <header className="homeSectionContent">
          <p data-reveal className="homeEyebrow text-primary">
            {eyebrow}
          </p>
          <h2 id="services-title" data-reveal className="homeSectionTitle mt-4 max-w-[20ch] text-primary">
            {title}
          </h2>
          <p data-reveal className="homeSectionBody mt-5 max-w-xl text-muted-foreground">
            {description}
          </p>
        </header>
      </div>

      <div ref={scrollAreaRef} className="servicesRailScrollArea mt-[clamp(2rem,4vh,3.5rem)] md:mt-0">
        <div ref={stageRef} className="servicesRailStage">
          <div ref={viewportRef} className="servicesRailViewport overflow-x-auto">
            <div ref={trackRef} className="servicesRailTrack flex w-max snap-x snap-mandatory items-start gap-[clamp(1rem,2vw,2.25rem)] md:will-change-transform">
              {services.map((service) => (
                <article key={service.key} data-aspect={service.aspect} className={`serviceCard shrink-0 snap-center ${cardSizes[service.aspect]}`}>
                  <Link href="/treatments" className="serviceCardLink group block">
                    <div className={`serviceCardMedia relative overflow-hidden bg-muted ${mediaSizes[service.aspect]}`}>
                      <Image src={service.image} alt="" fill sizes="(max-width: 767px) 78vw, (max-width: 1535px) 26vw, 31rem" className={`object-cover ${service.imageClassName}`} />
                      <div className="serviceCardOverlay">
                        <div>
                          <p className="homeCardBody max-w-[29ch] text-foreground">{service.description}</p>
                          <span className="serviceCardOverlayCta mt-5 inline-block pb-0.5 text-xs font-medium text-primary">{linkLabel}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3.5">
                      <h3 className="homeCardTitle max-w-[24ch] text-foreground">{service.title}</h3>
                      <span className="serviceCardCta mt-2 inline-block pb-0.5 text-xs text-primary">{linkLabel}</span>
                      <p className="serviceCardSummary homeCardBody mt-3 text-muted-foreground">{service.description}</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          <div className="servicesRailProgress flex justify-center">
            <div aria-hidden="true" className="relative h-px w-[min(62vw,18rem)] overflow-hidden bg-primary/20">
              <span ref={progressRef} className="absolute inset-y-0 left-0 w-1/4 bg-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
