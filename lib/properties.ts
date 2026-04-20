import { cache } from "react";
import { getPlaceholderHeroVideo } from "@/lib/property-hero-videos";
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
  propertyId?: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  lotSizeSqft?: number;
  floor?: string;
  location: PropertyLocation;
  addressLine?: string;
  city?: string;
  country?: string;
  yearBuilt?: number;
  garages?: number;
  garageSizeSqft?: number;
  availableFrom?: string;
  basement?: string;
  structureType?: string;
  exteriorMaterial?: string;
  extraDetails?: string;
  /** Editorial tagline on overlay cards (e.g. neighbourhood hook). */
  tagline?: string;
  collection: PropertyCollection;
  /** Signals launch-stage developments for dedicated showcase modules. */
  isNewDevelopment?: boolean;
  /** Launch ribbon copy such as "Now Selling" or "Near Completion". */
  launchLabel?: string;
  /** Lower number appears earlier in curated development rails. */
  portfolioPriority?: number;
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

export type AmenityCategory = "Interior Details" | "Outdoor Details" | "Utilities" | "Other Features";

const AMENITY_CATEGORY_RULES: Array<{ category: AmenityCategory; terms: string[] }> = [
  {
    category: "Interior Details",
    terms: [
      "kitchen",
      "furnished",
      "jacuzzi",
      "gym",
      "concierge",
      "intercom",
      "utility",
      "dstv",
      "fibre",
      "smart",
      "lounge",
    ],
  },
  {
    category: "Outdoor Details",
    terms: [
      "garden",
      "pool",
      "parking",
      "carport",
      "terrace",
      "play area",
      "rooftop",
      "guest cottage",
      "staff",
    ],
  },
  {
    category: "Utilities",
    terms: ["generator", "borehole", "solar", "water", "electric", "cctv", "security", "backup"],
  },
];

export function categorizeAmenities(
  amenities: string[],
): Array<{ category: AmenityCategory; items: string[] }> {
  const grouped: Record<AmenityCategory, string[]> = {
    "Interior Details": [],
    "Outdoor Details": [],
    Utilities: [],
    "Other Features": [],
  };

  for (const amenity of amenities) {
    const normalized = amenity.toLowerCase();
    const matched = AMENITY_CATEGORY_RULES.find(({ terms }) =>
      terms.some((term) => normalized.includes(term)),
    );
    grouped[matched?.category ?? "Other Features"].push(amenity);
  }

  return (Object.entries(grouped) as Array<[AmenityCategory, string[]]>)
    .filter(([, items]) => items.length > 0)
    .map(([category, items]) => ({ category, items }));
}

