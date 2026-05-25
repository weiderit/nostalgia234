"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { useCart } from "@/components/CartProvider";
import { getProduct } from "@/lib/products";
import { formatPrice } from "@/lib/format";

const FREE_DELIVERY_FROM = 3500;
const DELIVERY_COST = 390;

type Step = "form" | "done";

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const [step, setStep] = useState<Step>("form");
  const [orderNum, setOrderNum] = useState<string>("");
  const [delivery, setDelivery] = useState<"courier" | "pickup" | "post">("courier");
  const [payment, setPayment] = useState<"card" | "cash">("card");

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
  const deliveryCost = (() => {
    if (delivery === "pickup") return 0;
    if (subtotal >= FREE_DELIVERY_FROM) return 0;
    return delivery === "post" ? 290 : DELIVERY_COST;
  })();
  const total = subtotal + deliveryCost;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const num =
      "K-" +
      Math.floor(Math.random() * 90000 + 10000) +
      "-" +
      new Date().getFullYear();
    setOrderNum(num);
    setStep("done");
    setTimeout(() => clear(), 100);
  };

  if (step === "done") {
    return (
      <div className="animate-fade-in card p-10 text-center max-w-xl mx-auto space-y-3">
        <div className="text-6xl">🌵</div>
        <h1 className="font-display text-3xl text-cactus-900">Спасибо за заказ!</h1>
        <p className="text-cactus-700/90">
          Номер вашего заказа: <strong>{orderNum}</strong>.
          <br />
          Мы свяжемся с вами в ближайший час, чтобы подтвердить детали.
        </p>
        <Link href="/" className="btn btn-primary mt-3 inline-flex">
          На главную
        </Link>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="animate-fade-in card p-10 text-center max-w-xl mx-auto">
        <div className="text-5xl mb-3">🤷</div>
        <p className="text-cactus-700/90">Сначала добавьте что-нибудь в корзину.</p>
        <Link href="/catalog" className="btn btn-primary mt-4">
          В каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h1 className="font-display text-4xl text-cactus-900">Оформление заказа</h1>
        <p className="text-cactus-700/80 text-sm">Ещё чуть-чуть, и колючки в пути.</p>
      </header>

      <form className="grid lg:grid-cols-[1fr_360px] gap-8" onSubmit={onSubmit}>
        <div className="space-y-6">
          <section className="card p-6 space-y-4">
            <h2 className="font-display text-xl text-cactus-900">Контакты</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Имя" name="name" required />
              <Field label="Телефон" name="phone" type="tel" placeholder="+7 ___ ___ __ __" required />
              <div className="sm:col-span-2">
                <Field label="E-mail" name="email" type="email" required />
              </div>
            </div>
          </section>

          <section className="card p-6 space-y-4">
            <h2 className="font-display text-xl text-cactus-900">Доставка</h2>
            <div className="grid sm:grid-cols-3 gap-2">
              {[
                { id: "courier", label: "Курьер", hint: "Москва, день в день" },
                { id: "pickup", label: "Самовывоз", hint: "м. Чистые пруды" },
                { id: "post", label: "СДЭК", hint: "По России, 2–6 дней" },
              ].map((d) => (
                <label
                  key={d.id}
                  className={`card p-3 cursor-pointer ${
                    delivery === d.id ? "border-cactus-500 ring-2 ring-cactus-300/50" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value={d.id}
                    checked={delivery === d.id}
                    onChange={() => setDelivery(d.id as typeof delivery)}
                    className="sr-only"
                  />
                  <div className="font-medium text-cactus-900">{d.label}</div>
                  <div className="text-xs text-cactus-700/70 mt-1">{d.hint}</div>
                </label>
              ))}
            </div>
            {delivery !== "pickup" && (
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Город" name="city" required />
                <Field label="Индекс" name="zip" />
                <div className="sm:col-span-2">
                  <Field label="Адрес" name="address" placeholder="улица, дом, квартира" required />
                </div>
              </div>
            )}
          </section>

          <section className="card p-6 space-y-3">
            <h2 className="font-display text-xl text-cactus-900">Оплата</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                { id: "card", label: "Картой онлайн" },
                { id: "cash", label: "Наличными курьеру" },
              ].map((p) => (
                <label
                  key={p.id}
                  className={`card p-3 cursor-pointer ${
                    payment === p.id ? "border-cactus-500 ring-2 ring-cactus-300/50" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={p.id}
                    checked={payment === p.id}
                    onChange={() => setPayment(p.id as typeof payment)}
                    className="sr-only"
                  />
                  <div className="font-medium text-cactus-900">{p.label}</div>
                </label>
              ))}
            </div>
          </section>

          <section className="card p-6">
            <h2 className="font-display text-xl text-cactus-900 mb-3">Комментарий</h2>
            <textarea
              name="comment"
              rows={3}
              placeholder="особенные пожелания, удобное время доставки..."
              className="input resize-none"
            />
          </section>
        </div>

        <aside className="card p-6 h-fit lg:sticky lg:top-24 space-y-4">
          <h2 className="font-display text-xl text-cactus-900">Ваш заказ</h2>
          <ul className="space-y-2 text-sm max-h-80 overflow-y-auto scroll-thin">
            {rows.map(({ product, qty }) => (
              <li key={product.id} className="flex justify-between gap-3">
                <span className="text-cactus-800/90">
                  {product.name} <span className="text-cactus-700/60">× {qty}</span>
                </span>
                <span className="shrink-0">{formatPrice(product.price * qty)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-cactus-100 pt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-cactus-700/80">Товары</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cactus-700/80">Доставка</span>
              <span>{deliveryCost === 0 ? "бесплатно" : formatPrice(deliveryCost)}</span>
            </div>
          </div>
          <div className="border-t border-cactus-100 pt-3 flex justify-between items-baseline">
            <span className="text-cactus-800">К оплате</span>
            <span className="font-display text-2xl text-cactus-900">{formatPrice(total)}</span>
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Подтвердить заказ
          </button>
          <p className="text-xs text-cactus-700/60 text-center">
            нажимая «Подтвердить», вы соглашаетесь с обработкой данных
          </p>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-cactus-700/70">{label}</span>
      <input name={name} className="input mt-1" {...rest} />
    </label>
  );
}
