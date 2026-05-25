"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const items = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/music", label: "Music", icon: DiscIcon },
  { href: "/demos", label: "Demos", icon: WaveIcon },
  { href: "/posts", label: "Posts", icon: BookIcon },
  { href: "/about", label: "About", icon: UserIcon },
];

export function Sidebar({
  artistName,
  siteName,
}: {
  artistName: string;
  siteName: string;
}) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) {
    return null;
  }
  return (
    <aside className="hidden md:flex w-60 lg:w-64 shrink-0 sticky top-0 h-screen border-r border-ink-800 bg-ink-900/80 backdrop-blur flex-col">
      <div className="p-6 pb-4">
        <Link href="/" className="block group">
          <div className="font-display text-2xl text-ink-100 tracking-tight">
            {artistName}
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-ink-400">
            {siteName.replace(artistName, "").trim() || "library"}
          </div>
        </Link>
      </div>
      <nav className="px-3 flex-1 overflow-y-auto scroll-thin">
        <ul className="space-y-1">
          {items.map((it) => {
            const active =
              pathname === it.href ||
              (it.href !== "/" && pathname.startsWith(it.href));
            const Icon = it.icon;
            return (
              <li key={it.href}>
                <Link
                  href={it.href}
                  className={clsx(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-ink-800 text-ink-100"
                      : "text-ink-300 hover:text-ink-100 hover:bg-ink-850",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{it.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-8 px-3 text-[10px] uppercase tracking-[0.22em] text-ink-500">
          Collections
        </div>
        <ul className="mt-2 space-y-1">
          <SideLink href="/music?filter=latest" label="Последний релиз" />
          <SideLink href="/demos" label="Демки" />
          <SideLink href="/music?filter=archive" label="Старое" />
          <SideLink href="/music?filter=coming" label="Невышедшее" />
          <SideLink href="/music?filter=favorite" label="Любимое" />
        </ul>
      </nav>
      <div className="p-4 border-t border-ink-800">
        <Link
          href="/admin"
          className="block text-[11px] text-ink-500 hover:text-ink-300 transition"
        >
          admin →
        </Link>
      </div>
    </aside>
  );
}

function SideLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="block rounded-md px-3 py-1.5 text-[13px] text-ink-400 hover:text-ink-100 hover:bg-ink-850 transition-colors"
      >
        {label}
      </Link>
    </li>
  );
}

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-8.5Z" />
    </svg>
  );
}
function DiscIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}
function WaveIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M3 12h2M7 7v10M11 4v16M15 8v8M19 11v2M21 12h0" />
    </svg>
  );
}
function BookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2V5Z" />
      <path d="M8 7h7M8 11h7M8 15h5" />
    </svg>
  );
}
function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
    </svg>
  );
}
