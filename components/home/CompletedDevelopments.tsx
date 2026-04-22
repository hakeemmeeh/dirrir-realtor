"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { DevelopmentCarousel } from "@/components/home/DevelopmentCarousel";
import { Container } from "@/components/ui/Container";
import type { Property } from "@/lib/properties";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type Props = {
  properties: Property[];
};

export function CompletedDevelopments({ properties }: Props) {
  const t = useTranslations("Home");

  if (properties.length === 0) return null;

  return (
    <section id="our-developments" className="bg-background pb-4 pt-10 lg:pb-6 lg:pt-14">
      <Container>
        <div className="mb-8 max-w-3xl animate-fade-in-up sm:pr-24">
          <p
            className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent"
            style={{ animationDelay: "80ms" }}
          >
            {t("ourDevelopmentsEyebrow")}
          </p>
          <RevealOnScroll delay={0.12}>
            <h2 className="mt-4 font-sans text-3xl font-medium leading-tight tracking-tight text-primary sm:text-4xl">
              {t("ourDevelopmentsTitle")}
            </h2>
          </RevealOnScroll>
          <p
            className="mt-4 text-base leading-relaxed text-text-light sm:text-lg"
            style={{ animationDelay: "240ms" }}
          >
            {t("ourDevelopmentsSub")}
          </p>
        </div>

        <DevelopmentCarousel properties={properties} />

        <div className="mt-10">
          <Link
            href="/properties"
            className="inline-flex min-h-11 items-center rounded-sm border border-primary/70 px-5 py-2.5 text-sm font-semibold tracking-[0.06em] text-primary transition-colors hover:border-accent hover:text-accent"
          >
            {t("viewAll")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
