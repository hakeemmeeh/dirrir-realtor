"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type Testimonial = {
  name: string;
  role: string;
  location: string;
  initials: string;
  accent: string;
  quote: string;
  rating: 4 | 5;
  date: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Ayaan Yusuf",
    role: "First-time homebuyer",
    location: "Parklands, Nairobi",
    initials: "AY",
    accent: "from-[#c5a059] to-[#a68648]",
    quote:
      "Dirrir guided us through the home-buying process with clarity and patience. We felt supported at every step and closed with full confidence.",
    rating: 5,
    date: "March 2026",
  },
  {
    name: "Mohamed Hassan",
    role: "Investor · Rental portfolio",
    location: "Kilimani, Nairobi",
    initials: "MH",
    accent: "from-[#1C2833] to-[#3b4a5c]",
    quote:
      "What stood out was the transparency. Pricing, paperwork, and timelines were all clearly explained, which made the entire process stress-free.",
    rating: 5,
    date: "February 2026",
  },
  {
    name: "Safiya Abdullahi",
    role: "Diaspora client · UK",
    location: "London → Westlands",
    initials: "SA",
    accent: "from-[#9a7a3e] to-[#5a4720]",
    quote:
      "As a diaspora client, I needed a trustworthy team on the ground. DRL delivered consistent updates and helped me secure the right investment property.",
    rating: 5,
    date: "January 2026",
  },
];

export function AboutTestimonials() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <RevealOnScroll direction="up" duration={1.1}>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
              A Testament To Excellence
            </p>
          </RevealOnScroll>
          <RevealOnScroll direction="up" delay={0.08} duration={1.2}>
            <h2 className="mt-5 font-sans text-3xl font-medium tracking-tight text-primary sm:text-4xl lg:text-5xl">
              What clients say about DRL.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll direction="up" delay={0.16} duration={1.2}>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-text-light sm:text-base">
              A selection of recent client feedback from buyers, renters, and diaspora investors
              across Parklands, Kilimani, and Westlands.
            </p>
          </RevealOnScroll>
        </div>

        <div className="mt-14 grid gap-6 sm:gap-8 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col border border-border bg-background p-7 transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgba(28,40,51,0.25)]"
            >
              <Quote
                className="pointer-events-none absolute right-5 top-5 h-10 w-10 text-accent/15"
                aria-hidden
              />

              <div className="flex items-center gap-1" aria-label={`${item.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < item.rating
                        ? "fill-accent text-accent"
                        : "text-text-light/30"
                    }`}
                  />
                ))}
              </div>

              <p className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-text">
                &ldquo;{item.quote}&rdquo;
              </p>

              <div className="mt-7 flex items-center gap-4 border-t border-border pt-5">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${item.accent} text-white shadow-md`}
                  aria-hidden
                >
                  <span className="font-serif text-sm font-semibold tracking-wider">
                    {item.initials}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="truncate font-sans text-sm font-semibold text-primary">
                    {item.name}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-text-light">
                    {item.role} · {item.location}
                  </p>
                  <p className="mt-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-text-light/70">
                    {item.date}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
