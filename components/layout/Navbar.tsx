"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
const nav = [
  { href: "/", key: "home" as const },
  { href: "/about", key: "about" as const },
  { href: "/services", key: "services" as const },
  { href: "/properties", key: "properties" as const },
  { href: "/developments", key: "developments" as const },
  { href: "/areas", key: "areas" as const },
  { href: "/contact", key: "contact" as const },
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
    <header className="fixed inset-x-0 top-0 z-50">
      <Container className="pt-2 lg:pt-3">
        <div
          className={cn(
            "flex h-16 items-center justify-between rounded-none px-4 transition-all duration-300 lg:h-[4.6rem] lg:px-6",
            solid
              ? "premium-surface border-b border-border backdrop-blur-md"
              : "border border-white/20 bg-black/25 text-white shadow-[0_10px_35px_rgba(0,0,0,0.22)] backdrop-blur",
          )}
        >
          <Link href="/" className="relative z-10 flex items-center gap-2.5">
            <Image
              src="/images/logo.svg"
              alt="Dirrir Realtor Limited"
              width={44}
              height={44}
              className="h-10 w-10 lg:h-11 lg:w-11"
              priority
            />
            <span
              className={cn(
                "hidden font-serif text-[1.15rem] font-medium tracking-[0.06em] sm:block",
                solid ? "text-primary" : "text-white drop-shadow-sm",
              )}
            >
              Dirrir Realtor
            </span>
          </Link>

          <nav
            className={cn(
              "hidden items-center gap-9 lg:flex",
              solid ? "text-primary" : "text-white drop-shadow",
            )}
          >
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative font-serif text-[1rem] font-medium tracking-[0.08em] transition-colors hover:text-accent",
                    active && "text-accent",
                  )}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button
              href="/contact"
              variant="primary"
              className="!px-5 !py-2.5 text-[11px] uppercase tracking-[0.12em]"
            >
              {t("cta")}
            </Button>
          </div>

          <button
            type="button"
            className={cn(
              "relative z-10 inline-flex p-2 lg:hidden",
              solid ? "text-primary" : "text-white",
            )}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div
          className={cn(
            "mt-2 rounded-sm border border-border bg-background px-4 pb-6 pt-2 shadow-xl lg:hidden",
            open ? "block" : "hidden",
          )}
        >
          <div className="flex flex-col gap-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-border py-3 font-serif text-base font-medium tracking-[0.08em] text-primary"
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="flex justify-end pt-2">
              <Button href="/contact" variant="primary" className="!px-4 !py-2 text-xs">
                {t("cta")}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
