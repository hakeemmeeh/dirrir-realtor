"use server";

import { Resend } from "resend";

export type SubmitResult = { ok: true } | { ok: false; error: string };

const LIMITS = {
  name: 120,
  email: 254,
  phone: 48,
  message: 8000,
  budget: 120,
  propertyTitle: 200,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INTEREST = new Set(["buying", "renting", "selling", "advisory", "other"]);
const LOCATIONS = new Set(["parklands", "kilimani", "westlands", "lavington", "other"]);

function formatPayload(payload: Record<string, unknown>): string {
  return Object.entries(payload)
    .filter(([k]) => !k.startsWith("_"))
    .map(([k, v]) => `${k}: ${String(v)}`)
    .join("\n");
}

function recipients(): { from: string; to: string[] } | null {
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  const rawTo = process.env.CONTACT_TO_EMAIL?.trim();
  const to = rawTo
    ? rawTo
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
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
      console.info(
        "[email] RESEND_API_KEY / RESEND_FROM_EMAIL / CONTACT_TO_EMAIL not set; skipping send",
      );
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

/** Bots often fill hidden fields; acknowledge success but do not send mail or leak behaviour. */
function isHoneypotTriggered(payload: Record<string, unknown>): boolean {
  return String(payload._company ?? "").trim().length > 0;
}

function take(
  payload: Record<string, unknown>,
  key: string,
  max: number,
  required: boolean,
): { ok: true; value: string } | { ok: false } {
  const raw = payload[key];
  if (raw === undefined || raw === null || raw === "") {
    if (required) return { ok: false };
    return { ok: true, value: "" };
  }
  const s = String(raw).trim();
  if (s.length > max) return { ok: false };
  return { ok: true, value: s };
}

export async function submitContactForm(formData: FormData): Promise<SubmitResult> {
  const payload = Object.fromEntries(formData.entries()) as Record<string, unknown>;
  if (process.env.NODE_ENV === "development") {
    console.info("[contact]", { ...payload, _company: "[redacted]" });
  }

  if (isHoneypotTriggered(payload)) return { ok: true };

  const nameResult = take(payload, "name", LIMITS.name, true);
  const emailResult = take(payload, "email", LIMITS.email, true);
  const phoneResult = take(payload, "phone", LIMITS.phone, true);
  const messageResult = take(payload, "message", LIMITS.message, false);
  const budgetResult = take(payload, "budget", LIMITS.budget, false);

  if (
    !nameResult.ok ||
    !emailResult.ok ||
    !phoneResult.ok ||
    !messageResult.ok ||
    !budgetResult.ok
  ) {
    return { ok: false, error: "Please check your details and try again." };
  }

  if (!EMAIL_RE.test(emailResult.value)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const interestRaw = String(payload.interest ?? "buying").trim();
  const interest = INTEREST.has(interestRaw) ? interestRaw : "other";

  const locRaw = String(payload.preferredLocation ?? "other").trim().toLowerCase();
  const preferredLocation = LOCATIONS.has(locRaw) ? locRaw : "other";

  const safePayload = {
    name: nameResult.value,
    email: emailResult.value,
    phone: phoneResult.value,
    interest,
    preferredLocation,
    budget: budgetResult.value,
    message: messageResult.value,
  };

  const subject = `Dirrir Realtor enquiry — ${safePayload.name}`;
  const text = formatPayload(safePayload);
  return sendMail(subject, text);
}

export async function submitPropertyEnquiry(formData: FormData): Promise<SubmitResult> {
  const payload = Object.fromEntries(formData.entries()) as Record<string, unknown>;
  if (process.env.NODE_ENV === "development") {
    console.info("[property-enquiry]", { ...payload, _company: "[redacted]" });
  }

  if (isHoneypotTriggered(payload)) return { ok: true };

  const titleResult = take(payload, "propertyTitle", LIMITS.propertyTitle, true);
  const nameResult = take(payload, "name", LIMITS.name, true);
  const emailResult = take(payload, "email", LIMITS.email, true);
  const phoneResult = take(payload, "phone", LIMITS.phone, true);
  const messageResult = take(payload, "message", LIMITS.message, false);

  if (
    !titleResult.ok ||
    !nameResult.ok ||
    !emailResult.ok ||
    !phoneResult.ok ||
    !messageResult.ok
  ) {
    return { ok: false, error: "Please check your details and try again." };
  }

  if (!EMAIL_RE.test(emailResult.value)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const safePayload = {
    propertyTitle: titleResult.value,
    name: nameResult.value,
    email: emailResult.value,
    phone: phoneResult.value,
    message: messageResult.value,
  };

  const subject = `Property enquiry: ${safePayload.propertyTitle} — ${safePayload.name}`;
  const text = formatPayload(safePayload);
  return sendMail(subject, text);
}
