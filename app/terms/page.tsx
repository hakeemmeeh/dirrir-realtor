import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of the Dirrir Realtor Limited website and services.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of Service" subtitle="Last updated: April 2026" compact />
      <section className="py-16">
        <Container className="max-w-3xl space-y-6 text-text leading-relaxed">
          <p>
            By accessing this website, you agree to these terms. Dirrir Realtor Limited operates as part
            of the Rabat Properties Limited group.
          </p>
          <h2 className="font-serif text-2xl text-primary">Listings & information</h2>
          <p>
            Property details are provided in good faith but may change. Availability, pricing, and
            specifications should be confirmed with our team before any transaction.
          </p>
          <h2 className="font-serif text-2xl text-primary">No legal or financial advice</h2>
          <p>
            Content on this site is for general information only and does not constitute legal, tax, or
            investment advice. Seek independent professional advice where appropriate.
          </p>
          <h2 className="font-serif text-2xl text-primary">Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, DRL is not liable for any indirect or consequential
            loss arising from use of this website or reliance on its content.
          </p>
          <h2 className="font-serif text-2xl text-primary">Contact</h2>
          <p>
            Questions about these terms:{" "}
            <a href="mailto:info@dirrirrealtor.co.ke">info@dirrirrealtor.co.ke</a>.
          </p>
        </Container>
      </section>
    </>
  );
}
