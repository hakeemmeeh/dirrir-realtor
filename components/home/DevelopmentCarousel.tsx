"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { DevelopmentCard } from "@/components/home/DevelopmentCard";
import type { Property } from "@/lib/properties";

type Props = {
  properties: Property[];
  /** Show correct badge on cards (ongoing pipeline vs delivered). */
  cardBadgeVariant?: "ongoing" | "completed";
  /** Stronger frame + shadow for homepage “live pipeline” emphasis. */
  spotlight?: boolean;
  /**
   * `scroll` — horizontal snap strip (ongoing section).
   * `slides` — one slide at a time with dots + arrows (amenities-style), no free scroll.
   */
  mode?: "scroll" | "slides";
};

export function DevelopmentCarousel({
  properties,
  cardBadgeVariant = "completed",
  spotlight = false,
  mode = "scroll",
}: Props) {
  if (mode === "slides") {
    return (
      <DevelopmentSlidesCarousel
        properties={properties}
        cardBadgeVariant={cardBadgeVariant}
      />
    );
  }

  return (
    <ScrollStripCarousel
      properties={properties}
      cardBadgeVariant={cardBadgeVariant}
      spotlight={spotlight}
    />
  );
}

function ScrollStripCarousel({
  properties,
  cardBadgeVariant,
  spotlight,
}: {
  properties: Property[];
  cardBadgeVariant: "ongoing" | "completed";
  spotlight: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
        }
      }
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const navTop = spotlight
    ? "sm:-top-[168px] sm:right-4 lg:-top-[196px] lg:right-8"
    : "sm:-top-[112px] sm:right-0 lg:-top-[128px] lg:right-0";

  return (
    <div
      className={`relative w-full group/carousel ${spotlight ? "rounded-2xl border border-primary/10 bg-background p-4 shadow-[0_28px_90px_-32px_rgba(26,26,26,0.45)] sm:p-6 lg:p-8" : ""}`}
    >
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className={`flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-8 ${spotlight ? "-mx-0 px-0" : "-mx-4 px-4 sm:mx-0 sm:px-0"}`}
      >
        {properties.map((property, index) => (
          <div
            key={property.slug}
            className="w-[calc(100vw-2rem)] shrink-0 snap-center sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] xl:w-[calc(25%-15px)]"
          >
            <DevelopmentCard
              property={property}
              index={index}
              badgeVariant={cardBadgeVariant}
              className={`h-[480px] sm:h-[560px] lg:h-[600px] ${spotlight ? "ring-1 ring-black/5 lg:h-[620px]" : ""}`}
            />
          </div>
        ))}
      </div>

      <div
        className={`flex items-center justify-end gap-3 pr-4 sm:absolute sm:pr-0 ${navTop}`}
      >
        <button
          type="button"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-border bg-background text-primary transition-all hover:border-accent hover:bg-accent hover:text-white disabled:opacity-30 disabled:hover:border-border disabled:hover:bg-background disabled:hover:text-primary"
          aria-label="Previous property"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={scrollRight}
          disabled={!canScrollRight}
          className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-border bg-background text-primary transition-all hover:border-accent hover:bg-accent hover:text-white disabled:opacity-30 disabled:hover:border-border disabled:hover:bg-background disabled:hover:text-primary"
          aria-label="Next property"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

function DevelopmentSlidesCarousel({
  properties,
}: {
  properties: Property[];
  cardBadgeVariant: "ongoing" | "completed";
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const n = properties.length;
  // Repeat list to make the marquee loop seamlessly. We pad enough
  // to fill very wide screens.
  const repeated = n === 0 ? [] : [...properties, ...properties, ...properties];

  useEffect(() => {
    if (n <= 1) return;
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    let last = performance.now();
    const speedPxPerSec = 32; // gentle drift

    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!isPaused) {
        track.scrollLeft += speedPxPerSec * dt;
        // When we scroll past one set, jump back by that set's width to loop seamlessly
        const oneSetWidth = track.scrollWidth / 3;
        if (track.scrollLeft >= oneSetWidth * 2) {
          track.scrollLeft -= oneSetWidth;
        }
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [n, isPaused]);

  if (n === 0) return null;

  return (
    <div
      className="relative w-full"
      role="region"
      aria-roledescription="carousel"
      aria-label="Completed developments showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div
        ref={trackRef}
        className="scrollbar-none flex w-full overflow-x-auto py-12 md:py-16"
      >
        <div className="flex shrink-0 items-center gap-6 px-4 sm:gap-8 md:gap-10 lg:gap-12">
          {repeated.map((property, i) => {
            const up = i % 2 === 0;
            return (
              <DevelopmentNamedTile
                key={`${property.slug}-${i}`}
                property={property}
                titleAbove={up}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DevelopmentNamedTile({
  property,
  titleAbove,
}: {
  property: Property;
  titleAbove: boolean;
}) {
  const cover = property.gallery[0] ?? "/images/logo.svg";

  const Title = (
    <div
      className={`flex w-full max-w-[260px] flex-col gap-1.5 sm:max-w-[300px] md:max-w-[340px] ${
        titleAbove ? "items-start text-left" : "items-end text-right"
      }`}
    >
      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
        {property.location}
      </span>
      <h3 className="font-serif text-xl font-normal leading-snug tracking-wide text-primary md:text-2xl lg:text-[1.65rem]">
        {property.title}
      </h3>
      <span
        className={`mt-0.5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-light transition-colors group-hover/tile:text-accent ${
          titleAbove ? "" : "flex-row-reverse"
        }`}
      >
        <MapPin className="h-3 w-3" strokeWidth={1.5} />
        {property.status}
      </span>
    </div>
  );

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group/tile flex shrink-0 flex-col items-stretch gap-4 transition-transform duration-500 ease-out hover:-translate-y-1 sm:gap-5"
      aria-label={`View ${property.title}`}
    >
      {titleAbove && <div className="px-1">{Title}</div>}

      <div className="relative h-[340px] w-[260px] overflow-hidden rounded-sm bg-primary/5 shadow-[0_18px_45px_-26px_rgba(26,26,26,0.5)] sm:h-[400px] sm:w-[300px] md:h-[460px] md:w-[340px] lg:h-[520px] lg:w-[380px]">
        <Image
          src={cover}
          alt={property.title}
          fill
          sizes="(max-width:640px) 260px, (max-width:1024px) 340px, 380px"
          className="object-cover transition-transform duration-[1.4s] ease-out group-hover/tile:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {!titleAbove && <div className="px-1">{Title}</div>}
    </Link>
  );
}
