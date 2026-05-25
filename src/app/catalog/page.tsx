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
    <div className="space-y-8 animate-fade-in">
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-4xl text-cactus-900">Каталог</h1>
          <p className="text-cactus-700/80 text-sm">
            {filtered.length} {pluralProducts(filtered.length)} в наличии
          </p>
        </div>
        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по названию"
            className="input md:w-72"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="input md:w-52"
          >
            <option value="popular">Сначала популярные</option>
            <option value="price-asc">Цена: по возрастанию</option>
            <option value="price-desc">Цена: по убыванию</option>
          </select>
        </div>
      </header>

      <div className="flex gap-2 flex-wrap">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={clsx(
              "px-3 py-1.5 rounded-full text-sm transition-colors border",
              category === c.id
                ? "bg-cactus-600 text-sand-50 border-cactus-600"
                : "bg-white text-cactus-700 border-cactus-100 hover:border-cactus-300",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card p-12 text-center text-cactus-700/80">
          <div className="text-5xl mb-2">🌵</div>
          Ничего не нашли. Попробуйте другую категорию.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
