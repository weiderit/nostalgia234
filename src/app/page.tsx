import Link from "next/link";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { CactusArt } from "@/components/CactusArt";

export default function HomePage() {
  const featured = products.slice(0, 4);
  return (
    <div className="space-y-24 animate-fade-in">
      {/* HERO */}
      <section className="relative grid md:grid-cols-[1.15fr_1fr] gap-10 items-center pt-4 md:pt-8 pb-8">
        <div className="hero-blob bg-cactus-200 w-[420px] h-[420px] -top-24 -left-24" />
        <div className="hero-blob bg-clay-100 w-[360px] h-[360px] -bottom-24 -right-10 hidden md:block" />

        <div className="relative space-y-6 animate-rise">
          <span className="tag">с 2014 года · только живые</span>
          <h1 className="font-display text-[clamp(2.6rem,6vw,4.5rem)] text-cactus-900 leading-[1.02] tracking-tight">
            Кактусы, которые
            <br />
            <em className="not-italic text-cactus-500" style={{ fontStyle: "italic" }}>
              проще полюбить,
            </em>
            <br />
            чем поливать.
          </h1>
          <p className="text-cactus-800/80 text-lg max-w-md leading-relaxed">
            Привозим живые растения из проверенных питомников. Бесплатно меняем,
            если что-то пошло не так в дороге. Доставляем по всей России.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/catalog" className="btn btn-primary text-[0.95rem]">
              Открыть каталог
              <span aria-hidden>→</span>
            </Link>
            <Link href="/care" className="btn btn-ghost text-[0.95rem]">
              Как ухаживать
            </Link>
          </div>

          <div className="pt-6 flex items-center gap-5 text-sm text-cactus-700/80">
            <div className="flex -space-x-2">
              {["#4b894e", "#8fc28d", "#d39668", "#c8ac6c"].map((c) => (
                <span
                  key={c}
                  className="w-8 h-8 rounded-full ring-2 ring-sand-50"
                  style={{ background: c }}
                />
              ))}
            </div>
            <div>
              <strong className="text-cactus-900">16 000+</strong> довольных кактусов
              <br />
              <span className="text-cactus-700/60">уже нашли свой подоконник</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-square max-w-[460px] mx-auto">
            <div className="absolute inset-0 rounded-[40%_60%_55%_45%/55%_45%_60%_40%] bg-gradient-to-br from-cactus-100 via-bone-100 to-clay-100 shadow-soft animate-float" />
            <div className="absolute inset-6 rounded-[44%_56%_60%_40%/52%_48%_56%_44%] cactus-pattern" />
            <div className="absolute inset-0 grid place-items-center animate-sway">
              <div className="w-[78%] h-[78%]">
                <CactusArt accent="#4b894e" variant="кактус" />
              </div>
            </div>
            <div className="absolute -top-3 -right-2 bg-white/90 backdrop-blur card-flat px-4 py-3 shadow-soft rotate-3">
              <div className="text-[10px] uppercase tracking-widest text-cactus-500">сегодня</div>
              <div className="text-sm font-medium text-cactus-900">−15% на наборы</div>
            </div>
            <div className="absolute -bottom-2 -left-2 bg-white/90 backdrop-blur card-flat px-4 py-3 shadow-soft -rotate-2">
              <div className="text-[10px] uppercase tracking-widest text-cactus-500">доставка</div>
              <div className="text-sm font-medium text-cactus-900">сегодня · по Москве</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="grid sm:grid-cols-3 gap-5">
        {[
          { icon: "🚚", title: "Доставка день в день", body: "По Москве — курьером с 11:00 до 22:00" },
          { icon: "🌱", title: "Живые гарантии", body: "Заменим растение, если оно не пережило путь" },
          { icon: "📖", title: "Инструкция в комплекте", body: "Объясним, как не загубить даже самый стойкий кактус" },
        ].map((f) => (
          <div key={f.title} className="card p-6 group">
            <div className="w-12 h-12 rounded-2xl bg-cactus-50 border border-cactus-100 grid place-items-center text-2xl group-hover:scale-105 transition-transform">
              {f.icon}
            </div>
            <div className="font-display text-xl text-cactus-900 mt-4">{f.title}</div>
            <p className="text-[0.95rem] text-cactus-700/85 mt-1.5 leading-relaxed">{f.body}</p>
          </div>
        ))}
      </section>

      {/* FEATURED */}
      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div className="space-y-1">
            <span className="tag">бестселлеры</span>
            <h2 className="font-display text-4xl md:text-5xl text-cactus-900 tracking-tight">
              Хиты <em className="not-italic text-cactus-500" style={{ fontStyle: "italic" }}>подоконника</em>
            </h2>
            <p className="text-cactus-700/75">Самые выносливые и фотогеничные.</p>
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

      {/* STORY */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div className="card p-10 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-cactus-100/60 blur-2xl" />
          <span className="tag">наша история</span>
          <h3 className="font-display text-3xl text-cactus-900 mt-3 leading-tight">
            Всё началось с одного забытого кактуса
          </h3>
          <p className="text-cactus-800/80 mt-3 leading-relaxed">
            Через четыре года жизни на подоконнике он расцвёл. Тогда мы поняли —
            этим ребятам можно довериться надолго. С тех пор привозим и проверяем
            каждое растение перед отправкой.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 mt-5 text-cactus-700 hover:text-cactus-900 font-medium"
          >
            читать дальше <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="space-y-4">
          {[
            { n: "9 лет", b: "выращиваем и доставляем" },
            { n: "98%", b: "доезжают целыми (за остальные платим мы)" },
            { n: "16 000+", b: "кактусов уехали к новым хозяевам" },
          ].map((s) => (
            <div key={s.n} className="card p-5 flex items-baseline gap-5">
              <div className="font-display text-3xl text-cactus-700 min-w-[5rem]">{s.n}</div>
              <div className="text-cactus-800/85">{s.b}</div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="relative card p-10 md:p-14 overflow-hidden">
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-cactus-100/70 blur-3xl" />
        <div className="absolute -bottom-20 -left-12 w-72 h-72 rounded-full bg-clay-100/60 blur-3xl" />
        <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <span className="tag">письма</span>
            <h3 className="font-display text-3xl md:text-4xl text-cactus-900 mt-3 leading-tight">
              Письма про <em className="not-italic text-cactus-500" style={{ fontStyle: "italic" }}>колючее</em>
            </h3>
            <p className="text-cactus-800/80 mt-2 max-w-lg">
              Раз в месяц — редкие виды, аккуратные скидки и одна простая
              инструкция по уходу. Никакого спама и пыли.
            </p>
          </div>
          <form className="flex gap-2 w-full md:w-auto">
            <input className="input md:w-72" placeholder="ваш e-mail" type="email" required />
            <button className="btn btn-primary" type="submit">
              Подписаться
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
