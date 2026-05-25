import Link from "next/link";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export default function HomePage() {
  const featured = products.slice(0, 4);
  return (
    <div className="space-y-16 animate-fade-in">
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          <span className="tag">с 2014 года</span>
          <h1 className="font-display text-5xl md:text-6xl text-cactus-900 leading-[1.05]">
            Кактусы, которые
            <br />
            <span className="text-cactus-600">проще полюбить,</span>
            <br />
            чем поливать.
          </h1>
          <p className="text-cactus-700/90 text-lg max-w-md">
            Привозим живые растения из проверенных питомников. Бесплатно меняем,
            если что-то пошло не так в дороге. Доставляем по всей России.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/catalog" className="btn btn-primary">
              Открыть каталог
            </Link>
            <Link href="/care" className="btn btn-ghost">
              Как ухаживать
            </Link>
          </div>
        </div>
        <div className="cactus-pattern card p-8 flex items-center justify-center text-[14rem] leading-none select-none">
          <span aria-hidden>🌵</span>
        </div>
      </section>

      <section className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: "🚚", title: "Доставка день в день", body: "По Москве — курьером с 11:00 до 22:00" },
          { icon: "🌱", title: "Живые гарантии", body: "Заменим растение, если оно не пережило путь" },
          { icon: "📖", title: "Инструкция в комплекте", body: "Объясним, как не загубить даже самый стойкий кактус" },
        ].map((f) => (
          <div key={f.title} className="card p-5">
            <div className="text-3xl mb-2">{f.icon}</div>
            <div className="font-medium text-cactus-900">{f.title}</div>
            <p className="text-sm text-cactus-700/80 mt-1">{f.body}</p>
          </div>
        ))}
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl text-cactus-900">Хиты подоконника</h2>
            <p className="text-sm text-cactus-700/80">Самые выносливые и фотогеничные.</p>
          </div>
          <Link
            href="/catalog"
            className="text-sm text-cactus-600 hover:text-cactus-800 underline-offset-4 hover:underline"
          >
            весь каталог →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="card p-8 md:p-10 grid md:grid-cols-[1fr_auto] gap-6 items-center bg-cactus-50/60 border-cactus-200">
        <div>
          <h3 className="font-display text-2xl text-cactus-900">Подпишитесь на письма про колючее</h3>
          <p className="text-sm text-cactus-700/80 mt-1">
            Раз в месяц присылаем редкие виды, скидки и одну простую инструкцию по уходу.
          </p>
        </div>
        <form className="flex gap-2 w-full md:w-auto">
          <input className="input md:w-72" placeholder="ваш e-mail" type="email" required />
          <button className="btn btn-primary" type="submit">
            Подписаться
          </button>
        </form>
      </section>
    </div>
  );
}
