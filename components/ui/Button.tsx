import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost" | "luxury";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-dark border border-accent shadow-[0_10px_24px_rgba(197,160,89,0.25)] hover:shadow-[0_14px_30px_rgba(197,160,89,0.3)]",
  secondary:
    "bg-transparent text-primary border border-primary/20 hover:border-accent hover:text-accent bg-background-alt",
  ghost: "bg-transparent text-primary hover:text-accent underline-offset-4 hover:underline font-mono text-[10px] uppercase tracking-widest",
  luxury:
    "border border-white/40 bg-white/10 text-ivory backdrop-blur-md hover:bg-white hover:text-primary hover:border-white shadow-[0_16px_40px_rgba(0,0,0,0.3)]",
};

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  href?: string;
  className?: string;
};

export function Button({
  variant = "primary",
  className,
  href,
  children,
  ...props
}: ButtonProps) {
  const cls = cn(
    "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-none px-6 py-3 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 disabled:opacity-50",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={cls} {...props}>
      {children}
    </button>
  );
}
