import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { EmptyState } from "@/components/properties/EmptyState";
import { FilterBar } from "@/components/properties/FilterBar";
import { PropertyGrid } from "@/components/properties/PropertyGrid";
import { Container } from "@/components/ui/Container";
import {
  filterProperties,
  getAllProperties,
  type PropertyFilters,
} from "@/lib/properties";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Properties for Sale & Rent in Nairobi | Dirrir Realtor Listings",
  description:
    "Browse verified properties for sale and rent in Parklands, Kilimani, Westlands, and more. Premium Nairobi real estate listings.",
};

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function PropertiesPage({ searchParams }: Props) {
  const t = await getTranslations("PropertiesPage");
  const q = searchParams;

  const filters: PropertyFilters = {
    location: typeof q.location === "string" ? q.location : undefined,
    propertyType: typeof q.type === "string" ? q.type : undefined,
    status: typeof q.status === "string" ? q.status : undefined,
    bedrooms: typeof q.bedrooms === "string" ? q.bedrooms : undefined,
    maxPrice: typeof q.maxPrice === "string" ? q.maxPrice : undefined,
    collection: typeof q.collection === "string" ? q.collection : undefined,
  };

  const all = await getAllProperties();
  const filtered = filterProperties(all, filters);
  const heroMedia = all.find((p) => p.heroVideoUrl);

  return (
    <>
      <PageHero
        title={t("heroTitle")}
        subtitle={t("heroSub")}
        compact
        videoSrc={heroMedia?.heroVideoUrl}
        posterSrc={heroMedia?.gallery[0]}
      />
      <FilterBar />
      <section className="py-12 lg:py-16">
        <Container>
          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <PropertyGrid items={filtered} />
              <div className="mt-10 rounded-sm border border-border bg-background-alt p-6 sm:p-8">
                <p className="font-serif text-2xl text-primary">{t("journeyTitle")}</p>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-light sm:text-base">
                  {t("journeyBody")}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/254700000000?text=Hello%20Dirrir%20Realtor%2C%20please%20help%20me%20shortlist%20properties."
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center rounded-sm bg-accent px-5 py-2.5 text-sm font-semibold tracking-[0.06em] text-white transition-colors hover:bg-accent-dark"
                  >
                    {t("journeyPrimary")}
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex min-h-11 items-center rounded-sm border border-primary/70 px-5 py-2.5 text-sm font-semibold tracking-[0.06em] text-primary transition-colors hover:border-accent hover:text-accent"
                  >
                    {t("journeySecondary")}
                  </a>
                </div>
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  );
}
