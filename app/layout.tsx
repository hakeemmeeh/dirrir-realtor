import type { Metadata } from "next";
import { DM_Mono, DM_Sans, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import Script from "next/script";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dirrirrealtor.co.ke";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dirrir Realtor Limited | Premium Homes & Apartments in Nairobi, Kenya",
    template: "%s | Dirrir Realtor Limited",
  },
  description:
    "Find premium apartments and houses for sale or rent in Parklands, Kilimani, and Westlands. Dirrir Realtor — trusted real estate services in Nairobi.",
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: "Dirrir Realtor Limited",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const ga = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const fb = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

  const fontVars = `${playfair.variable} ${dmSans.variable} ${plusJakarta.variable} ${dmMono.variable}`;

  return (
    <html lang="en" suppressHydrationWarning className={fontVars}>
      <body className="min-h-screen font-sans">
        <LocalBusinessJsonLd />
        {ga ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ga}');
              `}
            </Script>
          </>
        ) : null}
        {fb ? (
          <Script id="fb-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${fb}');
              fbq('track', 'PageView');
            `}
          </Script>
        ) : null}
        <NextIntlClientProvider locale="en" messages={messages}>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
