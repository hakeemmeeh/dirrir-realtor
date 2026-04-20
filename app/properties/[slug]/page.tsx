import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { RealEstateListingJsonLd } from "@/components/JsonLd";
import { PropertyEnquiryCta } from "@/components/properties/PropertyEnquiryCta";
import { PropertyGallery } from "@/components/properties/PropertyGallery";
import { SimilarProperties } from "@/components/properties/SimilarProperties";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { formatUsd } from "@/lib/utils";
import Link from "next/link";
import {
  categorizeAmenities,
  getAllProperties,
  getPropertyBySlugFrom,
  getSimilarPropertiesFrom,
} from "@/lib/properties";

type Props = { params: { slug: string } };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dirrirrealtor.co.ke";
const FLOOR_PLAN_A_SRC = "https://main.wpresidence.net/wp-content/uploads/2016/11/floor-plan-4.webp";
const FLOOR_PLAN_B_SRC = "https://main.wpresidence.net/wp-content/uploads/2016/11/floor-plan-3.webp";
const SECOND_PARKLANDS_SLUG = "3-bed-second-avenue-parklands";

export async function generateStaticParams() {
  const all = await getAllProperties();
  return all.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const all = await getAllProperties();
  const p = getPropertyBySlugFrom(all, params.slug);
  if (!p) return { title: "Property" };
  return {
    title: p.title,
    description: p.description.slice(0, 160),
    openGraph: {
      images: p.gallery[0] ? [p.gallery[0]] : undefined,
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const all = await getAllProperties();
  const p = getPropertyBySlugFrom(all, params.slug);
  if (!p) notFound();

  const similar = getSimilarPropertiesFrom(p, all, 3);
  const t = await getTranslations("Property");
  const badgeVariant = p.status === "For Sale" ? "sale" : "rent";
  const priceLabel =
    p.status === "For Sale" ? formatUsd(p.price) : `${formatUsd(p.price)}/mo`;
  const pageUrl = `${siteUrl}/properties/${p.slug}`;
  const sizeSqm = Math.round(p.areaSqft * 0.092903);
  const isSecondParklands = p.slug === SECOND_PARKLANDS_SLUG;
  const amenityHighlights = p.amenities.slice(0, 6);
  const amenityGroups = categorizeAmenities(p.amenities);
  const floorPlanUnits = isSecondParklands
    ? [
        { label: "2 Bedroom + DSQ", sizeSqm: 130, sizeSqft: Math.round(130 * 10.7639), price: "From USD 75,000" },
        { label: "3 Bedroom + DSQ", sizeSqm: 180, sizeSqft: Math.round(180 * 10.7639), price: "From USD 100,000" },
        { label: "4 Bedroom + DSQ", sizeSqm: 240, sizeSqft: Math.round(240 * 10.7639), price: "From USD 140,000" },
      ]
    : null;
  const mapQuery = encodeURIComponent(
    `${p.addressLine ?? p.title}, ${p.location}, ${p.city ?? "Nairobi"}, ${p.country ?? "Kenya"}`,
  );
  const mapSrc = `https://www.google.com/maps?q=${mapQuery}&z=14&output=embed`;
  const brochureHref =
    typeof process.env.NEXT_PUBLIC_BROCHURE_URL === "string" &&
    process.env.NEXT_PUBLIC_BROCHURE_URL.length > 0
      ? process.env.NEXT_PUBLIC_BROCHURE_URL
      : "/brochures/dirrir-portfolio.pdf";
  const sectionLinks = [
    { id: "overview", label: t("navOverview") },
    { id: "gallery", label: t("navGallery") },
    { id: "details", label: t("navDetails") },
    ...(p.heroVideoUrl ? [{ id: "video", label: t("navVideo") }] : []),
    { id: "features", label: t("navFeatures") },
    { id: "map", label: t("navMap") },
    { id: "viewing", label: t("navViewing") },
    { id: "floor-plans", label: t("navFloorPlans") },
    { id: "similar", label: t("navSimilar") },
  ];

  return (
    <>
      <RealEstateListingJsonLd
        title={p.title}
        description={p.description}
        price={p.price}
        currency="USD"
        url={pageUrl}
        image={p.gallery[0] ?? ""}
      />
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
        {p.heroVideoUrl ? (
          <>
            <Image
              src={p.gallery[0] ?? "/images/logo.svg"}
              alt={p.title}
              fill
              className="object-cover"
              priority
            />
            <video
              className="absolute inset-0 h-full w-full object-cover"
              poster={p.gallery[0]}
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              preload="metadata"
            >
              <source src={p.heroVideoUrl} type="video/mp4" />
            </video>
          </>
        ) : (
          <Image
            src={p.gallery[0] ?? "/images/logo.svg"}
            alt={p.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        <Container className="relative flex h-full flex-col justify-end pb-16 lg:pb-24">
          <div className="max-w-4xl animate-fade-in-up">
            <div className="flex items-center gap-3">
              <Badge
                variant={badgeVariant}
                className="border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md"
              >
                {p.status}
              </Badge>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
                {p.location}
              </span>
            </div>
            <h1 className="mt-6 font-sans text-4xl font-medium leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-7xl">
              {p.title}
            </h1>
            <div className="mt-8 flex items-center gap-8">
              <p className="text-2xl font-medium text-accent sm:text-3xl">{priceLabel}</p>
              <div className="h-px flex-1 bg-white/20" />
            </div>
          </div>
        </Container>
      </section>

      <div className="sticky top-[4.5rem] z-30 border-y border-border bg-background/95 backdrop-blur-md">
        <Container>
          <div className="flex gap-5 overflow-x-auto py-4">
            {sectionLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="whitespace-nowrap font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-text-light transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </div>
        </Container>
      </div>

      <section id="overview" className="scroll-mt-32 bg-background py-10 lg:py-14">
        <Container>
          <div className="mb-10 grid gap-6 border border-border bg-background-alt p-6 sm:p-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
                {t("projectOverview")}
              </p>
              <h2 className="mt-4 font-sans text-3xl font-medium leading-[1.08] tracking-tight text-primary sm:text-4xl">
                {p.title}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-light sm:text-base">
                {t("projectOverviewBody")}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <a
                href={brochureHref}
                download
                className="inline-flex min-h-11 items-center rounded-full border border-primary/70 px-6 py-3 text-sm font-semibold tracking-[0.08em] text-primary transition-colors hover:border-accent hover:bg-accent hover:text-white"
              >
                {t("downloadBrochure")}
              </a>
              <a
                href={`https://wa.me/254700000000?text=Hello%20Dirrir%20Realtor%2C%20I%20am%20interested%20in%20${encodeURIComponent(p.title)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold tracking-[0.08em] text-white transition-colors hover:bg-accent"
              >
                {t("enquire")}
              </a>
            </div>
          </div>

          <div className="mb-10 grid gap-4 border-y border-border py-6 sm:grid-cols-2 lg:grid-cols-4">
            <article className="space-y-1">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-text-light">
                {t("status")}
              </p>
              <p className="font-serif text-xl text-primary">{p.status}</p>
            </article>
            {p.propertyId ? (
              <article className="space-y-1">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-text-light">
                  {t("propertyId")}
                </p>
                <p className="font-serif text-xl text-primary">{p.propertyId}</p>
              </article>
            ) : null}
            <article className="space-y-1">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-text-light">
                {t("location")}
              </p>
              <p className="font-serif text-xl text-primary">{p.location}</p>
            </article>
            <article className="space-y-1">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-text-light">
                {t("floor")}
              </p>
              <p className="font-serif text-xl text-primary">{p.floor ?? "Available on request"}</p>
            </article>
            <article className="space-y-1">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-text-light">
                {t("portfolio")}
              </p>
              <p className="font-serif text-xl capitalize text-primary">{p.collection}</p>
            </article>
            {p.yearBuilt ? (
              <article className="space-y-1">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-text-light">
                  {t("yearBuilt")}
                </p>
                <p className="font-serif text-xl text-primary">{p.yearBuilt}</p>
              </article>
            ) : null}
          </div>

          <div id="gallery" className="mb-6 flex scroll-mt-32 items-end justify-between gap-4">
            <h2 className="font-serif text-2xl font-medium leading-[1.12] tracking-[-0.01em] text-primary sm:text-3xl">
              {t("visualShowcase")}
            </h2>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-text-light">
              Interior showcase
            </p>
          </div>
          <PropertyGallery images={p.gallery} title={p.title} />
        </Container>
      </section>

      <section id="details" className="scroll-mt-32 border-t border-border bg-background-alt py-14 lg:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div className="border border-border bg-background p-6 sm:p-8">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
                {t("address")}
              </p>
              <h2 className="mt-4 font-sans text-3xl font-medium leading-[1.08] tracking-tight text-primary sm:text-4xl">
                {p.title}
              </h2>
              <div className="mt-8 space-y-5">
                {p.addressLine ? (
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-text-light">
                      {t("addressLine")}
                    </p>
                    <p className="mt-2 text-base text-primary">{p.addressLine}</p>
                  </div>
                ) : null}
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-text-light">
                    {t("location")}
                  </p>
                  <p className="mt-2 text-base text-primary">{p.location}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-text-light">
                    {t("city")}
                  </p>
                  <p className="mt-2 text-base text-primary">{p.city ?? "Nairobi"}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-text-light">
                    {t("country")}
                  </p>
                  <p className="mt-2 text-base text-primary">{p.country ?? "Kenya"}</p>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex min-h-11 items-center rounded-full border border-primary/70 px-6 py-3 text-sm font-semibold tracking-[0.08em] text-primary transition-colors hover:border-accent hover:bg-accent hover:text-white"
              >
                {t("openMaps")}
              </a>
            </div>

            <div className="border border-border bg-background p-6 sm:p-8">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
                {t("listingDetails")}
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <article className="border-b border-border pb-4">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-text-light">
                    {t("propertyType")}
                  </p>
                  <p className="mt-2 text-base font-semibold text-primary">{p.propertyType}</p>
                </article>
                <article className="border-b border-border pb-4">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-text-light">
                    {t("bedrooms")}
                  </p>
                  <p className="mt-2 text-base font-semibold text-primary">
                    {p.bedrooms > 0 ? p.bedrooms : "Studio"}
                  </p>
                </article>
                <article className="border-b border-border pb-4">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-text-light">
                    {t("bathrooms")}
                  </p>
                  <p className="mt-2 text-base font-semibold text-primary">{p.bathrooms}</p>
                </article>
                <article className="border-b border-border pb-4">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-text-light">
                    {t("area")}
                  </p>
                  <p className="mt-2 text-base font-semibold text-primary">{p.areaSqft.toLocaleString()} sqft</p>
                </article>
                {p.lotSizeSqft ? (
                  <article className="border-b border-border pb-4">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-text-light">
                      {t("lotSize")}
                    </p>
                    <p className="mt-2 text-base font-semibold text-primary">{p.lotSizeSqft.toLocaleString()} sqft</p>
                  </article>
                ) : null}
                {p.garages ? (
                  <article className="border-b border-border pb-4">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-text-light">
                      {t("garages")}
                    </p>
                    <p className="mt-2 text-base font-semibold text-primary">{p.garages}</p>
                  </article>
                ) : null}
                {p.availableFrom ? (
                  <article className="border-b border-border pb-4">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-text-light">
                      {t("availableFrom")}
                    </p>
                    <p className="mt-2 text-base font-semibold text-primary">{p.availableFrom}</p>
                  </article>
                ) : null}
                {p.structureType ? (
                  <article className="border-b border-border pb-4">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-text-light">
                      {t("structureType")}
                    </p>
                    <p className="mt-2 text-base font-semibold text-primary">{p.structureType}</p>
                  </article>
                ) : null}
                {p.exteriorMaterial ? (
                  <article className="border-b border-border pb-4">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-text-light">
                      {t("exteriorMaterial")}
                    </p>
                    <p className="mt-2 text-base font-semibold text-primary">{p.exteriorMaterial}</p>
                  </article>
                ) : null}
                {p.extraDetails ? (
                  <article className="pb-1 sm:col-span-2">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-text-light">
                      {t("extraDetails")}
                    </p>
                    <p className="mt-2 text-base font-semibold text-primary">{p.extraDetails}</p>
                  </article>
                ) : null}
                <article className="pb-1">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-text-light">
                    {t("unitPrice")}
                  </p>
                  <p className="mt-2 text-base font-semibold text-primary">From {priceLabel}</p>
                </article>
                <article className="pb-1">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-text-light">
                    {t("portfolio")}
                  </p>
                  <p className="mt-2 text-base font-semibold capitalize text-primary">{p.collection}</p>
                </article>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {p.heroVideoUrl ? (
        <section id="video" className="scroll-mt-32 border-t border-border bg-background py-14 lg:py-20">
          <Container>
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="font-serif text-2xl font-medium leading-[1.12] tracking-[-0.01em] text-primary sm:text-3xl">
                {t("videoWalkthrough")}
              </h2>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-text-light">
                {t("videoCaption")}
              </p>
            </div>
            <div className="relative overflow-hidden border border-border bg-primary">
              <video
                className="aspect-[16/9] w-full object-cover"
                poster={p.gallery[0]}
                controls
                muted
                playsInline
                preload="metadata"
              >
                <source src={p.heroVideoUrl} type="video/mp4" />
              </video>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="bg-background py-16 lg:py-24">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_360px]">
            <div className="space-y-16">
              <div id="description" className="scroll-mt-32 prose prose-lg max-w-none">
                <h2 className="font-sans text-3xl font-medium tracking-tight text-primary">{t("description")}</h2>
                <div className="premium-hairline-accent mt-4 h-px w-24" />
                <p className="story-editorial mt-8 whitespace-pre-line">{p.description}</p>
              </div>

              <div id="features" className="scroll-mt-32">
                <h2 className="font-serif text-2xl font-medium text-primary">{t("conveniences")}</h2>
                {amenityHighlights.length > 0 ? (
                  <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {amenityHighlights.map((a) => (
                      <article key={a} className="border border-border bg-background p-5">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-accent">
                          {t("amenityHighlight")}
                        </p>
                        <h3 className="mt-4 font-serif text-xl text-primary">{a}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-text-light">
                          {t("amenitySupport")}
                        </p>
                      </article>
                    ))}
                  </div>
                ) : null}
                <div className="mt-10 grid gap-6 lg:grid-cols-2">
                  {amenityGroups.map((group) => (
                    <article key={group.category} className="border border-border bg-background-alt p-6">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-accent">
                        {group.category}
                      </p>
                      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-center gap-3 text-sm text-text">
                            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>

              <div id="map" className="scroll-mt-32">
                <div className="mb-6 flex items-end justify-between gap-4">
                  <h2 className="font-serif text-2xl font-medium text-primary">{t("mapTitle")}</h2>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-text-light">
                    {t("mapCaption")}
                  </p>
                </div>
                <MapEmbed
                  src={mapSrc}
                  title={`${p.title} map`}
                  withinContainer={false}
                  className="border-border bg-background"
                />
              </div>

              <div id="viewing" className="scroll-mt-32">
                <div className="grid gap-6 border border-border bg-background-alt p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr]">
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-accent">
                      {t("scheduleViewing")}
                    </p>
                    <h2 className="mt-4 font-sans text-3xl font-medium leading-[1.08] tracking-tight text-primary">
                      {t("scheduleViewingTitle")}
                    </h2>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-light sm:text-base">
                      {t("scheduleViewingBody")}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      {["10:00", "10:30", "11:00", "11:30", "12:00", "14:00"].map((time) => (
                        <span
                          key={time}
                          className="inline-flex min-h-11 items-center rounded-full border border-border bg-background px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary/70"
                        >
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col justify-between gap-5 border border-border bg-background p-5">
                    <div className="space-y-4">
                      <div>
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-text-light">
                          {t("viewingMode")}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-3">
                          <span className="inline-flex min-h-11 items-center rounded-full border border-primary/20 bg-primary px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                            {t("inPerson")}
                          </span>
                          <span className="inline-flex min-h-11 items-center rounded-full border border-border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary/80">
                            {t("videoCall")}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-text-light">
                        {t("scheduleViewingAssist")}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/contact"
                        className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold tracking-[0.08em] text-white transition-colors hover:bg-accent"
                      >
                        {t("bookViewing")}
                      </Link>
                      <a
                        href={`https://wa.me/254700000000?text=${encodeURIComponent(`Hello Dirrir Realtor, I would like to schedule a viewing for ${p.title}.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-11 items-center rounded-full border border-primary/70 px-6 py-3 text-sm font-semibold tracking-[0.08em] text-primary transition-colors hover:border-accent hover:bg-accent hover:text-white"
                      >
                        {t("shortlistWhatsApp")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div id="floor-plans" className="scroll-mt-32">
                <div className="flex items-end justify-between gap-4">
                  <h2 className="font-serif text-2xl font-medium text-primary">{t("floorPlans")}</h2>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-text-light">
                    {t("floorPlanCaption")}
                  </p>
                </div>
                {floorPlanUnits ? (
                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {floorPlanUnits.map((unit) => (
                      <article key={unit.label} className="border border-border bg-background-alt p-5">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-text-light">
                          {t("unitType")}
                        </p>
                        <p className="mt-3 font-serif text-xl text-primary">{unit.label}</p>
                        <p className="mt-4 text-sm font-semibold text-primary">
                          {unit.sizeSqm.toLocaleString()} sqm ({unit.sizeSqft.toLocaleString()} sqft)
                        </p>
                        <p className="mt-2 text-sm text-text-light">{unit.price}</p>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <article className="border border-border bg-background-alt p-5">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-text-light">
                        {t("unitType")}
                      </p>
                      <p className="mt-3 text-sm font-semibold text-primary">
                        {p.bedrooms > 0 ? `${p.bedrooms} Bedroom` : "Studio"} {p.propertyType}
                      </p>
                    </article>
                    <article className="border border-border bg-background-alt p-5">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-text-light">
                        {t("unitSize")}
                      </p>
                      <p className="mt-3 text-sm font-semibold text-primary">
                        {sizeSqm.toLocaleString()} sqm ({p.areaSqft.toLocaleString()} sqft)
                      </p>
                    </article>
                    <article className="border border-border bg-background-alt p-5">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-text-light">
                        {t("floor")}
                      </p>
                      <p className="mt-3 text-sm font-semibold text-primary">{p.floor ?? t("availableOnRequest")}</p>
                    </article>
                  </div>
                )}
                <div className="mt-8 space-y-8">
                  <article className="overflow-hidden border border-border bg-background">
                    <div className="grid gap-4 bg-background-alt px-5 py-4 text-sm font-semibold text-primary sm:grid-cols-[1.3fr_repeat(4,minmax(0,1fr))] sm:items-center sm:px-6">
                      <p className="font-serif text-2xl leading-none text-primary">
                        {isSecondParklands ? "2 Bedroom + DSQ" : t("floorPlanA")}
                      </p>
                      <p>{t("priceLabelShort")}: {isSecondParklands ? "From USD 75,000" : priceLabel}</p>
                      <p>{t("bathsLabel")}: {isSecondParklands ? 2 : p.bathrooms}</p>
                      <p>{t("roomsLabel")}: {isSecondParklands ? 2 : Math.max(p.bedrooms, 2)}</p>
                      <p>{t("sizeLabel")}: {isSecondParklands ? "1,399 ft2" : `${p.areaSqft.toLocaleString()} ft2`}</p>
                    </div>
                    <div className="bg-white px-5 py-8 sm:px-6 sm:py-10">
                      <div className="mx-auto max-w-4xl">
                        <div className="relative mx-auto aspect-[700/506] w-full max-w-3xl">
                          <Image
                            src={FLOOR_PLAN_A_SRC}
                            alt={t("floorPlanA")}
                            fill
                            className="object-contain"
                            sizes="(max-width: 1024px) 100vw, 900px"
                          />
                        </div>
                      </div>
                      <p className="mt-8 text-base leading-relaxed text-text-light sm:text-lg">
                        {isSecondParklands
                          ? "Representative 2 bedroom + DSQ layout within the Second Parklands development, planned for efficient circulation, practical living zones, and day-to-day family comfort."
                          : t("floorPlanABody")}
                      </p>
                    </div>
                  </article>

                  <article className="overflow-hidden border border-border bg-background">
                    <div className="grid gap-4 bg-background-alt px-5 py-4 text-sm font-semibold text-primary sm:grid-cols-[1.3fr_repeat(4,minmax(0,1fr))] sm:items-center sm:px-6">
                      <p className="font-serif text-2xl leading-none text-primary">
                        {isSecondParklands ? "3 Bedroom + DSQ" : t("floorPlanB")}
                      </p>
                      <p>{t("priceLabelShort")}: {isSecondParklands ? "From USD 100,000" : priceLabel}</p>
                      <p>{t("bathsLabel")}: {isSecondParklands ? 3 : Math.max(p.bathrooms - 1, 1)}</p>
                      <p>{t("roomsLabel")}: {isSecondParklands ? 3 : Math.max(p.bedrooms + 1, 3)}</p>
                      <p>{t("sizeLabel")}: {isSecondParklands ? "1,938 ft2" : `${Math.round(p.areaSqft * 0.22).toLocaleString()} ft2`}</p>
                    </div>
                    <div className="bg-white px-5 py-8 sm:px-6 sm:py-10">
                      <div className="mx-auto max-w-4xl">
                        <div className="relative mx-auto aspect-[700/506] w-full max-w-3xl">
                          <Image
                            src={FLOOR_PLAN_B_SRC}
                            alt={t("floorPlanB")}
                            fill
                            className="object-contain"
                            sizes="(max-width: 1024px) 100vw, 900px"
                          />
                        </div>
                      </div>
                      <p className="mt-8 text-base leading-relaxed text-text-light sm:text-lg">
                        {isSecondParklands
                          ? "Representative 3 bedroom + DSQ layout for buyers seeking a larger footprint, stronger hosting capacity, and a more expansive family-oriented arrangement."
                          : t("floorPlanBBody")}
                      </p>
                    </div>
                  </article>
                </div>
              </div>

            </div>

            <aside className="relative">
              <div className="sticky top-32 space-y-8">
                <div className="glass-panel rounded-none border border-border bg-background-alt p-8 shadow-xl">
                  <h3 className="font-serif text-xl font-medium leading-tight tracking-[-0.01em] text-primary">
                    {t("enquire")}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-text-light">
                    Speak with our team about this exclusive listing in {p.location}.
                  </p>
                  <div className="mt-8">
                    <PropertyEnquiryCta propertyTitle={p.title} />
                  </div>
                  <div className="mt-6 space-y-4 border-t border-border pt-6">
                    <a
                      href={`https://wa.me/254700000000?text=Hello%20Dirrir%20Realtor%2C%20I%20am%20interested%20in%20${encodeURIComponent(p.title)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-[11px] font-bold uppercase tracking-luxury-widest text-white transition-all hover:bg-accent"
                    >
                      {t("whatsAppNow")}
                    </a>
                    <Link
                      href="/contact"
                      className="flex w-full items-center justify-center rounded-full border border-border px-5 py-3 text-[10px] font-bold uppercase tracking-luxury-widest text-text-light transition-colors hover:border-accent hover:bg-accent hover:text-white"
                    >
                      {t("fullConsultation")}
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
      <div id="similar" className="scroll-mt-32">
        <SimilarProperties similar={similar} />
      </div>
    </>
  );
}
