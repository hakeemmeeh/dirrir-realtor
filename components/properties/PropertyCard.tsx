"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Bath, Bed, Maximize2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn, formatKes } from "@/lib/utils";
import type { Property } from "@/lib/properties";

type Props = {
  property: Property;
  index?: number;
  variant?: "default" | "editorial";
  className?: string;
};

export function PropertyCard({ property: p, index = 0, variant = "default", className }: Props) {
  const t = useTranslations("PropertiesPage");
  const badgeVariant = p.status === "For Sale" ? "sale" : "rent";
  const priceLabel =
    p.status === "For Sale" ? formatKes(p.price) : `${formatKes(p.price)}/mo`;

  const tagline = p.tagline ?? p.location;

  if (variant === "editorial") {
    return (
      <motion.article
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ delay: index * 0.05, duration: 0.6 }}
        className={cn(
          "group relative h-[min(88vh,680px)] w-[min(94vw,520px)] shrink-0 snap-center overflow-hidden bg-primary shadow-2xl transition-all duration-700 hover:shadow-[0_40px_100px_rgba(0,0,0,0.3)] sm:h-[min(90vh,740px)] sm:w-[min(82vw,540px)] md:w-[min(520px,46vw)] lg:w-[560px]",
          className,
        )}
      >
        <Link
          href={`/properties/${p.slug}`}
          className="absolute inset-0 z-10 block focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
        >
          <span className="sr-only">{p.title}</span>
        </Link>
        <Image
          src={p.gallery[0] ?? "/images/logo.svg"}
          alt={p.title}
          fill
          className="object-cover opacity-90 transition-all duration-1000 ease-out group-hover:scale-105 group-hover:opacity-100"
          sizes="(max-width:768px) 94vw, 560px"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden
        />
        <div className="pointer-events-none absolute left-0 right-0 top-0 z-[1] flex items-start justify-between p-6 sm:p-8">
          <Badge
            variant={badgeVariant}
            className="border-white/10 bg-white/10 px-4 py-1.5 backdrop-blur-md"
          >
            {p.status}
          </Badge>
          <span className="font-mono text-[9px] font-bold uppercase tracking-luxury-widest text-white/50">
            {p.propertyType}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 z-[1] p-8 sm:p-10 lg:p-12">
          <p className="font-mono text-[10px] font-bold uppercase tracking-luxury-widest text-accent">
            {p.location}
          </p>
          <h3 className="mt-4 font-serif text-3xl font-medium leading-[1.1] text-white sm:text-4xl lg:text-5xl">
            {p.title}
          </h3>
          {tagline !== p.location ? (
            <p className="mt-4 max-w-sm font-serif text-lg italic leading-relaxed text-white/80">
              {tagline}
            </p>
          ) : null}
          <div className="mt-8 flex items-baseline gap-4">
            <p className="text-xl font-medium tracking-tight text-white">{priceLabel}</p>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
            {p.propertyType !== "Land" ? (
              <>
                <span>{p.bedrooms === 0 ? "Studio" : `${p.bedrooms} BED`}</span>
                <span>{p.bathrooms} BATH</span>
              </>
            ) : null}
            <span>{p.areaSqft.toLocaleString()} SQ FT</span>
          </div>
          <p className="mt-10 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-white transition-all duration-300 group-hover:gap-4">
            {t("viewDetails")} <span className="h-px w-6 bg-accent" />
          </p>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group overflow-hidden border border-border bg-background transition-all duration-500 hover:border-accent/40",
        className,
      )}
    >
      <Link href={`/properties/${p.slug}`} className="relative aspect-[16/11] overflow-hidden block">
        <Image
          src={p.gallery[0] ?? "/images/logo.svg"}
          alt={p.title}
          fill
          className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
        />
        <div className="absolute left-0 top-0 z-[1]">
          <Badge variant={badgeVariant} className="rounded-none bg-primary/90 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white border-none backdrop-blur-md">
            {p.status}
          </Badge>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
      </Link>
      
      <div className="flex flex-col p-8 lg:p-10">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-accent">
            {p.location}
          </p>
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-text-light/60">
            {p.propertyType}
          </span>
        </div>
        
        <Link href={`/properties/${p.slug}`}>
          <h3 className="mt-5 font-serif text-2xl leading-tight text-primary transition-colors hover:text-accent">
            {p.title}
          </h3>
        </Link>
        
        <div className="mt-8 flex items-center justify-between border-y border-border/60 py-5">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-light/70">{t("features")}</span>
            <div className="flex items-center gap-4 text-[11px] font-bold text-primary">
              {p.propertyType !== "Land" && (
                <div className="flex items-center gap-1.5">
                  <Bed className="h-3.5 w-3.5" />
                  <span>{p.bedrooms === 0 ? "Studio" : p.bedrooms}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Maximize2 className="h-3.5 w-3.5" />
                <span>{p.areaSqft.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-light/70">{t("priceRange")}</span>
            <p className="font-serif text-xl font-medium text-primary">
              {priceLabel}
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Link 
            href={`/properties/${p.slug}`} 
            className="group/btn relative overflow-hidden text-[10px] font-bold uppercase tracking-[0.3em] text-primary transition-colors hover:text-accent"
          >
            {t("viewDetails")}
            <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover/btn:w-full" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-border" />
            <Link href="/contact" className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-light hover:text-accent">
              Enquire
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
