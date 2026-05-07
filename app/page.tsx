import type { Metadata } from "next";
import { CompletedDevelopments } from "@/components/home/CompletedDevelopments";
import { HomePropertyShowcase } from "@/components/home/HomePropertyShowcase";
import { HeroSection } from "@/components/home/HeroSection";
import { IntroBlock } from "@/components/home/IntroBlock";
import { NewDevelopments } from "@/components/home/NewDevelopments";
import { ServiceCards } from "@/components/home/ServiceCards";
import { TrustStrip } from "@/components/home/TrustStrip";
import { MarketIntelligence } from "@/components/home/MarketIntelligence";
import { getAllProperties, getCompletedDevelopmentsForShowcase, getHomeHeroSpotlightProperty } from "@/lib/properties";
import { buildMetadata, BASE_KEYWORDS } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Homes & Apartments for Sale in Nairobi",
  description:
    "Verified homes and apartments for sale and rent in Parklands, Kilimani, Westlands, and Lavington. Dirrir Realtor Limited — Nairobi's trusted real estate professionals.",
  path: "/",
  keywords: BASE_KEYWORDS,
});

export default async function HomePage() {
  const all = await getAllProperties();
  const heroSlides = getHomeHeroSpotlightProperty(all);
  const completedDevelopments = getCompletedDevelopmentsForShowcase(all, 6);

  return (
    <>
      <HeroSection slides={heroSlides} />
      <NewDevelopments properties={all} />
      <CompletedDevelopments properties={completedDevelopments} />
      <HomePropertyShowcase properties={all} />
      <TrustStrip />
      <IntroBlock />
      <ServiceCards />
      <MarketIntelligence />
    </>
  );
}
