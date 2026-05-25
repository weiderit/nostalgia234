import { CactusArt } from "@/components/CactusArt";

export function Footer() {
  return (
    <footer className="mt-28 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cactus-200/60 to-transparent" />
      <div className="mx-auto max-w-6xl px-6 lg:px-10 py-12 grid gap-10 md:grid-cols-[1.3fr_1fr_1fr] text-sm text-cactus-800/85">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-10 rounded-2xl bg-cactus-50 border border-cactus-100 overflow-hidden grid place-items-center">
              <span className="block w-8 h-8">
                <CactusArt accent="#65a466" />
              </span>
            </span>
            <div className="font-display text-lg text-cactus-900 leading-none">
              Колючка <span className="text-cactus-500">и Ко</span>
            </div>
          </div>
          <p className="text-cactus-700/80 max-w-xs leading-relaxed">
            Кактусы и суккуленты для тех, кто любит растения,
            но забывает их поливать. С 2014 года.
          </p>
        </div>
        <div>
          <div className="font-medium text-cactus-900 mb-3">Доставка</div>
          <ul className="space-y-1.5 text-cactus-700/80">
            <li>Москва — день в день, от 1 шт</li>
            <li>Россия — СДЭК, 2–6 дней</li>
            <li>Бесплатно от 3 500 ₽</li>
          </ul>
        </div>
        <div>
          <div className="font-medium text-cactus-900 mb-3">Контакты</div>
          <ul className="space-y-1.5 text-cactus-700/80">
            <li>+7 (495) 123-45-67</li>
            <li>hello@kolyuchka.shop</li>
            <li>пн–вс, 10:00–20:00</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 lg:px-10 pb-10">
        <div className="divider-leaf">
          <span>🌵</span>
        </div>
        <div className="mt-6 text-xs text-cactus-700/55 flex justify-between items-center flex-wrap gap-2">
          <span>© {new Date().getFullYear()} «Колючка и Ко». Все колючки берегите.</span>
          <span>сделано с любовью к растениям</span>
        </div>
      </div>
    </footer>
  );
}
