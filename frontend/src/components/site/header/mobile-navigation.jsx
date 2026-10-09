'use client';

import {useEffect, useState} from 'react';

import {Button} from '@/components/ui/button';
import {Link} from '@/i18n/navigation';

import LocaleSwitcher from './locale-switcher';

export default function MobileNavigation({
  currentLocale,
  items,
  labels,
  whatsappUrl
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
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
    <div className="xl:hidden">
      <button
        type="button"
        aria-controls="mobile-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? labels.close : labels.menu}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="relative z-40 flex size-11 items-center justify-center rounded-full bg-foreground text-background shadow-[0_12px_30px_rgba(24,33,27,0.18)] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-95"
      >
        <span
          className={`absolute h-px w-5 bg-current transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            isOpen ? 'translate-y-0 rotate-45' : '-translate-y-1.5'
          }`}
        />
        <span
          className={`absolute h-px w-5 bg-current transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            isOpen ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'
          }`}
        />
        <span
          className={`absolute h-px w-5 bg-current transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            isOpen ? 'translate-y-0 -rotate-45' : 'translate-y-1.5'
          }`}
        />
      </button>

      <div
        id="mobile-navigation"
        aria-hidden={!isOpen}
        aria-modal={isOpen ? true : undefined}
        role="dialog"
        className={`fixed inset-0 z-30 bg-forest/94 px-4 pb-6 pt-28 text-parchment backdrop-blur-2xl transition-[opacity,visibility] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="mx-auto flex min-h-full max-w-2xl flex-col justify-between">
          <nav aria-label={labels.menu} className="flex flex-col">
            {items.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                tabIndex={isOpen ? 0 : -1}
                style={{transitionDelay: isOpen ? `${100 + index * 55}ms` : '0ms'}}
                className={`border-b border-white/10 py-4 font-display text-[clamp(2.35rem,11vw,4.6rem)] leading-none tracking-[-0.045em] transition-[transform,opacity,color] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-sage ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div
            className={`mt-10 flex flex-col gap-4 transition-[transform,opacity] delay-300 duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <LocaleSwitcher
              currentLocale={currentLocale}
              label={labels.language}
              turkishLabel={labels.turkishShort}
              englishLabel={labels.englishShort}
            />
            <Button asChild variant="light" className="w-full justify-between pl-6 pr-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                tabIndex={isOpen ? 0 : -1}
              >
                <span>{labels.whatsapp}</span>
                <span className="flex size-9 items-center justify-center rounded-full bg-forest/10 text-lg transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105">
                  ↗
                </span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
