"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { slugifyLocation } from "@/lib/utils";

export type AreaData = {
  name: string;
  slug: string;
  description: string;
  highlights: string[];
  priceSale: string;
  priceRent: string;
  image: string;
};

export function AreaCard({
  area,
  index,
  highlightsLabel,
  priceLabel,
  ctaLabel,
}: {
  area: AreaData;
  index: number;
  highlightsLabel: string;
  priceLabel: string;
  /** Pre-rendered CTA text from the server (cannot pass functions into Client Components). */
  ctaLabel: string;
}) {
  const filterLoc = slugifyLocation(area.name);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="grid overflow-hidden rounded-sm border border-border bg-background shadow-sm lg:grid-cols-2"
    >
      <div className="relative min-h-[240px] lg:min-h-[360px]">
        <Image src={area.image} alt={area.name} fill className="object-cover" sizes="50vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:bg-gradient-to-r" />
        <div className="absolute bottom-4 left-4 right-4 lg:bottom-8 lg:left-8">
          <h2 className="font-serif text-3xl text-white">{area.name}</h2>
        </div>
      </div>
      <div className="flex flex-col justify-center p-8 lg:p-12">
        <p className="leading-relaxed text-text">{area.description}</p>
        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-text-light">
          {highlightsLabel}
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {area.highlights.map((h) => (
            <li
              key={h}
              className="rounded-full bg-background-alt px-3 py-1 text-xs font-medium text-text"
            >
              {h}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-text-light">
          <span className="font-semibold text-primary">{priceLabel}: </span>
          Sales {area.priceSale} · Rentals {area.priceRent}
        </p>
        <div className="mt-8">
          <Button href={`/properties?location=${filterLoc}`} variant="primary">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
