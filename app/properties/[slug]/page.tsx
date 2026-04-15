import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { RealEstateListingJsonLd } from "@/components/JsonLd";
import { PropertyEnquiryCta } from "@/components/properties/PropertyEnquiryCta";
import { PropertyGallery } from "@/components/properties/PropertyGallery";
import { SimilarProperties } from "@/components/properties/SimilarProperties";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { formatUsd } from "@/lib/utils";
import Link from "next/link";
import {
  getAllProperties,
  getPropertyBySlugFrom,
  getSimilarPropertiesFrom,
} from "@/lib/properties";

type Props = { params: { slug: string } };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dirrirrealtor.co.ke";

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
  const brochureHref =
    typeof process.env.NEXT_PUBLIC_BROCHURE_URL === "string" &&
    process.env.NEXT_PUBLIC_BROCHURE_URL.length > 0
      ? process.env.NEXT_PUBLIC_BROCHURE_URL
      : "/brochures/dirrir-portfolio.pdf";

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
        <Image
          src={p.gallery[0] ?? "/images/logo.svg"}
          alt={p.title}
          fill
          className="object-cover"
          priority
        />
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
            <h1 className="mt-6 font-serif text-4xl font-medium leading-[1.04] tracking-[-0.01em] text-white sm:text-5xl lg:text-7xl">
              {p.title}
            </h1>
            <div className="mt-8 flex items-center gap-8">
              <p className="text-2xl font-medium text-accent sm:text-3xl">{priceLabel}</p>
              <div className="h-px flex-1 bg-white/20" />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-background py-10 lg:py-14">
        <Container>
          <div className="mb-10 grid gap-6 border border-border bg-background-alt p-6 sm:p-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
                {t("projectOverview")}
              </p>
              <h2 className="mt-4 font-serif text-3xl font-medium leading-[1.08] tracking-[-0.01em] text-primary sm:text-4xl">
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
          <div className="mb-6 flex items-end justify-between gap-4">
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

      <section className="bg-background py-16 lg:py-24">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_360px]">
            <div className="space-y-16">
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                <div className="space-y-1">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-light">
                    Type
                  </p>
                  <p className="font-serif text-xl text-primary">{p.propertyType}</p>
                </div>
                {p.bedrooms > 0 && (
                  <div className="space-y-1">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-light">
                      Bedrooms
                    </p>
                    <p className="font-serif text-xl text-primary">{p.bedrooms}</p>
                  </div>
                )}
                <div className="space-y-1">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-light">
                    Bathrooms
                  </p>
                  <p className="font-serif text-xl text-primary">{p.bathrooms}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-light">
                    Area
                  </p>
                  <p className="font-serif text-xl text-primary">{p.areaSqft.toLocaleString()} sqft</p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-medium text-primary">{t("unitMix")}</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <article className="border border-border bg-background-alt p-4">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-text-light">
                      {t("unitType")}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-primary">
                      {p.bedrooms > 0 ? `${p.bedrooms} Bedroom` : "Studio"} {p.propertyType}
                    </p>
                  </article>
                  <article className="border border-border bg-background-alt p-4">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-text-light">
                      {t("unitSize")}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-primary">
                      {sizeSqm.toLocaleString()} sqm ({p.areaSqft.toLocaleString()} sqft)
                    </p>
                  </article>
                  <article className="border border-border bg-background-alt p-4">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-text-light">
                      {t("unitPrice")}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-primary">From {priceLabel}</p>
                  </article>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <h2 className="font-serif text-3xl font-medium text-primary">{t("description")}</h2>
                <div className="premium-hairline-accent mt-4 h-px w-24" />
                <p className="story-editorial mt-8 whitespace-pre-line">{p.description}</p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-medium text-primary">{t("conveniences")}</h2>
                <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {p.amenities.map((a) => (
                    <li key={a} className="flex items-center gap-3 text-sm text-text">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {a}
                    </li>
                  ))}
                </ul>
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
      <SimilarProperties similar={similar} />
    </>
  );
}
