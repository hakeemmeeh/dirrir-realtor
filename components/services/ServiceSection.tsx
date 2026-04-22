"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Building2,
  Globe2,
  Home,
  LineChart,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export type ServiceIconId = "building" | "home" | "chart" | "globe" | "wrench";

const SERVICE_ICONS: Record<ServiceIconId, LucideIcon> = {
  building: Building2,
  home: Home,
  chart: LineChart,
  globe: Globe2,
  wrench: Wrench,
};

export type ServiceContent = {
  id: string;
  title: string;
  description: string;
  includes: string[];
  image: string;
  icon: ServiceIconId;
};

import { slideInLeft, slideInRight, fadeUpReduced } from "@/lib/motion";
import { useReducedMotion } from "framer-motion";

export function ServiceSection({
  item,
  index,
  includedLabel,
  ctaLabel,
}: {
  item: ServiceContent;
  index: number;
  includedLabel: string;
  ctaLabel: string;
}) {
  const Icon = SERVICE_ICONS[item.icon];
  const imageLeft = index % 2 === 0;
  const reduceMotion = useReducedMotion();

  return (
    <section id={item.id} className="scroll-mt-24 py-20 lg:py-36">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div
            className={cn(
              "group relative overflow-hidden",
              imageLeft ? "lg:order-1" : "lg:order-2",
            )}
          >
            <motion.div
              variants={reduceMotion ? fadeUpReduced : (imageLeft ? slideInLeft : slideInRight)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative aspect-[4/3] w-full"
            >
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105" 
                sizes="(max-width:1024px) 100vw, 50vw" 
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                quality={78}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDIwIDE1Ij48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTUiIGZpbGw9IiNmN2Y2ZjIiLz48L3N2Zz4="
              />
              <div className="absolute inset-0 bg-primary/10 transition-opacity duration-500 group-hover:opacity-0" />
            </motion.div>
          </div>
          
          <motion.div
            variants={reduceMotion ? fadeUpReduced : (imageLeft ? slideInRight : slideInLeft)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={cn(
              "flex flex-col",
              imageLeft ? "lg:order-2" : "lg:order-1"
            )}
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                Services
              </span>
              <div className="h-px w-12 bg-accent/30" />
            </div>
            
            <h2 className="mt-8 font-sans text-4xl font-medium leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-[3.5rem]">
              {item.title}
            </h2>
            
            <p className="mt-10 text-lg leading-relaxed text-text-light/90 lg:text-xl">
              {item.description}
            </p>
            
            <div className="mt-12 h-px w-full bg-border" />
            
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-text-light/60">
                  {includedLabel}
                </p>
                <ul className="mt-6 space-y-4">
                  {item.includes.map((line) => (
                    <li key={line} className="flex gap-3 text-[13px] leading-relaxed text-text">
                      <span className="mt-1.5 h-1 w-1 shrink-0 bg-accent" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-end gap-6 sm:items-end">
                <Icon className="h-12 w-12 text-accent/20" strokeWidth={1} />
                <Button 
                  href="/contact" 
                  variant="luxury" 
                  className="w-full justify-center sm:w-auto"
                >
                  {ctaLabel}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
