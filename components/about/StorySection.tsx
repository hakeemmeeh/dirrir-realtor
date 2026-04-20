"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const paras = [
  "Dirrir Realtor Limited was founded with a simple mission: to make finding a home in Nairobi straightforward, honest, and rewarding. Operating under Rabat Properties Limited, we combine local market expertise with a commitment to serving diverse communities and the global diaspora.",
  "We started by connecting families with quality apartments in Parklands and Kilimani — two of Nairobi's most desirable neighbourhoods. Today, our portfolio spans across the city's prime residential areas, from Westlands and Lavington to Riverside and beyond.",
  "What sets us apart is our approach. We don't just list properties — we build relationships. Every client gets a dedicated agent who understands their needs, their budget, and their vision for the future. Whether you're buying your first home, relocating from overseas, or growing your investment portfolio, we're with you from the first viewing to the final handshake.",
];

export function StorySection({ title }: { title: string }) {
  return (
    <section className="bg-background py-20 lg:py-32">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent"
          >
            Since Day One
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            className="mx-auto mt-6 h-px w-24 bg-accent/30"
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 font-sans text-4xl font-medium leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-[4rem]"
          >
            {title}
          </motion.h2>
          
          <div className="mt-16 space-y-10 text-left lg:mt-24">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-2xl italic leading-relaxed text-primary/80 lg:text-3xl"
            >
              {paras[0]}
            </motion.p>
            <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
              {paras.slice(1).map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * (i + 1) }}
                  className="text-base leading-relaxed text-text-light lg:text-lg"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
