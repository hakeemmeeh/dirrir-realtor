import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <div className="flex min-h-[70vh] items-center bg-background-alt py-24">
      <Container className="text-center">
        <h1 className="font-serif text-4xl text-primary">{t("title")}</h1>
        <p className="mx-auto mt-4 max-w-md text-text-light">{t("body")}</p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-sm bg-accent px-8 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
        >
          {t("home")}
        </Link>
      </Container>
    </div>
  );
}
