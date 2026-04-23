import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  | "luxury"
  /** Full-bleed / image heroes — primary filled CTA */
  | "heroPrimary"
  /** Full-bleed / image heroes — glass outline, light fill */
  | "heroLuxury"
  /** Full-bleed / image heroes — quiet tertiary */
  | "heroGhost";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-dark border border-accent shadow-[0_10px_24px_rgba(197,160,89,0.25)] hover:shadow-[0_14px_30px_rgba(197,160,89,0.3)]",
  secondary:
    "bg-transparent text-primary border border-primary/20 hover:border-accent hover:text-accent bg-background-alt",
  ghost: "bg-transparent text-primary hover:text-accent underline-offset-4 hover:underline font-mono text-[10px] uppercase tracking-widest",
  luxury:
    "border border-white/40 bg-white/10 text-ivory backdrop-blur-md hover:bg-white hover:text-primary hover:border-white shadow-[0_16px_40px_rgba(0,0,0,0.3)]",
  heroPrimary:
    "relative min-h-12 rounded-2xl border border-white/10 bg-gradient-to-b from-accent to-[#9A1118] px-9 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-[0_8px_28px_rgba(196,30,36,0.38),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-500 hover:-translate-y-0.5 hover:from-[#d42830] hover:to-[#8f0f16] hover:shadow-[0_14px_40px_rgba(196,30,36,0.48),inset_0_1px_0_rgba(255,255,255,0.22)] active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/35",
  heroLuxury:
    "min-h-12 rounded-2xl border border-white/50 bg-white/[0.12] px-9 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-primary hover:shadow-[0_22px_50px_rgba(0,0,0,0.28)] active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40",
  heroGhost:
    "min-h-12 rounded-2xl border border-white/25 bg-white/[0.04] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/[0.1] hover:text-white active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/35",
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
