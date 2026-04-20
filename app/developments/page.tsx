import type { Metadata } from "next";
import { DevelopmentsPortfolioJsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { CollectionChoiceGrid } from "@/components/home/CollectionChoiceGrid";
import { CompletedDevelopments } from "@/components/home/CompletedDevelopments";
import { DevelopmentsWalkthrough } from "@/components/home/DevelopmentsWalkthrough";
import { NewDevelopments } from "@/components/home/NewDevelopments";
import { PropertyGrid } from "@/components/properties/PropertyGrid";
import { Container } from "@/components/ui/Container";
import { TrustStrip } from "@/components/home/TrustStrip";
import { getAllProperties } from "@/lib/properties";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Developments & Portfolio",
  description:
    "Browse our Living and Investment collections — premium Nairobi homes and apartments for sale and rent, with full details on every listing.",
};

export default async function DevelopmentsPage() {
  const t = await getTranslations("Home");
  const all = await getAllProperties();
  const listingPaths = all.map((p) => `/properties/${p.slug}`);
  const showcaseMedia = all.find((p) => p.heroVideoUrl);
  const completedDevelopments = all
    .filter((p) => !p.isNewDevelopment)
    .slice(0, 6);

  return (
    <>
      <DevelopmentsPortfolioJsonLd pagePath="/developments" listingPaths={listingPaths} />
      <PageHero
        title={t("devHeroTitle")}
        subtitle={t("devHeroSub")}
        compact
        videoSrc={showcaseMedia?.heroVideoUrl}
        posterSrc={showcaseMedia?.gallery[0]}
      />
      <CompletedDevelopments properties={completedDevelopments} />
      <NewDevelopments properties={all} />
      <CollectionChoiceGrid />
      <DevelopmentsWalkthrough />
      <section className="bg-background py-20 lg:py-32">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="font-sans text-3xl font-medium tracking-tight text-primary sm:text-4xl lg:text-5xl">
              {t("completePortfolioTitle")}
            </h2>
            <div className="mx-auto mt-6 h-px w-24 bg-accent" />
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-text-light">
              {t("completePortfolioSub")}
            </p>
          </div>
          <PropertyGrid items={all} />
        </Container>
      </section>
      <TrustStrip />
    </>
  );
}
