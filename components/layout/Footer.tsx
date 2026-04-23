import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MessageCircle } from "lucide-react";
import { IconFacebook, IconInstagram } from "@/components/ui/SocialIcons";

const phone = "[Primary phone]";
const email = "info@dirrirrealtor.co.ke";

export async function Footer() {
  const t = await getTranslations("Footer");
  const n = await getTranslations("Nav");

  return (
    <footer className="bg-sand text-primary">
      <Container className="py-12 sm:py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-[1.25fr_0.85fr_0.9fr] md:gap-8 lg:gap-12">
            <div>
            <Image
              src="/images/logo-official.png"
              alt="Dirrir Realtor Limited"
              width={560}
              height={280}
              className="mb-5 h-24 w-auto object-contain mix-blend-multiply sm:h-28 lg:h-32"
            />
            <p className="mt-2 text-sm text-text-light">{t("tagline")}</p>
            <p className="mt-4 text-sm text-text-light">{t("location")}</p>
            <p className="mt-2 text-sm">
              <span className="text-text-light">{phone}</span>
              <span className="mx-2 text-border">|</span>
              <a href={`mailto:${email}`} className="transition-colors hover:text-accent">
                {email}
              </a>
            </p>
            </div>
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
                {t("linksCol")}
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  ["/", n("home")],
                  ["/about", n("about")],
                  ["/services", n("services")],
                  ["/properties", n("properties")],
                  ["/developments", n("developments")],
                  ["/areas", n("areas")],
                  ["/contact", n("contact")],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="text-primary transition-colors hover:text-accent">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
                {t("followCol")}
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary transition-colors hover:text-accent"
                  aria-label="Facebook — Rabat Properties Limited"
                >
                  <IconFacebook className="h-5 w-5" /> Facebook
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary transition-colors hover:text-accent"
                  aria-label="TikTok"
                >
                  <MessageCircle className="h-5 w-5" /> TikTok
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary transition-colors hover:text-accent"
                  aria-label="Instagram"
                >
                  <IconInstagram className="h-5 w-5" /> Instagram
                </a>
              </div>
            </div>
        </div>
      </Container>
      <div className="border-t border-white/10 bg-charcoal">
        <Container className="flex flex-col gap-3 py-6 text-xs text-ivory/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Dirrir Realtor Limited. {t("rights")}</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="transition-colors hover:text-accent">
              {t("privacy")}
            </Link>
            <Link href="/terms" className="transition-colors hover:text-accent">
              {t("terms")}
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
