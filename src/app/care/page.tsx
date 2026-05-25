import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Уход за кактусами — Колючка и Ко",
};

const tips = [
  {
    icon: "☀️",
    title: "Свет",
    body:
      "Большинство кактусов и суккулентов любят прямой солнечный свет минимум 4–6 часов в день. Идеально — южный или юго-восточный подоконник. Если листья растут вытянутыми и бледнеют — света не хватает.",
  },
  {
    icon: "💧",
    title: "Полив",
    body:
      "Главное правило: лучше недолить, чем перелить. Поливайте только когда грунт полностью просох — обычно это раз в 2–3 недели летом и раз в месяц зимой. Зимой большинство кактусов нужно почти не поливать.",
  },
  {
    icon: "🌡️",
    title: "Температура",
    body:
      "Лето — 22–30 °C, отлично выносят жару. Зимой важна холодная зимовка: 8–14 °C для большинства видов. Именно холодная сухая зимовка запускает цветение весной.",
  },
  {
    icon: "🪨",
    title: "Грунт",
    body:
      "Используйте минералистый рыхлый субстрат: смесь покупного грунта для кактусов с пемзой или цеолитом в пропорции 1:1. На дне горшка обязателен дренаж.",
  },
  {
    icon: "🪴",
    title: "Горшок",
    body:
      "Лучше всего — терракотовый: пористые стенки отводят лишнюю влагу. Размер — на 1–2 см больше корневого кома. В слишком большом горшке грунт долго сохнет и корни загнивают.",
  },
  {
    icon: "🌱",
    title: "Подкормка",
    body:
      "С апреля по сентябрь раз в месяц — специальное удобрение для кактусов в половинной дозировке. Зимой и сразу после пересадки — не подкармливаем.",
  },
];

const myths = [
  {
    q: "Кактус ловит излучение от компьютера?",
    a: "Нет, это городская легенда. Колючкам всё равно, что стоит рядом — лишь бы было много света.",
  },
  {
    q: "Кактус нельзя поворачивать?",
    a: "Можно, но осторожно: некоторые виды (например, ферокактусы) при резком развороте могут вытянуться однобоко. Лучше поворачивайте на 30–45° раз в пару недель.",
  },
  {
    q: "Кактусы не цветут дома?",
    a: "Цветут — если устроить им прохладную сухую зимовку. Без неё растение растёт, но цветочные почки не закладывает.",
  },
];

export default function CarePage() {
  return (
    <div className="space-y-12 animate-fade-in">
      <header className="max-w-2xl">
        <span className="tag">инструкция</span>
        <h1 className="font-display text-4xl text-cactus-900 mt-3">
          Как не загубить кактус
        </h1>
        <p className="text-cactus-700/90 mt-3">
          Шесть правил, на которых держится 90% успеха. Распечатайте, повесьте у окна
          или просто запомните — и ваш колючий друг переживёт вас.
        </p>
      </header>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tips.map((t) => (
          <div key={t.title} className="card p-5">
            <div className="text-3xl">{t.icon}</div>
            <div className="font-display text-xl text-cactus-900 mt-2">{t.title}</div>
            <p className="text-sm text-cactus-700/90 mt-2 leading-relaxed">{t.body}</p>
          </div>
        ))}
      </section>

      <section className="card p-8 bg-cactus-50/60 border-cactus-200">
        <h2 className="font-display text-2xl text-cactus-900 mb-4">Календарь по сезонам</h2>
        <div className="grid sm:grid-cols-4 gap-4 text-sm">
          {[
            { s: "🌸 Весна", body: "Просыпаемся. Постепенно увеличиваем полив, начинаем подкармливать, можно пересаживать." },
            { s: "☀️ Лето", body: "Период активного роста. Регулярный полив по мере просыхания, защита от полуденного зноя за стеклом." },
            { s: "🍂 Осень", body: "Сокращаем полив. Переносим в более прохладное место. Подкормки прекращаем." },
            { s: "❄️ Зима", body: "Холодная сухая зимовка 8–14 °C. Поливаем минимально — раз в месяц или реже." },
          ].map((b) => (
            <div key={b.s}>
              <div className="font-medium text-cactus-900">{b.s}</div>
              <p className="text-cactus-800/90 mt-1">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl text-cactus-900">Мифы о кактусах</h2>
        <div className="space-y-3">
          {myths.map((m) => (
            <details key={m.q} className="card p-5 group">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-3">
                <span className="font-medium text-cactus-900">{m.q}</span>
                <span className="text-cactus-600 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-sm text-cactus-700/90 mt-3 leading-relaxed">{m.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
