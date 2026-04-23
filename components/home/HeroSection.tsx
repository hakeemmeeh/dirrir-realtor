"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Property } from "@/lib/properties";
import { cn, formatUsd } from "@/lib/utils";

const HERO_IMAGE = "/images/hero-fallback.png";

const AUTO_MS = 8200;

/** Next/image default is 75; 92 keeps files reasonable while looking clearly sharper on hero. */
const HERO_IMAGE_QUALITY = 92;
/** Full-bleed; with extended `deviceSizes` in next.config, srcset can go up to 3840w on large screens. */
const HERO_SIZES = "100vw";

function StaticHero() {
  const t = useTranslations("Home");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10 will-change-transform [transform:translateZ(0)]"
      >
        <Image
          src={HERO_IMAGE}
          alt="Nairobi skyline"
          fill
          priority
          quality={HERO_IMAGE_QUALITY}
          sizes={HERO_SIZES}
          fetchPriority="high"
          className="object-cover [transform:translateZ(0)] scale-[1.02]"
        />
      </motion.div>
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(165deg, rgba(26,26,26,0.62) 0%, rgba(0,0,0,0.28) 38%, rgba(0,0,0,0.76) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 premium-hero-vignette" />
      <Container className="relative flex min-h-[100svh] flex-col justify-end pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-28 lg:pt-48">
        <div className="max-w-2xl text-white [text-rendering:optimizeLegibility] antialiased [text-shadow:0_1px_40px_rgba(0,0,0,0.45)]">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-[1.75rem] font-medium leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl"
          >
            {t("heroBrandName")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 font-mono text-[10px] font-bold uppercase tracking-luxury-widest text-white/70"
          >
            {t("heroBrandLocation")}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-lg font-medium text-accent sm:text-xl"
          >
            {t("heroBrandValue")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center"
          >
            <Button
              href="/properties"
              variant="heroPrimary"
              className="w-full justify-center sm:w-auto sm:min-w-[200px]"
            >
              {t("browse")}
            </Button>
            <Button
              href="/contact"
              variant="heroLuxury"
              className="w-full justify-center sm:w-auto sm:min-w-[200px]"
            >
              {t("talkAgent")}
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function HeroPropertySlideshow({ slides }: { slides: Property[] }) {
  const t = useTranslations("Home");
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const len = slides.length;
  const current = slides[index];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  useEffect(() => {
    if (reduceMotion || len <= 1) return;
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % len);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [len, reduceMotion, paused]);

  useEffect(() => {
    if (!current.heroVideoUrl || reduceMotion) {
      setVideoReady(false);
      return;
    }
    setVideoReady(false);
    const t = window.setTimeout(() => setVideoReady(true), 380);
    return () => window.clearTimeout(t);
  }, [current.slug, current.heroVideoUrl, reduceMotion]);

  const go = (dir: -1 | 1) => {
    setIndex((i) => (i + dir + len) % len);
  };

  const priceLabel =
    current.status === "For Sale"
      ? formatUsd(current.price)
      : `${formatUsd(current.price)}/mo`;

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
      }}
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10 will-change-transform [transform:translateZ(0)]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.slug}
            className="absolute inset-0 will-change-[opacity] [transform:translateZ(0)]"
            initial={{ opacity: reduceMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: reduceMotion ? 1 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            {current.heroVideoUrl ? (
              <div className="relative h-full w-full">
                <Image
                  src={current.gallery[0] ?? HERO_IMAGE}
                  alt={current.title}
                  fill
                  priority={index === 0}
                  quality={HERO_IMAGE_QUALITY}
                  sizes={HERO_SIZES}
                  fetchPriority={index === 0 ? "high" : "low"}
                  className="object-cover [transform:translateZ(0)]"
                />
                {videoReady ? (
                  <video
                    className="absolute inset-0 h-full w-full object-cover [transform:translateZ(0)] scale-[1.01]"
                    src={current.heroVideoUrl}
                    poster={current.gallery[0]}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-hidden
                  />
                ) : null}
              </div>
            ) : (
              <Image
                src={current.gallery[0] ?? HERO_IMAGE}
                alt={current.title}
                fill
                priority={index === 0}
                quality={HERO_IMAGE_QUALITY}
                sizes={HERO_SIZES}
                fetchPriority={index === 0 ? "high" : "low"}
                className="object-cover [transform:translateZ(0)]"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(165deg, rgba(13,13,21,0.78) 0%, rgba(13,13,21,0.35) 48%, rgba(13,13,21,0.88) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 premium-hero-vignette" />

      <Container className="relative flex min-h-[100svh] flex-col justify-end pb-16 pt-32 sm:pb-18 sm:pt-40 lg:pb-24 lg:pt-48">
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl text-white [text-rendering:optimizeLegibility] antialiased [text-shadow:0_1px_40px_rgba(0,0,0,0.45)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {len > 1 ? (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="font-mono text-[10px] font-bold uppercase tracking-luxury-widest text-white/65"
                    aria-live="polite"
                  >
                    {t("heroSlideOf", { current: index + 1, total: len })}
                  </motion.p>
                ) : null}

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "font-sans text-[1.65rem] font-medium leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl",
                    len > 1 ? "mt-3 sm:mt-4" : "mt-0",
                  )}
                >
                  {current.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-3 font-mono text-[10px] font-bold uppercase tracking-luxury-widest text-white/70"
                >
                  {current.location} · {current.city?.trim() || "Nairobi"}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4 text-lg font-semibold text-accent sm:text-xl"
                >
                  {priceLabel}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
                >
                  <Button
                    href={`/properties/${current.slug}`}
                    variant="heroPrimary"
                    className="w-full justify-center sm:w-auto sm:min-w-[180px]"
                  >
                    {t("heroViewListing")}
                  </Button>
                  <Button
                    href="/properties"
                    variant="heroLuxury"
                    className="w-full justify-center sm:w-auto sm:min-w-[180px]"
                  >
                    {t("browse")}
                  </Button>
                  <Button
                    href="/contact"
                    variant="heroGhost"
                    className="w-full justify-center sm:w-auto sm:min-w-[180px]"
                  >
                    {t("talkAgent")}
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {len > 1 ? (
            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-end">
              <div className="flex gap-2 self-end sm:self-auto lg:self-end">
                <button
                  type="button"
                  aria-label={t("heroPrev")}
                  onClick={() => go(-1)}
                  className="rounded-none border border-white/25 bg-black/20 p-2.5 text-white backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label={t("heroNext")}
                  onClick={() => go(1)}
                  className="rounded-none border border-white/25 bg-black/20 p-2.5 text-white backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <div className="flex justify-end gap-1.5" role="tablist" aria-label={t("heroSlidePicker")}>
                {slides.map((s, i) => (
                  <button
                    key={s.slug}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={t("heroGoToSlide", { n: i + 1 })}
                    onClick={() => setIndex(i)}
                    className={cn(
                      "h-[2px] transition-all duration-500",
                      i === index ? "w-12 bg-accent" : "w-6 bg-white/35 hover:bg-white/55",
                    )}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <p className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] uppercase tracking-luxury-widest text-white/80 lg:block">
          <Link href="/properties" className="pointer-events-auto transition-colors hover:text-accent">
            {t("viewAll")}
          </Link>
          <span className="mx-3 text-white/60">·</span>
          <span className="text-white/90">{t("heroMixedHint")}</span>
        </p>
      </Container>
    </section>
  );
}

export function HeroSection({ slides }: { slides?: Property[] }) {
  if (!slides?.length) return <StaticHero />;
  return <HeroPropertySlideshow slides={slides} />;
}
