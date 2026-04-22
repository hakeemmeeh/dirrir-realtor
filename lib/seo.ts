import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dirrirrealtor.co.ke";

export const SITE_NAME = "Dirrir Realtor Limited";
export const SITE_TAGLINE = "Your Real Estate Professional";
export const DEFAULT_OG_IMAGE = "/images/hero-fallback.png";

type BuildMetaArgs = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
};

/**
 * Build a consistent page Metadata object with OG + Twitter + canonical.
 * Keep inputs short so page files stay readable.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  keywords,
}: BuildMetaArgs): Metadata {
  const url = `${SITE_URL.replace(/\/$/, "")}${path}`;
  const absoluteImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_KE",
      siteName: SITE_NAME,
      url,
      title,
      description,
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export const BASE_KEYWORDS = [
  "Nairobi real estate",
  "Kenya property",
  "Parklands apartments",
  "Kilimani apartments",
  "Westlands homes",
  "Lavington houses",
  "Dirrir Realtor",
  "Rabat Properties",
  "diaspora property investment Kenya",
  "homes for sale Nairobi",
  "apartments for rent Nairobi",
];
