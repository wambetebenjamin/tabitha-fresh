import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

/* Verbatim styles from Freshen-v1.0.0.zip (449 --bs-* custom properties + Inter var @font-face) */
import "../../assets/css/font/inter.css";
import "../../assets/css/main.css";
import "../../assets/css/style.css";
import "./globals.css";

import Providers from "@/components/Providers";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VoiceTourButton from "@/components/VoiceTourButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: `${BRAND_NAME} | ${BRAND_TAGLINE}`,
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    "Nairobi's trusted doorstep laundry pickup, wash and fold, dry cleaning, ironing, duvet care, shoe cleaning, and 24-hour delivery service.",
  icons: {
    icon: [
      { url: "/assets/logo/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/logo/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/assets/logo/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" data-bs-theme="light">
      <body className="bg-body text-body d-flex flex-column min-vh-100">
        <Providers>
          <Preloader />
          <Navbar />
          <main id="main-content" className="flex-grow-1">
            {children}
          </main>
          <Footer />
          <VoiceTourButton />
          <WhatsAppButton />
          <CookieConsent />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
