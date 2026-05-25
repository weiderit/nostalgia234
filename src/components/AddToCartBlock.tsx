"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import type { Product } from "@/lib/products";

export function AddToCartBlock({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    add(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-stretch gap-3">
        <div className="flex items-center rounded-full bg-white border border-cactus-100 shadow-soft">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-11 h-11 grid place-items-center text-cactus-700 hover:text-cactus-900 transition-colors"
            aria-label="Уменьшить"
          >
            <span className="text-lg">−</span>
          </button>
          <span className="w-9 text-center font-medium text-cactus-900">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))}
            className="w-11 h-11 grid place-items-center text-cactus-700 hover:text-cactus-900 transition-colors"
            aria-label="Увеличить"
          >
            <span className="text-lg">+</span>
          </button>
        </div>
        <button
          onClick={onAdd}
          className="btn btn-primary flex-1 py-3"
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? "Нет в наличии" : added ? "Добавлено ✓" : "В корзину"}
        </button>
      </div>
      {added && (
        <Link
          href="/cart"
          className="text-sm text-cactus-600 hover:text-cactus-800 underline-offset-4 hover:underline animate-fade-in"
        >
          перейти в корзину →
        </Link>
      )}
    </div>
  );
}
