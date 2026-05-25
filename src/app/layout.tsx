import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Колючка и Ко — интернет-магазин кактусов",
  description:
    "Кактусы, суккуленты, наборы и горшки с доставкой по России. Растения от тех, кто их искренне любит.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen flex flex-col bg-sand-50">
        <CartProvider>
          <Header />
          <main className="flex-1">
            <div className="mx-auto max-w-6xl px-6 lg:px-10 py-8">{children}</div>
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
