import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://solx.com"),
  title: {
    default: "Sol-X | Project Execution Platform for Renewable Energy",
    template: "%s | Sol-X",
  },
  description:
    "Sol-X is a comprehensive project execution platform for renewable energy infrastructure. Track milestones, manage tasks, capture photo evidence, and generate automated reports for solar, wind, and hybrid projects.",
  keywords: [
    "renewable energy project management",
    "solar project tracking",
    "wind energy infrastructure",
    "project execution platform",
    "construction management software",
    "milestone tracking",
    "photo evidence capture",
    "automated reporting",
    "infrastructure project management",
    "energy project software",
    "EPC project management",
    "renewable energy execution",
  ],
  authors: [{ name: "Sol-X Team" }],
  creator: "Sol-X",
  publisher: "Sol-X",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://solx.com",
    siteName: "Sol-X",
    title: "Sol-X | Project Execution Platform for Renewable Energy",
    description:
      "Unified platform for renewable energy project execution. Track milestones, manage tasks, capture evidence, and automate reporting for solar, wind, and hybrid projects.",
    images: [
      {
        url: "/icon.svg",
        width: 1200,
        height: 630,
        alt: "Sol-X - Project Execution Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sol-X | Project Execution Platform for Renewable Energy",
    description:
      "Unified platform for renewable energy project execution. Track milestones, manage tasks, and automate reporting.",
    images: ["/icon.svg"],
    creator: "@solx",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", sizes: "any" },
    ],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://solx.com",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
