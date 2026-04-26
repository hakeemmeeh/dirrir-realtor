import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AreaCard } from "@/components/areas/AreaCard";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { AREAS } from "@/lib/areas-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Areas We Serve | Nairobi Neighbourhoods | Dirrir Realtor",
  description:
    "Parklands, Kilimani, Westlands, Lavington, Riverside — explore Nairobi neighbourhood guides with price ranges, highlights, and verified listings.",
  path: "/areas",
  keywords: [
    "Nairobi neighbourhoods",
    "Parklands property guide",
    "Kilimani area guide",
    "Westlands houses",
    "Lavington property",
    "Riverside apartments Nairobi",
  ],
});

export default async function AreasPage() {
  const t = await getTranslations("AreasPage");

  return (
    <>
      <PageHero title={t("heroTitle")} subtitle={t("heroSub")} />
      <section className="bg-background py-20 lg:py-32">
        <Container>
          <div className="mb-20 max-w-2xl lg:mb-32">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Curated Portfolio</span>
            <h2 className="mt-4 font-serif text-3xl font-light text-text lg:text-4xl">
              Discover the most prestigious residential environments in Nairobi.
            </h2>
          </div>
          
          <div className="flex flex-col gap-32 lg:gap-48">
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
          </div>
        </Container>
      </section>
    </>
  );
}
