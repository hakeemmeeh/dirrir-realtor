"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Maximize2, MapPin } from "lucide-react";
import { cn, formatUsd } from "@/lib/utils";
import type { Property } from "@/lib/properties";

type Props = {
  property: Property;
  index?: number;
  className?: string;
};

export function DevelopmentCard({ property: p, index = 0, className }: Props) {
  const t = useTranslations("PropertiesPage");
  const priceLabel = p.status === "For Sale" ? formatUsd(p.price) : `${formatUsd(p.price)}/mo`;
  const areaLabel = p.areaSqft > 0 ? `${p.areaSqft.toLocaleString()} sq ft` : "N/A";

  return (
    <Link
      href={`/properties/${p.slug}`}
      className={cn(
        "group relative flex h-[480px] w-full flex-col justify-end overflow-hidden bg-black opacity-0 animate-fade-in-up sm:h-[560px]",
        className
      )}
      style={{ animationDelay: `${Math.min(index, 6) * 110}ms` }}
    >
      {/* Background Image with Slow Zoom */}
      <Image
        src={p.gallery[0] ?? "/images/logo.svg"}
        alt={p.title}
        fill
        className="object-cover scale-105 transition-transform duration-[1.5s] ease-out group-hover:scale-100"
        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
      />

      {/* Default Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10 transition-opacity duration-500 ease-out" />

      {/* Hover Overlay - Deeper darkening for readability on hover */}
      <div className="absolute inset-0 bg-black/85 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100" />

      {/* Completion Status Badge - Top Left */}
      <div className="absolute left-6 top-6 z-10">
        <div className="bg-accent px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
          Completed
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col p-6 sm:p-8">
        <div className="mb-2 flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-accent" />
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-white/90 transition-colors duration-300 group-hover:text-accent">
            {p.location}
          </span>
        </div>

        <h3 className="font-display text-2xl font-normal leading-tight tracking-wide text-white sm:text-3xl transition-colors duration-300 group-hover:text-white">
          {p.title}
        </h3>

        {/* Slide-Up Reveal Section */}
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <div className="flex flex-col pt-6 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100 group-hover:delay-150">
              {/* Specs Grid */}
              <div className="mb-6 grid grid-cols-3 gap-4 border-y border-white/10 py-4 text-white">
                <div className="flex flex-col items-center gap-1.5 border-r border-white/10 px-2">
                  <Bed className="h-4 w-4 text-accent" />
                  <span className="text-[11px] font-bold uppercase tracking-widest">
                    {p.bedrooms === 0 ? "Studio" : `${p.bedrooms} Bed`}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5 border-r border-white/10 px-2">
                  <Bath className="h-4 w-4 text-accent" />
                  <span className="text-[11px] font-bold uppercase tracking-widest">
                    {p.bathrooms} Bath
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5 px-2">
                  <Maximize2 className="h-4 w-4 text-accent" />
                  <span className="text-[11px] font-bold uppercase tracking-widest">
                    {areaLabel}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium tracking-tight text-white/80">
                  {priceLabel}
                </span>
                <span className="inline-flex items-center gap-2 border-b border-accent pb-1 text-[11px] font-bold uppercase tracking-widest text-accent transition-all duration-300 hover:border-white hover:text-white">
                  {t("viewDetails")}
                  <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}