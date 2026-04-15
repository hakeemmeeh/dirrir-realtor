import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AreaCard } from "@/components/areas/AreaCard";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { AREAS } from "@/lib/areas-data";

export const metadata: Metadata = {
  title: "Areas We Serve | Nairobi Neighbourhoods | Dirrir Realtor",
  description:
    "Parklands, Kilimani, Westlands, Lavington, and more — explore Nairobi neighbourhoods with Dirrir Realtor.",
};

export default async function AreasPage() {
  const t = await getTranslations("AreasPage");

  return (
    <>
      <PageHero title={t("heroTitle")} subtitle={t("heroSub")} />
      <section className="bg-background py-12 lg:py-20">
        <Container className="flex flex-col gap-16 lg:gap-24">
          {AREAS.map((area, index) => (
            <AreaCard
              key={area.slug}
              area={area}
              index={index}
              highlightsLabel={t("highlights")}
              priceLabel={t("priceRange")}
              ctaLabel={t("viewProps", { area: area.name })}
            />
          ))}
        </Container>
      </section>
    </>
  );
}
