"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = { images: string[]; title: string };

export function PropertyGallery({ images, title }: Props) {
  const [idx, setIdx] = useState<number | null>(null);

  return (
    <>
      <div className="grid gap-2 sm:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setIdx(i)}
            className="relative aspect-[16/10] overflow-hidden rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <Image
              src={src}
              alt={`${title} — ${i + 1}`}
              fill
              className="object-cover transition-transform hover:scale-105"
              sizes="(max-width:640px) 100vw, 33vw"
            />
          </button>
        ))}
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
                src={images[idx]}
                alt={title}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
