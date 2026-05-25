import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "О нас — Колючка и Ко",
};

export default function AboutPage() {
  return (
    <div className="space-y-12 animate-fade-in max-w-3xl">
      <header>
        <span className="tag">с 2014 года</span>
        <h1 className="font-display text-4xl text-cactus-900 mt-3">О нас</h1>
      </header>

      <section className="space-y-4 text-cactus-800/90 leading-relaxed">
        <p>
          Всё началось с одного эхинокактуса, забытого на подоконнике общаги. Когда
          через четыре года он выпустил жёлтый цветок размером с монету, стало ясно:
          с этими ребятами стоит подружиться надолго.
        </p>
        <p>
          Сегодня «Колючка и Ко» — небольшая команда из шести человек: два агронома,
          водитель, упаковщик, фотограф и кот Пыль. Мы привозим растения из питомников
          в Краснодарском крае, Голландии и Чехии, проверяем каждое перед отправкой
          и заменяем без вопросов, если что-то пошло не так в пути.
        </p>
        <p>
          Мы не самый большой и не самый дешёвый магазин. Но если вы хотите, чтобы
          кактус прожил у вас лет двадцать и однажды зацвёл — нам по пути.
        </p>
      </section>

      <section className="grid sm:grid-cols-3 gap-4">
        {[
          { num: "9 лет", body: "выращиваем и доставляем" },
          { num: "16 000+", body: "кактусов уехали к новым хозяевам" },
          { num: "98%", body: "доезжают целыми (за остальные платим мы)" },
        ].map((s) => (
          <div key={s.num} className="card p-5">
            <div className="font-display text-3xl text-cactus-700">{s.num}</div>
            <div className="text-sm text-cactus-700/80 mt-1">{s.body}</div>
          </div>
        ))}
      </section>

      <section className="card p-6 bg-cactus-50/60 border-cactus-200">
        <h2 className="font-display text-2xl text-cactus-900">Где мы</h2>
        <p className="text-sm text-cactus-800/90 mt-2">
          Москва, Покровка, 22 — самовывоз и оранжерея с экземплярами, которых ещё
          нет в каталоге. Загляните, если будете рядом.
        </p>
        <p className="text-sm text-cactus-700/80 mt-2">
          пн–вс, 11:00–20:00 · +7 (495) 123-45-67
        </p>
      </section>
    </div>
  );
}
