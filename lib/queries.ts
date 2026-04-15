/** GROQ — property shape matches `sanity/schemas/property.ts` */

export const allPropertiesQuery = `*[_type == "property"] | order(coalesce(_updatedAt, _createdAt) desc) {
  title,
  "slug": slug.current,
  propertyType,
  status,
  price,
  bedrooms,
  bathrooms,
  areaSqft,
  floor,
  location,
  collection,
  tagline,
  description,
  amenities,
  featured,
  heroVideoUrl,
  "mainUrl": mainImage.asset->url,
  "galleryUrls": gallery[].asset->url
}`;

export const featuredPropertiesQuery = `*[_type == "property" && featured == true] | order(coalesce(_updatedAt, _createdAt) desc)[0...12]`;

export const propertyBySlugQuery = `*[_type == "property" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  propertyType,
  status,
  price,
  bedrooms,
  bathrooms,
  areaSqft,
  floor,
  location,
  collection,
  tagline,
  description,
  amenities,
  featured,
  heroVideoUrl,
  "mainUrl": mainImage.asset->url,
  "galleryUrls": gallery[].asset->url
}`;
