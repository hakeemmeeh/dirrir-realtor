"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DevelopmentCard } from "@/components/home/DevelopmentCard";
import type { Property } from "@/lib/properties";
import { cn } from "@/lib/utils";

type Props = {
  properties: Property[];
};

export function DevelopmentCarousel({ properties }: Props) {
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
    if (scrollRef.current) {
      // scroll by one card width roughly
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
         const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
         if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 10) {
           // Reset to beginning
           scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
         } else {
           scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
         }
      }
    }, 4500); // Auto-scroll every 4.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative group/carousel w-full">
      {/* Navigation Arrows */}
      <div className="absolute -top-24 right-4 sm:right-0 flex items-center gap-3">
        <button
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-primary transition-all hover:border-accent hover:bg-accent hover:text-white disabled:opacity-30 disabled:hover:border-border disabled:hover:bg-background disabled:hover:text-primary"
          aria-label="Previous property"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
        </button>
        <button
          onClick={scrollRight}
          disabled={!canScrollRight}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-primary transition-all hover:border-accent hover:bg-accent hover:text-white disabled:opacity-30 disabled:hover:border-border disabled:hover:bg-background disabled:hover:text-primary"
          aria-label="Next property"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-8 -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {properties.map((property, index) => (
          <div
            key={property.slug}
            // Fit ~4 cards on XL screens, 3 on LG, 2 on MD, 1 on Mobile
            className="w-[85vw] shrink-0 snap-center sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] xl:w-[calc(25%-15px)]"
          >
            {/* Override the default tall height so they fit better when smaller */}
            <DevelopmentCard 
              property={property} 
              index={index} 
              className="h-[380px] sm:h-[440px]" 
            />
          </div>
        ))}
      </div>
    </div>
  );
}