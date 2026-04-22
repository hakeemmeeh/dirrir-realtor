"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type NavItem = {
  href?: string;
  key: string;
  dropdown?: { href: string; key: string }[];
};

const nav: NavItem[] = [
  { href: "/", key: "home" },
  { href: "/developments", key: "developments" },
  {
    key: "company",
    dropdown: [
      { href: "/about", key: "about" },
      { href: "/services", key: "services" },
    ],
  },
  { href: "/properties", key: "properties" },
  { href: "/areas", key: "areas" },
  { href: "/contact", key: "contact" },
];

export function Navbar() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const heroSurface = pathname === "/" || pathname === "/developments";
  const [solid, setSolid] = useState(!heroSurface);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setSolid(!heroSurface || y > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [heroSurface, pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid
          ? "bg-white shadow-lg"
          : "bg-[linear-gradient(to_bottom,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.94)_58%,rgba(255,255,255,0)_100%)] backdrop-blur-md"
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-[1600px] items-center justify-between px-4 transition-all duration-500 lg:px-10",
          solid ? "h-[5.5rem] lg:h-24" : "h-[7.5rem] lg:h-32"
        )}
      >
        <Link href="/" className="relative z-10 flex items-center">
            <Image
              src="/images/logo-light-transparent.png"
              alt="Dirrir Realtor Limited"
              width={280}
              height={104}
              className={cn(
                "w-auto object-contain object-left transition-all duration-500",
                solid ? "h-16 lg:h-[4.5rem]" : "h-20 lg:h-28"
              )}
              priority
            />
        </Link>

        <div className="hidden items-center gap-12 lg:flex">
          <nav
            className={cn(
              "flex items-center gap-9",
              "text-primary"
            )}
          >
            {nav.map((item) => {
              if (item.dropdown) {
                return (
                  <div key={item.key} className="group relative py-2">
                    <button
                      className="flex items-center gap-1 font-sans text-[0.85rem] font-bold uppercase tracking-[0.15em] transition-colors hover:text-accent focus:outline-none"
                    >
                      {/* @ts-expect-error next-intl dynamic keys */}
                      {t(item.key)}
                      <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                    </button>
                    <div className="absolute left-0 top-full mt-0 hidden w-48 flex-col overflow-hidden rounded-sm border border-border bg-white text-primary shadow-xl group-hover:flex">
                      {item.dropdown.map((drop) => {
                        const active = pathname === drop.href;
                        return (
                          <Link
                            key={drop.href}
                            href={drop.href}
                            className={cn(
                              "px-5 py-3.5 font-sans text-[0.8rem] font-bold uppercase tracking-[0.1em] transition-colors hover:bg-gray-50 hover:text-accent",
                              active && "text-accent bg-gray-50"
                            )}
                          >
                            {/* @ts-expect-error next-intl dynamic keys */}
                            {t(drop.key)}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={cn(
                    "relative py-2 font-sans text-[0.85rem] font-bold uppercase tracking-[0.15em] transition-colors hover:text-accent",
                    active && "text-accent"
                  )}
                >
                  {/* @ts-expect-error next-intl dynamic keys */}
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>

          <Button
            href="/contact"
            variant="primary"
            className="!px-6 !py-3 text-[11px] uppercase tracking-[0.15em]"
          >
            {t("cta")}
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            "relative z-10 inline-flex p-2 lg:hidden",
            "text-primary"
          )}
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Soft blend into hero instead of hard separation */}
      <div className="px-4">
        <div
          className={cn(
            "mt-2 rounded-sm border border-border bg-background px-4 pb-6 pt-2 shadow-xl lg:hidden",
            open ? "block" : "hidden"
          )}
        >
          <div className="flex flex-col gap-3">
            {nav.map((item) => {
              if (item.dropdown) {
                return (
                  <div key={item.key} className="flex flex-col border-b border-border">
                    <span className="py-3 font-sans text-base font-medium tracking-[0.08em] text-primary/60">
                      {/* @ts-expect-error next-intl dynamic keys */}
                      {t(item.key)}
                    </span>
                    <div className="flex flex-col pl-4 pb-2">
                      {item.dropdown.map((drop) => {
                        const active = pathname === drop.href;
                        return (
                          <Link
                            key={drop.href}
                            href={drop.href}
                            className={cn(
                              "py-2 font-sans text-[0.9rem] font-medium tracking-[0.05em] transition-colors hover:text-accent",
                              active ? "text-accent" : "text-primary"
                            )}
                          >
                            {/* @ts-expect-error next-intl dynamic keys */}
                            {t(drop.key)}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  className="border-b border-border py-3 font-sans text-base font-medium tracking-[0.08em] text-primary"
                >
                  {/* @ts-expect-error next-intl dynamic keys */}
                  {t(item.key)}
                </Link>
              );
            })}
            <div className="flex justify-end pt-2">
              <Button href="/contact" variant="primary" className="!px-4 !py-2 text-xs">
                {t("cta")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
