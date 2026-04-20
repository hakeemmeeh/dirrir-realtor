import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { getNewDevelopmentsFrom, type Property } from "@/lib/properties";
import { DevelopmentCarousel } from "@/components/home/DevelopmentCarousel";

export async function NewDevelopments({ properties }: { properties: Property[] }) {
  const t = await getTranslations("Home");
  const items = getNewDevelopmentsFrom(properties, 6);

  if (items.length === 0) return null;

  return (
    <section id="new-developments" className="bg-background py-20 lg:py-28">
      <Container>
        <div className="mb-14 max-w-3xl sm:pr-24">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
            {t("newDevelopmentsEyebrow")}
          </p>
          <h2 className="mt-5 font-sans text-4xl font-medium leading-tight tracking-tight text-primary sm:text-5xl">
            {t("newDevelopmentsTitle")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-light sm:text-lg">
            {t("newDevelopmentsSub")}
          </p>
        </div>

        <DevelopmentCarousel properties={items} />
      </Container>
    </section>
  );
}
