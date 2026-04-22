"use client";

import { motion } from "framer-motion";
import React from "react";

export function AnimatedOverview({
  title,
  body,
  kicker,
  children
}: {
  title: string;
  body: string;
  kicker: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.15 } },
        hidden: {}
      }}
      className="mb-10 grid gap-6 border border-border bg-background-alt p-6 sm:p-8 lg:grid-cols-[1.3fr_1fr]"
    >
      <div>
        <div className="overflow-hidden">
          <motion.p 
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-accent"
          >
            {kicker}
          </motion.p>
        </div>
        
        <div className="overflow-hidden">
          <motion.h2 
            variants={{
              hidden: { opacity: 0, x: -40 },
              visible: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="mt-4 font-sans text-3xl font-medium leading-[1.08] tracking-tight text-primary sm:text-4xl"
          >
            {title}
          </motion.h2>
        </div>

        <div className="overflow-hidden">
          <motion.p 
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="mt-4 max-w-3xl text-sm leading-relaxed text-text-light sm:text-base"
          >
            {body}
          </motion.p>
        </div>
      </div>
      
      <motion.div 
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } }
        }}
        className="flex flex-wrap items-center gap-3 lg:justify-end"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}