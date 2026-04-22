import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AboutTestimonials } from "@/components/about/AboutTestimonials";
import { MissionVision } from "@/components/about/MissionVision";
import { StorySection } from "@/components/about/StorySection";
import { ValuesGrid } from "@/components/about/ValuesGrid";
import { WhyChoose } from "@/components/about/WhyChoose";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About Dirrir Realtor Limited | Nairobi Real Estate Agency",
  description:
    "Learn about Dirrir Realtor Limited, a trusted Nairobi real estate company serving local buyers, families, and diaspora investors across Kenya.",
};

export default async function AboutPage() {
  const t = await getTranslations("About");

  return (
    <>
      <PageHero 
        title={t("heroTitle")} 
        subtitle={t("heroSub")} 
        posterSrc="/images/about-hero.png"
      />
      <StorySection title={t("storyTitle")} />
      <MissionVision missionTitle={t("missionTitle")} visionTitle={t("visionTitle")} />
      <ValuesGrid sectionTitle={t("valuesTitle")} />
      <AboutTestimonials />
      <WhyChoose title={t("whyTitle")} />
    </>
  );
}
