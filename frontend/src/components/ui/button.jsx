import {Slot} from '@radix-ui/react-slot';
import {cva} from 'class-variance-authority';

import {cn} from '@/lib/utils';

const buttonVariants = cva(
  'group inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold transition-[transform,background-color,color] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary-hover',
        outline:
          'bg-transparent text-primary ring-1 ring-primary/30 hover:bg-primary-soft',
        light:
          'bg-primary-foreground text-primary hover:bg-white',
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
