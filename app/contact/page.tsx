import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MessageCircle } from "lucide-react";
import { IconFacebook, IconInstagram } from "@/components/ui/SocialIcons";
import { PageHero } from "@/components/PageHero";
import { ContactInfoSection } from "@/components/contact/ContactInfo";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Dirrir Realtor | Get in Touch for Property Enquiries",
  description:
    "Reach Dirrir Realtor Limited in Nairobi for property sales, rentals, and investment advisory. Call, WhatsApp, or fill out our enquiry form.",
  path: "/contact",
  keywords: [
    "contact Dirrir Realtor",
    "Nairobi real estate contact",
    "book property viewing Nairobi",
    "WhatsApp realtor Kenya",
  ],
});

export default async function ContactPage() {
  const t = await getTranslations("ContactPage");

  return (
    <>
      <PageHero title={t("heroTitle")} subtitle={t("heroSub")} />
      <ContactInfoSection />
      <EnquiryForm />
      <section className="pb-8">
        <Container>
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-text-light">
            Follow Rabat Properties
          </p>
          <div className="mt-6 flex justify-center gap-8">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary transition-colors hover:text-accent"
              aria-label="Facebook"
            >
              <IconFacebook className="h-7 w-7" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary transition-colors hover:text-accent"
              aria-label="TikTok"
            >
              <MessageCircle className="h-7 w-7" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary transition-colors hover:text-accent"
              aria-label="Instagram"
            >
              <IconInstagram className="h-7 w-7" />
            </a>
            <a
              href="https://wa.me/254700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary transition-colors hover:text-accent"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-7 w-7" />
            </a>
          </div>
        </Container>
      </section>
      <MapEmbed />
    </>
  );
}
