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
  const progress = Math.min(100, (subtotal / FREE_DELIVERY_FROM) * 100);

  if (rows.length === 0) {
    return (
      <div className="animate-fade-in card p-16 text-center max-w-xl mx-auto relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-cactus-100/60 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-clay-100/50 blur-2xl" />
        <div className="relative">
          <div className="w-36 h-36 mx-auto">
            <CactusArt accent="#65a466" />
          </div>
          <h1 className="font-display text-3xl text-cactus-900 mt-2">Корзина пуста</h1>
          <p className="text-cactus-700/80 mt-2">
            Самое время выбрать пару колючих друзей.
          </p>
          <Link href="/catalog" className="btn btn-primary mt-6 inline-flex">
            В каталог →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fade-in">
      <header>
        <span className="tag">{rows.length} {pluralPositions(rows.length)}</span>
        <h1 className="font-display text-5xl text-cactus-900 mt-3 tracking-tight">
          Ваша корзина
        </h1>
      </header>

      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-4">
          {rows.map(({ product, qty }) => (
            <div key={product.id} className="card p-4 md:p-5 flex flex-col sm:flex-row gap-4 sm:items-center">
              <Link
                href={`/product/${product.id}`}
                className="w-full sm:w-28 h-28 rounded-2xl overflow-hidden cactus-pattern shrink-0 relative"
              >
                <CactusArt accent={product.accent} variant={product.category} className="absolute inset-0" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/product/${product.id}`}
                  className="font-display text-xl text-cactus-900 hover:text-cactus-600 block leading-snug transition-colors"
                >
                  {product.name}
                </Link>
                <div className="text-xs text-cactus-700/65 italic mt-0.5 font-display">{product.latin}</div>
                <div className="text-sm text-cactus-700/75 mt-2 flex items-center gap-3">
                  <span>{product.size}</span>
                  <span className="w-1 h-1 rounded-full bg-cactus-300" />
                  <span>{formatPrice(product.price)}</span>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4">
                <div className="flex items-center rounded-full border border-cactus-100 bg-white shadow-soft">
                  <button
                    onClick={() => setQty(product.id, qty - 1)}
                    className="w-10 h-10 grid place-items-center text-cactus-700 hover:text-cactus-900"
                    aria-label="Уменьшить"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-medium">{qty}</span>
                  <button
                    onClick={() => setQty(product.id, qty + 1)}
                    className="w-10 h-10 grid place-items-center text-cactus-700 hover:text-cactus-900"
                    aria-label="Увеличить"
                  >
                    +
                  </button>
                </div>
                <div className="w-28 text-right">
                  <div className="font-display text-lg text-cactus-900 font-medium">
                    {formatPrice(product.price * qty)}
                  </div>
                  <button
                    onClick={() => remove(product.id)}
                    className="text-xs text-cactus-700/65 hover:text-clay-500 mt-1 transition-colors"
                  >
                    убрать
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="card p-6 md:p-7 h-fit lg:sticky lg:top-28 space-y-5">
          <h2 className="font-display text-2xl text-cactus-900">Итого</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-cactus-700/80">Товары</dt>
              <dd className="text-cactus-900">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-cactus-700/80">Доставка</dt>
              <dd className="text-cactus-900">{delivery === 0 ? "бесплатно" : formatPrice(delivery)}</dd>
            </div>
          </dl>

          {subtotal < FREE_DELIVERY_FROM && (
            <div className="space-y-2">
              <div className="h-1.5 rounded-full bg-cactus-50 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cactus-400 to-cactus-600 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-cactus-700/75">
                Ещё <strong className="text-cactus-900">{formatPrice(FREE_DELIVERY_FROM - subtotal)}</strong> до бесплатной доставки 🌵
              </p>
            </div>
          )}

          <div className="border-t border-cactus-100/60 pt-4 flex justify-between items-baseline">
            <span className="text-cactus-800">К оплате</span>
            <span className="font-display text-3xl text-cactus-900">{formatPrice(total)}</span>
          </div>
          <Link href="/checkout" className="btn btn-primary w-full py-3">
            Оформить заказ →
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

function pluralPositions(n: number) {
  const a = Math.abs(n) % 100;
  const n1 = a % 10;
  if (a > 10 && a < 20) return "позиций";
  if (n1 > 1 && n1 < 5) return "позиции";
  if (n1 === 1) return "позиция";
  return "позиций";
}
