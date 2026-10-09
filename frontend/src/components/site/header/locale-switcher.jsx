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
      className="flex items-center rounded-full bg-foreground/[0.055] p-1 text-[0.66rem] font-bold tracking-[0.08em]"
    >
      <Link
        href={pathname}
        locale="tr"
        aria-current={currentLocale === 'tr' ? 'page' : undefined}
        className={`rounded-full px-2.5 py-1.5 transition-[color,background-color,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-95 ${
          currentLocale === 'tr'
            ? 'bg-parchment text-foreground shadow-[0_3px_10px_rgba(24,33,27,0.08)]'
            : 'text-muted-foreground hover:text-foreground'
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
            ? 'bg-parchment text-foreground shadow-[0_3px_10px_rgba(24,33,27,0.08)]'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        {englishLabel}
      </Link>
    </div>
  );
}
