import { Bath, Bed, Building, Layers, Maximize2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Property } from "@/lib/properties";

export async function PropertySpecs({ property: p }: { property: Property }) {
  const t = await getTranslations("Property");

  const items: { icon: typeof Bed; label: string; value: string }[] = [
    { icon: Bed, label: "Bedrooms", value: p.bedrooms === 0 ? "Studio" : String(p.bedrooms) },
    { icon: Bath, label: "Bathrooms", value: String(p.bathrooms) },
    { icon: Maximize2, label: "Area", value: `${p.areaSqft.toLocaleString()} sq ft` },
  ];

  if (p.floor) {
    items.push({ icon: Layers, label: t("floor"), value: p.floor });
  }
  items.push({ icon: Building, label: t("location"), value: p.location });

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-3 rounded-sm border border-border bg-background-alt p-4"
        >
          <item.icon className="h-5 w-5 shrink-0 text-accent" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-light">
              {item.label}
            </p>
            <p className="font-medium text-primary">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
