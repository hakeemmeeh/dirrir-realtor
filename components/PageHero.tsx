"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";

type Props = {
  title: string;
  subtitle?: string;
  compact?: boolean;
  /** Optional background video (e.g. property tour). Falls back to gradient only when omitted. */
  videoSrc?: string;
  posterSrc?: string;
};

export function PageHero({ title, subtitle, compact, videoSrc, posterSrc }: Props) {
  const reduceMotion = useReducedMotion();
  const [mountVideo, setMountVideo] = useState(false);

  useEffect(() => {
    if (!videoSrc || reduceMotion) {
      setMountVideo(false);
      return;
    }
    setMountVideo(false);
    const t = window.setTimeout(() => setMountVideo(true), 400);
    return () => window.clearTimeout(t);
  }, [videoSrc, posterSrc, reduceMotion]);

  return (
    <section
      className={`relative min-h-[220px] overflow-hidden text-ivory ${compact ? "pt-28 pb-20 sm:py-24 lg:py-28" : "pt-32 pb-20 sm:pt-32 sm:pb-24 lg:py-36"} ${
        videoSrc ? "bg-primary" : "bg-gradient-to-br from-charcoal via-primary to-primary"
      }`}
    >
      {videoSrc ? (
        <>
          {posterSrc ? (
            <Image
              src={posterSrc}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority
              aria-hidden
            />
          ) : null}
          {mountVideo ? (
            <video
              className="absolute inset-0 h-full min-h-[320px] w-full object-cover"
              src={videoSrc}
              poster={posterSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
            />
          ) : null}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-charcoal/92 via-primary/88 to-primary/95"
            aria-hidden
          />
        </>
      ) : null}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(196,30,36,0.14), transparent 42%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.06), transparent 38%)",
        }}
      />
      <Container className="relative">
        <div className="max-w-3xl">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-accent sm:text-[11px]">
            Dirrir Realtor Limited
          </p>
          <div className="premium-hairline mt-4 h-px w-32 sm:w-40" />
          <motion.h1
            initial={{ opacity: 0, x: -56 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.3, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-sans text-[2rem] font-medium leading-[1.1] tracking-tight sm:mt-6 sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>
          {subtitle ? (
            <motion.p
              initial={{ opacity: 0, x: -56 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="story-editorial mt-5 max-w-2xl text-[1rem] leading-relaxed text-white/90 sm:mt-6 sm:text-lg"
            >
              {subtitle}
            </motion.p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
