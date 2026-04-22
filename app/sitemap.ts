import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllProperties } from "@/lib/properties";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_URL.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/properties`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/developments`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/areas`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  try {
    const properties = await getAllProperties();
    const propertyRoutes: MetadataRoute.Sitemap = properties.map((p) => ({
      url: `${base}/properties/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }));
    return [...staticRoutes, ...propertyRoutes];
  } catch {
    return staticRoutes;
  }
}
