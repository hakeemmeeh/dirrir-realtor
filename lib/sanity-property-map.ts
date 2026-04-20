import type {
  Property,
  PropertyCollection,
  PropertyLocation,
  PropertyStatus,
  PropertyType,
} from "@/lib/properties";
import { getPlaceholderHeroVideo } from "@/lib/property-hero-videos";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

const TYPES: PropertyType[] = ["Apartment", "House", "Townhouse", "Land"];
const STATUSES: PropertyStatus[] = ["For Sale", "For Rent"];
const LOCATIONS: PropertyLocation[] = [
  "Parklands",
  "Kilimani",
  "Westlands",
  "Lavington",
  "Riverside",
  "Other",
];
const COLLECTIONS: PropertyCollection[] = ["living", "investment"];

function asPropertyType(v: unknown): PropertyType {
  return typeof v === "string" && TYPES.includes(v as PropertyType)
    ? (v as PropertyType)
    : "Apartment";
}

function asStatus(v: unknown): PropertyStatus {
  return typeof v === "string" && STATUSES.includes(v as PropertyStatus)
    ? (v as PropertyStatus)
    : "For Sale";
}

function asLocation(v: unknown): PropertyLocation {
  return typeof v === "string" && LOCATIONS.includes(v as PropertyLocation)
    ? (v as PropertyLocation)
    : "Other";
}

function asCollection(v: unknown): PropertyCollection {
  return typeof v === "string" && COLLECTIONS.includes(v as PropertyCollection)
    ? (v as PropertyCollection)
    : "living";
}

function blocksToPlain(blocks: unknown): string {
  if (!Array.isArray(blocks)) return "";
  const parts: string[] = [];
  for (const block of blocks as Array<{
    _type?: string;
    children?: Array<{ text?: string }>;
  }>) {
    if (block?._type === "block" && Array.isArray(block.children)) {
      parts.push(block.children.map((c) => c.text ?? "").join(""));
    }
  }
  return parts.join("\n\n").trim();
}

export function sanityRowToProperty(doc: Record<string, unknown>): Property | null {
  const slug = typeof doc.slug === "string" ? doc.slug : null;
  const title = typeof doc.title === "string" ? doc.title : null;
  if (!slug || !title) return null;

  const mainUrl = typeof doc.mainUrl === "string" ? doc.mainUrl : null;
  const rawGallery = Array.isArray(doc.galleryUrls) ? doc.galleryUrls : [];
  const galleryUrls = rawGallery.filter((u): u is string => typeof u === "string" && u.length > 0);
  const gallery: string[] = [];
  if (mainUrl) gallery.push(mainUrl);
  for (const u of galleryUrls) {
    if (!gallery.includes(u)) gallery.push(u);
  }
  if (gallery.length === 0) gallery.push(PLACEHOLDER_IMAGE);

  const price = typeof doc.price === "number" && !Number.isNaN(doc.price) ? doc.price : 0;
  const bedrooms = typeof doc.bedrooms === "number" ? doc.bedrooms : 0;
  const bathrooms = typeof doc.bathrooms === "number" ? doc.bathrooms : 0;
  const areaSqft = typeof doc.areaSqft === "number" ? doc.areaSqft : 0;
  const lotSizeSqft = typeof doc.lotSizeSqft === "number" ? doc.lotSizeSqft : undefined;

  const descPlain = blocksToPlain(doc.description);
  const description =
    descPlain ||
    (typeof doc.description === "string" ? doc.description : "Details available on request.");

  const amenities = Array.isArray(doc.amenities)
    ? doc.amenities.filter((a): a is string => typeof a === "string")
    : [];

  const floor =
    typeof doc.floor === "string" && doc.floor.length > 0 ? doc.floor : undefined;
  const propertyId =
    typeof doc.propertyId === "string" && doc.propertyId.length > 0 ? doc.propertyId : undefined;
  const addressLine =
    typeof doc.addressLine === "string" && doc.addressLine.length > 0 ? doc.addressLine : undefined;
  const city =
    typeof doc.city === "string" && doc.city.length > 0 ? doc.city : undefined;
  const country =
    typeof doc.country === "string" && doc.country.length > 0 ? doc.country : undefined;
  const yearBuilt = typeof doc.yearBuilt === "number" ? doc.yearBuilt : undefined;
  const garages = typeof doc.garages === "number" ? doc.garages : undefined;
  const garageSizeSqft =
    typeof doc.garageSizeSqft === "number" ? doc.garageSizeSqft : undefined;
  const availableFrom =
    typeof doc.availableFrom === "string" && doc.availableFrom.length > 0
      ? doc.availableFrom
      : undefined;
  const basement =
    typeof doc.basement === "string" && doc.basement.length > 0 ? doc.basement : undefined;
  const structureType =
    typeof doc.structureType === "string" && doc.structureType.length > 0
      ? doc.structureType
      : undefined;
  const exteriorMaterial =
    typeof doc.exteriorMaterial === "string" && doc.exteriorMaterial.length > 0
      ? doc.exteriorMaterial
      : undefined;
  const extraDetails =
    typeof doc.extraDetails === "string" && doc.extraDetails.length > 0
      ? doc.extraDetails
      : undefined;
  const tagline =
    typeof doc.tagline === "string" && doc.tagline.length > 0 ? doc.tagline : undefined;
  const heroVideoUrl =
    typeof doc.heroVideoUrl === "string" && doc.heroVideoUrl.length > 0
      ? doc.heroVideoUrl
      : getPlaceholderHeroVideo(slug);

  return {
    slug,
    title,
    propertyType: asPropertyType(doc.propertyType),
    status: asStatus(doc.status),
    propertyId,
    price,
    bedrooms,
    bathrooms,
    areaSqft,
    lotSizeSqft,
    floor,
    location: asLocation(doc.location),
    addressLine,
    city,
    country,
    yearBuilt,
    garages,
    garageSizeSqft,
    availableFrom,
    basement,
    structureType,
    exteriorMaterial,
    extraDetails,
    tagline,
    collection: asCollection(doc.collection),
    description,
    amenities,
    gallery,
    featured: Boolean(doc.featured),
    heroVideoUrl,
  };
}

export function mapSanityProperties(docs: Record<string, unknown>[]): Property[] {
  return docs.map(sanityRowToProperty).filter((p): p is Property => p !== null);
}
