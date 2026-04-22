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
    <article className="grid overflow-hidden rounded-sm border border-border bg-background shadow-sm lg:grid-cols-2">
      <motion.div
        variants={reduceMotion ? fadeUpReduced : imageLeft ? slideInLeft : slideInRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className={`relative min-h-[240px] lg:min-h-[360px] ${imageLeft ? "lg:order-1" : "lg:order-2"}`}
      >
        <Image
          src={area.image}
          alt={area.name}
          fill
          className="object-cover transition-transform duration-[2s] ease-out hover:scale-105"
          sizes="(max-width:1024px) 100vw, 50vw"
          priority={index === 0}
          loading={index === 0 ? "eager" : "lazy"}
          quality={78}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDIwIDE0Ij48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTQiIGZpbGw9IiMxYTIwMjgiLz48L3N2Zz4="
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:bg-gradient-to-r" />
        <div className="absolute bottom-4 left-4 right-4 lg:bottom-8 lg:left-8">
          <h2 className="font-sans text-3xl font-medium tracking-tight text-white">{area.name}</h2>
        </div>
      </motion.div>
      <motion.div
        variants={reduceMotion ? fadeUpReduced : imageLeft ? slideInRight : slideInLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className={`flex flex-col justify-center p-8 lg:p-12 ${imageLeft ? "lg:order-2" : "lg:order-1"}`}
      >
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
      </motion.div>
    </article>
  );
}
