"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/products";
import { CactusArt } from "@/components/CactusArt";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <div className="card overflow-hidden flex flex-col group">
      <Link
        href={`/product/${product.id}`}
        className="block aspect-[4/5] relative cactus-pattern overflow-hidden"
        aria-label={product.name}
      >
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
          <CactusArt accent={product.accent} variant={product.category} className="absolute inset-0" />
        </div>
        <span className="absolute top-3 left-3 tag">{product.category}</span>
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute top-3 right-3 tag bg-clay-100/80 text-clay-500 border-clay-200">
            осталось мало
          </span>
        )}
      </Link>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/product/${product.id}`}
              className="font-display text-[1.2rem] text-cactus-900 hover:text-cactus-600 leading-snug block transition-colors"
            >
              {product.name}
            </Link>
            <div className="text-xs text-cactus-700/60 italic mt-0.5 font-display">{product.latin}</div>
          </div>
          <div className="text-right shrink-0">
            <div className="font-display text-lg text-cactus-800 font-medium">
              {formatPrice(product.price)}
            </div>
            <div className="text-[11px] uppercase tracking-wider text-cactus-700/55 mt-0.5">
              {product.size}
            </div>
          </div>
        </div>
        <div className="mt-auto flex items-center gap-2 pt-3">
          <button
            onClick={() => add(product.id)}
            className="btn btn-primary text-sm flex-1 py-2.5"
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Нет в наличии" : "В корзину"}
          </button>
        </div>
      </div>
    </div>
  );
}
