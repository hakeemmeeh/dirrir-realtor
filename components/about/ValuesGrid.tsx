"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eye, Heart, Shield, Sparkles } from "lucide-react";

const values = [
  {
    title: "Transparency",
    body: "No hidden fees, no surprises. We keep you informed at every stage.",
    Icon: Eye,
  },
  {
    title: "Integrity",
    body: "We represent properties honestly and act in our clients' best interests.",
    Icon: Shield,
  },
  {
    title: "Community",
    body: "We serve a diverse clientele and take pride in connecting people to communities where they belong.",
    Icon: Heart,
  },
  {
    title: "Excellence",
    body: "From property selection to after-sales support, we deliver a premium experience.",
    Icon: Sparkles,
  },
];

export function ValuesGrid({ sectionTitle }: { sectionTitle: string }) {
  return (
    <section className="bg-background py-20 lg:py-32">
      <Container>
        <div className="flex flex-col items-center text-center">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
            Our DNA
          </p>
          <h2 className="mt-6 font-sans text-4xl font-medium tracking-tight text-primary sm:text-5xl">
            {sectionTitle}
          </h2>
          <div className="mt-8 h-px w-24 bg-accent/30" />
        </div>
        
        <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.article
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 + 0.1 }}
                whileHover={{ y: -4, scale: 1.05 }}
                className="flex h-20 w-20 items-center justify-center rounded-none bg-accent/5 transition-colors group-hover:bg-accent/10"
              >
                <v.Icon className="h-9 w-9 text-accent transition-transform duration-300 group-hover:scale-110" strokeWidth={1.2} />
              </motion.div>
              <h3 className="mt-8 font-serif text-2xl font-medium text-primary">{v.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-text-light/80">{v.body}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
