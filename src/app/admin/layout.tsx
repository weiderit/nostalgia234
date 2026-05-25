import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin, logout } from "@/lib/auth";
import type { ReactNode } from "react";

async function logoutAction() {
  "use server";
  await logout();
  redirect("/admin/login");
}

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const authed = await isAdmin();

  return (
    <div className="-mx-6 lg:-mx-10 -my-8 min-h-screen flex flex-col">
      <header className="border-b border-ink-800 bg-ink-900 sticky top-0 z-30">
        <div className="px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-ink-300 hover:text-ink-100">
              ← на сайт
            </Link>
            <span className="text-ink-700">|</span>
            <Link
              href="/admin"
              className="font-display text-ink-100 tracking-tight"
            >
              admin
            </Link>
            {authed && (
              <nav className="flex items-center gap-4 text-sm">
                <Link
                  href="/admin/tracks"
                  className="text-ink-300 hover:text-ink-100"
                >
                  Tracks
                </Link>
                <Link
                  href="/admin/posts"
                  className="text-ink-300 hover:text-ink-100"
                >
                  Posts
                </Link>
                <Link
                  href="/admin/settings"
                  className="text-ink-300 hover:text-ink-100"
                >
                  Settings
                </Link>
              </nav>
            )}
          </div>
          {authed && (
            <form action={logoutAction}>
              <button className="text-xs text-ink-400 hover:text-ink-100">
                выйти
              </button>
            </form>
          )}
        </div>
      </header>
      <div className="flex-1 w-full px-6 py-8">{children}</div>
    </div>
  );
}
