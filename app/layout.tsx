import type { Metadata, Viewport } from "next";
import {
  Bodoni_Moda,
  DM_Mono,
  DM_Sans,
  Playfair_Display,
  Plus_Jakarta_Sans,
} from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import { BASE_KEYWORDS, SITE_NAME, SITE_URL } from "@/lib/seo";
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

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-bodoni-moda",
  display: "swap",
  adjustFontFallback: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1C2833" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dirrir Realtor Limited | Premium Homes & Apartments in Nairobi, Kenya",
    template: "%s | Dirrir Realtor Limited",
  },
  description:
    "Find premium apartments and houses for sale or rent in Parklands, Kilimani, and Westlands. Dirrir Realtor — trusted real estate services in Nairobi.",
  applicationName: SITE_NAME,
  keywords: BASE_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Real Estate",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: SITE_NAME,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    site: "@dirrirrealtor",
    creator: "@dirrirrealtor",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/images/logo-light-transparent.png",
  },
  manifest: undefined,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const ga = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const fb = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

  const fontVars = `${playfair.variable} ${dmSans.variable} ${plusJakarta.variable} ${dmMono.variable} ${bodoniModa.variable}`;

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
