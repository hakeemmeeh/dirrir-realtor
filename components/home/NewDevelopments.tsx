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
    <section id="new-developments" className="bg-background pb-10 pt-4 lg:pb-14 lg:pt-6">
      <Container>
        <div className="mb-8 max-w-3xl sm:pr-24">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
            {t("newDevelopmentsEyebrow")}
          </p>
          <RevealOnScroll direction="left" distance={56} duration={1.3}>
            <h2 className="mt-4 font-sans text-3xl font-medium leading-tight tracking-tight text-primary sm:text-4xl">
              {t("newDevelopmentsTitle")}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll direction="left" delay={0.22} distance={56} duration={1.4}>
            <p className="mt-4 text-base leading-relaxed text-text-light sm:text-lg">
              {t("newDevelopmentsSub")}
            </p>
          </RevealOnScroll>
        </div>

        <DevelopmentCarousel properties={items} />
      </Container>
    </section>
  );
}
