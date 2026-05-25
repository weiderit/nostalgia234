"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useCart } from "@/components/CartProvider";

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
    <header className="sticky top-0 z-30 backdrop-blur bg-sand-50/85 border-b border-cactus-100">
      <div className="mx-auto max-w-6xl px-6 lg:px-10 h-16 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 font-display text-xl text-cactus-800">
          <span className="text-2xl">🌵</span>
          <span>Колючка&nbsp;и&nbsp;Ко</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 ml-4">
          {nav.map((n) => {
            const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={clsx(
                  "px-3 py-1.5 rounded-full text-sm transition-colors",
                  active
                    ? "bg-cactus-100 text-cactus-800"
                    : "text-cactus-700 hover:bg-cactus-50",
                )}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/cart" className="relative btn btn-ghost px-4 py-1.5 text-sm">
            <span>Корзина</span>
            <span
              className={clsx(
                "min-w-[1.4rem] text-center rounded-full text-xs px-1.5 py-0.5",
                count > 0 ? "bg-cactus-600 text-sand-50" : "bg-cactus-100 text-cactus-700",
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
                "px-3 py-1.5 rounded-full text-sm whitespace-nowrap",
                active ? "bg-cactus-100 text-cactus-800" : "text-cactus-700 hover:bg-cactus-50",
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
