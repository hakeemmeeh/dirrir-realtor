"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const mission =
  "To provide reliable, transparent, and culturally attuned real estate services that help individuals and families find properties they can call home — and investments they can count on.";
const vision =
  "To become East Africa's most trusted real estate partner for diaspora and local investors alike, known for integrity, quality service, and deep community ties.";

export function MissionVision({
  missionTitle,
  visionTitle,
}: {
  missionTitle: string;
  visionTitle: string;
}) {
  return (
    <section className="bg-background-alt py-20 lg:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col border-l-2 border-accent/20 pl-8 lg:pl-12"
          >
            <span className="font-sans text-5xl font-medium italic tracking-tight text-accent/20 lg:text-7xl">01</span>
            <h3 className="mt-4 font-sans text-3xl font-medium tracking-tight text-primary sm:text-4xl">{missionTitle}</h3>
            <p className="mt-8 text-lg leading-relaxed text-text-light/90 lg:text-xl">{mission}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col border-l-2 border-accent/20 pl-8 lg:pl-12"
          >
            <span className="font-sans text-5xl font-medium italic tracking-tight text-accent/20 lg:text-7xl">02</span>
            <h3 className="mt-4 font-sans text-3xl font-medium tracking-tight text-primary sm:text-4xl">{visionTitle}</h3>
            <p className="mt-8 text-lg leading-relaxed text-text-light/90 lg:text-xl">{vision}</p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
