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
        <Container className="relative py-16 lg:py-20">
          <span
            className="pointer-events-none absolute right-6 top-8 font-serif text-[5rem] font-medium leading-none text-white/[0.06] sm:right-10 sm:text-[7rem] lg:right-12 lg:top-10 lg:text-[9rem]"
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
              className="mt-8 font-serif text-2xl font-medium leading-tight sm:text-3xl lg:text-4xl"
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

      <div className="bg-background py-20 lg:py-28">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={getStaggerContainer(!!reduceMotion)}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {keys.map((item, i) => {
              const Icon = icons[i];
              return (
                <motion.article
                  key={item.title}
                  variants={itemVariants}
                  className={cn(
                    "group relative flex flex-col rounded-none border border-border bg-background p-8 transition-all duration-300",
                    "hover:-translate-y-1 hover:border-accent/50",
                  )}
                >
                  <span className="absolute left-0 top-0 h-[2px] w-0 bg-accent transition-all duration-500 group-hover:w-full" />
                  <Icon
                    className="h-10 w-10 text-primary transition-colors group-hover:text-accent"
                    strokeWidth={1.25}
                  />
                  <h3 className="mt-6 font-serif text-xl text-primary">{t(item.title)}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-light">{t(item.body)}</p>
                  <Link
                    href={item.href}
                    className="mt-6 inline-flex items-center font-mono text-[10px] font-bold uppercase tracking-luxury-widest text-accent transition-colors hover:text-primary"
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
