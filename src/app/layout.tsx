import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Playfair_Display, Manrope } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const display = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const body = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Колючка и Ко — интернет-магазин кактусов",
  description:
    "Кактусы, суккуленты, наборы и горшки с доставкой по России. Растения от тех, кто их искренне любит.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen flex flex-col bg-sand-50 font-sans antialiased">
        <CartProvider>
          <Header />
          <main className="flex-1">
            <div className="mx-auto max-w-6xl px-6 lg:px-10 py-10">{children}</div>
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
