import { Container } from "@/components/ui/Container";

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.19898999998!2d36.682587!3d-1.302861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus";

export function MapEmbed() {
  return (
    <section className="pb-16">
      <Container>
        <div className="overflow-hidden rounded-sm border border-border shadow-sm">
          <iframe
            title="Nairobi map"
            src={MAP_SRC}
            className="h-[320px] w-full border-0 lg:h-[400px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </Container>
    </section>
  );
}
