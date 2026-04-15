import { Container } from "@/components/ui/Container";
import { Mail, MapPin, Phone } from "lucide-react";

const phone = "[Primary phone]";
const whatsapp = "[WhatsApp number]";
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
        <p className="mt-4 text-sm font-semibold text-primary">Phone & WhatsApp</p>
        <p className="mt-2 text-sm text-text-light">{phone}</p>
        <p className="mt-1 text-sm text-text-light">WhatsApp: {whatsapp}</p>
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
