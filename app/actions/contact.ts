"use server";

import { Resend } from "resend";

export type SubmitResult = { ok: true } | { ok: false; error: string };

function formatPayload(payload: Record<string, unknown>): string {
  return Object.entries(payload)
    .map(([k, v]) => `${k}: ${String(v)}`)
    .join("\n");
}

function recipients(): { from: string; to: string[] } | null {
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  const rawTo = process.env.CONTACT_TO_EMAIL?.trim();
  const to = rawTo
    ? rawTo.split(",").map((s) => s.trim()).filter(Boolean)
    : from
      ? [from]
      : [];
  if (!from || to.length === 0) return null;
  return { from, to };
}

async function sendMail(subject: string, text: string): Promise<SubmitResult> {
  const key = process.env.RESEND_API_KEY?.trim();
  const r = recipients();

  if (!key || !r) {
    if (process.env.NODE_ENV === "development") {
      console.info("[email] RESEND_API_KEY / RESEND_FROM_EMAIL / CONTACT_TO_EMAIL not set; skipping send");
      return { ok: true };
    }
    return { ok: false, error: "Email is not configured." };
  }

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: r.from,
      to: r.to,
      subject,
      text,
    });
    if (error) {
      console.error("[resend]", error);
      return { ok: false, error: "Could not send email. Please try again." };
    }
    return { ok: true };
  } catch (e) {
    console.error("[resend]", e);
    return { ok: false, error: "Could not send email. Please try again." };
  }
}

export async function submitContactForm(formData: FormData): Promise<SubmitResult> {
  const payload = Object.fromEntries(formData.entries()) as Record<string, unknown>;
  if (process.env.NODE_ENV === "development") {
    console.info("[contact]", payload);
  }
  const name = String(payload.name ?? "").trim() || "Unknown";
  const subject = `Dirrir Realtor enquiry — ${name}`;
  const text = formatPayload(payload);
  return sendMail(subject, text);
}

export async function submitPropertyEnquiry(formData: FormData): Promise<SubmitResult> {
  const payload = Object.fromEntries(formData.entries()) as Record<string, unknown>;
  if (process.env.NODE_ENV === "development") {
    console.info("[property-enquiry]", payload);
  }
  const property = String(payload.propertyTitle ?? "Property").trim();
  const name = String(payload.name ?? "").trim() || "Unknown";
  const subject = `Property enquiry: ${property} — ${name}`;
  const text = formatPayload(payload);
  return sendMail(subject, text);
}
