"use client";

import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitPropertyEnquiry } from "@/app/actions/contact";

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-sm bg-accent py-3 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-50"
    >
      {pending ? pendingLabel : label}
    </button>
  );
}

type Props = {
  open: boolean;
  onClose: () => void;
  propertyTitle: string;
};

export function EnquiryModal({ open, onClose, propertyTitle }: Props) {
  const t = useTranslations("Form");
  const tc = useTranslations("ContactPage");
  const formRef = useRef<HTMLFormElement>(null);
  const [submitErr, setSubmitErr] = useState(false);

  useEffect(() => {
    if (!open) {
      formRef.current?.reset();
      setSubmitErr(false);
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-black/50 p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-xl bg-background p-6 shadow-2xl sm:rounded-sm"
            style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl text-primary">{propertyTitle}</h2>
                <p className="mt-1 text-sm text-text-light">Quick enquiry</p>
              </div>
              <button type="button" onClick={onClose} aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form
              ref={formRef}
              action={async (formData) => {
                setSubmitErr(false);
                formData.set("propertyTitle", propertyTitle);
                const res = await submitPropertyEnquiry(formData);
                if (res.ok) onClose();
                else setSubmitErr(true);
              }}
              className="mt-6 space-y-4"
            >
              <div>
                <label className="text-xs font-semibold text-text-light">{t("name")}</label>
                <input
                  name="name"
                  required
                  className="mt-1 w-full rounded-sm border border-border px-3 py-2.5 text-base sm:text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-text-light">{t("email")}</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded-sm border border-border px-3 py-2.5 text-base sm:text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-text-light">{t("phone")}</label>
                <input
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  required
                  className="mt-1 w-full rounded-sm border border-border px-3 py-2.5 text-base sm:text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-text-light">{t("message")}</label>
                <textarea
                  name="message"
                  rows={3}
                  className="mt-1 w-full rounded-sm border border-border px-3 py-2.5 text-base sm:text-sm"
                />
              </div>
              {submitErr ? (
                <p className="text-sm text-accent" role="alert">
                  {tc("error")}
                </p>
              ) : null}
              <SubmitButton label={tc("submit")} pendingLabel={tc("sending")} />
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
