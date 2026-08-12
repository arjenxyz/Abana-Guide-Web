import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abana Gezi Rehberi | Kastamonu",
  description:
    "Karadeniz'in saklı cenneti Abana'yı keşfedin. Gezilecek yerler, aktiviteler, ulaşım ve konaklama bilgileri.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning className={`${geist.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
