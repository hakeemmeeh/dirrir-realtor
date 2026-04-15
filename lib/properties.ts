import { cache } from "react";
import { allPropertiesQuery } from "@/lib/queries";
import { mapSanityProperties } from "@/lib/sanity-property-map";
import { getSanityClient, sanityConfigured } from "@/lib/sanity";

export type PropertyStatus = "For Sale" | "For Rent";
export type PropertyType = "Apartment" | "House" | "Townhouse" | "Land";
export type PropertyLocation =
  | "Parklands"
  | "Kilimani"
  | "Westlands"
  | "Lavington"
  | "Riverside"
  | "Other";

/** Hass-style portfolio split: homes to live in vs yield & capital growth. */
export type PropertyCollection = "living" | "investment";

export type Property = {
  slug: string;
  title: string;
  propertyType: PropertyType;
  status: PropertyStatus;
  price: number;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  floor?: string;
  location: PropertyLocation;
  /** Editorial tagline on overlay cards (e.g. neighbourhood hook). */
  tagline?: string;
  collection: PropertyCollection;
  description: string;
  amenities: string[];
  gallery: string[];
  featured: boolean;
  /** Optional full-bleed hero video (MP4/WebM). Replace with your own tours or AI-generated walkthroughs. */
  heroVideoUrl?: string;
};

