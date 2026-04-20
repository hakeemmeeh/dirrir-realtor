"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import type { Property } from "@/lib/properties";

type Props = {
  sectionId: string;
  /** Chapter index label (e.g. 01, 02) — Hass-style sequence. */
  chapterNumber: string;
  kicker: string;
  title: string;
  subtitle: string;
  previewNote?: string;
  collectionLead?: string;
  exploreLabel: string;
  exploreHref: string;
  items: Property[];
  tone?: "light" | "muted";
  accentChapter?: boolean;
};

export function PropertyCollectionBand({
  sectionId,
  chapterNumber,
  kicker,
  title,
  subtitle,
  previewNote,
  collectionLead,
  exploreLabel,
  exploreHref,
  items,
  tone = "light",
  accentChapter = false,
}: Props) {
  const railRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const heroSrc = items[0]?.gallery[0];

  const scrollTo = useCallback((dir: -1 | 1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector("[data-collection-card]");
    const w = card ? card.getBoundingClientRect().width + 16 : 320;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const root = railRef.current;
    if (!root) return;
    const onScroll = () => {
      const card = root.querySelector("[data-collection-card]");
      const gap = 16;
      const w = card ? card.getBoundingClientRect().width + gap : 1;
      const i = Math.round(root.scrollLeft / w);
      setScrollIndex(Math.min(Math.max(i, 0), items.length - 1));
    };
    root.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => root.removeEventListener("scroll", onScroll);
  }, [items.length]);

  if (items.length === 0) return null;

  const textDark = accentChapter;
  const panelClass = textDark
    ? "bg-charcoal text-ivory"
    : tone === "muted"
      ? "bg-background-alt text-primary"
      : "bg-background text-primary";

  const railSurround =
    accentChapter || tone === "muted" ? "bg-background-alt" : "bg-background";
  const fadeFrom =
    railSurround === "bg-background-alt" ? "from-background-alt" : "from-background";

  return (
    <section
      id={sectionId}
      className={cn(
        "scroll-mt-32 scroll-pt-4 sm:scroll-mt-36",
        accentChapter && "border-t-4 border-accent",
      )}
    >
      {/* Asymmetric chapter opener: copy + cinematic half (developments-page storytelling) */}
      <div className="grid lg:grid-cols-2">
        <div
          className={cn(
            "order-2 flex flex-col justify-center px-6 py-16 sm:px-10 sm:py-20 lg:order-1 lg:px-16 lg:py-24",
            panelClass,
          )}
        >
          <div className="relative max-w-xl">
            <span
              className="pointer-events-none absolute -left-2 -top-8 font-sans text-[5rem] font-medium leading-none tracking-tight text-current opacity-[0.07] sm:text-[6.5rem] lg:-left-4 lg:-top-12 lg:text-[8rem]"
              aria-hidden
            >
              {chapterNumber}
            </span>
            <p className="relative font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
              <span className="mr-2 tabular-nums opacity-80">{chapterNumber}</span>
              {kicker}
            </p>
            <h2
              className={cn(
                "relative mt-6 font-sans text-[2rem] font-medium leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl",
                textDark ? "text-ivory" : "text-primary",
              )}
            >
              {title}
            </h2>
            <p
              className={cn(
                "relative mt-5 text-base leading-relaxed sm:text-lg",
                textDark ? "text-ivory/75" : "text-text-light",
              )}
            >
              {subtitle}
            </p>
            {previewNote ? (
              <p
                className={cn(
                  "relative mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.24em]",
                  textDark ? "text-ivory/55" : "text-text-light/85",
                )}
              >
                {previewNote}
              </p>
            ) : null}
            {collectionLead ? (
              <p
                className={cn(
                  "relative mt-6 max-w-xl border-l-2 pl-5 text-sm font-medium leading-relaxed sm:text-base",
                  textDark
                    ? "border-accent/80 text-ivory/90"
                    : "border-accent/80 text-primary",
                )}
              >
                {collectionLead}
              </p>
            ) : null}
          </div>
        </div>
        <div className="relative order-1 min-h-[280px] lg:order-2 lg:min-h-[min(100vh,560px)]">
          {heroSrc ? (
            <>
              <Image
                src={heroSrc}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
                priority={chapterNumber === "01"}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/25 lg:bg-gradient-to-l lg:from-black/50 lg:via-transparent lg:to-transparent"
                aria-hidden
              />
            </>
          ) : null}
        </div>
      </div>

      {/* Controls + rail */}
      <div className={cn("border-t border-border/80", railSurround)}>
        <Container className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:py-10">
          <div className="flex items-baseline gap-3 font-serif tabular-nums text-text-light">
            <span className="text-3xl font-medium text-primary sm:text-4xl">{scrollIndex + 1}</span>
            <span className="text-xl text-accent" aria-hidden>
              /
            </span>
            <span className="text-xl text-text-light/80 sm:text-2xl">{items.length}</span>
            <span className="ml-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-text-light">
              {kicker}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {items.length > 1 ? (
              <>
                <button
                  type="button"
                  aria-label="Scroll collection left"
                  onClick={() => scrollTo(-1)}
                  className="rounded-sm border border-border bg-background p-2 text-primary transition-colors hover:border-accent hover:text-accent"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Scroll collection right"
                  onClick={() => scrollTo(1)}
                  className="rounded-sm border border-border bg-background p-2 text-primary transition-colors hover:border-accent hover:text-accent"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            ) : null}
            <Link
              href={exploreHref}
              className="ml-1 inline-flex items-center rounded-sm border border-accent/30 bg-accent/10 px-3 py-2 text-sm font-semibold text-accent transition-colors hover:border-accent hover:bg-accent hover:text-white"
            >
              {exploreLabel} →
            </Link>
          </div>
        </Container>

        <div className="relative pb-16 pt-2 lg:pb-24">
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 z-[2] w-10 bg-gradient-to-r to-transparent sm:w-16",
              fadeFrom,
            )}
            aria-hidden
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 right-0 z-[2] w-10 bg-gradient-to-l to-transparent sm:w-16",
              fadeFrom,
            )}
            aria-hidden
          />
          <div
            ref={railRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-2 sm:gap-6 sm:px-6 lg:px-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))]"
          >
            {items.map((p, i) => (
              <div key={p.slug} data-collection-card className="snap-center">
                <PropertyCard property={p} index={i} variant="editorial" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
