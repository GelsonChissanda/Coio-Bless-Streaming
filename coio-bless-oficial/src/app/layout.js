import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Coio Bless | Música Oficial",
    template: "%s | Coio Bless",
  },
  description:
    "Ouça, baixe e acompanhe as letras das músicas de Coio Bless. Discografia completa com álbuns, EPs e singles.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1 pb-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}