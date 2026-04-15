"use client";

import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const locations = [
  { v: "all", l: "All" },
  { v: "parklands", l: "Parklands" },
  { v: "kilimani", l: "Kilimani" },
  { v: "westlands", l: "Westlands" },
  { v: "lavington", l: "Lavington" },
  { v: "riverside", l: "Riverside" },
  { v: "other", l: "Other" },
];

const types = [
  { v: "all", l: "All" },
  { v: "apartment", l: "Apartment" },
  { v: "house", l: "House" },
  { v: "townhouse", l: "Townhouse" },
  { v: "land", l: "Land" },
];

const beds = [
  { v: "all", l: "All" },
  { v: "studio", l: "Studio" },
  { v: "1", l: "1" },
  { v: "2", l: "2" },
  { v: "3", l: "3" },
  { v: "4+", l: "4+" },
];

export function FilterBar() {
  const t = useTranslations("PropertiesPage.filters");
  const router = useRouter();
  const sp = useSearchParams();
  const [open, setOpen] = useState(false);

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(sp.toString());
      if (!value || value === "all") next.delete(key);
      else next.set(key, value);
      router.push(`/properties?${next.toString()}`, { scroll: false });
    },
    [router, sp],
  );

  const Row = (
    <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
      <div className="flex items-center gap-2 lg:gap-6">
        <span className="font-mono text-[10px] font-bold uppercase tracking-luxury-widest text-text-light/50 hidden md:inline-block">Location</span>
        {locations.filter(l => l.v !== 'all' && l.v !== 'other').map((o) => (
          <button
            key={o.v}
            type="button"
            onClick={() => update("location", o.v)}
            className={cn(
              "font-mono text-[10px] font-bold uppercase tracking-luxury-widest transition-colors",
              sp.get("location") === o.v ? "text-accent" : "text-primary hover:text-accent"
            )}
          >
            {o.l}
          </button>
        ))}
      </div>
      <div className="h-4 w-px bg-border hidden md:block" />
      <div className="flex items-center gap-2 lg:gap-6">
        <span className="font-mono text-[10px] font-bold uppercase tracking-luxury-widest text-text-light/50 hidden md:inline-block">Type</span>
        {types.map((o) => (
          <button
            key={o.v}
            type="button"
            onClick={() => update("type", o.v)}
            className={cn(
              "font-mono text-[10px] font-bold uppercase tracking-luxury-widest transition-colors",
              (sp.get("type") ?? "all") === o.v ? "text-accent" : "text-primary hover:text-accent"
            )}
          >
            {o.l}
          </button>
        ))}
      </div>
      {(sp.get("location") || (sp.get("type") && sp.get("type") !== "all")) && (
        <button
          type="button"
          onClick={() => router.push("/properties", { scroll: false })}
          className="font-mono text-[10px] font-bold uppercase tracking-luxury-widest text-text-light hover:text-primary transition-colors ml-4"
        >
          Reset
        </button>
      )}
    </div>
  );

  return (
    <div className="sticky top-16 z-40 border-b border-border bg-background/95 py-6 backdrop-blur-sm lg:top-20">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center w-full overflow-x-auto pb-2 scrollbar-none">
          {Row}
        </div>
      </div>
    </div>
  );
}
