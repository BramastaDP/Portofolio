import { type VariantProps } from 'class-variance-authority';
import Link, { type LinkProps } from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from './button';

type LinkButtonProps = LinkProps &
  VariantProps<typeof buttonVariants> & {
    children?: React.ReactNode;
    className?: string;
    target?: string;
    rel?: string;
  };

export function LinkButton({ href, variant, size, className, children, ...props }: LinkButtonProps) {
  return (
    <Link href={href} className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {children}
    </Link>
  );
}

type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonVariants>;

export function AnchorButton({ href, variant, size, className, children, ...props }: AnchorButtonProps) {
  return (
    <a href={href} className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {children}
    </a>
  );
}
