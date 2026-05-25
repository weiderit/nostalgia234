"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useCart } from "@/components/CartProvider";
import { getProduct } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { CactusArt } from "@/components/CactusArt";

const FREE_DELIVERY_FROM = 3500;
const DELIVERY_COST = 390;

export default function CartPage() {
  const { items, setQty, remove } = useCart();

  const rows = useMemo(
    () =>
      items
        .map((i) => {
          const product = getProduct(i.id);
          return product ? { product, qty: i.qty } : null;
        })
        .filter((x): x is { product: ReturnType<typeof getProduct> & {}; qty: number } => x !== null),
    [items],
  );

  const subtotal = rows.reduce((acc, r) => acc + r.product.price * r.qty, 0);
  const delivery = subtotal === 0 ? 0 : subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_COST;
  const total = subtotal + delivery;

  if (rows.length === 0) {
    return (
      <div className="animate-fade-in card p-12 text-center max-w-xl mx-auto">
        <div className="text-6xl mb-3">🌵</div>
        <h1 className="font-display text-2xl text-cactus-900">Корзина пуста</h1>
        <p className="text-cactus-700/80 mt-2">
          Самое время выбрать пару колючих друзей.
        </p>
        <Link href="/catalog" className="btn btn-primary mt-5">
          В каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h1 className="font-display text-4xl text-cactus-900">Корзина</h1>
        <p className="text-cactus-700/80 text-sm">{rows.length} позиции</p>
      </header>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-3">
          {rows.map(({ product, qty }) => (
            <div key={product.id} className="card p-4 flex gap-4 items-center">
              <Link
                href={`/product/${product.id}`}
                className="w-24 h-24 rounded-lg overflow-hidden cactus-pattern shrink-0 relative"
              >
                <CactusArt accent={product.accent} variant={product.category} className="absolute inset-0" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/product/${product.id}`}
                  className="font-display text-lg text-cactus-900 hover:text-cactus-600 block"
                >
                  {product.name}
                </Link>
                <div className="text-xs text-cactus-700/70 italic">{product.latin}</div>
                <div className="text-sm text-cactus-700/80 mt-1">{product.size}</div>
              </div>
              <div className="flex items-center rounded-full border border-cactus-200 bg-white">
                <button
                  onClick={() => setQty(product.id, qty - 1)}
                  className="w-9 h-9 grid place-items-center text-cactus-700 hover:text-cactus-900"
                  aria-label="Уменьшить"
                >
                  −
                </button>
                <span className="w-8 text-center font-medium">{qty}</span>
                <button
                  onClick={() => setQty(product.id, qty + 1)}
                  className="w-9 h-9 grid place-items-center text-cactus-700 hover:text-cactus-900"
                  aria-label="Увеличить"
                >
                  +
                </button>
              </div>
              <div className="w-28 text-right">
                <div className="font-medium text-cactus-800">{formatPrice(product.price * qty)}</div>
                <button
                  onClick={() => remove(product.id)}
                  className="text-xs text-cactus-700/70 hover:text-clay-500 mt-1"
                >
                  убрать
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="card p-6 h-fit lg:sticky lg:top-24 space-y-4">
          <h2 className="font-display text-xl text-cactus-900">Итого</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-cactus-700/80">Товары</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-cactus-700/80">Доставка</dt>
              <dd>{delivery === 0 ? "бесплатно" : formatPrice(delivery)}</dd>
            </div>
          </dl>
          {subtotal < FREE_DELIVERY_FROM && (
            <p className="text-xs text-cactus-700/70 bg-cactus-50 rounded-lg p-3">
              До бесплатной доставки осталось{" "}
              <strong>{formatPrice(FREE_DELIVERY_FROM - subtotal)}</strong>.
            </p>
          )}
          <div className="border-t border-cactus-100 pt-3 flex justify-between items-baseline">
            <span className="text-cactus-800">К оплате</span>
            <span className="font-display text-2xl text-cactus-900">{formatPrice(total)}</span>
          </div>
          <Link href="/checkout" className="btn btn-primary w-full">
            Оформить заказ
          </Link>
          <Link
            href="/catalog"
            className="block text-center text-sm text-cactus-600 hover:text-cactus-800"
          >
            продолжить покупки
          </Link>
        </aside>
      </div>
    </div>
  );
}
