"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useRef, useEffect } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const locations = [
  { v: "all", l: "All Locations" },
  { v: "parklands", l: "Parklands" },
  { v: "kilimani", l: "Kilimani" },
  { v: "westlands", l: "Westlands" },
  { v: "lavington", l: "Lavington" },
  { v: "riverside", l: "Riverside" },
  { v: "other", l: "Other" },
];

const types = [
  { v: "all", l: "All Types" },
  { v: "apartment", l: "Apartment" },
  { v: "house", l: "House" },
  { v: "townhouse", l: "Townhouse" },
  { v: "land", l: "Land" },
];

const beds = [
  { v: "all", l: "Any Beds" },
  { v: "studio", l: "Studio" },
  { v: "1", l: "1 Bedroom" },
  { v: "2", l: "2 Bedrooms" },
  { v: "3", l: "3 Bedrooms" },
  { v: "4+", l: "4+ Bedrooms" },
];

const prices = [
  { v: "all", l: "Any Price" },
  { v: "20000", l: "Up to $20k" },
  { v: "50000", l: "Up to $50k" },
  { v: "100000", l: "Up to $100k" },
  { v: "250000", l: "Up to $250k" },
  { v: "1000000", l: "Up to $1M" },
];

function CustomDropdown({
  label,
  options,
  currentValue,
  onChange,
}: {
  label: string;
  options: { v: string; l: string }[];
  currentValue: string;
  onChange: (val: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.v === currentValue) || options[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex min-h-[52px] w-full items-center justify-between border-b border-border/50 py-2 transition-colors hover:border-primary focus:outline-none md:min-w-[160px]",
          isOpen ? "border-primary" : "border-border/50"
        )}
      >
        <div className="flex min-w-0 flex-col items-start gap-1">
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-text-light/60">
            {label}
          </span>
          <span
            className={cn(
              "max-w-full truncate font-sans text-[13px] font-medium tracking-tight transition-colors",
              currentValue !== "all" ? "text-accent" : "text-primary"
            )}
          >
            {selectedOption.l}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "ml-2 h-3.5 w-3.5 shrink-0 text-primary/60 transition-transform duration-300",
            isOpen ? "rotate-180" : ""
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-[calc(100%+8px)] z-50 min-w-[180px] border border-border/50 bg-white p-2 shadow-2xl"
          >
            <ul className="flex flex-col">
              {options.map((option) => (
                <li key={option.v}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.v);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full px-4 py-2.5 text-left font-sans text-[13px] font-medium tracking-tight transition-colors hover:bg-background-alt",
                      currentValue === option.v
                        ? "bg-background-alt text-accent"
                        : "text-primary"
                    )}
                  >
                    {option.l}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FilterBar() {
  const router = useRouter();
  const sp = useSearchParams();

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(sp.toString());
      if (!value || value === "all") next.delete(key);
      else next.set(key, value);
      router.push(`/properties?${next.toString()}`, { scroll: false });
    },
    [router, sp]
  );

  const loc = sp.get("location") || "all";
  const type = sp.get("type") || "all";
  const bed = sp.get("bedrooms") || "all";
  const maxPrice = sp.get("maxPrice") || "all";

  const hasFilters = loc !== "all" || type !== "all" || bed !== "all" || maxPrice !== "all";

  return (
    <div className="sticky top-16 z-40 border-b border-border/50 bg-white/95 py-4 backdrop-blur-md sm:py-6 lg:top-20">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col flex-wrap items-start justify-between gap-6 lg:flex-row lg:items-end lg:gap-10">
          <div className="flex w-full flex-1 flex-col items-start gap-4 lg:w-auto lg:flex-row lg:items-center lg:gap-12">
            <div className="hidden items-center gap-3 border-r border-border/40 pr-4 lg:flex lg:pr-8">
              <SlidersHorizontal className="h-4 w-4 text-accent" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                Filters
              </span>
            </div>
            
            <div className="grid w-full grid-cols-2 gap-x-4 gap-y-4 lg:flex lg:w-auto lg:flex-wrap lg:items-center lg:gap-10">
              <CustomDropdown
                label="Location"
                options={locations}
                currentValue={loc}
                onChange={(val) => update("location", val)}
              />
              <CustomDropdown
                label="Property Type"
                options={types}
                currentValue={type}
                onChange={(val) => update("type", val)}
              />
              <CustomDropdown
                label="Bedrooms"
                options={beds}
                currentValue={bed}
                onChange={(val) => update("bedrooms", val)}
              />
              <CustomDropdown
                label="Max Price"
                options={prices}
                currentValue={maxPrice}
                onChange={(val) => update("maxPrice", val)}
              />
            </div>
          </div>

          <AnimatePresence>
            {hasFilters && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <button
                  type="button"
                  onClick={() => router.push("/properties", { scroll: false })}
                  className="flex items-center gap-2 rounded-full bg-background-alt px-5 py-2.5 transition-colors hover:bg-black group"
                >
                  <X className="h-3.5 w-3.5 text-text-light group-hover:text-white transition-colors" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary group-hover:text-white transition-colors">
                    Clear Filters
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}