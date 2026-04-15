import { createClient, type SanityClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const sanityConfigured = Boolean(projectId && dataset);

export function getSanityClient(): SanityClient | null {
  if (!projectId || !dataset) return null;
  return createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    useCdn: true,
  });
}
