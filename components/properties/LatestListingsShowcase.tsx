/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { formatUsd } from "@/lib/utils";
import type { Property } from "@/lib/properties";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type Props = {
  items: Property[];
};

function getPriceLabel(property: Property) {
  return property.status === "For Sale"
    ? formatUsd(property.price)
    : `${formatUsd(property.price)}/mo`;
}

function getCompletionLabel(
  property: Property,
  t: (key: string) => string,
) {
  if (property.availableFrom) {
    const match = property.availableFrom.match(/\b(20\d{2})\b/);
    if (match) return `${t("completionLabel")} ${match[1]}`;
    if (property.availableFrom.toLowerCase().includes("near completion")) {
      return `${t("completionLabel")} ${t("completionSoon")}`;
    }
  }
  if (property.yearBuilt) return `${t("completionLabel")} ${property.yearBuilt}`;
  if (property.launchLabel) return property.launchLabel.toUpperCase();
  return t("launchNow").toUpperCase();
}

function getBedroomLabel(property: Property) {
  if (property.propertyType === "Land") return "N/A";
  return property.bedrooms === 0 ? "Studio" : String(property.bedrooms);
}

export function LatestListingsShowcase({ items }: Props) {
  const t = useTranslations("PropertiesPage");
  if (items.length === 0) return null;

  const launchItems = items.filter((item) => item.isNewDevelopment);
  const source = launchItems.length > 0 ? launchItems : items;
  const launchRows = source.slice(0, 6);

  return (
    <section className="space-y-8">
      <div className="max-w-3xl">
        <RevealOnScroll duration={1.35} distance={90}>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
            {t("latestLaunchesEyebrow")}
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.14} duration={1.45} distance={95}>
          <h2 className="mt-4 font-sans text-3xl font-medium tracking-tight text-primary sm:text-4xl">
            {t("latestLaunchesTitle")}
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.24} duration={1.45} distance={95}>
          <p className="mt-3 text-sm leading-relaxed text-text-light sm:text-base">
            {t("latestLaunchesSub")}
          </p>
        </RevealOnScroll>
      </div>

      <div className="space-y-14">
        {launchRows.map((property) => (
          <article
            key={property.slug}
            className="group grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch xl:gap-14"
          >
            <div className="relative min-h-[260px] overflow-hidden bg-primary sm:min-h-[380px] lg:min-h-[500px]">
              <Image
                src={property.gallery[0] ?? "/images/hero-placeholder.jpg"}
                alt={property.title}
                fill
                className="object-cover scale-105 transition-transform duration-[2.5s] ease-out group-hover:scale-100"
                sizes="(max-width: 1024px) 100vw, 56vw"
              />
              <span className="absolute left-0 top-0 z-[1] rounded-br-2xl bg-[#e6cf8f] px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                {getCompletionLabel(property, t)}
              </span>
            </div>

            <div className="flex flex-col justify-center py-2 sm:py-4 lg:pl-6 xl:pl-10">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-text-light">
                {property.location}
              </p>
              <RevealOnScroll delay={0.04} duration={1.55} distance={95} direction="up">
                <h3 className="mt-3 font-display text-3xl font-normal uppercase leading-[1.05] tracking-[0.02em] text-primary sm:text-4xl lg:text-5xl">
                  {property.title}
                </h3>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1} duration={1.75} distance={110} direction="up">
                <p className="mt-2 text-base text-text-light sm:text-lg">
                  {property.addressLine ?? property.location}
                </p>
              </RevealOnScroll>

              <div className="mt-8 space-y-3">
                <RevealOnScroll delay={0.14} duration={1.55} distance={95} direction="up">
                  <div className="flex items-center justify-between gap-4 pt-3">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-text-light">
                      {t("launchBedrooms")}
                    </p>
                    <p className="text-sm font-semibold tracking-[0.08em] text-primary sm:text-base">
                      {getBedroomLabel(property)}
                    </p>
                  </div>
                </RevealOnScroll>
                <RevealOnScroll delay={0.18} duration={1.6} distance={100} direction="up">
                  <div className="flex items-center justify-between gap-4 pt-3">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-text-light">
                      {t("launchPrice")}
                    </p>
                    <p className="text-sm font-semibold tracking-[0.08em] text-primary sm:text-base">
                      {t("launchFrom")} {getPriceLabel(property)}
                    </p>
                  </div>
                </RevealOnScroll>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/254700000000?text=Hello%20Dirrir%20Realtor%2C%20I%20am%20interested%20in%20${encodeURIComponent(property.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center border border-accent/60 px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary transition-colors hover:bg-accent/15"
                >
                  {t("launchEnquire")}
                </a>
                <Link
                  href={`/properties/${property.slug}`}
                  className="inline-flex min-h-11 items-center justify-center bg-primary px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-accent"
                >
                  {t("launchLearnMore")}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
