export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Dirrir Realtor Limited",
    description:
      "Premium homes and apartments for sale and rent in Nairobi — Parklands, Kilimani, Westlands, and beyond.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dirrirrealtor.co.ke",
    telephone: "[Primary phone]",
    email: "info@dirrirrealtor.co.ke",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Rabat Properties Limited",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function RealEstateListingJsonLd({
  title,
  description,
  price,
  currency,
  url,
  image,
}: {
  title: string;
  description: string;
  price: number;
  currency: string;
  url: string;
  image: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: title,
    description,
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: currency,
    },
    url,
    image,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const siteBase = () => process.env.NEXT_PUBLIC_SITE_URL ?? "https://dirrirrealtor.co.ke";

/** Portfolio / developments page: WebPage + ItemList of listing URLs for rich results. */
export function DevelopmentsPortfolioJsonLd({
  pagePath,
  listingPaths,
}: {
  pagePath: string;
  listingPaths: string[];
}) {
  const base = siteBase().replace(/\/$/, "");
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
