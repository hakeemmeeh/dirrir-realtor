import { getTranslations } from "next-intl/server";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { PropertyCollectionBand } from "@/components/home/PropertyCollectionBand";
import {
  getFeaturedFrom,
  getPropertiesByCollectionFrom,
  type Property,
} from "@/lib/properties";

export async function HomePropertyShowcase({ properties }: { properties: Property[] }) {
  const t = await getTranslations("Home");
  const featured = getFeaturedFrom(properties);
  const living = getPropertiesByCollectionFrom(properties, "living");
  const investment = getPropertiesByCollectionFrom(properties, "investment");
  const featuredPreview = featured.slice(0, 3);
  const livingPreview = living.slice(0, 3);
  const investmentPreview = investment.slice(0, 3);

  return (
    <>
      <FeaturedCarousel items={featuredPreview} />
    </>
  );
}
