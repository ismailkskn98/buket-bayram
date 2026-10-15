'use client';

import {useEffect} from 'react';

export default function HomeMotion() {
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    if (reducedMotionQuery.matches) {
      return undefined;
    }

    let isCancelled = false;
    let cleanupMotion = () => {};

    async function initializeMotion() {
      try {
        const [gsapModule, scrollTriggerModule, lenisModule] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
          import('lenis')
        ]);

        if (isCancelled) {
          return;
        }

        const gsap = gsapModule.gsap || gsapModule.default;
        const ScrollTrigger =
          scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;
        const Lenis = lenisModule.default;

        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
          anchors: true,
          duration: 1.05,
          smoothWheel: true
        });
        const updateLenis = (time) => {
          lenis.raf(time * 1000);
        };

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(updateLenis);
        gsap.ticker.lagSmoothing(0);

        const animationContext = gsap.context(() => {
          const heroTimeline = gsap.timeline({
            defaults: {duration: 1.05, ease: 'power4.out'}
          });

          heroTimeline
            .to('[data-hero-reveal]', {
              y: 0,
              opacity: 1,
              stagger: 0.08
            })
            .to(
              '[data-hero-line]',
              {scaleX: 1, transformOrigin: 'left center'},
              0.3
            )
            .to(
              '[data-hero-media]',
              {y: 0, opacity: 1, scale: 1, duration: 1.25},
              0.18
            );

          gsap.utils.toArray('[data-reveal]').forEach((element) => {
            gsap.to(element, {
              y: 0,
              opacity: 1,
              duration: 1.05,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 88%',
                once: true
              }
            });
          });

          gsap.utils.toArray('[data-stagger-group]').forEach((group) => {
            const items = group.querySelectorAll('[data-stagger-item]');

            if (!items.length) {
              return;
            }

            gsap.to(items, {
              y: 0,
              opacity: 1,
              duration: 0.95,
              stagger: 0.1,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: group,
                start: 'top 86%',
                once: true
              }
            });
          });
        });

        const refreshFrame = window.requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });

        cleanupMotion = () => {
          window.cancelAnimationFrame(refreshFrame);
          animationContext.revert();
          gsap.ticker.remove(updateLenis);
          lenis.destroy();
        };
      } catch {
        document.documentElement.classList.remove('motion-enabled');
      }
    }

    initializeMotion();

    return () => {
      isCancelled = true;
      cleanupMotion();
    };
  }, []);

  return null;
}
