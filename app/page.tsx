import { HomePropertyShowcase } from "@/components/home/HomePropertyShowcase";
import { HeroSection } from "@/components/home/HeroSection";
import { IntroBlock } from "@/components/home/IntroBlock";
import { Storybeats } from "@/components/home/Storybeats";
import { ServiceCards } from "@/components/home/ServiceCards";
import { TrustStrip } from "@/components/home/TrustStrip";
import { MarketIntelligence } from "@/components/home/MarketIntelligence";
import { getAllProperties, getHomeHeroSlidesFrom } from "@/lib/properties";

export default async function HomePage() {
  const all = await getAllProperties();
  const heroSlides = getHomeHeroSlidesFrom(all);

  return (
    <>
      <HeroSection slides={heroSlides} />
      <IntroBlock />
      <Storybeats />
      <ServiceCards />
      <HomePropertyShowcase properties={all} />
      <MarketIntelligence />
      <TrustStrip />
    </>
  );
}
