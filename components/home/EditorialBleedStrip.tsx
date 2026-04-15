"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

const STRIP_IMAGE =
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c0b?auto=format&fit=crop&w=2400&q=82";

/** Full-bleed imagery beat between homepage sections (Hass-style pacing). */
export function EditorialBleedStrip() {
  const t = useTranslations("Home");

  return (
    <figure className="relative left-1/2 right-1/2 -mx-[50vw] w-screen max-w-[100vw]">
      <div className="relative h-[min(38vh,440px)] w-full min-h-[200px] sm:h-[min(42vh,520px)]">
        <Image
          src={STRIP_IMAGE}
          alt={t("editorialStripAlt")}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/75 via-primary/25 to-transparent sm:from-primary/65"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent"
          aria-hidden
        />
        <figcaption className="absolute inset-x-0 bottom-0 z-[1] pb-8 pt-16 sm:pb-10">
          <Container>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-white/90">
              {t("editorialStripCaption")}
            </p>
          </Container>
        </figcaption>
      </div>
    </figure>
  );
}
