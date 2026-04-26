"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { slugifyLocation } from "@/lib/utils";
import { fadeUpReduced, slideInLeft, slideInRight } from "@/lib/motion";
import { useReducedMotion } from "framer-motion";

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
  const imageLeft = index % 2 === 0;
  const reduceMotion = useReducedMotion();

  return (
    <article className="group relative grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
      <motion.div
        variants={reduceMotion ? fadeUpReduced : imageLeft ? slideInLeft : slideInRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className={`relative aspect-[4/3] overflow-hidden rounded-sm lg:aspect-[16/11] ${
          imageLeft ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <Image
          src={area.image}
          alt={area.name}
          fill
          className="object-cover transition-transform duration-[3s] ease-out group-hover:scale-105"
          sizes="(max-width:1024px) 100vw, 50vw"
          priority={index === 0}
          quality={85}
        />
        <div className="absolute inset-0 bg-black/10 transition-colors duration-700 group-hover:bg-transparent" />
      </motion.div>

      <motion.div
        variants={reduceMotion ? fadeUpReduced : imageLeft ? slideInRight : slideInLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className={`flex flex-col ${imageLeft ? "lg:order-2" : "lg:order-1 lg:text-right lg:items-end"}`}
      >
        <div className="mb-4 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
          <span className="h-px w-8 bg-primary/30" />
          {area.slug === "other" ? "Nairobi & Beyond" : "Premium Neighbourhood"}
        </div>
        
        <h2 className="mb-6 font-serif text-4xl font-light tracking-tight text-text lg:text-6xl">
          {area.name}
        </h2>
        
        <p className={`max-w-xl text-lg leading-relaxed text-text-light/90 ${!imageLeft && "lg:text-right"}`}>
          {area.description}
        </p>

        <div className={`mt-8 space-y-6 ${!imageLeft && "lg:items-end flex flex-col"}`}>
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.1em] text-text-light/60">
              {highlightsLabel}
            </p>
            <ul className={`flex flex-wrap gap-x-4 gap-y-2 ${!imageLeft && "lg:justify-end"}`}>
              {area.highlights.map((h) => (
                <li key={h} className="text-sm font-medium text-text border-b border-border/50 pb-1">
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4">
            <p className="text-sm italic text-text-light/80">
              <span className="not-italic font-bold text-primary mr-2">{priceLabel}</span>
              {area.priceSale} (Sales) &middot; {area.priceRent} (Rentals)
            </p>
          </div>

          <div className="mt-4">
            <Button 
              href={`/properties?location=${filterLoc}`} 
              variant="secondary"
              className="px-8 border-primary/20 hover:border-primary hover:bg-primary hover:text-white transition-all duration-500"
            >
              {ctaLabel}
            </Button>
          </div>
        </div>
      </motion.div>
    </article>
  );
}
