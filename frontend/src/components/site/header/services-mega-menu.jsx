'use client';

import Image from 'next/image';
import {useEffect, useRef, useState} from 'react';

import {Link} from '@/i18n/navigation';

const groupColumns = {
  face: 'grid grid-cols-2 gap-x-[clamp(0.75rem,1.25vw,1.5rem)]',
  skin: 'grid gap-y-1',
  bodyHair: 'grid gap-y-1'
};

export default function ServicesMegaMenu({groups, labels, services}) {
  const [activeServiceKey, setActiveServiceKey] = useState(services[0].key);
  const [isOpen, setIsOpen] = useState(false);
  const closeTimerRef = useRef(null);
  const containerRef = useRef(null);
  const firstLinkRef = useRef(null);
  const triggerRef = useRef(null);

  const activeService =
    services.find((service) => service.key === activeServiceKey) || services[0];

  useEffect(
    () => () => {
      window.clearTimeout(closeTimerRef.current);
    },
    []
  );

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        window.clearTimeout(closeTimerRef.current);
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  function cancelScheduledClose() {
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }

  function openMenu() {
    cancelScheduledClose();
    setIsOpen(true);
  }

  function closeMenu() {
    cancelScheduledClose();
    setIsOpen(false);
  }

  function scheduleMenuClose() {
    cancelScheduledClose();
    closeTimerRef.current = window.setTimeout(() => {
      setIsOpen(false);
      closeTimerRef.current = null;
    }, 180);
  }

  function handleBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      closeMenu();
    }
  }

  function handleTriggerKeyDown(event) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setIsOpen(true);
      window.requestAnimationFrame(() => firstLinkRef.current?.focus());
    }
  }

  return (
    <div
      ref={containerRef}
      className="flex items-center"
      onBlur={handleBlur}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleMenuClose}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-controls="services-mega-menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => {
          cancelScheduledClose();
          setIsOpen((currentValue) => !currentValue);
        }}
        onFocus={openMenu}
        onKeyDown={handleTriggerKeyDown}
        className="group flex items-center gap-1.5 py-2 text-foreground/65 transition-colors duration-300 hover:text-primary"
      >
        <span>{labels.trigger}</span>
        <span
          aria-hidden="true"
          className={`text-[0.6rem] leading-none transition-transform duration-300 ${
            isOpen ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>

      <button
        type="button"
        tabIndex={-1}
        aria-label={labels.close}
        data-open={isOpen}
        onClick={closeMenu}
        onMouseEnter={scheduleMenuClose}
        className="megaMenuBackdrop fixed inset-x-0 bottom-0 top-[4.25rem] z-10 bg-foreground/10"
      />

      <div
        id="services-mega-menu"
        aria-hidden={!isOpen}
        data-open={isOpen}
        onMouseEnter={cancelScheduledClose}
        onMouseLeave={scheduleMenuClose}
        className="megaMenuPanel fixed inset-x-0 top-[4.25rem] z-20 max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain whitespace-normal border-b border-primary/10 bg-background shadow-[0_1.5rem_4rem_color-mix(in_srgb,var(--color-primary)_8%,transparent)]"
      >
        <div className="gridContainer">
          <div className="megaMenuLayout">
            {groups.map((group) => {
              const groupServices = services.filter(
                (service) => service.group === group.key
              );

              return (
                <section
                  key={group.key}
                  aria-labelledby={`mega-${group.key}`}
                  className="min-w-0"
                >
                  <div className="megaMenuGroupHeader flex min-w-0 items-center justify-between gap-3 border-b border-primary/10">
                    <h2
                      id={`mega-${group.key}`}
                      className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground"
                    >
                      {group.label}
                    </h2>
                    {group.key === 'face' ? (
                      <Link
                        href="/treatments"
                        tabIndex={isOpen ? 0 : -1}
                        onClick={closeMenu}
                        className="whitespace-nowrap text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-primary underline decoration-primary/35 underline-offset-[0.35rem] transition-colors hover:decoration-primary"
                      >
                        {labels.viewAll}
                      </Link>
                    ) : null}
                  </div>

                  <ol className={groupColumns[group.key]}>
                    {groupServices.map((service) => (
                      <li key={service.key}>
                        <Link
                          ref={service.key === services[0].key ? firstLinkRef : undefined}
                          href="/treatments"
                          tabIndex={isOpen ? 0 : -1}
                          onClick={closeMenu}
                          onFocus={() => setActiveServiceKey(service.key)}
                          onMouseEnter={() => setActiveServiceKey(service.key)}
                          className={`megaMenuServiceLink grid min-w-0 grid-cols-[1.35rem_minmax(0,1fr)] items-start gap-1.5 py-1.5 transition-colors duration-300 ${
                            activeServiceKey === service.key
                              ? 'text-primary'
                              : 'text-foreground/72 hover:text-primary'
                          }`}
                        >
                          <span className="pt-1 text-[0.55rem] font-semibold tabular-nums text-muted-foreground/70">
                            {String(service.index).padStart(2, '0')}
                          </span>
                          <span className="min-w-0 whitespace-normal text-[clamp(0.84rem,0.95vw,1.03rem)] font-medium leading-[1.22] tracking-[-0.025em]">
                            {service.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </section>
              );
            })}

            <aside className="megaMenuPreview self-start" aria-live="polite">
              <div
                key={activeService.key}
                className="megaMenuImage relative aspect-[4/5] overflow-hidden bg-muted"
              >
                <Image
                  src={activeService.image}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 22vw, 1px"
                  className={`object-cover ${activeService.imageClassName}`}
                />
              </div>
              <div className="mt-3 flex items-start justify-between gap-5">
                <div>
                  <p className="text-base font-medium leading-tight tracking-[-0.025em] text-foreground">
                    {activeService.title}
                  </p>
                  <p className="megaMenuPreviewDescription mt-1.5 line-clamp-2 max-w-[33ch] text-[0.68rem] leading-4 text-muted-foreground">
                    {activeService.description}
                  </p>
                </div>
                <Link
                  href="/treatments"
                  tabIndex={isOpen ? 0 : -1}
                  onClick={closeMenu}
                  className="mt-0.5 shrink-0 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-primary underline decoration-primary/35 underline-offset-[0.35rem] transition-colors hover:decoration-primary"
                >
                  {labels.explore}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
