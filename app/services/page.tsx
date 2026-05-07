import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { ServiceSection } from "@/components/services/ServiceSection";
import { FAQPageJsonLd } from "@/components/JsonLd";
import { SERVICES } from "@/lib/services-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Real Estate Services | Sales, Rentals & Diaspora Investment | Dirrir Realtor",
  description:
    "Property sales, rentals, advisory, and diaspora investment services in Nairobi. Dirrir Realtor offers end-to-end real estate support.",
  path: "/services",
  image: "/images/services-hero.png",
  keywords: [
    "real estate services Nairobi",
    "property sales Kenya",
    "rental management Nairobi",
    "property advisory",
    "diaspora investment Kenya",
    "property management Parklands",
  ],
});

const SERVICES_FAQS = [
  {
    question: "How long does it take to buy a property in Nairobi?",
    answer:
      "The typical process from offer acceptance to title transfer in Nairobi takes 60–90 days, depending on due diligence, financing, and land registry processing times. Our team guides you through every step.",
  },
  {
    question: "Can foreigners buy property in Kenya?",
    answer:
      "Yes. Foreign nationals can buy property in Kenya, though they cannot hold land on a freehold basis — leasehold titles of up to 99 years are available. Our advisory team can explain the legal framework and connect you with a qualified conveyancing lawyer.",
  },
  {
    question: "How do virtual property viewings work for diaspora buyers?",
    answer:
      "We schedule a live video call (WhatsApp, Zoom, or Google Meet) where your dedicated agent walks through the property in real time, answers your questions, and shows you the building, neighbourhood, and surroundings. A recording is provided afterwards.",
  },
  {
    question: "What documents do I need to buy a house in Kenya?",
    answer:
      "You will need a national ID or passport, KRA PIN certificate, proof of funds or mortgage approval, and a signed sale agreement. Our team provides a full documentation checklist when you begin the process.",
  },
  {
    question: "Does Dirrir Realtor handle property management after purchase?",
    answer:
      "Yes. Our property management service covers tenant screening, lease agreements, monthly rent collection, maintenance coordination, and periodic property inspections — ideal for investors who are based abroad.",
  },
];

export default async function ServicesPage() {
  const t = await getTranslations("ServicesPage");

  return (
    <>
      <FAQPageJsonLd questions={SERVICES_FAQS} />
      <PageHero
        tall
        title={t("heroTitle")}
        subtitle={t("heroSub")}
        posterSrc="/images/services-hero.png"
      />
      <div className="bg-background">
        {SERVICES.map((item, index) => (
          <div
            key={item.id}
            className={index % 2 === 1 ? "bg-background-alt" : "bg-background"}
          >
            <ServiceSection
              item={item}
              index={index}
              includedLabel={t("included")}
              ctaLabel={t("getStarted")}
            />
          </div>
        ))}
      </div>
    </>
  );
}
