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
    <div className="space-y-16 animate-fade-in">
      <nav className="text-sm text-cactus-700/70 flex items-center gap-2">
        <Link href="/" className="hover:text-cactus-900 transition-colors">
          главная
        </Link>
        <span className="text-cactus-300">/</span>
        <Link href="/catalog" className="hover:text-cactus-900 transition-colors">
          каталог
        </Link>
        <span className="text-cactus-300">/</span>
        <span className="text-cactus-900">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14">
        <div className="card overflow-hidden relative">
          <div className="aspect-square cactus-pattern relative">
            <div className="absolute inset-8 rounded-[40%_60%_55%_45%/55%_45%_60%_40%] bg-gradient-to-br from-cactus-100/60 via-bone-100/40 to-clay-100/30 animate-float" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="w-[82%] h-[82%]">
                <CactusArt accent={product.accent} variant={product.category} />
              </div>
            </div>
            <span className="absolute top-5 left-5 tag">{product.category}</span>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-2 flex-wrap">
            {product.stock > 0 ? (
              <span className="tag bg-cactus-100/70">в наличии · {product.stock}</span>
            ) : (
              <span className="tag bg-clay-100/80 text-clay-500 border-clay-200">
                нет в наличии
              </span>
            )}
            <span className="tag bg-bone-100 text-cactus-700 border-cactus-100">
              {product.origin}
            </span>
          </div>
          <div>
            <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-cactus-900 leading-[1.05] tracking-tight">
              {product.name}
            </h1>
            <div className="text-cactus-700/65 italic mt-2 font-display text-lg">
              {product.latin}
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <div className="font-display text-4xl text-cactus-800 font-medium">
              {formatPrice(product.price)}
            </div>
            <div className="text-sm text-cactus-700/60">за растение</div>
          </div>
          <p className="text-cactus-800/85 leading-relaxed text-[1.02rem]">
            {product.description}
          </p>

          <dl className="grid grid-cols-2 gap-3 pt-2">
            <Spec label="Размер" value={product.size} icon="📏" />
            <Spec label="Свет" value={product.light} icon="☀️" />
            <Spec label="Полив" value={product.watering} icon="💧" />
            <Spec label="Откуда" value={product.origin} icon="🗺" />
          </dl>

          <div className="pt-2">
            <AddToCartBlock product={product} />
          </div>

          <div className="card p-6 bg-gradient-to-br from-cactus-50/80 to-bone-100 border-cactus-100 space-y-2 relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-cactus-100/60 blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-2 font-medium text-cactus-900">
                <span className="text-xl">🌱</span> Как ухаживать
              </div>
              <p className="text-[0.97rem] text-cactus-800/90 leading-relaxed mt-2">
                {product.care}
              </p>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-end justify-between">
            <div>
              <span className="tag">похожее</span>
              <h2 className="font-display text-3xl md:text-4xl text-cactus-900 mt-3 tracking-tight">
                С этим часто берут
              </h2>
            </div>
            <Link
              href="/catalog"
              className="text-sm text-cactus-600 hover:text-cactus-800 underline-offset-4 hover:underline"
            >
              весь каталог →
            </Link>
          </div>
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

function Spec({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="card-flat p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-cactus-700/60">
        <span aria-hidden>{icon}</span>
        <span>{label}</span>
      </div>
      <div className="text-cactus-900 mt-1.5 font-medium">{value}</div>
    </div>
  );
}
