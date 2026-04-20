import { CompletedDevelopments } from "@/components/home/CompletedDevelopments";
import { HomePropertyShowcase } from "@/components/home/HomePropertyShowcase";
import { HeroSection } from "@/components/home/HeroSection";
import { IntroBlock } from "@/components/home/IntroBlock";
import { NewDevelopments } from "@/components/home/NewDevelopments";
import { Storybeats } from "@/components/home/Storybeats";
import { ServiceCards } from "@/components/home/ServiceCards";
import { TrustStrip } from "@/components/home/TrustStrip";
import { MarketIntelligence } from "@/components/home/MarketIntelligence";
import { getAllProperties, getHomeHeroSlidesFrom } from "@/lib/properties";

export default async function HomePage() {
  const all = await getAllProperties();
  const heroSlides = getHomeHeroSlidesFrom(all);
  const completedDevelopments = all.filter((p) => !p.isNewDevelopment).slice(0, 6);

  return (
    <>
      <HeroSection slides={heroSlides} />
      <CompletedDevelopments properties={completedDevelopments} />
      <NewDevelopments properties={all} />
      <HomePropertyShowcase properties={all} />
      <TrustStrip />
      <IntroBlock />
      <Storybeats />
      <ServiceCards />
      <MarketIntelligence />
    </>
  );
}
