import type { Metadata } from "next";
import { EmptyState } from "@/components/properties/EmptyState";
import { FilterBar } from "@/components/properties/FilterBar";
import { PropertyList } from "@/components/properties/PropertyList";
import { Container } from "@/components/ui/Container";
import {
  filterProperties,
  getAllProperties,
  type PropertyFilters,
} from "@/lib/properties";
import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { whatsappHref, WHATSAPP_PRIMARY_E164 } from "@/lib/contact-details";

export const metadata: Metadata = buildMetadata({
  title: "Properties for Sale & Rent in Nairobi | Dirrir Realtor Listings",
  description:
    "Browse verified properties for sale and rent in Parklands, Kilimani, Westlands, Lavington, and Riverside — premium Nairobi real estate listings.",
  path: "/properties",
  keywords: [
    "properties for sale Nairobi",
    "apartments for rent Nairobi",
    "houses for sale Parklands",
    "apartments Kilimani",
    "homes Westlands",
    "property listings Kenya",
  ],
});

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

  return (
    <div className="pt-16 sm:pt-[4.75rem] lg:pt-24">
      <FilterBar />
      <section className="py-10 lg:py-14">
        <Container className="max-w-[1480px]">
          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="mb-8 flex items-baseline justify-between gap-4 border-b border-border/60 pb-5 sm:mb-10 sm:pb-6">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary sm:text-[11px]">
                  {t("listingsCount", { count: filtered.length })}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-text-light sm:text-[11px]">
                  {t("listingsContext")}
                </p>
              </div>

              <PropertyList items={filtered} />

              <div className="mt-16 rounded-sm border border-border bg-background-alt p-6 sm:p-8">
                <p className="font-sans text-2xl font-medium tracking-tight text-primary">{t("journeyTitle")}</p>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-light sm:text-base">
                  {t("journeyBody")}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={whatsappHref(
                      WHATSAPP_PRIMARY_E164,
                      "Hello Dirrir Realtor, please help me shortlist properties.",
                    )}
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
    </div>
  );
}
