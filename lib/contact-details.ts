/** Kenya MSISDN without leading + (for wa.me and tel:+). */
export const CONTACT_PHONES_E164 = ["254722872539", "254797403166"] as const;

/** Default WhatsApp for floating button and listing CTAs (both numbers listed on Contact + Footer). */
export const WHATSAPP_PRIMARY_E164 = CONTACT_PHONES_E164[0];

const phoneRe = /^254(\d{9})$/;

export function formatKeDisplay(e164: string): string {
  const m = e164.match(phoneRe);
  if (!m) return `+${e164}`;
  const n = m[1];
  return `+254 ${n.slice(0, 3)} ${n.slice(3, 6)} ${n.slice(6)}`;
}

export function telHref(e164: string): string {
  return `tel:+${e164}`;
}

export function whatsappHref(e164: string, message?: string): string {
  const base = `https://wa.me/${e164}`;
  if (!message?.length) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
