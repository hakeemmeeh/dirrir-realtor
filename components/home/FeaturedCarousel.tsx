"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { Container } from "@/components/ui/Container";
import type { Property } from "@/lib/properties";

const brochureHref =
  typeof process.env.NEXT_PUBLIC_BROCHURE_URL === "string" &&
  process.env.NEXT_PUBLIC_BROCHURE_URL.length > 0
    ? process.env.NEXT_PUBLIC_BROCHURE_URL
    : "/brochures/dirrir-portfolio.pdf";

/** HassConsult-style: dark editorial masthead → full-bleed imagery tied to slide → edge carousel. */
export function FeaturedCarousel({ items }: { items: Property[] }) {
  const t = useTranslations("Home");
  const pathname = usePathname();
  const railRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const portfolioHref = pathname === "/developments" ? "/properties" : "/developments";

  const scrollTo = useCallback((dir: -1 | 1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector("[data-carousel-card]");
    const w = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const root = railRef.current;
    if (!root) return;

    const onScroll = () => {
      const card = root.querySelector("[data-carousel-card]");
      const gap = 16;
      const w = card ? card.getBoundingClientRect().width + gap : 1;
      const i = Math.round(root.scrollLeft / w);
      setIndex(Math.min(Math.max(i, 0), items.length - 1));
    };

    root.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => root.removeEventListener("scroll", onScroll);
  }, [items.length]);

  if (items.length === 0) return null;

  const stripSrc = items[Math.min(index, items.length - 1)]?.gallery[0];
  const stripAlt = items[Math.min(index, items.length - 1)]?.title ?? "";

  return (
    <section
      id="portfolio"
      className="scroll-mt-32 scroll-pt-4 sm:scroll-mt-36"
    >
      {/* Masthead — cleaner developer tone with restrained accents */}
      <div className="border-y border-border bg-background-alt text-primary">
        <Container className="py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-7">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.38em] text-accent">
                {t("carouselEyebrow")}
              </p>
              <h2 className="mt-6 font-sans text-[2.35rem] font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
                {t("portfolioMastheadTitle")}
              </h2>
              <p className="story-editorial mt-8 max-w-2xl text-base leading-relaxed text-text-light sm:text-lg">
                {t("portfolioMastheadLine")}
              </p>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-text-light sm:text-base">
                {t("portfolioNarrative")}
              </p>
              <p className="mt-4 max-w-2xl font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-text-light">
                {t("portfolioPreviewNote")}
              </p>
            </div>
            <div className="flex flex-col gap-8 lg:col-span-5 lg:items-end lg:text-right">
              <div className="flex items-baseline gap-1 font-sans tabular-nums">
                <span className="text-5xl font-medium text-primary sm:text-6xl lg:text-7xl xl:text-8xl">
                  {index + 1}
                </span>
                <span className="text-3xl text-accent sm:text-4xl lg:text-5xl" aria-hidden>
                  /
                </span>
                <span className="text-3xl text-text-light sm:text-4xl lg:text-5xl">{items.length}</span>
              </div>
              <p className="max-w-xs font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-text-light lg:ml-auto">
                {t("featuredSub")}
              </p>
              <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                {items.length > 1 ? (
                  <>
                    <button
                      type="button"
                      aria-label="Previous"
                      onClick={() => scrollTo(-1)}
                      className="rounded-none border border-border bg-background p-2.5 text-primary transition-colors hover:border-accent hover:text-accent"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next"
                      onClick={() => scrollTo(1)}
                      className="rounded-none border border-border bg-background p-2.5 text-primary transition-colors hover:border-accent hover:text-accent"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                ) : null}
                <Link
                  href={portfolioHref}
                  className="ml-1 text-sm font-semibold text-accent transition-colors hover:text-white"
                >
                  {pathname === "/developments" ? t("viewAll") : t("portfolioNavPortfolio")} →
                </Link>
                <a
                  href={brochureHref}
                  download
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary/90 transition-colors hover:text-accent"
                >
                  <Download className="h-4 w-4 shrink-0" aria-hidden />
                  {t("portfolioBrochure")}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Full-bleed sequence strip — image follows active slide */}
      {stripSrc ? (
        <div className="relative h-[min(38vh,420px)] w-full min-h-[200px]">
          <Image
            key={stripSrc}
            src={stripSrc}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority={index === 0}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary via-transparent to-transparent opacity-90"
            style={{ height: "45%" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-background via-background/40 to-transparent"
            aria-hidden
          />
          <p className="pointer-events-none absolute bottom-4 left-1/2 z-[1] hidden max-w-[90vw] -translate-x-1/2 truncate text-center font-mono text-[9px] font-bold uppercase tracking-luxury-widest text-white/80 sm:block">
            {stripAlt}
          </p>
        </div>
      ) : null}

      {/* Carousel rail - Reverted to bright background to pop the standard cards */}
      <div className="bg-background pb-20 pt-4 lg:pb-32 lg:pt-10">
        <div className="relative">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-10 bg-gradient-to-r from-background to-transparent sm:w-24"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-10 bg-gradient-to-l from-background to-transparent sm:w-24"
            aria-hidden
          />

          <div
            ref={railRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-3 pt-2 sm:gap-6 sm:px-6 lg:px-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))]"
          >
            {items.map((p, i) => (
              <div key={p.slug} data-carousel-card className="snap-center w-[min(90vw,400px)] lg:w-[480px]">
                <PropertyCard property={p} index={i} />
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-text-light lg:hidden">{t("slideHint")}</p>
        </div>
      </div>
    </section>
  );
}
