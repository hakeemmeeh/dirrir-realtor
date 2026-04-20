"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Building2, Globe2, KeyRound, LineChart } from "lucide-react";
import { fadeUp, fadeUpReduced, getStaggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const icons = [Building2, KeyRound, LineChart, Globe2] as const;
const keys = [
  { title: "serviceSalesTitle", body: "serviceSalesBody", href: "/services#sales" },
  { title: "serviceRentTitle", body: "serviceRentBody", href: "/services#rentals" },
  { title: "serviceAdvisoryTitle", body: "serviceAdvisoryBody", href: "/services#advisory" },
  { title: "serviceDiasporaTitle", body: "serviceDiasporaBody", href: "/services#diaspora" },
] as const;

export function ServiceCards() {
  const t = useTranslations("Home");
  const reduceMotion = useReducedMotion();
  const itemVariants = reduceMotion ? fadeUpReduced : fadeUp;

  return (
    <section>
      <div className="bg-primary text-ivory">
        <Container className="relative py-20 lg:py-24">
          <span
            className="pointer-events-none absolute right-6 top-8 font-sans text-[5rem] font-medium leading-none tracking-tight text-white/[0.06] sm:right-10 sm:text-[7rem] lg:right-12 lg:top-10 lg:text-[9rem]"
            aria-hidden
          >
            {t("servicesChapter")}
          </span>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={getStaggerContainer(!!reduceMotion)}
            className="relative max-w-3xl"
          >
            <motion.p
              variants={itemVariants}
              className="font-mono text-[10px] font-bold uppercase tracking-luxury-widest text-accent"
            >
              {t("servicesKicker")}
            </motion.p>
            <motion.div variants={itemVariants} className="premium-hairline mt-4 h-px w-40 sm:w-48" />
            <motion.h2
              variants={itemVariants}
              className="mt-8 font-sans text-2xl font-medium leading-tight tracking-tight sm:text-3xl lg:text-4xl"
            >
              {t("servicesTitle")}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-2xl text-sm leading-relaxed text-ivory/75 sm:text-base"
            >
              {t("servicesSub")}
            </motion.p>
          </motion.div>
        </Container>
      </div>

      <div className="bg-background py-24 lg:py-32">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={getStaggerContainer(!!reduceMotion)}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {keys.map((item, i) => {
              const Icon = icons[i];
              return (
                <motion.article
                  key={item.title}
                  variants={itemVariants}
                  className={cn(
                    "group relative flex min-h-[25rem] flex-col overflow-hidden rounded-none border border-border/80 bg-background p-10 transition-all duration-500",
                    "hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_28px_70px_rgba(26,26,26,0.08)]",
                  )}
                >
                  <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(196,30,36,0.07),transparent_38%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden
                  />
                  <span className="absolute left-0 top-0 h-px w-16 bg-accent transition-all duration-500 group-hover:w-full" />

                  <div className="relative flex items-start justify-between gap-6">
                    <div className="flex h-16 w-16 items-center justify-center border border-primary/12 bg-primary transition-colors duration-500 group-hover:border-accent/30 group-hover:bg-primary">
                      <Icon
                        className="h-8 w-8 text-white transition-colors duration-500 group-hover:text-accent"
                        strokeWidth={1.2}
                      />
                    </div>
                    <div className="mt-1 h-px flex-1 bg-border transition-colors duration-500 group-hover:bg-accent/20" />
                  </div>

                  <h3 className="relative mt-8 max-w-[14rem] font-sans text-[1.75rem] font-medium leading-[1.08] tracking-tight text-primary transition-colors duration-300 group-hover:text-accent sm:text-[1.9rem]">
                    {t(item.title)}
                  </h3>
                  <p className="relative mt-5 flex-1 max-w-[18rem] text-sm leading-7 text-text-light sm:text-[0.95rem]">
                    {t(item.body)}
                  </p>

                  <div className="relative mt-8 h-px w-full bg-border/80" />
                  <Link
                    href={item.href}
                    className="relative mt-7 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-luxury-widest text-accent transition-all duration-300 hover:gap-3 hover:text-primary"
                  >
                    {t("learnMore")} →
                  </Link>
                </motion.article>
              );
            })}
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
