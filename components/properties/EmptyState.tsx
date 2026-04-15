import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";

export async function EmptyState() {
  const t = await getTranslations("PropertiesPage");
  const n = await getTranslations("Home");

  return (
    <div className="py-16 text-center">
      <p className="mx-auto max-w-lg text-text-light">{t("empty")}</p>
      <Button href="/contact" variant="primary" className="mt-8">
        {n("talkAgent")}
      </Button>
    </div>
  );
}
