"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { fadeUp, fadeUpReduced, getStaggerContainer, slideInLeft, slideInRight } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const BEAT_IMAGES = [
  "/images/story-1.png",
  "/images/story-2.png",
  "/images/story-3.png",
] as const;

const beatAltKeys = ["story1ImageAlt", "story2ImageAlt", "story3ImageAlt"] as const;

export function Storybeats() {
  const t = useTranslations("Home");
  const reduceMotion = useReducedMotion();
  const itemVariants = reduceMotion ? fadeUpReduced : fadeUp;
  const beats = [
    { title: t("story1Title"), body: t("story1Body") },
    { title: t("story2Title"), body: t("story2Body") },
    { title: t("story3Title"), body: t("story3Body") },
  ] as const;

  return (
    <section className="border-y border-border bg-ivory">
      <Container className="pt-20 lg:pt-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={getStaggerContainer(!!reduceMotion)}
        >
          <span
            className="pointer-events-none absolute left-4 top-10 font-serif text-[4.5rem] font-medium leading-none text-primary/[0.04] sm:text-[6rem] lg:left-8 lg:text-[7.5rem]"
            aria-hidden
          >
            PROCESS
          </span>
          <motion.p
            variants={itemVariants}
            className="relative font-mono text-[10px] font-bold uppercase tracking-luxury-widest text-accent"
          >
            {t("storyKicker")}
          </motion.p>
          <motion.div variants={itemVariants} className="premium-hairline-accent relative mt-4 h-px w-32" />
          <motion.h2
            variants={itemVariants}
            className="mt-8 max-w-2xl text-balance font-serif text-2xl font-medium leading-tight text-primary sm:text-3xl lg:text-[2.125rem]"
          >
            {t("storySectionTitle")}
          </motion.h2>
        </motion.div>
      </Container>

      <div className="mt-14 lg:mt-24">
        {beats.map((beat, i) => {
          const imageRight = i % 2 === 0;
          return (
            <motion.article
              key={beat.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={getStaggerContainer(!!reduceMotion)}
              className={cn(
                "border-t border-border/80 first:border-t-0",
                i === beats.length - 1 && "border-b border-border/80",
              )}
            >
              <div className="mx-auto grid max-w-content lg:grid-cols-2 lg:items-stretch">
                <motion.div
                  variants={reduceMotion ? fadeUpReduced : (imageRight ? slideInLeft : slideInRight)}
                  className={cn(
                    "flex flex-col justify-center px-4 py-16 sm:px-6 sm:py-20 lg:px-14 lg:py-28 xl:px-20",
                    imageRight ? "lg:order-1" : "lg:order-2",
                  )}
                >
                  <span className="font-mono text-xs font-bold tabular-nums text-accent/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 font-serif text-3xl font-medium leading-tight text-primary sm:text-4xl">
                    {beat.title}
                  </h3>
                  <p className="mt-7 max-w-md text-base leading-relaxed text-text-light sm:text-lg">
                    {beat.body}
                  </p>
                </motion.div>
                <div
                  className={cn(
                    "group relative min-h-[300px] overflow-hidden sm:min-h-[400px] lg:min-h-[min(65vh,600px)]",
                    imageRight ? "lg:order-2" : "lg:order-1",
                  )}
                >
                  <motion.div
                    variants={reduceMotion ? fadeUpReduced : (imageRight ? slideInRight : slideInLeft)}
                    className="absolute inset-0"
                  >
                    <Image
                      src={BEAT_IMAGES[i]}
                      alt={t(beatAltKeys[i])}
                      fill
                      className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.04]"
                      sizes="(max-width:1024px) 100vw, 50vw"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent"
                      aria-hidden
                    />
                  </motion.div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
