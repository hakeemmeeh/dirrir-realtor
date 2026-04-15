/**
 * Reference schema for Sanity Studio — import into `sanity.config` when wiring the CMS.
 */
export const propertySchema = {
  name: "property",
  title: "Property",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Property Title" },
    { name: "slug", type: "slug", options: { source: "title" } },
    {
      name: "propertyType",
      type: "string",
      options: { list: ["Apartment", "House", "Townhouse", "Land"] },
    },
    {
      name: "status",
      type: "string",
      options: { list: ["For Sale", "For Rent"] },
    },
    { name: "price", type: "number", title: "Price (KES)" },
    { name: "bedrooms", type: "number" },
    { name: "bathrooms", type: "number" },
    { name: "areaSqft", type: "number", title: "Area (sq ft)" },
    { name: "floor", type: "string", title: "Floor (e.g. 4th)" },
    {
      name: "location",
      type: "string",
      options: {
        list: ["Parklands", "Kilimani", "Westlands", "Lavington", "Riverside", "Other"],
      },
    },
    {
      name: "collection",
      type: "string",
      title: "Portfolio (Hass-style)",
      options: { list: ["living", "investment"] },
    },
    { name: "tagline", type: "string", title: "Card tagline" },
    { name: "description", type: "array", of: [{ type: "block" }] },
    { name: "amenities", type: "array", of: [{ type: "string" }] },
    {
      name: "gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
    { name: "featured", type: "boolean", title: "Featured on Homepage" },
    {
      name: "heroVideoUrl",
      type: "url",
      title: "Hero video (MP4)",
      description: "Optional full-bleed loop for homepage / listing hero (tours, AI walkthrough).",
    },
    { name: "mainImage", type: "image", options: { hotspot: true } },
  ],
};