const u = (id: string, w = 1600, h = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

const INTERIOR_FALLBACK_IMAGES = [
  "/images/intro-detail.png",
  "/images/story-1.png",
  "/images/story-2.png",
  "/images/story-3.png",
] as const;

const withInteriorFallbacks = (images: string[]) => {
  const merged = [...images];
  for (const src of INTERIOR_FALLBACK_IMAGES) {
    if (!merged.includes(src)) merged.push(src);
  }
  return merged;
};

/** Local fallback when Sanity is unset or returns no documents. */
export const FALLBACK_PROPERTIES: Property[] = [
  {
    slug: "3-bed-second-avenue-parklands",
    title: "Dirrir Square Residences",
    propertyType: "Apartment",
    status: "For Sale",
    price: 18500000,
    bedrooms: 3,
    bathrooms: 2,
    areaSqft: 1450,
    floor: "4th",
    location: "Parklands",
    tagline: "Parklands · Signature family residences",
    collection: "living",
    featured: true,
    description:
      "Bright corner unit with wraparound balconies, modern open kitchen, and uninterrupted city views. Located on Second Avenue with secure basement parking, backup generator, and 24-hour concierge. Ideal for families seeking schools and hospitals nearby.",
    amenities: [
      "Backup generator",
      "Basement parking",
      "Concierge",
      "Borehole",
      "Gym",
      "Children's play area",
    ],
    gallery: withInteriorFallbacks([
      "/images/hero-1.png",
      u("photo-1600585154340-be6161a56a0c"),
      u("photo-1600607687939-ce8a6c25118c"),
      u("photo-1600566753376-12c8ab7fb75b"),
      u("photo-1600607687920-4e2a09cf159d"),
      u("photo-1600607688969-a5bfcd646154"),
    ]),
    heroVideoUrl:
      "https://videos.pexels.com/video-files/7578542/7578542-sd_640_360_25fps.mp4",
  },
  {
    slug: "2-bed-kilimani-yaya-corridor",
    title: "Dirrir Residence Kilimani",
    propertyType: "Apartment",
    status: "For Rent",
    price: 95000,
    bedrooms: 2,
    bathrooms: 2,
    areaSqft: 1100,
    floor: "6th",
    location: "Kilimani",
    tagline: "Kilimani · Urban living collection",
    collection: "living",
    featured: true,
    description:
      "Fully furnished executive apartment steps from Yaya Centre. Floor-to-ceiling windows, high-speed fibre, and a rooftop pool. Perfect for young professionals and expatriates.",
    amenities: ["Furnished", "Rooftop pool", "Fibre ready", "DSTV ready", "Ample parking"],
    gallery: withInteriorFallbacks([
      "/images/hero-2.png",
      u("photo-1600210492486-724fe5c67fb0"),
      u("photo-1600566752734-6c5250b0f55a"),
      u("photo-1600566753052-3f7ea31d52d0"),
      u("photo-1600210491369-e753d80a41f3"),
    ]),
    heroVideoUrl:
      "https://videos.pexels.com/video-files/2796070/2796070-sd_640_360_25fps.mp4",
  },
  {
    slug: "4-bed-lavington-mansionette",
    title: "Dirrir Gardens Lavington",
    propertyType: "Townhouse",
    status: "For Sale",
    price: 42000000,
    bedrooms: 4,
    bathrooms: 4,
    areaSqft: 3200,
    floor: "GF + 1",
    location: "Lavington",
    tagline: "Lavington · Gated townhouse collection",
    collection: "living",
    featured: true,
    description:
      "Private gated compound with mature garden, staff quarters, and double-volume living room. Quiet leafy street with easy access to international schools and Valley Arcade.",
    amenities: ["Staff quarters", "Garden", "Solar water", "Electric fence", "Two carports"],
    gallery: withInteriorFallbacks([
      "/images/hero-3.png",
      u("photo-1600585154526-990dced4db0d"),
      u("photo-1600607687644-aac4c3eac7f4"),
      u("photo-1600607688969-a5bfcd646154"),
      u("photo-1600573472591-ee6b68d14c68"),
    ]),
  },
  {
    slug: "studio-westlands-sarit",
    title: "Dirrir Heights Westlands",
    propertyType: "Apartment",
    status: "For Rent",
    price: 55000,
    bedrooms: 0,
    bathrooms: 1,
    areaSqft: 520,
    floor: "9th",
    location: "Westlands",
    tagline: "Westlands · Investor-ready studios",
    collection: "investment",
    featured: false,
    description:
      "Compact studio with quality finishes, ideal for consultants and short stays. Walking distance to Sarit Centre and expressway access.",
    amenities: ["Gym", "Rooftop lounge", "High security", "Water storage"],
    gallery: withInteriorFallbacks([
      u("photo-1600607687644-c7171b42498f"),
      u("photo-1600566753190-17f0baa2a6c3"),
      u("photo-1600566753376-12c8ab7fb75b"),
      u("photo-1600210492486-724fe5c67fb0"),
    ]),
  },
  {
    slug: "5-bed-riverside-garden",
    title: "Dirrir Riverside Villas",
    propertyType: "House",
    status: "For Sale",
    price: 89000000,
    bedrooms: 5,
    bathrooms: 5,
    areaSqft: 5500,
    location: "Riverside",
    tagline: "Riverside · Luxury villa collection",
    collection: "living",
    featured: true,
    description:
      "Ambassadorial residence with guest cottage, heated pool, and chef's kitchen. Mature trees, full backup power, and smart-home lighting.",
    amenities: ["Guest cottage", "Pool", "Smart home", "Full backup", "Staff block"],
    gallery: withInteriorFallbacks([
      u("photo-1613490493576-7fde63acd811"),
      u("photo-1600585154084-4e5fe7c39198"),
      u("photo-1600607687920-4e2a09cf159d"),
      u("photo-1600607688969-a5bfcd646154"),
      u("photo-1600566753086-00f18fb6b3ea"),
    ]),
  },
  {
    slug: "3-bed-parklands-family",
    title: "Dirrir Parklands Court",
    propertyType: "Apartment",
    status: "For Sale",
    price: 14200000,
    bedrooms: 3,
    bathrooms: 2,
    areaSqft: 1280,
    floor: "2nd",
    location: "Parklands",
    tagline: "Parklands · Family-centric apartments",
    collection: "living",
    featured: false,
    description:
      "Family-friendly layout with separate dining, utility area, and two parking slots. Close to Aga Khan institutions and Karura Forest trails.",
    amenities: ["Two parking", "Utility area", "Intercom", "CCTV"],
    gallery: withInteriorFallbacks([
      u("photo-1600573472592-401b489a3cdc"),
      u("photo-1600566752355-35792bedcfea"),
      u("photo-1600607687939-ce8a6c25118c"),
      u("photo-1600566753052-3f7ea31d52d0"),
    ]),
  },
  {
    slug: "land-kilimani-quarter-acre",
    title: "Dirrir Kilimani Quarter Acre",
    propertyType: "Land",
    status: "For Sale",
    price: 65000000,
    bedrooms: 0,
    bathrooms: 0,
    areaSqft: 10890,
    location: "Kilimani",
    tagline: "Kilimani · Prime development parcel",
    collection: "investment",
    featured: false,
    description:
      "Red-soil corner plot with approved building plans available. Excellent for boutique apartments or a private residence with room for a pool.",
    amenities: ["Corner plot", "Red soil", "Plans available"],
    gallery: withInteriorFallbacks([u("photo-1500382017468-9049fed747ef")]),
  },
  {
    slug: "2-bed-lavington-penthouse",
    title: "Dirrir Skyline Penthouse",
    propertyType: "Apartment",
    status: "For Rent",
    price: 220000,
    bedrooms: 2,
    bathrooms: 2,
    areaSqft: 1800,
    floor: "Penthouse",
    location: "Lavington",
    tagline: "Lavington · Duplex sky residence",
    collection: "investment",
    featured: true,
    description:
      "Duplex penthouse with private terrace, outdoor kitchen, and panoramic Ngong Hills views. Designer interiors and imported fittings.",
    amenities: ["Private terrace", "Outdoor kitchen", "Jacuzzi", "Two covered parking"],
    gallery: withInteriorFallbacks([
      "/images/penthouse-lavington.png",
      u("photo-1600566752355-35792bedcfea"),
      u("photo-1600566752227-8f3b5f97f31a"),
      u("photo-1600607687644-aac4c3eac7f4"),
      u("photo-1600566753086-00f18fb6b3ea"),
    ]),
    heroVideoUrl:
      "https://videos.pexels.com/video-files/3044073/3044073-sd_640_360_25fps.mp4",
  },
];

export type PropertyFilters = {
  location?: string;
  propertyType?: string;
  status?: string;
  bedrooms?: string;
  maxPrice?: string;
  collection?: string;
};

export function filterProperties(
  list: Property[],
  f: PropertyFilters,
): Property[] {
  return list.filter((p) => {
    if (f.location && f.location !== "all") {
      const want = f.location.replace(/-/g, " ");
      if (p.location.toLowerCase() !== want.toLowerCase()) return false;
    }
    if (f.propertyType && f.propertyType !== "all") {
      if (p.propertyType.toLowerCase() !== f.propertyType.toLowerCase())
        return false;
    }
    if (f.status && f.status !== "all") {
      const st = f.status === "sale" ? "For Sale" : f.status === "rent" ? "For Rent" : f.status;
      if (p.status !== st) return false;
    }
    if (f.bedrooms && f.bedrooms !== "all") {
      if (f.bedrooms === "studio") {
        if (p.bedrooms !== 0) return false;
      } else if (f.bedrooms === "4+") {
        if (p.bedrooms < 4) return false;
      } else {
        const n = parseInt(f.bedrooms, 10);
        if (!Number.isNaN(n) && p.bedrooms !== n) return false;
      }
    }
    if (f.maxPrice) {
      const max = parseInt(f.maxPrice, 10);
      if (!Number.isNaN(max) && p.price > max) return false;
    }
    if (f.collection && f.collection !== "all") {
      if (p.collection !== f.collection) return false;
    }
    return true;
  });
}

/** Cached listing source: Sanity when configured, otherwise `FALLBACK_PROPERTIES`. */
export const getAllProperties = cache(async (): Promise<Property[]> => {
  const client = getSanityClient();
  if (!sanityConfigured || !client) return FALLBACK_PROPERTIES;
  try {
    const docs = await client.fetch<Record<string, unknown>[]>(allPropertiesQuery);
    const mapped = mapSanityProperties(docs);
    return mapped.length > 0 ? mapped : FALLBACK_PROPERTIES;
  } catch (e) {
    console.error("[sanity] getAllProperties failed", e);
    return FALLBACK_PROPERTIES;
  }
});

export function getFeaturedFrom(list: Property[]): Property[] {
  return list.filter((p) => p.featured);
}

/** Homepage hero: interleave Living & Investment featured listings (Hass-style mixed portfolio). */
export function getHomeHeroSlidesFrom(list: Property[], max = 6): Property[] {
  const featured = getFeaturedFrom(list);
  const pool = featured.length > 0 ? featured : list;
  if (pool.length === 0) return [];
  const living = [...pool.filter((p) => p.collection === "living")];
  const investment = [...pool.filter((p) => p.collection === "investment")];
  const out: Property[] = [];
  let takeLiving = true;
  while (out.length < max && (living.length || investment.length)) {
    if (takeLiving && living.length) out.push(living.shift()!);
    else if (!takeLiving && investment.length) out.push(investment.shift()!);
    else if (living.length) out.push(living.shift()!);
    else if (investment.length) out.push(investment.shift()!);
    takeLiving = !takeLiving;
  }
  if (out.length < max) {
    const used = new Set(out.map((p) => p.slug));
    for (const p of list) {
      if (used.has(p.slug)) continue;
      out.push(p);
      if (out.length >= max) break;
    }
  }
  return out;
}

export function getPropertiesByCollectionFrom(
  list: Property[],
  c: PropertyCollection,
): Property[] {
  return list.filter((p) => p.collection === c);
}

export function getPropertyBySlugFrom(
  list: Property[],
  slug: string,
): Property | undefined {
  return list.find((p) => p.slug === slug);
}

export function getSimilarPropertiesFrom(
  current: Property,
  list: Property[],
  limit = 3,
): Property[] {
  return list
    .filter((p) => p.slug !== current.slug && p.location === current.location)
    .slice(0, limit);
}
