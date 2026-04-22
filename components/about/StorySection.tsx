"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const narrative = [
  "Dirrir Realtor Limited is a Nairobi-based real estate advisory and brokerage brand operating under Rabat Properties Limited. Our work is guided by verified listings, transparent process, and long-term value for both homeowners and investors.",
  "Beyond sourcing homes, we provide an integrated support journey across property search, advisory, negotiation, and transaction guidance. This end-to-end approach gives clients one clear, reliable partner from first shortlist to final handover.",
];

const stats = [
  { value: "100+", label: "Happy Clients" },
  { value: "50+", label: "Properties Sold" },
  { value: "5+", label: "Prime Nairobi Areas" },
];

export function StorySection({ title }: { title: string }) {
  return (
    <section className="bg-background py-20 lg:py-32">
      <Container>
        <div className="mx-auto max-w-5xl">
          <RevealOnScroll direction="up" duration={1.15}>
            <p className="text-center font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
              About Dirrir Realtor
            </p>
          </RevealOnScroll>
          <RevealOnScroll direction="up" delay={0.12} duration={1.2}>
            <h2 className="mx-auto mt-8 max-w-4xl text-center font-sans text-4xl font-medium leading-[1.08] tracking-tight text-primary sm:text-5xl">
              {title}
            </h2>
          </RevealOnScroll>

          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
            {narrative.map((text, index) => (
              <motion.p
                key={text}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-base leading-relaxed text-text-light sm:text-lg"
              >
                {text}
              </motion.p>
            ))}
          </div>

          <div className="mt-16 grid gap-6 border-y border-border py-10 sm:grid-cols-3">
            {stats.map((item, i) => (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-sans text-4xl font-semibold tracking-tight text-primary">{item.value}</p>
                <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-text-light">
                  {item.label}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
