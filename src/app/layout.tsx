import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Player } from "@/components/Player";
import { PlayerProvider } from "@/components/PlayerProvider";
import { getDB } from "@/lib/db";

export async function generateMetadata(): Promise<Metadata> {
  const db = await getDB();
  return {
    title: `${db.settings.siteName} — only my sound`,
    description: db.settings.tagline,
  };
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const db = await getDB();
  return (
    <html lang="ru">
      <body className="bg-ink-950 text-ink-100 min-h-screen">
        <PlayerProvider>
          <div className="flex min-h-screen">
            <Sidebar
              artistName={db.settings.artistName}
              siteName={db.settings.siteName}
            />
            <main className="flex-1 min-w-0 pb-32">
              <div className="mx-auto max-w-6xl px-6 lg:px-10 py-8">
                {children}
              </div>
            </main>
          </div>
          <Player />
        </PlayerProvider>
      </body>
    </html>
  );
}
