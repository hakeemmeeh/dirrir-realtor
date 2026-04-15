import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { ServiceSection } from "@/components/services/ServiceSection";
import { SERVICES } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Real Estate Services | Sales, Rentals & Diaspora Investment | Dirrir Realtor",
  description:
    "Property sales, rentals, advisory, and diaspora investment services in Nairobi. Dirrir Realtor offers end-to-end real estate support.",
};

export default async function ServicesPage() {
  const t = await getTranslations("ServicesPage");

  return (
    <>
      <PageHero 
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
