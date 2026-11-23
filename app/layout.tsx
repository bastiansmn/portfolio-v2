import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bastian SOMON — Ingénieur en informatique",
  description:
    "Ingénieur en informatique spécialisé dans la conception, l'architecture et le déploiement de systèmes complexes en environnements souverains. Certifié Scaleway Solution Architect.",
  keywords: ["ingénieur", "cloud", "devops", "scaleway", "kubernetes", "portfolio", "souverain"],
  authors: [{ name: "Bastian SOMON" }],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${jetbrains.variable} h-full`}>
      <body className="min-h-full bg-zinc-950 text-zinc-200 font-mono antialiased flex flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
