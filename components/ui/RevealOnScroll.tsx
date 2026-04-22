"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: "left" | "up";
};

export function RevealOnScroll({
  children,
  className,
  delay = 0,
  duration = 1.05,
  distance = 80,
  direction = "left",
}: Props) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={
        direction === "up"
          ? { opacity: 0, y: distance * 0.6 }
          : { opacity: 0, x: -distance }
      }
      whileInView={direction === "up" ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
