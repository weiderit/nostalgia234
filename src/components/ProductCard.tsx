"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/products";
import { CactusArt } from "@/components/CactusArt";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <div className="card overflow-hidden flex flex-col">
      <Link
        href={`/product/${product.id}`}
        className="block aspect-[4/5] relative cactus-pattern"
        aria-label={product.name}
      >
        <CactusArt accent={product.accent} variant={product.category} className="absolute inset-0" />
        <span className="absolute top-3 left-3 tag">{product.category}</span>
      </Link>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/product/${product.id}`}
              className="font-display text-lg text-cactus-900 hover:text-cactus-600 leading-tight block"
            >
              {product.name}
            </Link>
            <div className="text-xs text-cactus-700/70 italic">{product.latin}</div>
          </div>
          <div className="text-right shrink-0">
            <div className="font-medium text-cactus-800">{formatPrice(product.price)}</div>
            <div className="text-xs text-cactus-700/70">{product.size}</div>
          </div>
        </div>
        <div className="mt-auto flex items-center gap-2 pt-2">
          <button
            onClick={() => add(product.id)}
            className="btn btn-primary text-sm flex-1"
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Нет в наличии" : "В корзину"}
          </button>
          <Link href={`/product/${product.id}`} className="btn btn-ghost text-sm">
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
}
