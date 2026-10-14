'use client';

import {useCallback, useEffect, useEffectEvent, useRef, useState} from 'react';

import MenuTrigger from './menu-trigger';
import NavigationMenuPanel from './navigation-menu-panel';

const SCROLL_THRESHOLD = 100;

export default function NavigationMenu({
  currentLocale,
  groups,
  items,
  labels,
  services,
  whatsappUrl
}) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [previewStack, setPreviewStack] = useState([services[0].key]);
  const animationRef = useRef(null);
  const firstLinkRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const isOpenRef = useRef(false);
  const menuContentRef = useRef(null);
  const menuOverlayRef = useRef(null);
  const previousActiveElementRef = useRef(null);

  const closeMenuFromEffect = useEffectEvent(() => {
    closeMenu();
  });

  const getAnimationLibrary = useCallback(() => {
    if (!animationRef.current) {
      animationRef.current = import('gsap').then(
        (gsapModule) => gsapModule.gsap || gsapModule.default
      );
    }

    return animationRef.current;
  }, []);

  useEffect(() => {
    let scrollFrame;

    function updateScrollState() {
      window.cancelAnimationFrame(scrollFrame);
      scrollFrame = window.requestAnimationFrame(() => {
        setHasScrolled(window.scrollY > SCROLL_THRESHOLD);
      });
    }

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, {passive: true});

    const preloadTimer = window.setTimeout(() => {
      getAnimationLibrary();
    }, 900);

    return () => {
      window.cancelAnimationFrame(scrollFrame);
      window.clearTimeout(preloadTimer);
      window.removeEventListener('scroll', updateScrollState);
    };
  }, [getAnimationLibrary]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeMenuFromEffect();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = menuOverlayRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements?.length) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  useEffect(
    () => () => {
      const pageSurface = document.querySelector('[data-site-page-surface]');

      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('padding-right');
      pageSurface?.removeAttribute('inert');
      pageSurface?.style.removeProperty('transform');
      pageSurface?.style.removeProperty('will-change');
    },
    []
  );

  function lockPage() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const pageSurface = document.querySelector('[data-site-page-surface]');

    previousActiveElementRef.current = document.activeElement;
    document.body.style.overflow = 'hidden';

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    pageSurface?.setAttribute('inert', '');
  }

  function unlockPage() {
    const pageSurface = document.querySelector('[data-site-page-surface]');

    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('padding-right');
    pageSurface?.removeAttribute('inert');
  }

  async function openMenu() {
    if (isAnimatingRef.current || isOpenRef.current) {
      return;
    }

    const overlay = menuOverlayRef.current;
    const content = menuContentRef.current;
    const pageSurface = document.querySelector('[data-site-page-surface]');

    if (!overlay || !content) {
      return;
    }

    isAnimatingRef.current = true;
    isOpenRef.current = true;
    setIsOpen(true);
    lockPage();

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion) {
      overlay.style.visibility = 'visible';
      overlay.style.pointerEvents = 'auto';
      overlay.style.clipPath = 'polygon(0 0, 100% 0, 100% 175%, 0 100%)';
      content.style.opacity = '1';
      content.style.transform = 'none';
      overlay.querySelectorAll('[data-menu-reveal]').forEach((element) => {
        element.style.opacity = '1';
        element.style.transform = 'none';
      });
      isAnimatingRef.current = false;
      firstLinkRef.current?.focus();
      return;
    }

    const gsap = await getAnimationLibrary();
    const revealElements = overlay.querySelectorAll('[data-menu-reveal]');
    const shouldMovePage = window.matchMedia('(min-width: 1280px)').matches;

    gsap.killTweensOf([overlay, content, pageSurface, revealElements]);
    gsap.set(overlay, {pointerEvents: 'auto', visibility: 'visible'});
    gsap.set(revealElements, {clearProps: 'opacity,transform'});
    gsap.set(revealElements, {opacity: 0.25, y: '120%'});

    const timeline = gsap.timeline({
      defaults: {overwrite: 'auto'},
      onComplete: () => {
        isAnimatingRef.current = false;
        firstLinkRef.current?.focus();
      }
    });

    if (shouldMovePage && pageSurface) {
      gsap.set(pageSurface, {willChange: 'transform'});
      timeline.to(
        pageSurface,
        {
          duration: 1.25,
          ease: 'power4.inOut',
          rotation: 10,
          scale: 1.5,
          x: () => Math.min(window.innerWidth * 0.15625, 300),
          y: () => Math.min(window.innerHeight * 0.417, 450)
        },
        0
      );
    }

    timeline
      .to(
        content,
        {
          duration: 1.25,
          ease: 'power4.inOut',
          opacity: 1,
          rotation: 0,
          scale: 1,
          x: 0,
          y: 0
        },
        0
      )
      .to(
        overlay,
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 175%, 0% 100%)',
          duration: 1.25,
          ease: 'power4.inOut'
        },
        0
      )
      .to(
        revealElements,
        {
          duration: 1,
          ease: 'power3.out',
          opacity: 1,
          stagger: 0.025,
          y: '0%'
        },
        0.72
      );
  }

  async function closeMenu({restoreFocus = true} = {}) {
    if (isAnimatingRef.current || !isOpenRef.current) {
      return;
    }

    const overlay = menuOverlayRef.current;
    const content = menuContentRef.current;
    const pageSurface = document.querySelector('[data-site-page-surface]');

    if (!overlay || !content) {
      return;
    }

    isAnimatingRef.current = true;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    function finishClosing() {
      overlay.style.visibility = 'hidden';
      overlay.style.pointerEvents = 'none';
      isAnimatingRef.current = false;
      isOpenRef.current = false;
      setIsOpen(false);
      setPreviewStack([services[0].key]);
      unlockPage();

      if (restoreFocus) {
        previousActiveElementRef.current?.focus();
      }
    }

    if (reduceMotion) {
      overlay.style.clipPath = 'polygon(0 0, 100% 0, 100% 0, 0 0)';
      content.style.opacity = '0.25';
      content.style.transform = '';
      finishClosing();
      return;
    }

    const gsap = await getAnimationLibrary();
    const revealElements = overlay.querySelectorAll('[data-menu-reveal]');

    gsap.killTweensOf([overlay, content, pageSurface, revealElements]);

    const timeline = gsap.timeline({
      defaults: {overwrite: 'auto'},
      onComplete: () => {
        gsap.set(revealElements, {opacity: 0.25, y: '120%'});

        if (pageSurface) {
          gsap.set(pageSurface, {clearProps: 'transform,willChange'});
        }

        finishClosing();
      }
    });

    if (pageSurface) {
      timeline.to(
        pageSurface,
        {
          duration: 1.25,
          ease: 'power4.inOut',
          rotation: 0,
          scale: 1,
          x: 0,
          y: 0
        },
        0
      );
    }

    timeline
      .to(
        content,
        {
          duration: 1.25,
          ease: 'power4.inOut',
          opacity: 0.25,
          rotation: -15,
          scale: 1.5,
          x: () => -Math.min(window.innerWidth * 0.052, 100),
          y: () => -Math.min(window.innerHeight * 0.093, 100)
        },
        0
      )
      .to(
        overlay,
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: 1.25,
          ease: 'power4.inOut'
        },
        0
      );
  }

  function handleNavigate() {
    closeMenu({restoreFocus: false});
  }

  function showServicePreview(serviceKey) {
    setPreviewStack((currentStack) => {
      if (currentStack[currentStack.length - 1] === serviceKey) {
        return currentStack;
      }

      return [...currentStack, serviceKey].slice(-3);
    });
  }

  function scrollToTop() {
    window.scrollTo({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
      top: 0
    });
  }

  return (
    <div>
      <MenuTrigger
        controls="site-navigation-menu"
        isOpen={isOpen}
        label={isOpen ? labels.close : labels.menu}
        onClick={isOpen ? closeMenu : openMenu}
        className="siteMenuHeaderTrigger xl:!hidden"
      />

      <MenuTrigger
        controls="site-navigation-menu"
        isOpen={isOpen}
        label={isOpen ? labels.close : labels.menu}
        onClick={isOpen ? closeMenu : openMenu}
        className={`siteMenuFloatingTrigger hidden xl:!flex ${
          hasScrolled || isOpen ? 'is-visible' : ''
        }`}
      />

      <button
        type="button"
        aria-label={labels.backToTop}
        onClick={scrollToTop}
        className={`siteScrollTopButton ${
          hasScrolled && !isOpen ? 'is-visible' : ''
        }`}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4">
          <path d="M12 19V5m0 0-5.5 5.5M12 5l5.5 5.5" />
        </svg>
      </button>

      <NavigationMenuPanel
        contentRef={menuContentRef}
        currentLocale={currentLocale}
        firstLinkRef={firstLinkRef}
        groups={groups}
        handleNavigate={handleNavigate}
        isOpen={isOpen}
        items={items}
        labels={labels}
        menuOverlayRef={menuOverlayRef}
        onClose={closeMenu}
        onServicePreview={showServicePreview}
        previewStack={previewStack}
        services={services}
        whatsappUrl={whatsappUrl}
      />
    </div>
  );
}
