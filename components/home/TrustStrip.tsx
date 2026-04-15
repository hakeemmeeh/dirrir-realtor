"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";

function useCountUp(end: number, duration: number, active: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    let raf: number;
    function step(ts: number) {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setV(Math.floor(p * end));
      if (p < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, end, duration]);
  return v;
}

export function TrustStrip() {
  const t = useTranslations("Home");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const clients = useCountUp(100, 1500, inView);
  const sold = useCountUp(50, 1800, inView);
  const years = useCountUp(12, 1000, inView);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#0A0D10] py-24 text-ivory lg:py-32"
    >
      <Container className="relative">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Stat 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center border-b border-white/5 pb-12 text-center last:border-0 sm:border-b-0 sm:pb-0 lg:items-start lg:text-left"
          >
            <span className="font-serif text-6xl font-medium tracking-tight text-accent lg:text-7xl">
              {clients}+
            </span>
            <span className="mt-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ivory/60">
              {t("trust1")}
            </span>
            <div className="mt-6 hidden h-px w-12 bg-accent/30 lg:block" />
          </motion.div>

          {/* Stat 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center border-b border-white/5 pb-12 text-center last:border-0 sm:border-b-0 sm:pb-0 lg:items-start lg:text-left"
          >
            <span className="font-serif text-6xl font-medium tracking-tight text-white lg:text-7xl">
              {sold}+
            </span>
            <span className="mt-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ivory/60">
              {t("trust2")}
            </span>
            <div className="mt-6 hidden h-px w-12 bg-white/20 lg:block" />
          </motion.div>

          {/* Stat 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center border-b border-white/5 pb-12 text-center last:border-0 sm:border-b-0 sm:pb-0 lg:items-start lg:text-left"
          >
            <span className="font-serif text-6xl font-medium tracking-tight text-accent lg:text-7xl">
              {years}
            </span>
            <span className="mt-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ivory/60">
              Years of Excellence
            </span>
            <div className="mt-6 hidden h-px w-12 bg-accent/30 lg:block" />
          </motion.div>

          {/* Stat 4 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <span className="font-serif text-6xl font-medium tracking-tight text-white lg:text-7xl">
              5★
            </span>
            <span className="mt-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ivory/60">
              {t("trust3")}
            </span>
            <div className="mt-6 hidden h-px w-12 bg-white/20 lg:block" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
