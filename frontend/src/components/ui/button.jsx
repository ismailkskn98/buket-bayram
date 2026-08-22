import {Slot} from '@radix-ui/react-slot';
import {cva} from 'class-variance-authority';

import {cn} from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary px-5 py-3 text-primary-foreground hover:bg-primary/90',
        outline:
          'border border-border bg-background px-5 py-3 text-foreground hover:bg-muted'
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
