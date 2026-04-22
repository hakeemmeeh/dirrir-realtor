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
    <footer className="border-t border-white/10 bg-charcoal text-ivory">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Image
              src="/images/logo-light-transparent.png"
              alt="Dirrir Realtor Limited"
              width={240}
              height={96}
              className="mb-4 h-20 w-auto object-contain"
            />
            <p className="mt-2 text-sm text-ivory/75">{t("tagline")}</p>
            <p className="mt-4 text-sm text-ivory/75">{t("location")}</p>
            <p className="mt-2 text-sm">
              <span className="text-ivory/55">{phone}</span>
              <span className="mx-2 text-white/25">|</span>
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
                  <Link href={href} className="text-ivory/85 transition-colors hover:text-accent">
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
                className="flex items-center gap-2 text-sm text-ivory/85 transition-colors hover:text-accent"
                aria-label="Facebook — Rabat Properties Limited"
              >
                <IconFacebook className="h-5 w-5" /> Facebook
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-ivory/85 transition-colors hover:text-accent"
                aria-label="TikTok"
              >
                <MessageCircle className="h-5 w-5" /> TikTok
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-ivory/85 transition-colors hover:text-accent"
                aria-label="Instagram"
              >
                <IconInstagram className="h-5 w-5" /> Instagram
              </a>
            </div>
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-ivory/55 sm:flex-row sm:items-center sm:justify-between">
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
