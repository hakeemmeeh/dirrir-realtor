"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, getStaggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FileText, ArrowRight } from "lucide-react";

export function MarketIntelligence() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-t border-border bg-background py-24 lg:py-36">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={getStaggerContainer(!!reduceMotion)}
          className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-16 sm:flex-row"
        >
          <div className="flex-1 text-center sm:text-left">
            <motion.p
              variants={fadeUp}
              className="font-mono text-[10px] font-bold uppercase tracking-luxury-widest text-accent"
            >
              Market Intelligence
            </motion.p>
            <motion.div variants={fadeUp} className="premium-hairline-accent mx-auto mt-4 h-px w-24 sm:mx-0 sm:w-32" />
            <motion.h2
              variants={fadeUp}
              className="mt-8 font-sans text-3xl font-medium leading-[1.1] tracking-tight text-primary sm:text-4xl lg:text-5xl"
            >
              The East Africa Property Report
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-lg text-sm leading-relaxed text-text-light sm:text-base lg:text-lg"
            >
              Access our proprietary data and quarterly insights on Nairobi’s highest performing real estate sectors. Make your next move with total clarity.
            </motion.p>
          </div>
          
          <motion.div variants={fadeUp} className="flex shrink-0 flex-col items-center gap-7 rounded-none border border-border bg-ivory p-10 shadow-[0_20px_60px_rgba(26,26,26,0.08)] sm:p-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-none bg-primary text-accent">
              <FileText className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <div className="text-center">
              <p className="font-mono text-[10px] font-bold uppercase tracking-luxury-wide text-primary/60">
                Latest Release
              </p>
              <p className="mt-2 font-serif text-xl font-medium text-primary">Q3 2026 Quarter Review</p>
            </div>
            <Button
              href="/contact"
              variant="luxury"
              className="mt-4 w-full justify-center group"
            >
              Download Report
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
