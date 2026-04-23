"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  accent: string;
  email?: string;
  linkedin?: string;
};

const team: TeamMember[] = [
  {
    name: "Abdulhakim Dirrir",
    role: "Principal · Dirrir Realtor",
    bio: "Leads client advisory for families and diaspora investors across Parklands, Kilimani, and Westlands — with a focus on transparent process and long-term value.",
    initials: "AD",
    accent: "from-[#c5a059] to-[#a68648]",
    email: "hello@dirrirrealtor.co.ke",
    linkedin: "https://www.linkedin.com",
  },
  {
    name: "Rabat Properties",
    role: "Parent Group",
    bio: "Operating backbone for sourcing, due diligence, and project delivery — with an established portfolio of Nairobi residential and mixed-use developments.",
    initials: "RP",
    accent: "from-[#1C2833] to-[#0b0f14]",
    email: "info@rabatproperties.co.ke",
  },
  {
    name: "Advisory Desk",
    role: "Sales & Diaspora Support",
    bio: "Dedicated specialists for viewings, remote consultations, escrow guidance, and transaction coordination — available in local and diaspora time zones.",
    initials: "AD",
    accent: "from-[#9a7a3e] to-[#5a4720]",
    email: "advisory@dirrirrealtor.co.ke",
  },
];

export function TeamSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <RevealOnScroll direction="up" duration={1.1}>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
              The People Behind DRL
            </p>
          </RevealOnScroll>
          <RevealOnScroll direction="up" delay={0.08} duration={1.2}>
            <h2 className="mt-5 font-sans text-3xl font-medium tracking-tight text-primary sm:text-4xl lg:text-5xl">
              A focused team, accountable at every step.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll direction="up" delay={0.16} duration={1.2}>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-text-light sm:text-base">
              Clients work directly with senior advisors — not a call-centre queue. Every enquiry
              is assigned to a named point of contact from first viewing to final handover.
            </p>
          </RevealOnScroll>
        </div>

        <div className="mt-14 grid gap-6 sm:gap-8 md:grid-cols-3">
          {team.map((member, i) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: 0 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.99)_0%,rgba(247,246,242,0.86)_100%)] p-8 ring-1 ring-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_12px_44px_rgba(21,31,40,0.08)] transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_28px_70px_rgba(26,26,26,0.08)] sm:p-9"
            >
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/35 via-transparent to-primary/[0.04]" />
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(196,30,36,0.07),transparent_38%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden
              />
              <span
                className="absolute left-0 top-0 h-px w-16 bg-accent transition-all duration-500 group-hover:w-full"
                aria-hidden
              />
              <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 bg-accent/7 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${member.accent} text-white shadow-[0_14px_30px_rgba(21,31,40,0.18)] ring-4 ring-white transition-shadow duration-500 group-hover:ring-accent/20`}
                >
                  <span className="font-serif text-lg font-semibold tracking-wider">
                    {member.initials}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="truncate font-sans text-base font-semibold text-primary transition-colors duration-500 group-hover:text-accent sm:text-lg">
                    {member.name}
                  </p>
                  <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                    {member.role}
                  </p>
                </div>
              </div>

              <p className="mt-6 flex-1 text-sm leading-relaxed text-text-light">{member.bio}</p>

              <div className="mt-6 flex items-center gap-2 border-t border-border/70 pt-5">
                {member.email ? (
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex h-10 w-10 items-center justify-center border border-border bg-white/80 text-text-light transition-colors hover:border-accent hover:text-accent"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                ) : null}
                {member.linkedin ? (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center border border-border bg-white/80 text-text-light transition-colors hover:border-accent hover:text-accent"
                    aria-label={`LinkedIn — ${member.name}`}
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M20.45 20.45h-3.56v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.48v6.26zM5.34 7.44a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                    </svg>
                  </a>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
