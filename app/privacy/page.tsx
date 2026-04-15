import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Dirrir Realtor Limited collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" subtitle="Last updated: April 2026" compact />
      <section className="py-16">
        <Container className="max-w-3xl space-y-6 text-text leading-relaxed">
          <p>
            Dirrir Realtor Limited (&quot;DRL&quot;, &quot;we&quot;) respects your privacy. This policy
            describes how we handle personal data collected through our website and enquiry forms.
          </p>
          <h2 className="font-serif text-2xl text-primary">Information we collect</h2>
          <p>
            We may collect your name, email address, phone number, property preferences, and messages
            you submit when you contact us or request a viewing.
          </p>
          <h2 className="font-serif text-2xl text-primary">How we use information</h2>
          <p>
            We use this information to respond to enquiries, arrange property viewings, and improve our
            services. We do not sell your personal data to third parties.
          </p>
          <h2 className="font-serif text-2xl text-primary">Cookies & analytics</h2>
          <p>
            We may use cookies and analytics tools (such as Google Analytics) to understand how visitors
            use our site. You can control cookies through your browser settings.
          </p>
          <h2 className="font-serif text-2xl text-primary">Contact</h2>
          <p>
            For privacy-related questions, contact us at{" "}
            <a href="mailto:info@dirrirrealtor.co.ke">info@dirrirrealtor.co.ke</a>.
          </p>
        </Container>
      </section>
    </>
  );
}
