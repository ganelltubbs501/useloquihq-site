import type { Metadata, Viewport } from "next";
import { Archivo, Bungee, Courier_Prime, Sedgwick_Ave_Display } from "next/font/google";
import "./globals.css";

const archivo = Archivo({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const bungee = Bungee({ variable: "--font-piece", weight: "400", subsets: ["latin"], display: "swap" });
const tag = Sedgwick_Ave_Display({ variable: "--font-tag", weight: "400", subsets: ["latin"], display: "swap" });
const mono = Courier_Prime({ variable: "--font-mono", weight: ["400", "700"], subsets: ["latin"], display: "swap" });

const title = "LoquiHQ founding beta: AI for podcasters";
const description =
  "Join the LoquiHQ founding beta list. LoquiHQ transcribes each episode, finds and cuts the moments worth clipping, writes the social posts, and sends the finished audio to your host.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.useloquihq.com"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://www.useloquihq.com/",
    siteName: "LoquiHQ",
    title,
    description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "LoquiHQ" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = { themeColor: "#111111", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${bungee.variable} ${tag.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
