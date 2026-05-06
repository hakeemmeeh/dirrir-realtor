import { CompletedDevelopments } from "@/components/home/CompletedDevelopments";
import { HomePropertyShowcase } from "@/components/home/HomePropertyShowcase";
import { HeroSection } from "@/components/home/HeroSection";
import { IntroBlock } from "@/components/home/IntroBlock";
import { NewDevelopments } from "@/components/home/NewDevelopments";
import { ServiceCards } from "@/components/home/ServiceCards";
import { TrustStrip } from "@/components/home/TrustStrip";
import { MarketIntelligence } from "@/components/home/MarketIntelligence";
import { getAllProperties, getCompletedDevelopmentsForShowcase, getHomeHeroSlidesFrom } from "@/lib/properties";

export default async function HomePage() {
  const all = await getAllProperties();
  const heroSlides = getHomeHeroSlidesFrom(all);
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
