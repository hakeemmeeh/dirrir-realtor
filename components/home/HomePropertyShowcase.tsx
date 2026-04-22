import { CollectionChoiceGrid } from "@/components/home/CollectionChoiceGrid";
import { type Property } from "@/lib/properties";

/** Living + Investment entry: same dual image cards as `/developments` (last shipped layout). */
export async function HomePropertyShowcase({ properties }: { properties: Property[] }) {
  void properties;
  return <CollectionChoiceGrid />;
}
