"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = { images: string[]; title: string };

export function PropertyGallery({ images, title }: Props) {
  const [active, setActive] = useState(0);
  const [idx, setIdx] = useState<number | null>(null);
  const [broken, setBroken] = useState<Record<string, boolean>>({});
  const total = images.length;

  if (total === 0) return null;

  const go = (dir: -1 | 1) => {
    setActive((i) => (i + dir + total) % total);
  };

  const srcAt = (i: number) => (broken[images[i]] ? "/images/intro-detail.png" : images[i]);

  return (
    <>
      <div className="space-y-5">
        <div className="relative">
          <button
            type="button"
            onClick={() => setIdx(active)}
            className="relative block aspect-[21/9] w-full overflow-hidden bg-background-alt focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <Image
              src={srcAt(active)}
              alt={`${title} — ${active + 1}`}
              fill
              className="object-cover transition-transform duration-700 hover:scale-[1.02]"
              sizes="(min-width:1280px) 80vw, 100vw"
              priority
              onError={() => setBroken((b) => ({ ...b, [images[active]]: true }))}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </button>
          <div className="pointer-events-none absolute bottom-4 right-4 bg-black/55 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white">
            {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
          {total > 1 ? (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => go(-1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-sm bg-black/45 p-2 text-white transition-colors hover:bg-black/65"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={() => go(1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-sm bg-black/45 p-2 text-white transition-colors hover:bg-black/65"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          ) : null}
        </div>

        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className="relative aspect-[16/10] w-36 shrink-0 snap-start overflow-hidden border border-border sm:w-44"
              aria-label={`Show image ${i + 1}`}
            >
              <Image
                src={broken[src] ? "/images/intro-detail.png" : src}
                alt={`${title} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="176px"
                onError={() => setBroken((b) => ({ ...b, [src]: true }))}
              />
              <div
                className={`absolute inset-0 transition-colors ${
                  i === active ? "ring-2 ring-accent ring-inset" : "bg-black/25 hover:bg-black/10"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {idx !== null ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIdx(null)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              aria-label="Close"
              onClick={(e) => {
                e.stopPropagation();
                setIdx(null);
              }}
            >
              <X className="h-6 w-6" />
            </button>
            <div
              className="relative h-[70vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={srcAt(idx)}
                alt={`${title} — ${idx + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                onError={() => setBroken((b) => ({ ...b, [images[idx]]: true }))}
              />
              {total > 1 ? (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={() => setIdx((i) => (i === null ? 0 : (i - 1 + total) % total))}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-sm bg-white/10 p-2 text-white hover:bg-white/20"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={() => setIdx((i) => (i === null ? 0 : (i + 1) % total))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm bg-white/10 p-2 text-white hover:bg-white/20"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
