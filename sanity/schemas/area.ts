export const areaSchema = {
  name: "area",
  title: "Area",
  type: "document",
  fields: [
    { name: "name", type: "string" },
    { name: "slug", type: "slug", options: { source: "name" } },
    { name: "description", type: "text" },
    { name: "highlights", type: "array", of: [{ type: "string" }] },
    { name: "priceRangeSale", type: "string" },
    { name: "priceRangeRent", type: "string" },
    { name: "image", type: "image", options: { hotspot: true } },
  ],
};
