"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, BadgeCheck, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type Accolade = {
  title: string;
  subtitle: string;
  icon: typeof Award;
};

type Partner = {
  name: string;
  accent: string;
  src: string;
  width: number;
  height: number;
  logoClassName?: string;
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

const partners: Partner[] = [
  {
    name: "Rabat Properties",
    accent: "Developer Group",
    src: "/images/partners/rabat-properties.png",
    width: 993,
    height: 88,
    logoClassName: "max-h-8 sm:max-h-9",
  },
  {
    name: "Housing Finance Kenya",
    accent: "Home Finance",
    src: "/images/partners/hf-group.png",
    width: 2000,
    height: 1175,
    logoClassName: "max-h-12 sm:max-h-14",
  },
  {
    name: "KCB Mortgage",
    accent: "Mortgage Desk",
    src: "/images/partners/kcb-bank.png",
    width: 750,
    height: 142,
    logoClassName: "max-h-9 sm:max-h-10",
  },
  {
    name: "Stanbic Bank",
    accent: "Banking Partner",
    src: "/images/partners/stanbic-bank.png",
    width: 180,
    height: 180,
    logoClassName: "max-h-10 sm:max-h-11",
  },
  {
    name: "Hass Consult Index",
    accent: "Market Research",
    src: "/images/partners/hass-consult.png",
    width: 177,
    height: 41,
    logoClassName: "max-h-8 sm:max-h-9",
  },
  {
    name: "Knight Frank KE",
    accent: "Advisory Network",
    src: "/images/partners/knight-frank.svg",
    width: 158,
    height: 65,
    logoClassName: "max-h-9 sm:max-h-10",
  },
];

const partnerTrack = [...partners, ...partners];

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
                whileHover={{ y: 0 }}
                className="group relative flex flex-col items-start overflow-hidden rounded-2xl border border-border/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.99)_0%,rgba(247,246,242,0.86)_100%)] p-7 ring-1 ring-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_12px_44px_rgba(21,31,40,0.08)] transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_28px_70px_rgba(26,26,26,0.08)] sm:p-8"
              >
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/35 via-transparent to-primary/[0.04]" />
                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(196,30,36,0.07),transparent_38%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />
                <span
                  className="absolute left-0 top-0 h-px w-16 bg-accent transition-all duration-500 group-hover:w-full"
                  aria-hidden
                />
                <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 bg-accent/7 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border/60 bg-white/80 text-accent shadow-[0_10px_26px_rgba(21,31,40,0.1)] ring-1 ring-white/60 backdrop-blur-sm transition-all duration-500 group-hover:border-accent/30 group-hover:shadow-[0_14px_32px_rgba(196,30,36,0.1)]">
                  <Icon className="h-5 w-5 transition-transform duration-500 group-hover:scale-105" strokeWidth={1.2} />
                </div>
                <p className="mt-5 font-sans text-base font-semibold text-primary transition-colors duration-500 group-hover:text-accent sm:text-lg">
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
          <div className="relative left-1/2 mt-6 w-screen -translate-x-1/2 overflow-hidden bg-charcoal py-8">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-charcoal to-transparent sm:w-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-charcoal to-transparent sm:w-20" />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative z-10 mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8"
            >
              <div className="animate-logo-marquee flex w-max items-center gap-4 group-hover:[animation-play-state:paused] sm:gap-5">
                {partnerTrack.map((partner, i) => (
                  <div
                    key={`${partner.name}-${i}`}
                    className="flex min-h-24 min-w-[220px] items-center gap-4 px-5 py-4 sm:min-w-[250px] sm:px-6"
                  >
                    <div className="min-w-0">
                      <div className="flex h-12 items-center sm:h-14">
                        <Image
                          src={partner.src}
                          alt={partner.name}
                          width={partner.width}
                          height={partner.height}
                          className={`h-auto w-auto max-w-[160px] object-contain mix-blend-multiply ${partner.logoClassName ?? ""}`}
                        />
                      </div>
                      <p className="mt-2 truncate font-sans text-sm font-semibold tracking-[0.03em] text-ivory sm:text-base">
                        {partner.name}
                      </p>
                      <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-ivory/55">
                        {partner.accent}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
