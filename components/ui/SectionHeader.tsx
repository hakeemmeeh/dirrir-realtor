import { cn } from "@/lib/utils";

type Props = {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  accent?: boolean;
  className?: string;
};

export function SectionHeader({
  kicker,
  title,
  subtitle,
  align = "left",
  accent = false,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {kicker ? (
        <p
          className={cn(
            "font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-accent",
            align === "center" && "mx-auto max-w-md",
          )}
        >
          {kicker}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-sans text-3xl font-medium tracking-tight text-primary sm:text-4xl",
          kicker && "mt-4",
          accent && "border-l-4 border-accent pl-4 sm:pl-6",
          align === "center" &&
            accent &&
            "border-l-0 border-b-2 border-accent/80 pb-4 pl-0",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed text-text-light",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