/** Local fallback when Sanity is unset or returns no documents. */
export const FALLBACK_PROPERTIES: Property[] = [
  {
    slug: "3-bed-second-avenue-parklands",
    title: "Dirrir Second Parklands",
    propertyType: "Apartment",
    status: "For Sale",
    propertyId: "DRL-001",
    price: 75000,
    bedrooms: 2,
    bathrooms: 2,
    areaSqft: 1399,
    lotSizeSqft: 2583,
    floor: "Floors 1-19",
    location: "Parklands",
    addressLine: "Second Parklands",
    city: "Nairobi",
    country: "Kenya",
    yearBuilt: 2026,
    garages: 1,
    garageSizeSqft: 180,
    availableFrom: "Near completion",
    basement: "Parking, services, and circulation core",
    structureType: "Reinforced concrete apartment block",
    exteriorMaterial: "Modern render, glazing, and quality residential finishes",
    extraDetails:
      "98-unit residential development with 2, 3, and 4 bedroom apartments, all with DSQ. Superstructure complete, with final finishing works ongoing.",
    tagline: "Parklands · Modern mixed-unit residential development",
    collection: "living",
    isNewDevelopment: true,
    launchLabel: "Near Completion",
    portfolioPriority: 1,
    featured: true,
    description:
      "A modern residential apartment development in Parklands comprising 98 units across a mix of 2-bedroom, 3-bedroom, and 4-bedroom apartments, all complemented with DSQ for added convenience. The project is strategically positioned near schools, hospitals, shopping centres, restaurants, religious centres, and major road links with easy access to the CBD and Westlands.\n\nUnit sizes start from 130 sqm for the 2-bedroom apartments, 180 sqm for the 3-bedroom apartments, and 240 sqm for the 4-bedroom apartments. Pricing starts from USD 75,000 for the 2-bedroom units, USD 100,000 for the 3-bedroom units, and USD 140,000 for the 4-bedroom units.\n\nThe development is at an advanced stage, with the superstructure completed and final internal fittings, installations, and external detailing currently underway. It is designed for modern living, quality finishes, security, and strong homeowner or investor appeal.",
    amenities: [
      "Swimming pool",
      "Children's play area",
      "High-speed elevators",
      "Manned reception",
      "24/7 security",
      "Backup generator",
      "Borehole",
      "Gym",
      "CCTV surveillance",
      "Cafeteria",
      "Mini market",
    ],
    gallery: withInteriorFallbacks([
      "/images/hero-1.png",
      u("photo-1600585154340-be6161a56a0c"),
      u("photo-1600607687939-ce8a6c25118c"),
      u("photo-1600566753376-12c8ab7fb75b"),
      u("photo-1600607687920-4e2a09cf159d"),
      u("photo-1600607688969-a5bfcd646154"),
    ]),
  },
  {
    slug: "2-bed-kilimani-yaya-corridor",
    title: "Dirrir Residence Kilimani",
    propertyType: "Apartment",
    status: "For Rent",
    propertyId: "DRL-002",
    price: 95000,
    bedrooms: 2,
    bathrooms: 2,
    areaSqft: 1100,
    lotSizeSqft: 1100,
    floor: "6th",
    location: "Kilimani",
    addressLine: "Yaya Corridor",
    city: "Nairobi",
    country: "Kenya",
    yearBuilt: 2020,
    garages: 1,
    garageSizeSqft: 160,
    availableFrom: "2026-04-20",
    basement: "Storage and service access",
    structureType: "Mid-rise residential apartment",
    exteriorMaterial: "Glass, aluminium, and textured render",
    extraDetails: "Furnished executive unit",
    tagline: "Kilimani · Urban living collection",
    collection: "living",
    isNewDevelopment: true,
    launchLabel: "Now Letting",
    portfolioPriority: 2,
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
    heroVideoUrl: getPlaceholderHeroVideo("2-bed-kilimani-yaya-corridor"),
  },
  {
    slug: "4-bed-lavington-mansionette",
    title: "Dirrir Gardens Lavington",
    propertyType: "Townhouse",
    status: "For Sale",
    propertyId: "DRL-003",
    price: 42000000,
    bedrooms: 4,
    bathrooms: 4,
    areaSqft: 3200,
    floor: "GF + 1",
    location: "Lavington",
    addressLine: "Valley Arcade Drive",
    city: "Nairobi",
    country: "Kenya",
    yearBuilt: 2019,
    garages: 2,
    garageSizeSqft: 280,
    availableFrom: "2026-06-01",
    basement: "None",
    structureType: "Gated townhouse",
    exteriorMaterial: "Stone, timber accents, and plaster",
    extraDetails: "Private end-unit garden",
    tagline: "Lavington · Gated townhouse collection",
    collection: "living",
    isNewDevelopment: true,
    launchLabel: "New Release",
    portfolioPriority: 3,
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
    propertyId: "DRL-004",
    price: 55000,
    bedrooms: 0,
    bathrooms: 1,
    areaSqft: 520,
    floor: "9th",
    location: "Westlands",
    addressLine: "Near Sarit Centre",
    city: "Nairobi",
    country: "Kenya",
    yearBuilt: 2022,
    garages: 1,
    availableFrom: "2026-04-18",
    structureType: "Studio tower apartment",
    exteriorMaterial: "Concrete frame with glazed balcony lines",
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
    propertyId: "DRL-005",
    price: 89000000,
    bedrooms: 5,
    bathrooms: 5,
    areaSqft: 5500,
    location: "Riverside",
    addressLine: "Riverside Drive",
    city: "Nairobi",
    country: "Kenya",
    yearBuilt: 2018,
    garages: 3,
    garageSizeSqft: 540,
    availableFrom: "2026-07-15",
    basement: "Wine store and utility hall",
    structureType: "Detached villa",
    exteriorMaterial: "Natural stone and painted masonry",
    extraDetails: "Heated pool and guest cottage",
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
    propertyId: "DRL-006",
    price: 14200000,
    bedrooms: 3,
    bathrooms: 2,
    areaSqft: 1280,
    floor: "2nd",
    location: "Parklands",
    addressLine: "City Park Link Road",
    city: "Nairobi",
    country: "Kenya",
    yearBuilt: 2017,
    garages: 2,
    availableFrom: "2026-05-10",
    structureType: "Family apartment block",
    exteriorMaterial: "Rendered masonry",
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
    propertyId: "DRL-007",
    price: 65000000,
    bedrooms: 0,
    bathrooms: 0,
    areaSqft: 10890,
    location: "Kilimani",
    addressLine: "Lenana Road junction",
    city: "Nairobi",
    country: "Kenya",
    availableFrom: "Immediate",
    structureType: "Development plot",
    exteriorMaterial: "N/A",
    extraDetails: "Approved plans available",
    tagline: "Kilimani · Prime development parcel",
    collection: "investment",
    featured: false,
    description:
      "Red-soil corner plot with approved building plans available. Excellent for boutique apartments or a private residence with room for a pool.",
    amenities: ["Corner plot", "Red soil", "Plans available"],
    gallery: withInteriorFallbacks([u("photo-1500382017468-9049fed747ef")]),
  },
  {
    slug: "arqam-project-parklands",
    title: "Arqam Projects",
    propertyType: "Apartment",
    status: "For Sale",
    propertyId: "DRL-008",
    price: 75000,
    bedrooms: 2,
    bathrooms: 2,
    areaSqft: Math.round(133 * 10.7639),
    floor: "Floors 1-18",
    location: "Parklands",
    addressLine: "Arqam residential development",
    city: "Nairobi",
    country: "Kenya",
    availableFrom: "Under development",
    structureType: "18-floor mixed-unit residential apartment development",
    exteriorMaterial: "Modern concrete structure with contemporary apartment finishes",
    extraDetails:
      "Floors 1-14 have 7 units per floor (including 2-bedroom, 4-bedroom, and duplex options). Floors 15-18 have 10 units per floor (2-bedroom and 3-bedroom options). Total planned units: 138.",
    tagline: "Parklands · 18-floor mixed-unit apartment project",
    collection: "investment",
    isNewDevelopment: true,
    launchLabel: "Now Selling",
    portfolioPriority: 2,
    featured: true,
    description:
      "Arqam Projects is an 18-floor residential development designed with a diverse apartment mix for both homeowners and investors. The scheme includes 2-bedroom units (133 m2), 3-bedroom units (123 m2 on upper floors), 4-bedroom units (240 m2), and duplex units (320 m2), with layouts distributed across lower and upper tower levels.\n\nFacing orientation varies by stack and floor, with options fronting the main road, corner positions, and back/inside-facing units. Back-facing unit details are verified at site level.\n\nAmenities include a mini mart, 24/7 generator, borehole water supply, two underground parking levels plus ground parking, gym, swimming pool, a small mosque, and a dedicated playground area.",
    amenities: [
      "Mini mart",
      "24/7 generator",
      "Borehole",
      "Two underground parking levels",
      "Ground parking",
      "Gym",
      "Swimming pool",
      "Small mosque",
      "Playground area",
    ],
    gallery: withInteriorFallbacks([
      "/images/penthouse-lavington.png",
      u("photo-1600566752355-35792bedcfea"),
      u("photo-1600566752227-8f3b5f97f31a"),
      u("photo-1600607687644-aac4c3eac7f4"),
      u("photo-1600566753086-00f18fb6b3ea"),
    ]),
    heroVideoUrl: getPlaceholderHeroVideo("arqam-project-parklands"),
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

export function getNewDevelopmentsFrom(list: Property[], max = 3): Property[] {
  const curated = list
    .filter((p) => p.isNewDevelopment)
    .sort((a, b) => {
      const aRank = a.portfolioPriority ?? Number.MAX_SAFE_INTEGER;
      const bRank = b.portfolioPriority ?? Number.MAX_SAFE_INTEGER;
      return aRank - bRank;
    });

  if (curated.length > 0) return curated.slice(0, max);

  const fallback = getFeaturedFrom(list).sort((a, b) => a.price - b.price);
  return fallback.slice(0, max);
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
