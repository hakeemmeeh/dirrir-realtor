import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  variant?: "sale" | "rent" | "neutral";
  className?: string;
};

export function Badge({ children, variant = "neutral", className }: Props) {
  return (
    <span
      className={cn(
        "inline-block rounded-none px-2.5 py-1 text-[10px] font-bold uppercase tracking-luxury-widest",
        variant === "sale" && "bg-accent text-white",
        variant === "rent" && "bg-primary text-white",
        variant === "neutral" && "bg-background-alt text-text border border-border",
        className,
      )}
    >
      {children}
    </span>
  );
}
