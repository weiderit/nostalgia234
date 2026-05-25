"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useCart } from "@/components/CartProvider";
import { CactusArt } from "@/components/CactusArt";

const nav = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/care", label: "Уход" },
  { href: "/about", label: "О нас" },
];

export function Header() {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-sand-50/75 border-b border-cactus-100/60">
      <div className="mx-auto max-w-6xl px-6 lg:px-10 h-20 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="w-11 h-11 rounded-2xl bg-cactus-50 border border-cactus-100 overflow-hidden grid place-items-center shadow-soft group-hover:shadow-glow transition-shadow">
            <span className="block w-9 h-9">
              <CactusArt accent="#65a466" variant="кактус" />
            </span>
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-xl text-cactus-900 tracking-tight">
              Колючка
              <span className="text-cactus-500"> и Ко</span>
            </span>
            <span className="text-[10.5px] uppercase tracking-[0.22em] text-cactus-500/80">
              cactus boutique
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 ml-6">
          {nav.map((n) => {
            const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={clsx(
                  "px-4 py-2 rounded-full text-[0.92rem] transition-all",
                  active
                    ? "bg-cactus-100/80 text-cactus-800 shadow-soft"
                    : "text-cactus-700/85 hover:text-cactus-900 hover:bg-cactus-50/70",
                )}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 rounded-full pl-4 pr-2 py-1.5 bg-white/70 hover:bg-white border border-cactus-100 hover:border-cactus-300 transition-colors text-sm text-cactus-800"
          >
            <span className="hidden sm:inline">Корзина</span>
            <span aria-hidden className="sm:hidden">🧺</span>
            <span
              className={clsx(
                "min-w-[1.5rem] text-center rounded-full text-xs px-2 py-0.5 font-medium",
                count > 0
                  ? "bg-cactus-600 text-sand-50 shadow-soft"
                  : "bg-cactus-50 text-cactus-500",
              )}
            >
              {count}
            </span>
          </Link>
        </div>
      </div>

      <nav className="md:hidden mx-auto max-w-6xl px-6 pb-3 flex gap-1 overflow-x-auto scroll-thin">
        {nav.map((n) => {
          const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              className={clsx(
                "px-3.5 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors",
                active
                  ? "bg-cactus-100/80 text-cactus-800"
                  : "text-cactus-700/85 hover:bg-cactus-50/70",
              )}
            >
              {n.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
