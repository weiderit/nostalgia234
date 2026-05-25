"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/lib/products";
import clsx from "clsx";

type Sort = "popular" | "price-asc" | "price-desc";

export default function CatalogPage() {
  const [category, setCategory] = useState<string>("все");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("popular");

  const filtered = useMemo(() => {
    let list = products;
    if (category !== "все") list = list.filter((p) => p.category === category);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.latin.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, query, sort]);

  return (
    <div className="space-y-10 animate-fade-in">
      <header className="relative">
        <div className="hero-blob bg-cactus-100 w-[320px] h-[320px] -top-20 -left-10" />
        <div className="relative">
          <span className="tag">каталог</span>
          <h1 className="font-display text-5xl md:text-6xl text-cactus-900 tracking-tight mt-3 leading-[1.05]">
            Подберите{" "}
            <em className="not-italic text-cactus-500" style={{ fontStyle: "italic" }}>
              своего
            </em>{" "}
            кактуса
          </h1>
          <p className="text-cactus-700/80 mt-3 max-w-xl">
            {filtered.length} {pluralProducts(filtered.length)} в наличии — от
            миниатюрных литопсов до колючих гигантов.
          </p>
        </div>
      </header>

      <div className="card p-4 md:p-5 flex flex-col md:flex-row gap-3 md:items-center">
        <div className="flex gap-2 flex-wrap flex-1">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={clsx(
                "px-4 py-2 rounded-full text-sm transition-all border",
                category === c.id
                  ? "bg-cactus-600 text-sand-50 border-cactus-600 shadow-soft"
                  : "bg-white/70 text-cactus-800 border-cactus-100 hover:border-cactus-300 hover:bg-white",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2 md:ml-auto">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="🔍  поиск"
            className="input md:w-64"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="input md:w-56 cursor-pointer"
          >
            <option value="popular">Сначала популярные</option>
            <option value="price-asc">Цена: по возрастанию</option>
            <option value="price-desc">Цена: по убыванию</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card p-16 text-center text-cactus-700/80">
          <div className="text-6xl mb-3">🌵</div>
          <p className="font-display text-2xl text-cactus-900">Ничего не нашли</p>
          <p className="mt-2">Попробуйте другую категорию или сбросьте поиск.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function pluralProducts(n: number) {
  const a = Math.abs(n) % 100;
  const n1 = a % 10;
  if (a > 10 && a < 20) return "позиций";
  if (n1 > 1 && n1 < 5) return "позиции";
  if (n1 === 1) return "позиция";
  return "позиций";
}
