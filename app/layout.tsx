import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../src/styles.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.awaautos.com"),
  title: {
    default: "AWA AUTO MALL | Global Vehicle Sourcing",
    template: "%s | AWA AUTO MALL",
  },
  description:
    "Source verified vehicles from China with AWA AUTO MALL. Browse export-ready cars, compare vehicles, and request worldwide shipping support.",
  alternates: { canonical: "https://www.awaautos.com" },
  openGraph: {
    type: "website",
    siteName: "AWA AUTO MALL",
    title: "AWA AUTO MALL | Global Vehicle Sourcing",
    description:
      "Browse export-ready vehicles from China and connect with AWA AUTO MALL for worldwide sourcing and shipping.",
    url: "https://www.awaautos.com",
    images: [{ url: "/favicon.png", alt: "AWA AUTO MALL" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AWA AUTO MALL | Global Vehicle Sourcing",
    description: "Export-ready vehicles from China with worldwide sourcing support.",
  },
  icons: { icon: "/favicon.png", apple: "/icons/icon-192.png" },
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
