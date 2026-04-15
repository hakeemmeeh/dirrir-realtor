"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function DevelopmentsWalkthrough() {
  const t = useTranslations("Home");

  return (
    <section className="bg-background py-14 lg:py-20">
      <Container>
        <div className="grid gap-8 border border-border bg-background-alt p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:p-12">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
              {t("devWalkthroughKicker")}
            </p>
            <h2 className="mt-5 font-serif text-3xl text-primary sm:text-4xl">
              {t("devWalkthroughTitle")}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-light">
              {t("devWalkthroughBody")}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/properties?collection=living" variant="primary">
                {t("exploreLiving")}
              </Button>
              <Button href="/properties?collection=investment" variant="secondary">
                {t("exploreInvestment")}
              </Button>
            </div>
          </div>
          <div className="grid gap-4">
            <article className="border border-border bg-background p-4 sm:p-5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-text-light">
                {t("devStep1Label")}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text">{t("devStep1Body")}</p>
            </article>
            <article className="border border-border bg-background p-4 sm:p-5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-text-light">
                {t("devStep2Label")}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text">{t("devStep2Body")}</p>
            </article>
            <article className="border border-border bg-background p-4 sm:p-5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-text-light">
                {t("devStep3Label")}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text">{t("devStep3Body")}</p>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
