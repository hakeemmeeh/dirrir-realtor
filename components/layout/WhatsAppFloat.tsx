"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WA_NUMBER = "254700000000";
const text = encodeURIComponent(
  "Hello Dirrir Realtor, I'm interested in learning more about your properties in Nairobi.",
);

export function WhatsAppFloat() {
  const href = `https://wa.me/${WA_NUMBER}?text=${text}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 sm:right-6"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
      aria-label="WhatsApp"
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: 2 }}
      />
      <MessageCircle className="relative z-10 h-7 w-7" strokeWidth={2} />
    </motion.a>
  );
}
