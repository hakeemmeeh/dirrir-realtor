"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const anchors = ["portfolio", "living", "investment"] as const;

const labelKeys: Record<(typeof anchors)[number], "portfolioNavPortfolio" | "portfolioNavLiving" | "portfolioNavInvestment"> = {
  portfolio: "portfolioNavPortfolio",
  living: "portfolioNavLiving",
  investment: "portfolioNavInvestment",
};

export function PortfolioSectionNav() {
  const pathname = usePathname();
  const t = useTranslations("Home");
  const base = pathname === "/developments" ? "/developments" : "/";

  return (
    <nav
      aria-label={t("portfolioNavAria")}
      className="sticky top-[5.15rem] z-40 border-b border-border/90 bg-background/93 py-2.5 backdrop-blur-md lg:top-[6rem]"
    >
      <Container className="flex flex-wrap items-center justify-center gap-x-0.5 gap-y-2 sm:justify-start">
        {anchors.map((id) => (
          <Link
            key={id}
            href={`${base}#${id}`}
            className={cn(
              "rounded-sm px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-text-light transition-colors",
              "hover:bg-background-alt hover:text-accent",
            )}
          >
            {t(labelKeys[id])}
          </Link>
        ))}
      </Container>
    </nav>
  );
}
