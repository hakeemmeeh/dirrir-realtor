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
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <Image
          src={HERO_IMAGE}
          alt="Nairobi skyline"
          fill
          priority
          className="scale-105 object-cover"
          sizes="100vw"
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
      <Container className="relative flex min-h-[100svh] flex-col justify-end pb-12 pt-40 lg:pb-16 lg:pt-48">
        <div className="max-w-3xl text-white">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 font-mono text-[11px] font-bold uppercase tracking-luxury-widest text-accent"
          >
            Dirrir Realtor Limited
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="premium-hairline h-px w-44 origin-left sm:w-52" 
          />
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 font-sans text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
          >
            {t("heroTitle")}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="story-editorial mt-7 max-w-2xl text-white/80"
          >
            {t("heroSub")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button href="/properties" variant="primary" className="justify-center">
              {t("browse")}
            </Button>
            <Button href="/contact" variant="luxury" className="justify-center">
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
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.slug}
            className="absolute inset-0"
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
                  className="object-cover"
                  sizes="100vw"
                />
                {videoReady ? (
                  <video
                    className="absolute inset-0 h-full w-full scale-105 object-cover"
                    src={current.heroVideoUrl}
                    poster={current.gallery[0]}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
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
                className="object-cover"
                sizes="100vw"
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

      <Container className="relative flex min-h-[100svh] flex-col justify-end pb-8 pt-40 lg:pb-12 lg:pt-48">
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl text-white">
            <p className="font-mono text-[11px] font-bold uppercase tracking-luxury-widest text-accent">
              {t("carouselEyebrow")}
            </p>
            <div className="premium-hairline mt-4 h-px w-40 sm:w-48" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-6 font-mono text-[10px] font-bold uppercase tracking-luxury-widest text-white/80"
                  aria-live="polite"
                >
                  {t("heroSlideOf", { current: index + 1, total: len })}
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-5 font-sans text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-[4.5rem]"
                >
                  {t("heroTitle")}
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg max-w-2xl"
                >
                  {t("heroSub")}
                </motion.p>

                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8 text-lg font-semibold text-white"
                >
                  {current.title} — {current.location}
                </motion.p>

                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-2 text-lg font-semibold text-accent"
                >
                  {priceLabel}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center"
                >
                  <Button
                    href={`/properties/${current.slug}`}
                    variant="primary"
                    className="justify-center"
                  >
                    {t("heroViewListing")}
                  </Button>
                  <Button href="/properties" variant="luxury" className="justify-center">
                    {t("browse")}
                  </Button>
                  <Button href="/contact" variant="ghost" className="justify-center !text-white hover:!text-accent">
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
