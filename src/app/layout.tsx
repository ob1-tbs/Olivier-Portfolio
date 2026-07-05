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
  title: "Olivier Buigues — Digital Marketing, Management & AI",
  description:
    "Portfolio of Olivier Buigues — Executive with expertise in digital marketing, operations, P&L oversight, AI-driven strategy, and academic leadership at TBS Education Barcelona.",
  keywords: [
    "Olivier Buigues",
    "Digital Marketing",
    "AI",
    "Management",
    "TBS Education",
    "Barcelona",
    "Portfolio",
  ],
  authors: [{ name: "Olivier Buigues" }],
  openGraph: {
    title: "Olivier Buigues — Digital Marketing, Management & AI",
    description:
      "Executive portfolio showcasing experience in digital marketing, AI strategy, and academic leadership.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050510] text-white`}
      >
        {children}
      </body>
    </html>
  );
}