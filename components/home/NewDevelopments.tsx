import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { getNewDevelopmentsFrom, type Property } from "@/lib/properties";
import { DevelopmentCarousel } from "@/components/home/DevelopmentCarousel";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export async function NewDevelopments({ properties }: { properties: Property[] }) {
  const t = await getTranslations("Home");
  const items = getNewDevelopmentsFrom(properties, 6);

  if (items.length === 0) return null;

  return (
    <section
      id="new-developments"
      className="relative overflow-hidden border-t-4 border-accent bg-gradient-to-b from-background-alt via-background-alt to-[#EEEAE4] pb-12 pt-10 lg:pb-20 lg:pt-16"
    >
      <div
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-accent/[0.12] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-[40%] h-64 w-64 rounded-full bg-primary/[0.06] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        aria-hidden
      />

      <Container className="relative">
        <div className="mb-10 max-w-4xl lg:mb-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2.5 rounded-sm bg-primary px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.32em] text-white shadow-md sm:px-4">
              <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {t("newDevelopmentsLiveLabel")}
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
              {t("newDevelopmentsEyebrow")}
            </span>
          </div>

          <p className="mt-3 font-mono text-[9px] font-semibold uppercase tracking-[0.28em] text-primary/75 sm:mt-4">
            {t("newDevelopmentsInvestorNote")}
          </p>

          <RevealOnScroll direction="left" distance={56} duration={1.3}>
            <h2 className="mt-5 font-serif text-3xl font-normal leading-[1.15] tracking-tight text-primary sm:mt-6 sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
              {t("newDevelopmentsTitle")}
            </h2>
          </RevealOnScroll>

          <RevealOnScroll direction="left" delay={0.18} distance={48} duration={1.35}>
            <p className="mt-2 font-sans text-lg font-medium text-accent sm:text-xl">
              {t("newDevelopmentsHypeLine")}
            </p>
          </RevealOnScroll>

          <RevealOnScroll direction="left" delay={0.22} distance={56} duration={1.4}>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-text sm:text-lg">
              {t("newDevelopmentsSub")}
            </p>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.08} distance={24} duration={0.9}>
            <ul className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
              <li className="rounded-full border border-primary/15 bg-background/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur-sm sm:text-xs">
                {t("newDevelopmentsStat1")}
              </li>
              <li className="rounded-full border border-primary/15 bg-background/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur-sm sm:text-xs">
                {t("newDevelopmentsStat2")}
              </li>
              <li className="rounded-full border border-accent/25 bg-accent/[0.07] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur-sm sm:text-xs">
                {t("newDevelopmentsStat3")}
              </li>
            </ul>
          </RevealOnScroll>
        </div>

        <DevelopmentCarousel
          properties={items}
          cardBadgeVariant="ongoing"
          spotlight
        />
      </Container>
    </section>
  );
}
