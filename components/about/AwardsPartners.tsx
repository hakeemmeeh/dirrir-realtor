"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type Accolade = {
  title: string;
  subtitle: string;
  icon: typeof Award;
};

const accolades: Accolade[] = [
  {
    icon: Award,
    title: "Trusted Advisory",
    subtitle: "Recognised for transparent process across diaspora and local clients.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Listings",
    subtitle: "Every listing inspected and documented before reaching clients.",
  },
  {
    icon: BadgeCheck,
    title: "Rabat Group",
    subtitle: "Operating under Rabat Properties Limited — established Nairobi developer.",
  },
  {
    icon: Sparkles,
    title: "5-Star Service",
    subtitle: "Consistent feedback from buyers, renters, and investor clients.",
  },
];

const partners = [
  "Rabat Properties",
  "Housing Finance Kenya",
  "KCB Mortgage",
  "Stanbic Bank",
  "Hass Consult Index",
  "Knight Frank KE",
];

export function AwardsPartners() {
  return (
    <section className="bg-background-alt py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <RevealOnScroll direction="up" duration={1.1}>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
              Recognition &amp; Partners
            </p>
          </RevealOnScroll>
          <RevealOnScroll direction="up" delay={0.08} duration={1.2}>
            <h2 className="mt-5 font-sans text-3xl font-medium tracking-tight text-primary sm:text-4xl">
              Accountability you can stand behind.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll direction="up" delay={0.16} duration={1.2}>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-text-light sm:text-base">
              Guided by a transparent operating standard, backed by an established real estate group,
              and aligned with reputable financial partners across Kenya.
            </p>
          </RevealOnScroll>
        </div>

        <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {accolades.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-start border border-border bg-background p-6 sm:p-7"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center border border-border bg-background-alt text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-5 font-sans text-base font-semibold text-primary sm:text-lg">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-text-light">{item.subtitle}</p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-16">
          <RevealOnScroll direction="up" duration={1.1}>
            <p className="text-center font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-text-light">
              Partner ecosystem
            </p>
          </RevealOnScroll>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 border-y border-border py-8 sm:gap-x-12">
            {partners.map((p, i) => (
              <motion.span
                key={p}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.06 }}
                className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-text-light transition-colors hover:text-primary sm:text-xs"
              >
                {p}
              </motion.span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
