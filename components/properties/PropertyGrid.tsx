import { PropertyCard } from "./PropertyCard";
import type { Property } from "@/lib/properties";

export function PropertyGrid({ items }: { items: Property[] }) {
  return (
    <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-3 xl:gap-16">
      {items.map((p, i) => (
        <PropertyCard key={p.slug} property={p} index={i} />
      ))}
    </div>
  );
}
