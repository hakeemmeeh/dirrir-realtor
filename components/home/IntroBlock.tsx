"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { fadeUp, fadeUpReduced, getStaggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";

const INTRO_IMAGE_1 = "/images/hero-1.png";
const INTRO_IMAGE_2 = "/images/intro-detail.png";

export function IntroBlock() {
  const t = useTranslations("Home");
  const reduceMotion = useReducedMotion();
  const itemVariants = reduceMotion ? fadeUpReduced : fadeUp;

  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center xl:gap-16">
          {/* Text Content */}
          <div className="lg:col-span-12 xl:col-span-5">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={getStaggerContainer(!!reduceMotion)}
            >
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-accent" />
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                  {t("introKicker")}
                </p>
              </div>
              <h2 className="mt-8 font-sans text-[2.25rem] font-medium leading-[1.08] tracking-tight text-primary sm:text-[3rem] lg:text-[3.35rem] xl:text-[3.75rem]">
                {t("introTitle")}
              </h2>
              <div className="mt-10 max-w-xl space-y-7 story-editorial text-lg text-primary/80">
                <p>{t("introP1")}</p>
                <p>{t("introP2")}</p>
              </div>
            </motion.div>
          </div>

          {/* Overlapping Visuals */}
          <div className="relative lg:col-span-12 xl:col-span-7">
            <div className="grid grid-cols-12 gap-4">
              <motion.div 
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="col-span-8 aspect-[4/5] overflow-hidden"
              >
                <Image
                  src={INTRO_IMAGE_1}
                  alt={t("introImageAlt")}
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover grayscale-[20%] transition-transform duration-[2s] hover:scale-110"
                />
              </motion.div>
              <motion.div 
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="absolute -bottom-12 -right-4 z-10 w-3/5 border-[12px] border-white shadow-2xl sm:w-1/2 lg:-right-12"
              >
                <Image
                  src={INTRO_IMAGE_2}
                  alt="Detail"
                  width={500}
                  height={600}
                  className="aspect-[3/4] object-cover"
                />
              </motion.div>
            </div>
            {/* Decorative background number/Chapter */}
            <span
              className="pointer-events-none absolute -left-12 top-0 -z-10 font-sans text-[12rem] font-bold tracking-tight text-primary/[0.03]"
              aria-hidden
            >
              {t("introChapter")}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
