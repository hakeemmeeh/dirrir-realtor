import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AboutTestimonials } from "@/components/about/AboutTestimonials";
import { AwardsPartners } from "@/components/about/AwardsPartners";
import { MissionVision } from "@/components/about/MissionVision";
import { StorySection } from "@/components/about/StorySection";
import { TeamSection } from "@/components/about/TeamSection";
import { ValuesGrid } from "@/components/about/ValuesGrid";
import { WhyChoose } from "@/components/about/WhyChoose";
import { PageHero } from "@/components/PageHero";
import { FAQPageJsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Dirrir Realtor Limited | Nairobi Real Estate Agency",
  description:
    "Learn about Dirrir Realtor Limited, a trusted Nairobi real estate company serving local buyers, families, and diaspora investors across Kenya.",
  path: "/about",
  keywords: [
    "About Dirrir Realtor",
    "Nairobi real estate agency",
    "Rabat Properties Limited",
    "trusted realtor Nairobi",
    "diaspora real estate Kenya",
  ],
});

const ABOUT_FAQS = [
  {
    question: "What areas of Nairobi does Dirrir Realtor cover?",
    answer:
      "Dirrir Realtor Limited covers Nairobi's prime residential neighbourhoods including Parklands, Kilimani, Westlands, Lavington, Riverside, and Kileleshwa. We also handle enquiries for emerging high-growth areas across Nairobi.",
  },
  {
    question: "Is Dirrir Realtor Limited a registered company in Kenya?",
    answer:
      "Yes. Dirrir Realtor Limited (DRL) is a registered Kenyan real estate company operating under Rabat Properties Limited.",
  },
  {
    question: "Does Dirrir Realtor help diaspora investors purchase property in Nairobi?",
    answer:
      "Yes. We offer dedicated diaspora investment services including virtual property tours via video call, remote transaction management, escrow guidance, and regular progress updates in your time zone.",
  },
  {
    question: "How do I start the process of buying a property with Dirrir Realtor?",
    answer:
      "Contact us via our enquiry form, WhatsApp, or phone. We will assign you a dedicated agent who will shortlist properties matching your budget and preferences, arrange viewings, and guide you through to title transfer.",
  },
];

export default async function AboutPage() {
  const t = await getTranslations("About");

  return (
    <>
      <FAQPageJsonLd questions={ABOUT_FAQS} />
      <PageHero
        title={t("heroTitle")} 
        subtitle={t("heroSub")} 
        posterSrc="/images/about-hero.png"
      />
      <StorySection title={t("storyTitle")} />
      <MissionVision missionTitle={t("missionTitle")} visionTitle={t("visionTitle")} />
      <ValuesGrid sectionTitle={t("valuesTitle")} />
      <TeamSection />
      <AboutTestimonials />
      <AwardsPartners />
      <WhyChoose title={t("whyTitle")} />
    </>
  );
}
