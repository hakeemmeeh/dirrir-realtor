import { Container } from "@/components/ui/Container";
import {
  CONTACT_PHONES_E164,
  formatKeDisplay,
  telHref,
  whatsappHref,
} from "@/lib/contact-details";
import { Mail, MapPin, Phone } from "lucide-react";

const email = "info@dirrirrealtor.co.ke";

export function ContactInfo() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      <div className="rounded-sm border border-border bg-background-alt p-6">
        <MapPin className="h-6 w-6 text-accent" />
        <p className="mt-4 text-sm font-semibold text-primary">Dirrir Realtor Limited (DRL)</p>
        <p className="mt-2 text-sm text-text-light">Nairobi, Kenya</p>
      </div>
      <div className="rounded-sm border border-border bg-background-alt p-6">
        <Phone className="h-6 w-6 text-accent" />
        <p className="mt-4 text-sm font-semibold text-primary">Phone</p>
        <ul className="mt-2 space-y-1.5 text-sm">
          {CONTACT_PHONES_E164.map((n) => (
            <li key={n}>
              <a href={telHref(n)} className="text-accent hover:underline">
                {formatKeDisplay(n)}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm font-semibold text-primary">WhatsApp</p>
        <ul className="mt-2 space-y-1.5 text-sm">
          {CONTACT_PHONES_E164.map((n) => (
            <li key={`wa-${n}`}>
              <a
                href={whatsappHref(n)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                {formatKeDisplay(n)}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-sm border border-border bg-background-alt p-6">
        <Mail className="h-6 w-6 text-accent" />
        <p className="mt-4 text-sm font-semibold text-primary">Email</p>
        <a href={`mailto:${email}`} className="mt-2 inline-block text-sm text-accent hover:underline">
          {email}
        </a>
      </div>
    </div>
  );
}

export function ContactInfoSection() {
  return (
    <section className="py-12">
      <Container>
        <ContactInfo />
      </Container>
    </section>
  );
}
