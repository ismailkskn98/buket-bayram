'use client';

import {useEffect, useRef, useState} from 'react';

import {Link} from '@/i18n/navigation';

import LocaleSwitcher from './locale-switcher';

export default function MobileNavigation({
  currentLocale,
  items,
  labels,
  whatsappUrl
}) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstLinkRef.current?.focus();

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div>
      <button
        ref={triggerRef}
        type="button"
        aria-controls="mobile-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? labels.close : labels.menu}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="relative z-40 flex size-10 items-center justify-center rounded-full bg-primary-soft text-primary transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary-soft-hover active:scale-95"
      >
        <span
          className={`absolute h-px w-4 bg-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            isOpen ? 'translate-y-0 rotate-45' : '-translate-y-[3px]'
          }`}
        />
        <span
          className={`absolute h-px w-4 bg-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            isOpen ? 'translate-y-0 -rotate-45' : 'translate-y-[3px]'
          }`}
        />
      </button>

      <div
        id="mobile-navigation"
        aria-hidden={!isOpen}
        aria-modal={isOpen ? true : undefined}
        role="dialog"
        className={`fixed inset-0 z-30 overflow-y-auto bg-primary/98 px-4 pb-6 pt-24 text-primary-foreground transition-[opacity,visibility] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="mx-auto flex min-h-[calc(100dvh-7.5rem)] max-w-5xl flex-col justify-between">
          <nav aria-label={labels.menu} className="flex flex-col">
            {items.map((item, index) => (
              <Link
                ref={index === 0 ? firstLinkRef : undefined}
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                tabIndex={isOpen ? 0 : -1}
                className={`border-b border-primary-foreground/15 py-4 text-[clamp(2.5rem,8vw,5.5rem)] font-light leading-[0.95] tracking-[-0.055em] transition-[transform,opacity,color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-primary-foreground/70 ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div
            className={`mt-10 flex flex-col gap-5 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] sm:flex-row sm:items-center sm:justify-between ${
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <LocaleSwitcher
              currentLocale={currentLocale}
              label={labels.language}
              turkishLabel={labels.turkishShort}
              englishLabel={labels.englishShort}
            />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              tabIndex={isOpen ? 0 : -1}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary-foreground px-6 text-sm font-semibold text-primary transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
            >
              {labels.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
