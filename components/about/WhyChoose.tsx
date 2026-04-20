"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Check } from "lucide-react";

const items = [
  "Local expertise across Parklands, Kilimani, Westlands, Lavington, and more.",
  "Clear communication and transparent documentation at every step.",
  "Dedicated diaspora support — virtual viewings, secure transactions, and remote advisory.",
  "Verified listings only — every property is inspected before it reaches you.",
  "End-to-end support from property search through to move-in day.",
];

export function WhyChoose({ title }: { title: string }) {
  return (
    <section className="bg-charcoal py-24 text-white lg:py-36">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
              The Dirrir Advantage
            </p>
            <h2 className="mt-6 font-sans text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">
              {title}
            </h2>
            <div className="mt-8 h-px w-20 bg-accent/40" />
          </div>
          
          <div className="lg:col-span-8">
            <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
              {items.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-4"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-none border border-accent/30 text-accent">
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="text-sm leading-relaxed text-ivory/80 sm:text-base">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
