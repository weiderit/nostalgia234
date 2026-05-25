import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { AddToCartBlock } from "@/components/AddToCartBlock";
import { CactusArt } from "@/components/CactusArt";
import { ProductCard } from "@/components/ProductCard";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id);
  if (!product) return notFound();

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="space-y-12 animate-fade-in">
      <nav className="text-sm text-cactus-700/70">
        <Link href="/" className="hover:text-cactus-800">
          главная
        </Link>{" "}
        /{" "}
        <Link href="/catalog" className="hover:text-cactus-800">
          каталог
        </Link>{" "}
        / <span className="text-cactus-900">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="card overflow-hidden">
          <div className="aspect-square cactus-pattern relative">
            <CactusArt accent={product.accent} variant={product.category} className="absolute inset-0" />
          </div>
        </div>
        <div className="space-y-5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="tag">{product.category}</span>
            {product.stock > 0 ? (
              <span className="tag bg-cactus-100">в наличии: {product.stock}</span>
            ) : (
              <span className="tag bg-clay-100 text-clay-500">нет в наличии</span>
            )}
          </div>
          <h1 className="font-display text-4xl text-cactus-900 leading-tight">{product.name}</h1>
          <div className="text-cactus-700/70 italic">{product.latin}</div>
          <div className="text-3xl font-display text-cactus-800">{formatPrice(product.price)}</div>
          <p className="text-cactus-800/90 leading-relaxed">{product.description}</p>

          <dl className="grid grid-cols-2 gap-3 text-sm pt-2">
            <Spec label="Размер" value={product.size} />
            <Spec label="Происхождение" value={product.origin} />
            <Spec label="Свет" value={product.light} />
            <Spec label="Полив" value={product.watering} />
          </dl>

          <div className="pt-4 border-t border-cactus-100">
            <AddToCartBlock product={product} />
          </div>

          <div className="card p-5 bg-cactus-50/60 border-cactus-200 space-y-2">
            <div className="flex items-center gap-2 font-medium text-cactus-800">
              <span>🌱</span> Как ухаживать
            </div>
            <p className="text-sm text-cactus-800/90 leading-relaxed">{product.care}</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-display text-2xl text-cactus-900">С этим часто берут</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-cactus-100 rounded-lg p-3">
      <dt className="text-xs uppercase tracking-wider text-cactus-700/60">{label}</dt>
      <dd className="text-cactus-900 mt-0.5">{value}</dd>
    </div>
  );
}
