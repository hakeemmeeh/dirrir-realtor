"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { EnquiryModal } from "./EnquiryModal";

export function PropertyEnquiryCta({ propertyTitle }: { propertyTitle: string }) {
  const t = useTranslations("Property");
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mb-4 rounded-none border border-border bg-background p-3 text-xs text-text-light">
        <p className="font-semibold text-primary">{t("enquiryAssuranceTitle")}</p>
        <p className="mt-1">{t("enquiryAssuranceBody")}</p>
      </div>
      <Button
        variant="primary"
        className="w-full justify-center rounded-full px-6 py-3 hover:!bg-accent sm:w-auto"
        onClick={() => setOpen(true)}
      >
        {t("enquire")}
      </Button>
      <EnquiryModal open={open} onClose={() => setOpen(false)} propertyTitle={propertyTitle} />
    </>
  );
}
