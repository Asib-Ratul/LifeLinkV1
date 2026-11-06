import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#087E8B",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "LifeLink — Healthcare Access, Live Queue & Blood Donor Platform",
  description: "Fictional Dhaka healthcare interface demonstration. No real appointments, queues, or donor alerts are provided.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-[#F8FAFC]">
        {children}
      </body>
    </html>
  );
}
