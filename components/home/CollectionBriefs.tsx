import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { type Property, type PropertyCollection } from "@/lib/properties";

function getTopLocations(items: Property[], max = 3): string {
  const counts = new Map<string, number>();
  for (const item of items) {
    counts.set(item.location, (counts.get(item.location) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([name]) => name)
    .join(" • ");
}

type Props = {
  living: Property[];
  investment: Property[];
  compact?: boolean;
};

export async function CollectionBriefs({ living, investment, compact = false }: Props) {
  const t = await getTranslations("Home");

  const cards: Array<{
    id: PropertyCollection;
    title: string;
    body: string;
    lead: string;
    cta: string;
    href: string;
    count: number;
    locations: string;
  }> = [
    {
      id: "living",
      title: t("livingCollectionTitle"),
      body: t("livingCollectionSub"),
      lead: t("livingCollectionLead"),
      cta: t("exploreLiving"),
      href: "/properties?collection=living",
      count: living.length,
      locations: getTopLocations(living),
    },
    {
      id: "investment",
      title: t("investmentCollectionTitle"),
      body: t("investmentCollectionSub"),
      lead: t("investmentCollectionLead"),
      cta: t("exploreInvestment"),
      href: "/properties?collection=investment",
      count: investment.length,
      locations: getTopLocations(investment),
    },
  ];

  return (
    <section className={compact ? "bg-background py-14 lg:py-20" : "bg-background py-16 lg:py-24"}>
      <Container>
        <div className="grid gap-6 lg:grid-cols-2">
          {cards.map((card) => (
            <article key={card.id} id={card.id} className="border border-border bg-background-alt p-7 lg:p-8">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-accent">
                {card.count} {t("briefListingsAvailable")}
              </p>
              <h2 className="mt-4 font-sans text-3xl font-medium tracking-tight text-primary">{card.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-text-light">{card.body}</p>
              <p className="mt-4 border-l-2 border-accent/80 pl-4 text-sm leading-relaxed text-primary">
                {card.lead}
              </p>
              {card.locations ? (
                <p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-text-light">
                  {card.locations}
                </p>
              ) : null}
              <Link
                href={card.href}
                className="mt-6 inline-flex text-sm font-semibold text-primary transition-colors hover:text-accent"
              >
                {card.cta} →
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
