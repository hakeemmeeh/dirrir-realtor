"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useTranslations } from "next-intl";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function CollectionChoiceGrid() {
  const t = useTranslations("Home");

  const collections = [
    {
      id: "living",
      title: t("livingCollectionTitle"),
      lead: t("livingCollectionLead"),
      image: "/images/collection-living.png",
      href: "/properties?collection=living",
      label: t("portfolioNavLiving"),
    },
    {
      id: "investment",
      title: t("investmentCollectionTitle"),
      lead: t("investmentCollectionLead"),
      image: "/images/collection-investment.png",
      href: "/properties?collection=investment",
      label: t("portfolioNavInvestment"),
    },
  ];

  return (
    <section className="bg-background-alt py-20 lg:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent"
          >
            {t("introKicker")}
          </motion.p>
          <RevealOnScroll delay={0.1} duration={1.35} distance={90} direction="up">
            <h2 className="mt-6 font-sans text-3xl font-medium tracking-tight text-primary sm:text-4xl lg:text-5xl">
              {t("portfolioNarrative")}
            </h2>
          </RevealOnScroll>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:mt-24 lg:gap-12">
          {collections.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-none bg-charcoal shadow-2xl transition-all duration-500 hover:-translate-y-2 lg:aspect-[2/3]"
            >
              <Link href={c.href} className="absolute inset-0 z-10 block">
                <span className="sr-only">Explore {c.title}</span>
              </Link>
              <Image
                src={c.image}
                alt={c.title}
                fill
                className="object-cover opacity-70 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
              
              <div className="absolute inset-x-0 bottom-0 px-8 pb-8 pt-10 lg:px-12 lg:pb-10 lg:pt-14">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                  Collection {i + 1}
                </span>
                <h3 className="mt-3 font-sans text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {c.title}
                </h3>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/80 sm:text-base">
                  {c.lead}
                </p>
                <div className="mt-8">
                  <div className="inline-flex items-center justify-center rounded-none border border-accent bg-accent/10 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-accent group-hover:text-primary">
                    Explore {c.label}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
