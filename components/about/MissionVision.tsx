"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const mission =
  "To provide reliable, transparent, and culturally attuned real estate services that help individuals and families find properties they can call home — and investments they can count on.";
const vision =
  "To become East Africa's most trusted real estate partner for diaspora and local investors alike, known for integrity, quality service, and deep community ties.";

const EASE = [0.22, 1, 0.36, 1] as const;

function MissionVisionCard({
  numeral,
  title,
  body,
  startDelay = 0,
}: {
  numeral: string;
  title: string;
  body: string;
  startDelay?: number;
}) {
  return (
    <div className="flex flex-col border-l-2 border-accent/20 pl-8 lg:pl-12">
      <span className="font-sans text-5xl font-medium italic tracking-tight text-accent/20 lg:text-7xl">
        {numeral}
      </span>
      <motion.h3
        initial={{ opacity: 0, x: -56 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.3, delay: startDelay, ease: EASE }}
        className="mt-4 font-sans text-3xl font-medium tracking-tight text-primary sm:text-4xl"
      >
        {title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, x: -56 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.4, delay: startDelay + 0.25, ease: EASE }}
        className="mt-8 text-lg leading-relaxed text-text-light/90 lg:text-xl"
      >
        {body}
      </motion.p>
    </div>
  );
}

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
          <MissionVisionCard numeral="01" title={missionTitle} body={mission} />
          <MissionVisionCard
            numeral="02"
            title={visionTitle}
            body={vision}
            startDelay={0.12}
          />
        </div>
      </Container>
    </section>
  );
}
