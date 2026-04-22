# Premium Real Estate Style & Motion Guide

A reusable catalog of every animation, gradient, hover, and premium pattern used in
**Dirrir Realtor Limited (DRL)** — extracted so it can be dropped into any future
real estate (or luxury) project built with **Next.js + Tailwind + Framer Motion**.

> **Stack baseline**: Next.js 14 (App Router) · Tailwind v3 · Framer Motion · `next/image` · `next-intl` (optional).

---

## Table of contents

1. [Brand tokens (CSS variables)](#1-brand-tokens-css-variables)
2. [Typography stack](#2-typography-stack)
3. [Premium utility classes](#3-premium-utility-classes)
4. [Signature gradients](#4-signature-gradients)
5. [CSS keyframes (JS-free reveals)](#5-css-keyframes-js-free-reveals)
6. [`RevealOnScroll` — the one component you'll reuse everywhere](#6-revealonscroll)
7. [Motion variants library](#7-motion-variants-library)
8. [Hero section recipe (parallax + editorial overlay)](#8-hero-section-recipe)
9. [Premium property card (hover zoom + slide-up reveal)](#9-premium-property-card)
10. [Alternating editorial sections](#10-alternating-editorial-sections)
11. [Stats / trust counter block](#11-stats--trust-counter-block)
12. [Icon pop-in for values & feature cards](#12-icon-pop-in)
13. [Testimonial card recipe](#13-testimonial-card-recipe)
14. [WhatsApp floating CTA](#14-whatsapp-floating-cta)
15. [Transparent-on-hero navbar](#15-transparent-on-hero-navbar)
16. [Button / link micro-interactions](#16-button--link-micro-interactions)
17. [Motion rules of thumb](#17-motion-rules-of-thumb)
18. [Image / performance strategy (Lighthouse ≥ 95)](#18-image--performance-strategy)
19. [SEO scaffolding](#19-seo-scaffolding)
20. [Mobile polish checklist](#20-mobile-polish-checklist)

---

## 1. Brand tokens (CSS variables)

`app/globals.css`:

```css
:root {
  --color-primary: #1C2833;        /* Rich navy-black — headings, nav */
  --color-accent: #c5a059;         /* Warm gold — CTAs, accents */
  --color-accent-dark: #a68648;
  --color-background: #ffffff;
  --color-background-alt: #f9f9f9;
  --color-text: #444444;
  --color-text-light: #777777;
  --color-border: #eaeaea;
  --color-sand: #f7f6f2;
  --color-ivory: #fafaf5;
}

html {
  scroll-behavior: smooth;
  -webkit-tap-highlight-color: transparent;
  -webkit-text-size-adjust: 100%;
}

html,
body {
  overflow-x: clip;
}

::selection {
  background: rgba(197, 160, 89, 0.22);
  color: #1C2833;
}
```

Map them to Tailwind utilities in `tailwind.config.ts`:

```ts
theme: {
  extend: {
    colors: {
      primary: "var(--color-primary)",
      accent: "var(--color-accent)",
      "accent-dark": "var(--color-accent-dark)",
      background: "var(--color-background)",
      "background-alt": "var(--color-background-alt)",
      text: "var(--color-text)",
      "text-light": "var(--color-text-light)",
      border: "var(--color-border)",
      sand: "var(--color-sand)",
      ivory: "var(--color-ivory)",
      charcoal: "#0b0f14",
    },
  },
},
```

Swap only the CSS variable values to re-skin an entire project (e.g. red & black DRL
variant, or navy & champagne for another brand). No component edits required.

---

## 2. Typography stack

Load via `next/font/google`:

| Role | Family | Variable |
|------|--------|----------|
| Luxury serif (headings) | **Playfair Display** | `--font-playfair` |
| Editorial display | **Bodoni Moda** | `--font-bodoni-moda` |
| Body / sans | **DM Sans** | `--font-dm-sans` |
| UI / nav | **Plus Jakarta Sans** | `--font-plus-jakarta` |
| Mono eyebrows | **DM Mono** | `--font-dm-mono` |

Pattern used across every section:

```tsx
<p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
  Eyebrow label
</p>
<h2 className="font-sans text-4xl font-medium tracking-tight text-primary sm:text-5xl">
  Main headline
</h2>
<p className="story-editorial mt-6 text-text-light">Body copy</p>
```

---

## 3. Premium utility classes

Add to your global stylesheet:

```css
@layer utilities {
  .premium-surface {
    @apply border border-border/80 bg-white/95
      shadow-[0_16px_60px_rgba(26,26,26,0.08)];
  }

  .premium-hairline {
    background: linear-gradient(90deg,
      rgba(255,255,255,0),
      rgba(197,160,89,0.35),
      rgba(197,160,89,0.85),
      rgba(255,255,255,0));
  }

  .premium-hairline-accent {
    background: linear-gradient(90deg,
      rgba(255,255,255,0),
      rgba(197,160,89,0.75),
      rgba(255,255,255,0));
  }

  .premium-hero-vignette {
    box-shadow: inset 0 0 160px rgba(0, 0, 0, 0.55);
  }

  .glass-panel {
    @apply border border-white/20 bg-white/10 backdrop-blur-xl;
  }

  .story-editorial {
    @apply font-editorial text-[1.05rem] leading-[1.85] text-text;
  }

  .text-balance {
    text-wrap: balance;
  }
}
```

Used together:

```tsx
<div className="premium-hairline mt-4 h-px w-40" />
<div className="premium-surface rounded-sm p-8">…</div>
<section className="relative premium-hero-vignette">…</section>
```

---

## 4. Signature gradients

### Hero dark overlay

```css
background: linear-gradient(
  165deg,
  rgba(13, 13, 21, 0.78) 0%,
  rgba(13, 13, 21, 0.35) 48%,
  rgba(13, 13, 21, 0.88) 100%
);
```

Softer variant for secondary heroes:

```css
background: linear-gradient(
  to bottom,
  rgba(0, 0, 0, 0.4),
  rgba(0, 0, 0, 0.7)
);
```

### Navbar seamless blend into hero

```css
background: linear-gradient(
  to bottom,
  rgba(255, 255, 255, 0.98) 0%,
  rgba(255, 255, 255, 0.94) 58%,
  rgba(255, 255, 255, 0) 100%
);
/* + backdrop-blur-md */
```

### Card readability overlay (darker on hover)

```tsx
{/* Base gradient for readability */}
<div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10" />
{/* Hover darkening layer */}
<div className="absolute inset-0 bg-black/85 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100" />
```

### Avatar / badge gradients

```
bg-gradient-to-br from-[#c5a059] to-[#a68648]   /* gold */
bg-gradient-to-br from-[#1C2833] to-[#0b0f14]   /* navy */
bg-gradient-to-br from-[#9a7a3e] to-[#5a4720]   /* bronze */
```

---

## 5. CSS keyframes (JS-free reveals)

```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes slideInReveal {
  from { opacity: 0; transform: translateX(-42px); }
  to   { opacity: 1; transform: translateX(0); }
}
.animate-slide-in-reveal {
  animation: slideInReveal 1s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```

Stagger without JS:

```tsx
<div
  className="animate-fade-in-up opacity-0"
  style={{ animationDelay: `${Math.min(index, 6) * 110}ms` }}
/>
```

---

## 6. `RevealOnScroll`

The single component you'll reuse on **every** major heading, eyebrow, card, and
paragraph block.

`components/ui/RevealOnScroll.tsx`:

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  direction?: "up" | "left";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
};

export function RevealOnScroll({
  children,
  direction = "up",
  delay = 0,
  duration = 1,
  distance = 32,
  className,
}: Props) {
  const reduce = useReducedMotion();
  const from =
    direction === "left"
      ? { opacity: 0, x: -distance }
      : { opacity: 0, y: distance };
  const to =
    direction === "left" ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 };

  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : from}
      whileInView={reduce ? { opacity: 1 } : to}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

Used for every eyebrow → title → body stack:

```tsx
<RevealOnScroll direction="up" duration={1.1}>
  <p className="...eyebrow">Recognition & Partners</p>
</RevealOnScroll>
<RevealOnScroll direction="up" delay={0.08} duration={1.2}>
  <h2 className="...">Accountability you can stand behind.</h2>
</RevealOnScroll>
<RevealOnScroll direction="up" delay={0.16} duration={1.2}>
  <p className="...lead">A trusted real-estate partner…</p>
</RevealOnScroll>
```

**Timing recipe**:
`eyebrow delay 0 → title delay 0.08–0.12 → body delay 0.16–0.24`, `duration 1–1.2s`,
ease `[0.16, 1, 0.3, 1]`.

---

## 7. Motion variants library

`lib/motion.ts`:

```ts
import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeUpReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export const stagger = (gap = 0.1): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap } },
});
```

---

## 8. Hero section recipe

Full-bleed, parallax background, editorial overlay, staggered text entry.

```tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <Image
          src="/hero.png"
          alt=""
          fill
          priority
          className="scale-105 object-cover"
          sizes="100vw"
        />
      </motion.div>

      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(165deg, rgba(13,13,21,0.78) 0%, rgba(13,13,21,0.35) 48%, rgba(13,13,21,0.88) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 premium-hero-vignette" />

      <div className="relative flex min-h-[100svh] flex-col justify-end pb-10 pt-32 sm:pb-12 sm:pt-40 lg:pb-16 lg:pt-48">
        <div className="max-w-3xl text-white">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-accent"
          >
            Dirrir Realtor Limited
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="premium-hairline mt-4 h-px w-44 origin-left sm:w-52"
          />

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-sans text-[2rem] font-medium leading-[1.1] tracking-tight sm:mt-7 sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
          >
            Premium homes in Nairobi.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="story-editorial mt-7 max-w-2xl text-white/80"
          >
            Subheadline copy…
          </motion.p>
        </div>
      </div>
    </section>
  );
}
```

Entry stagger delays to copy: `0.1 → 0.2 → 0.3 → 0.4 → 0.5`.

---

## 9. Premium property card

Hover zoom + slide-up reveal with **zero height measurements**.

```tsx
<Link
  href={`/properties/${slug}`}
  className="group relative flex h-[480px] w-full flex-col justify-end overflow-hidden bg-black opacity-0 animate-fade-in-up sm:h-[560px]"
  style={{ animationDelay: `${Math.min(index, 6) * 110}ms` }}
>
  {/* Slow zoom-out image on hover */}
  <Image
    src={image}
    alt={title}
    fill
    className="object-cover scale-105 transition-transform duration-[1.5s] ease-out group-hover:scale-100"
    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
  />

  {/* Base readability gradient */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10" />
  {/* Hover darkening layer (deeper = more premium feel) */}
  <div className="absolute inset-0 bg-black/85 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100" />

  {/* Corner badge */}
  <div className="absolute left-6 top-6 z-10">
    <div className="bg-accent px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
      Completed
    </div>
  </div>

  <div className="relative z-10 flex flex-col p-6 sm:p-8">
    <div className="mb-2 flex items-center gap-2">
      <MapPin className="h-3.5 w-3.5 text-accent" />
      <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-white/90 transition-colors duration-300 group-hover:text-accent">
        {location}
      </span>
    </div>

    <h3 className="font-display text-2xl font-normal leading-tight tracking-wide text-white sm:text-3xl">
      {title}
    </h3>

    {/* Slide-up reveal via CSS grid-template-rows — smooth expand, no height measuring */}
    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr]">
      <div className="overflow-hidden">
        <div className="flex flex-col pt-6 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100 group-hover:delay-150">
          {/* specs grid, CTA, price… */}
          <span className="inline-flex items-center gap-2 border-b border-accent pb-1 text-[11px] font-bold uppercase tracking-widest text-accent">
            View Details
            <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</Link>
```

**Key tricks**:
- `scale-105 → scale-100` on hover feels expensive (reverses the usual "zoom-in").
- Grid-rows trick (`0fr → 1fr`) animates height without JS or measured dimensions.
- Two overlay layers keep gold accent color legible over any image.

---

## 10. Alternating editorial sections

Services, areas, story blocks — image left/right flipped on odd rows.

```tsx
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    variants={index % 2 ? slideInRight : slideInLeft}
    className={cn(
      "grid items-center gap-10 lg:grid-cols-2",
      index % 2 && "lg:[&>*:first-child]:order-2",
    )}
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <Image src={item.image} alt="" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
    </div>
    <div>
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">{item.kicker}</p>
      <h2 className="mt-4 font-sans text-4xl font-medium tracking-tight text-primary">{item.title}</h2>
      <p className="mt-5 text-text-light">{item.body}</p>
    </div>
  </motion.div>
))}
```

---

## 11. Stats / trust counter block

```tsx
<div className="grid gap-6 border-y border-border py-10 sm:grid-cols-3">
  {stats.map((item, i) => (
    <motion.article
      key={item.label}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: i * 0.1 }}
      className="text-center"
    >
      <p className="font-sans text-4xl font-semibold tracking-tight text-primary">
        {item.value}
      </p>
      <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-text-light">
        {item.label}
      </p>
    </motion.article>
  ))}
</div>
```

---

## 12. Icon pop-in

```tsx
<motion.div
  initial={{ scale: 0.6, opacity: 0 }}
  whileInView={{ scale: 1, opacity: 1 }}
  viewport={{ once: true, margin: "-80px" }}
  whileHover={{ y: -4, scale: 1.05 }}
  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
  className="flex h-20 w-20 items-center justify-center border border-border bg-background-alt text-accent"
>
  <Icon className="h-9 w-9" />
</motion.div>
```

---

## 13. Testimonial card recipe

- Ghost `<Quote />` at `text-accent/15` in top-right.
- 5-star row using filled/empty Lucide `<Star />`.
- Gradient initial-avatar: `h-12 w-12 rounded-full bg-gradient-to-br from-[brand] to-[brand-dark]`.
- Divider above attribution: `border-t border-border pt-5`.
- Motion: `whileInView` + `whileHover={{ y: -4 }}` + hover shadow
  `shadow-[0_24px_60px_-24px_rgba(28,40,51,0.25)]`.

```tsx
<motion.article
  initial={{ opacity: 0, y: 28 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
  whileHover={{ y: -4 }}
  className="group relative flex flex-col border border-border bg-background p-7 transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgba(28,40,51,0.25)]"
>
  <Quote className="pointer-events-none absolute right-5 top-5 h-10 w-10 text-accent/15" aria-hidden />
  <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-accent text-accent" : "text-text-light/30"}`} />
    ))}
  </div>
  <p className="mt-5 text-[0.95rem] leading-relaxed text-text">&ldquo;{quote}&rdquo;</p>
  <div className="mt-7 flex items-center gap-4 border-t border-border pt-5">
    <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${accent} text-white shadow-md`}>
      <span className="font-serif text-sm font-semibold tracking-wider">{initials}</span>
    </div>
    <div className="min-w-0">
      <p className="truncate font-sans text-sm font-semibold text-primary">{name}</p>
      <p className="mt-0.5 truncate text-xs text-text-light">{role} · {location}</p>
      <p className="mt-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-text-light/70">{date}</p>
    </div>
  </div>
</motion.article>
```

---

## 14. WhatsApp floating CTA

```tsx
"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WA_NUMBER = "254700000000";

export function WhatsAppFloat() {
  const href = `https://wa.me/${WA_NUMBER}?text=Hello…`;
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 sm:right-6"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
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
```

`env(safe-area-inset-bottom)` keeps it above the iOS home indicator.

---

## 15. Transparent-on-hero navbar

```tsx
"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const heroSurface = pathname === "/" || pathname === "/developments";
  const [solid, setSolid] = useState(!heroSurface);

  useEffect(() => {
    const onScroll = () => setSolid(!heroSurface || window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [heroSurface]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid
          ? "bg-white shadow-lg"
          : "bg-[linear-gradient(to_bottom,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.94)_58%,rgba(255,255,255,0)_100%)] backdrop-blur-md",
      )}
    >
      {/* logo + nav */}
    </header>
  );
}
```

Logo also shrinks on `solid` (`h-16 → h-11`, `h-28 → h-14`) with
`transition-all duration-500` for a polished scroll reaction.

---

## 16. Button / link micro-interactions

```css
/* Primary */
bg-primary text-white hover:bg-accent transition-colors duration-300

/* Luxury outline */
border border-white/30 text-white hover:border-accent hover:text-accent

/* Underline grow */
relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0
after:bg-accent after:transition-all after:duration-500 hover:after:w-full

/* Arrow nudge (inside .group) */
group-hover:translate-x-1 transition-transform duration-300
```

---

## 17. Motion rules of thumb

| Rule | Value |
|------|-------|
| Default ease (reveal) | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Default ease (enter) | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Reveal duration | **0.9 – 1.2s** (shorter feels "UI", not editorial) |
| Sibling stagger | **0.08 – 0.14s** |
| Image zoom on hover | **1.2 – 1.8s**, `ease-out` |
| Hover lift | `y: -4` over `0.4s` |
| Reduced motion | Always wrap in `useReducedMotion()` |
| Viewport prefire | `viewport={{ once: true, margin: "-80px" }}` |

---

## 18. Image / performance strategy

**`next.config.mjs`**:

```js
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1440, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/**" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|gif)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
```

Always:
- Set `sizes` on `next/image`.
- Use `priority` **only** on the LCP image (first hero slide).
- Prefer `fill` + `object-cover` inside a relative wrapper.

---

## 19. SEO scaffolding

**`lib/seo.ts`** — single helper for every page:

```ts
import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/images/og-default.png",
  keywords,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
}): Metadata {
  const url = `${SITE_URL.replace(/\/$/, "")}${path}`;
  const abs = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_KE",
      url,
      title,
      description,
      images: [{ url: abs, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [abs] },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
```

**Dynamic OG image** — `app/opengraph-image.tsx`:

```tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0f141c 0%, #1C2833 60%, #0b0f14 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ color: "#c5a059", letterSpacing: 6, textTransform: "uppercase", fontWeight: 700 }}>
          Your Brand
        </div>
        <div style={{ fontSize: 74, lineHeight: 1.04, fontWeight: 500 }}>
          Premium Homes & Apartments
        </div>
        <div style={{ color: "rgba(255,255,255,0.6)", letterSpacing: 4, textTransform: "uppercase" }}>
          yourdomain.com · Tagline
        </div>
      </div>
    ),
    { ...size },
  );
}
```

**Sitemap + robots** — `app/sitemap.ts`, `app/robots.ts` (Next.js metadata files).

**JSON-LD**:
- `RealEstateAgent` / `LocalBusiness` in `layout.tsx`
- `RealEstateListing` per property detail page
- `ItemList` on portfolio / developments pages

---

## 20. Mobile polish checklist

- Navbar heights: `h-16` solid / `h-20` transparent on mobile; 44px touch targets.
- Hero `min-h-[100svh]` (not `vh`) to respect mobile browser UI bars.
- `PageHero` headline scales to `text-[2rem]` on phones.
- Mobile drawer: full-width CTA, `border-b border-border` between items, `min-h-12`.
- `WhatsAppFloat` uses `env(safe-area-inset-bottom)`.
- `html, body { overflow-x: clip; }` to prevent horizontal scroll.
- `word-break: break-word; hyphens: auto;` on `h1` at `< 640px`.
- Sticky filter bars collapse into a drawer on mobile.
- Every `<Image>` gets correct `sizes` attr (e.g. `(max-width:768px) 100vw, 50vw`).

---

## Copy-paste starter kit

For a brand-new real-estate project, drop these files in:

```
app/
  globals.css              (sections 1, 3, 5)
  layout.tsx               (fonts, metadata, viewport)
  opengraph-image.tsx      (section 19)
  sitemap.ts               (section 19)
  robots.ts                (section 19)
components/
  ui/RevealOnScroll.tsx    (section 6)
  layout/Navbar.tsx        (section 15)
  layout/WhatsAppFloat.tsx (section 14)
lib/
  motion.ts                (section 7)
  seo.ts                   (section 19)
next.config.mjs            (section 18)
tailwind.config.ts         (section 1 color map)
```

Swap brand CSS variables → instant re-skin. Every component already reads from them.

---

_Maintained as part of the Dirrir Realtor Limited codebase. Reuse freely across future
real-estate and luxury editorial projects._
