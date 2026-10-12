'use client';

import {Link, usePathname} from '@/i18n/navigation';

export default function LocaleSwitcher({
  currentLocale,
  label,
  turkishLabel,
  englishLabel
}) {
  const pathname = usePathname();

  return (
    <div
      aria-label={label}
      className="flex w-fit items-center rounded-full bg-primary-foreground/10 p-1 text-[0.66rem] font-bold tracking-[0.08em]"
    >
      <Link
        href={pathname}
        locale="tr"
        aria-current={currentLocale === 'tr' ? 'page' : undefined}
        className={`rounded-full px-2.5 py-1.5 transition-[color,background-color,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-95 ${
          currentLocale === 'tr'
            ? 'bg-primary-foreground text-primary'
            : 'text-primary-foreground/60 hover:text-primary-foreground'
        }`}
      >
        {turkishLabel}
      </Link>
      <Link
        href={pathname}
        locale="en"
        aria-current={currentLocale === 'en' ? 'page' : undefined}
        className={`rounded-full px-2.5 py-1.5 transition-[color,background-color,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-95 ${
          currentLocale === 'en'
            ? 'bg-primary-foreground text-primary'
            : 'text-primary-foreground/60 hover:text-primary-foreground'
        }`}
      >
        {englishLabel}
      </Link>
    </div>
  );
}
