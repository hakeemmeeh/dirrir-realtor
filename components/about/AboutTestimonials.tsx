"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const testimonials = [
  {
    name: "Ayaan Yusuf",
    quote:
      "Dirrir guided us through the home-buying process with clarity and patience. We felt supported at every step and closed with full confidence.",
  },
  {
    name: "Mohamed Hassan",
    quote:
      "What stood out was the transparency. Pricing, paperwork, and timelines were all clearly explained, which made the entire process stress-free.",
  },
  {
    name: "Safiya Abdullahi",
    quote:
      "As a diaspora client, I needed a trustworthy team on the ground. DRL delivered consistent updates and helped me secure the right investment property.",
  },
];

export function AboutTestimonials() {
  return (
    <section className="bg-background-alt py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
            A Testament To Excellence
          </p>
          <h2 className="mt-5 font-sans text-3xl font-medium tracking-tight text-primary sm:text-4xl">
            What Clients Say About DRL
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: index * 0.1 }}
              className="border border-border bg-background p-6"
            >
              <p className="text-sm leading-relaxed text-text-light">
                &ldquo;{item.quote}&rdquo;
              </p>
              <p className="mt-6 font-serif text-lg text-primary">{item.name}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
