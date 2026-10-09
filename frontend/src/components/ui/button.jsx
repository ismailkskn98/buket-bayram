import {Slot} from '@radix-ui/react-slot';
import {cva} from 'class-variance-authority';

import {cn} from '@/lib/utils';

const buttonVariants = cva(
  'group inline-flex min-h-12 items-center justify-center gap-3 rounded-full text-sm font-semibold transition-[transform,background-color,color,box-shadow] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-foreground px-5 py-3 text-background shadow-[0_14px_34px_rgba(24,33,27,0.16)] hover:bg-primary',
        outline:
          'bg-parchment/80 px-5 py-3 text-foreground ring-1 ring-foreground/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.65)] hover:bg-white',
        light:
          'bg-parchment px-5 py-3 text-forest shadow-[0_14px_34px_rgba(0,0,0,0.13)] hover:bg-white',
        ghost:
          'min-h-10 px-3 py-2 text-foreground hover:bg-foreground/[0.06]'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export function Button({className, variant, asChild = false, ...props}) {
  const Component = asChild ? Slot : 'button';

  return (
    <Component
      className={cn(buttonVariants({variant}), className)}
      {...props}
    />
  );
}
