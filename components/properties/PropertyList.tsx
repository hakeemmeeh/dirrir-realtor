/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Property } from "@/lib/properties";
import { formatUsd } from "@/lib/utils";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { whatsappHref, WHATSAPP_PRIMARY_E164 } from "@/lib/contact-details";

type Props = {
  items: Property[];
};

function getPriceLabel(p: Property) {
  return p.status === "For Sale"
    ? formatUsd(p.price)
    : `${formatUsd(p.price)}/mo`;
}

function getBedroomLabel(p: Property) {
  if (p.propertyType === "Land") return "N/A";
  return p.bedrooms === 0 ? "Studio" : String(p.bedrooms);
}

function getCompletionLabel(
  p: Property,
  t: (key: string) => string,
) {
  if (p.availableFrom) {
    const match = p.availableFrom.match(/\b(20\d{2})\b/);
    if (match) return `${t("completionLabel")} ${match[1]}`;
    if (p.availableFrom.toLowerCase().includes("near completion")) {
      return `${t("completionLabel")} ${t("completionSoon")}`;
    }
  }
  if (p.yearBuilt) return `${t("completionLabel")} ${p.yearBuilt}`;
  if (p.launchLabel) return p.launchLabel.toUpperCase();
  return t("launchNow").toUpperCase();
}

export function PropertyList({ items }: Props) {
  const t = useTranslations("PropertiesPage");

  if (items.length === 0) return null;

  return (
    <div className="space-y-24 lg:space-y-28">
      {items.map((property) => (
        <article
          key={property.slug}
          className="group grid gap-8 lg:grid-cols-[1.25fr_0.85fr] lg:items-stretch xl:gap-16"
        >
          <Link
            href={`/properties/${property.slug}`}
            className="relative block min-h-[260px] overflow-hidden bg-primary sm:min-h-[380px] lg:min-h-[500px]"
          >
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
          </Link>

          <div className="flex flex-col justify-center py-2 sm:py-4 lg:pl-6 xl:pl-10">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-text-light">
              {property.location}
            </p>

            <RevealOnScroll
              delay={0.04}
              duration={1.55}
              distance={95}
              direction="up"
            >
              <Link href={`/properties/${property.slug}`}>
                <h3 className="mt-3 font-display text-2xl font-normal uppercase leading-[1.08] tracking-[0.02em] text-primary transition-colors hover:text-accent sm:text-3xl lg:text-[2.25rem]">
                  {property.title}
                </h3>
              </Link>
            </RevealOnScroll>

            <RevealOnScroll
              delay={0.1}
              duration={1.75}
              distance={110}
              direction="up"
            >
              <p className="mt-2 text-base text-text-light sm:text-lg">
                {property.addressLine ?? property.location}
              </p>
            </RevealOnScroll>

            <div className="mt-8 space-y-3">
              <RevealOnScroll
                delay={0.14}
                duration={1.55}
                distance={95}
                direction="up"
              >
                <div className="flex items-center justify-between gap-4 pt-3">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-text-light">
                    {t("launchBedrooms")}
                  </p>
                  <p className="text-sm font-semibold tracking-[0.08em] text-primary sm:text-base">
                    {getBedroomLabel(property)}
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll
                delay={0.18}
                duration={1.6}
                distance={100}
                direction="up"
              >
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
                href={whatsappHref(
                  WHATSAPP_PRIMARY_E164,
                  `Hello Dirrir Realtor, I am interested in ${property.title}`,
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 min-w-[180px] items-center justify-center border border-accent/60 px-10 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary transition-colors hover:bg-accent/15 sm:min-w-[200px] sm:px-12"
              >
                {t("launchEnquire")}
              </a>
              <Link
                href={`/properties/${property.slug}`}
                className="inline-flex min-h-12 min-w-[180px] items-center justify-center bg-primary px-10 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-accent sm:min-w-[200px] sm:px-12"
              >
                {t("launchLearnMore")}
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
