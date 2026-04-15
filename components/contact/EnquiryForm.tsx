"use client";

import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";
import { submitContactForm } from "@/app/actions/contact";
import { useState } from "react";

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-sm bg-accent py-4 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-50 sm:w-auto sm:px-12"
    >
      {pending ? pendingLabel : label}
    </button>
  );
}

export function EnquiryForm() {
  const t = useTranslations("Form");
  const tc = useTranslations("ContactPage");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  return (
    <section className="py-12">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <form
          action={async (fd) => {
            setStatus("idle");
            const r = await submitContactForm(fd);
            setStatus(r.ok ? "ok" : "err");
          }}
          className="rounded-sm border border-border bg-background p-6 shadow-sm sm:p-10"
        >
          <div className="mb-6 rounded-sm border border-border bg-background-alt p-4 text-sm text-text-light sm:mb-8">
            <p className="font-semibold text-primary">{tc("expectTitle")}</p>
            <p className="mt-1">{tc("expectBody")}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-text-light">
                {t("name")} *
              </label>
              <input
                name="name"
                required
                className="mt-2 w-full rounded-sm border border-border px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-text-light">
                {t("email")} *
              </label>
              <input
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-sm border border-border px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-text-light">
                {t("phone")} *
              </label>
              <input
                name="phone"
                required
                className="mt-2 w-full rounded-sm border border-border px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-text-light">
                {t("interest")}
              </label>
              <select
                name="interest"
                className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm"
                defaultValue="buying"
              >
                <option value="buying">{t("interestBuying")}</option>
                <option value="renting">{t("interestRenting")}</option>
                <option value="selling">{t("interestSelling")}</option>
                <option value="advisory">{t("interestAdvisory")}</option>
                <option value="other">{t("interestOther")}</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-text-light">
                {t("location")}
              </label>
              <select
                name="preferredLocation"
                className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm"
              >
                <option value="parklands">Parklands</option>
                <option value="kilimani">Kilimani</option>
                <option value="westlands">Westlands</option>
                <option value="lavington">Lavington</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-text-light">
                {t("budget")}
              </label>
              <input
                name="budget"
                className="mt-2 w-full rounded-sm border border-border px-4 py-3 text-sm"
                placeholder="e.g. USD 120,000 or USD 1,000/mo"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-text-light">
                {t("message")}
              </label>
              <textarea
                name="message"
                rows={4}
                className="mt-2 w-full rounded-sm border border-border px-4 py-3 text-sm"
              />
            </div>
          </div>
          {status === "ok" ? (
            <p className="mt-6 text-sm font-medium text-primary">{tc("success")}</p>
          ) : null}
          {status === "err" ? <p className="mt-6 text-sm text-accent">{tc("error")}</p> : null}
          <div className="mt-8">
            <SubmitButton label={tc("submit")} pendingLabel={tc("sending")} />
          </div>
          <p className="mt-4 text-xs leading-relaxed text-text-light">{tc("privacyNote")}</p>
        </form>
      </div>
    </section>
  );
}
