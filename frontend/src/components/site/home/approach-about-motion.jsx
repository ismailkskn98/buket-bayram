"use client";

import { useEffect, useRef } from "react";

const DESKTOP_MOTION_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

export default function ApproachAboutMotion() {
  const markerRef = useRef(null);

  useEffect(() => {
    const motionQuery = window.matchMedia(DESKTOP_MOTION_QUERY);
    let setupVersion = 0;
    let cleanupMotion = () => {};

    async function setupMotion() {
      const currentVersion = ++setupVersion;

      cleanupMotion();
      cleanupMotion = () => {};

      if (!motionQuery.matches) {
        return;
      }

      const [gsapModule, scrollTriggerModule, flipModule] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("gsap/Flip")]);

      if (currentVersion !== setupVersion || !markerRef.current) {
        return;
      }

      const gsap = gsapModule.gsap || gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;
      const Flip = flipModule.Flip || flipModule.default;
      const root = markerRef.current.closest("[data-one-element-root]");

      if (!root) {
        return;
      }

      const oneElement = root.querySelector("[data-one-element]");
      const introScrim = root.querySelector("[data-one-element-scrim]");
      const introCopy = root.querySelector("[data-one-element-copy]");
      const parentElement = root.querySelector("[data-one-element-source]");
      const stepElements = [...root.querySelectorAll("[data-one-element-step]")];
      const imageLayers = [...root.querySelectorAll("[data-one-element-image]")];

      if (
        !oneElement ||
        !introScrim ||
        !introCopy ||
        !parentElement ||
        stepElements.length !== 2 ||
        imageLayers.length !== 3
      ) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger, Flip);
      root.dataset.motion = "ready";

      let flipContext;
      let resizeCall;

      const createFlipOnScrollAnimation = () => {
        flipContext?.revert();

        flipContext = gsap.context(() => {
          const flipConfig = {
            duration: 1,
            ease: "sine.inOut",
          };
          const states = stepElements.map((stepElement) => Flip.getState(stepElement));
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: parentElement,
              start: "clamp(center center)",
              endTrigger: stepElements.at(-1),
              end: "clamp(center center)",
              scrub: true,
              immediateRender: false,
              invalidateOnRefresh: true,
            },
          });

          states.forEach((state, index) => {
            timeline.add(
              Flip.fit(oneElement, state, {
                ...flipConfig,
                ease: index === 0 ? "none" : flipConfig.ease,
              }),
              index ? "+=0.5" : 0,
            );
          });

          const imageTransition = {
            duration: 0.72,
            ease: "sine.inOut",
          };

          timeline
            .to(imageLayers[0], { opacity: 0, ...imageTransition }, 0.22)
            .to(imageLayers[1], { opacity: 1, ...imageTransition }, 0.22)
            .to(imageLayers[1], { opacity: 0, ...imageTransition }, 1.56)
            .to(imageLayers[2], { opacity: 1, ...imageTransition }, 1.56);

          gsap.to([introScrim, introCopy], {
            autoAlpha: 0,
            ease: "none",
            scrollTrigger: {
              trigger: parentElement,
              start: "clamp(center center)",
              end: () => `+=${Math.max(window.innerHeight * 0.22, 160)}`,
              scrub: true,
              immediateRender: false,
              invalidateOnRefresh: true,
            },
          });

          gsap.fromTo(
            oneElement,
            { filter: "brightness(82%)" },
            {
              filter: "brightness(100%)",
              ease: "sine.inOut",
              scrollTrigger: {
                trigger: parentElement,
                start: "clamp(top bottom)",
                end: "clamp(bottom top)",
                scrub: true,
              },
            },
          );
        }, root);
      };

      const handleResize = () => {
        resizeCall?.kill();
        resizeCall = gsap.delayedCall(0.16, () => {
          createFlipOnScrollAnimation();
          ScrollTrigger.refresh();
        });
      };

      const refreshLayout = () => {
        if (currentVersion !== setupVersion) {
          return;
        }

        createFlipOnScrollAnimation();
        ScrollTrigger.refresh();
      };

      createFlipOnScrollAnimation();
      window.addEventListener("resize", handleResize, { passive: true });

      const pendingImages = imageLayers.filter((image) => !image.complete);

      pendingImages.forEach((image) => {
        image.addEventListener("load", refreshLayout, { once: true });
      });

      document.fonts?.ready.then(refreshLayout);

      const refreshFrame = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      cleanupMotion = () => {
        window.cancelAnimationFrame(refreshFrame);
        window.removeEventListener("resize", handleResize);
        pendingImages.forEach((image) => {
          image.removeEventListener("load", refreshLayout);
        });
        resizeCall?.kill();
        flipContext?.revert();
        delete root.dataset.motion;
      };
    }

    const handleMotionPreferenceChange = () => {
      setupMotion();
    };

    motionQuery.addEventListener("change", handleMotionPreferenceChange);
    setupMotion();

    return () => {
      setupVersion += 1;
      motionQuery.removeEventListener("change", handleMotionPreferenceChange);
      cleanupMotion();
    };
  }, []);

  return <span ref={markerRef} hidden />;
}
