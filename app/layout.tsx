import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#087E8B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "LifeLink — Healthcare Access, Live Queue & Blood Donor Platform",
  description: "Find Dhaka doctors, book appointments, track live consultation queues, and connect with emergency blood donors. Academic demonstration project.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased font-sans bg-[#F8FAFC]`}>
        {children}
      </body>
    </html>
  );
}
