import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { PropertyCard } from "./PropertyCard";
import type { Property } from "@/lib/properties";

export async function SimilarProperties({ similar }: { similar: Property[] }) {
  const t = await getTranslations("Property");

  if (similar.length === 0) return null;

  return (
    <section className="border-t border-border bg-background-alt py-16">
      <Container>
        <h2 className="font-serif text-2xl text-primary">{t("similar")}</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {similar.map((p, i) => (
            <PropertyCard key={p.slug} property={p} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
