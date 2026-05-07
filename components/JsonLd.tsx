import { jsonLdContent } from "@/lib/json-ld";
import { CONTACT_PHONES_E164, formatKeDisplay } from "@/lib/contact-details";

const siteBase = () =>
  (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dirirrealtors.com").replace(/\/$/, "");

// ─── LocalBusiness + WebSite ────────────────────────────────────────────────

export function LocalBusinessJsonLd() {
  const base = siteBase();

  const sameAs = [
    process.env.NEXT_PUBLIC_FACEBOOK_URL,
    process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    process.env.NEXT_PUBLIC_TIKTOK_URL,
  ].filter((u): u is string => typeof u === "string" && u.length > 0);

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": `${base}/#realEstateAgent`,
        name: "Dirrir Realtor Limited",
        alternateName: ["Dirrir Realtor", "DRL"],
        description:
          "Premium homes and apartments for sale and rent in Nairobi — Parklands, Kilimani, Westlands, Lavington, and beyond. Part of Rabat Properties Limited.",
        url: base,
        telephone: CONTACT_PHONES_E164.map(formatKeDisplay).join(", "),
        email: "info@dirirrealtors.com",
        logo: {
          "@type": "ImageObject",
          url: `${base}/images/logo.png`,
        },
        image: `${base}/images/hero-fallback.png`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Nairobi",
          addressRegion: "Nairobi County",
          addressCountry: "KE",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -1.286389,
          longitude: 36.817223,
        },
        areaServed: [
          { "@type": "City", name: "Nairobi", containedInPlace: { "@type": "Country", name: "Kenya" } },
          { "@type": "Neighborhood", name: "Parklands" },
          { "@type": "Neighborhood", name: "Kilimani" },
          { "@type": "Neighborhood", name: "Westlands" },
          { "@type": "Neighborhood", name: "Lavington" },
          { "@type": "Neighborhood", name: "Riverside" },
        ],
        parentOrganization: {
          "@type": "Organization",
          name: "Rabat Properties Limited",
        },
        knowsAbout: [
          "Property sales in Nairobi",
          "Residential rentals Nairobi",
          "Diaspora property investment Kenya",
          "Property management Nairobi",
          "Real estate advisory Kenya",
        ],
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: "Dirrir Realtor Limited",
        description:
          "Verified Nairobi property listings for sale and rent — residential and investment real estate with transparent advisory.",
        publisher: { "@id": `${base}/#realEstateAgent` },
        inLanguage: "en-KE",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${base}/properties?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdContent(data) }}
    />
  );
}

// ─── RealEstateListing ───────────────────────────────────────────────────────

export function RealEstateListingJsonLd({
  title,
  description,
  price,
  currency,
  url,
  image,
  images,
  addressLocality,
  streetAddress,
  listingStatus,
  bedrooms,
  bathrooms,
  floorSizeSqm,
  propertyType,
}: {
  title: string;
  description: string;
  price: number;
  currency: string;
  url: string;
  image: string;
  images?: string[];
  addressLocality?: string;
  streetAddress?: string;
  listingStatus?: string;
  bedrooms?: number;
  bathrooms?: number;
  floorSizeSqm?: number;
  propertyType?: string;
}) {
  const base = siteBase();
  const toAbs = (u: string) =>
    u.startsWith("http") ? u : `${base}${u.startsWith("/") ? "" : "/"}${u}`;
  const imageList = (images?.length ? images : [image]).filter(Boolean).map(toAbs);
  const availability =
    listingStatus === "For Rent"
      ? "https://schema.org/ForRent"
      : "https://schema.org/ForSale";

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: title,
    description,
    url,
    image: imageList,
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: currency,
      availability,
      url,
      seller: { "@id": `${base}/#realEstateAgent` },
    },
    address: {
      "@type": "PostalAddress",
      ...(streetAddress ? { streetAddress } : {}),
      addressLocality: addressLocality ?? "Nairobi",
      addressCountry: "KE",
    },
  };

  if (bedrooms !== undefined && bedrooms > 0) data.numberOfBedrooms = bedrooms;
  if (bathrooms !== undefined) data.numberOfBathroomsTotal = bathrooms;
  if (floorSizeSqm !== undefined && floorSizeSqm > 0) {
    data.floorSize = {
      "@type": "QuantitativeValue",
      value: Math.round(floorSizeSqm * 100) / 100,
      unitCode: "MTK",
    };
  }
  if (propertyType) {
    const typeMap: Record<string, string> = {
      Apartment: "https://schema.org/Apartment",
      House: "https://schema.org/House",
      Townhouse: "https://schema.org/Residence",
      Land: "https://schema.org/LandForm",
    };
    data.accommodationCategory = typeMap[propertyType] ?? propertyType;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdContent(data) }}
    />
  );
}

// ─── BreadcrumbList ──────────────────────────────────────────────────────────

export function BreadcrumbListJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdContent(data) }}
    />
  );
}

// ─── FAQPage ─────────────────────────────────────────────────────────────────

export function FAQPageJsonLd({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdContent(data) }}
    />
  );
}

// ─── Developments portfolio ──────────────────────────────────────────────────

export function DevelopmentsPortfolioJsonLd({
  pagePath,
  listingPaths,
}: {
  pagePath: string;
  listingPaths: string[];
}) {
  const base = siteBase();
  const pageUrl = `${base}${pagePath}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Developments & Portfolio | Dirrir Realtor Limited",
        description:
          "Living and Investment property collections in Nairobi — homes and apartments for sale and rent.",
        isPartOf: { "@type": "WebSite", url: base, name: "Dirrir Realtor Limited" },
      },
      {
        "@type": "ItemList",
        name: "Dirrir Realtor property portfolio",
        numberOfItems: listingPaths.length,
        itemListElement: listingPaths.map((path, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${base}${path}`,
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdContent(data) }}
    />
  );
}
