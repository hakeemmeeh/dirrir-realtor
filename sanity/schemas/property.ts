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
    { name: "propertyId", type: "string", title: "Property ID" },
    { name: "price", type: "number", title: "Price (KES)" },
    { name: "bedrooms", type: "number" },
    { name: "bathrooms", type: "number" },
    { name: "areaSqft", type: "number", title: "Area (sq ft)" },
    { name: "lotSizeSqft", type: "number", title: "Lot size (sq ft)" },
    { name: "floor", type: "string", title: "Floor (e.g. 4th)" },
    { name: "addressLine", type: "string", title: "Address line" },
    { name: "city", type: "string", title: "City" },
    { name: "country", type: "string", title: "Country" },
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
    { name: "yearBuilt", type: "number", title: "Year built" },
    { name: "garages", type: "number", title: "Garages" },
    { name: "garageSizeSqft", type: "number", title: "Garage size (sq ft)" },
    { name: "availableFrom", type: "string", title: "Available from" },
    { name: "basement", type: "string", title: "Basement" },
    { name: "structureType", type: "string", title: "Structure type" },
    { name: "exteriorMaterial", type: "string", title: "Exterior material" },
    { name: "extraDetails", type: "string", title: "Extra details" },
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
