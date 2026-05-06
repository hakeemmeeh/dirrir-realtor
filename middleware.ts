import { type NextRequest, NextResponse } from "next/server";

/**
 * Baseline hardening for all responses. Tune CSP separately if you add stricter policies
 * (third-party scripts: GA, Meta Pixel, WhatsApp, Maps, Sanity CDN).
 */
export function middleware(_request: NextRequest) {
  const res = NextResponse.next();

  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "SAMEORIGIN");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.headers.set("X-DNS-Prefetch-Control", "on");

  if (process.env.NODE_ENV === "production") {
    res.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except Next internals and common static files (faster, fewer edge invocations).
     */
    "/((?!_next/static|_next/image|favicon.ico|icon.png|robots.txt|sitemap.xml).*)",
  ],
};
