import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Dirrir Realtor Limited — Premium Homes & Apartments in Nairobi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #0f141c 0%, #1C2833 60%, #0b0f14 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              background: "#c5a059",
              borderRadius: 999,
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#c5a059",
              fontWeight: 700,
            }}
          >
            Dirrir Realtor Limited
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ height: 1, width: 220, background: "#c5a059", opacity: 0.6 }} />
          <div
            style={{
              fontSize: 74,
              lineHeight: 1.04,
              fontWeight: 500,
              maxWidth: 980,
              letterSpacing: "-0.02em",
            }}
          >
            Premium Homes &amp; Apartments in Nairobi, Kenya
          </div>
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.78)", maxWidth: 900 }}>
            Parklands · Kilimani · Westlands · Lavington — trusted advisory for families
            and diaspora investors.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div>dirrirrealtor.co.ke</div>
          <div>Your Real Estate Professional</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
